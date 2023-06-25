import type { PuppeteerLaunchOptions } from 'puppeteer'
import puppeteer from 'puppeteer'
import { prisma } from '@/prisma'

export async function load(url: string, configId: number | null = null) {
  let browser, page

  if (!url)
    throw new Error('URL not found')

  // if (!configId)
  // throw new Error('Config ID not found')

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
    headless: false,
    slowMo: 100,
    ignoreHTTPSErrors: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
    ignoreDefaultArgs: ['--disable-extensions'],
    product: 'chrome', // TODO: add an option to use other browsers
    waitForInitialPage: true,
  }

  try {
    browser = await puppeteer.launch(launchOptions)
    page = await browser.newPage()

    if (config.blockAds)
      removeAds(page)

    return await capture(url, config, page, browser)
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
