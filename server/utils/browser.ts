import type { Browser, Page, PuppeteerLaunchOptions } from 'puppeteer'
import puppeteer from 'puppeteer'
import { parseURL } from 'ufo'
import { prisma } from '@/prisma'

export async function load(url: string, configId: number | null = null) {
  let browser: Browser | null = null
  let page: Page | null = null

  if (!url)
    throw new Error('URL not found')

  const config = await prisma.config.findUnique({
    where: configId
      ? {
          id: configId,
        }
      : {
          name: 'default',
        },
  })

  if (!config)
    throw new Error('Config not found')

  const launchOptions: PuppeteerLaunchOptions = {
    headless: 'new',
    ignoreHTTPSErrors: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
    ignoreDefaultArgs: ['--disable-extensions'],
    waitForInitialPage: true,
    devtools: false,
    product: 'chrome', // TODO: add an option to choose browser
  }

  try {
    if (!browser)
      browser = await puppeteer.launch(launchOptions)

    page = await browser.newPage()

    // TODO: if this enabled it will cause a lot of problems to load urls. find a way to fix it
    if (config.blockAds)
      removeAds(page)

    const buffer = await capture(url, config, page)
    const urlObj = parseURL(url)
    let fileExtension = 'png'

    switch (buffer.type) {
      case 'application/pdf':
        fileExtension = 'pdf'
        break
      case 'image/webp':
        fileExtension = 'webp'
        break
      case 'image/jpeg':
        fileExtension = 'jpg'
        break
      case 'image/png':
        fileExtension = 'png'
        break
      default:
        fileExtension = 'png'
        break
    }

    const fileName = `${urlObj.host}-${Date.now()}.${
      fileExtension
    }`

    const screenshot = await prisma.screenshot.create({
      data: {
        url,
        fileName,
        configId: config.id,
        buffer: buffer.buffer,
        type: buffer.type,
      },
    })

    if (!screenshot)
      throw new Error('Screenshot creation failed')

    if (screenshot && screenshot.id)
      console.log(`Screenshot ${screenshot.id} created`)

    return buffer
  }
  catch (error) {
    console.error(error)
  }
  finally {
    if (page)
      await page.close()

    // TODO: add an option to keep browser alive or not
    if (browser)
      await browser.close()
  }
}
