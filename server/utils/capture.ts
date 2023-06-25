import type { Browser, Page } from 'puppeteer'
import type { Config } from '@/prisma'
import type { Viewport } from '@/types/capture'

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

export async function capture(url: string, config: Config, page: Page, browser: Browser) {
  const timeoutInMilliseconds = config.timeout * 1000
  const viewport: Viewport = {
    width: config.width,
    height: config.height,
    deviceScaleFactor: config.scaleFactor,
  }

  await page.setBypassCSP(true)
  await page.setJavaScriptEnabled(config.jsEnabled)

  if (true) {
    // TODO: add debug mode
    page.on('console', (message) => {
      const { url, lineNumber, columnNumber } = message.location()
      const location = url ? ` (${url}:${lineNumber}:${columnNumber})` : ''
      console.log(`\nPage log:${location}\n${message.text()}\n`)
    })

    page.on('pageerror', (error) => {
      console.log('\nPage error:', error, '\n')
    })

    // TODO: Add more events from https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#event-requestfailed
  }

  await page.setViewport(viewport)

  // set dark mode
  await page.emulateMediaFeatures([
    {
      name: 'prefers-color-scheme',
      value: config.darkMode ? 'dark' : 'light',
    },
  ])

  await page.goto(url, {
    timeout: timeoutInMilliseconds,
    waitUntil: 'networkidle2',
  })

  // disable animations
  await page.evaluate(disableAnimations, true)

  if (config.fullPage) {
    await scrollPageToBottom(page, {
      size: 300,
      delay: 200,
    })
    await page.waitForTimeout(5000)
  }

  if (config.isPdf && config.pdfFormat) {
    return await page.pdf({
      printBackground: true,
      landscape: config.pdfLandscape,
      width: config.width,
      height: config.height,
      format: config.pdfFormat === 'resolution' ? undefined : config.pdfFormat,
    })
  }
  else {
    return await page.screenshot({
      type: config.format,
      fullPage: config.fullPage,
      omitBackground: false,
    })
  }
}
