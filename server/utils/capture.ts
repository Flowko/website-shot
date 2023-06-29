import type { Page, Viewport } from 'puppeteer'
import type { Config } from '@/prisma'

function disableAnimations() {
  const rule = `
*,
::before,
::after {
animation: initial !important;
transition: initial !important;
}
`

  const style = document.createElement('style')
  document.body.append(style)

  if (!style.sheet)
    throw new Error('Stylesheet not found')

  style.sheet.insertRule(rule)
}

export async function capture(url: string, config: Config, page: Page) {
  const timeoutInMilliseconds = config.timeout * 10000
  const viewport: Viewport = {
    width: config.width,
    height: config.height,
    deviceScaleFactor: config.scaleFactor,
    hasTouch: false,
    isMobile: false,
    isLandscape: true,
  }

  await page.setBypassCSP(true)
  await page.setJavaScriptEnabled(config.jsEnabled)

  // TODO: add an option to choose user agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36')

  await page.emulateMediaFeatures([
    {
      name: 'prefers-color-scheme',
      value: config.darkMode ? 'dark' : 'light',
    },
  ])

  await page.goto(url, {
    timeout: timeoutInMilliseconds,
    waitUntil: 'load',
  })

  await page.setViewport(viewport)

  // disable animations
  await page.evaluate(disableAnimations, true)

  // add scripts
  if (config.jsScript)
    await page.addScriptTag({ content: config.jsScript })

  // add styles
  if (config.cssStyle)
    await page.addStyleTag({ content: config.cssStyle })

  if (config.fullPage) {
    await scrollPageToBottom(page, {
      size: 300,
      delay: 200,
    })
    await page.waitForTimeout(5000)
  }

  if (config.isPdf && config.pdfFormat) {
    return {
      buffer: await page.pdf({
        printBackground: true,
        landscape: config.pdfLandscape,
        width: config.width,
        height: config.height,
        format: config.pdfFormat === 'resolution' ? undefined : config.pdfFormat,
      }),
      type: 'application/pdf',
    }
  }
  else {
    return {
      buffer: await page.screenshot({
        type: config.format,
        fullPage: config.fullPage,
        omitBackground: false,
      }),
      type: `image/${config.format}`,
    }
  }
}
