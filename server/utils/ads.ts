import { promises as fs } from 'node:fs'
import { PuppeteerBlocker } from '@cliqz/adblocker-puppeteer'
import type { Page } from 'puppeteer'

export async function removeAds(page: Page) {
  // TODO: configure which ads to block https://github.com/ghostery/adblocker/blob/master/packages/adblocker-puppeteer/README.md
  await PuppeteerBlocker.fromPrebuiltFull(fetch, {
    path: 'engine.bin',
    read: fs.readFile,
    write: fs.writeFile,
  }).then((blocker) => {
    blocker.enableBlockingInPage(page)
  })
}
