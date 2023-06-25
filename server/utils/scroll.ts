import type { Page } from 'puppeteer'

interface Options {
  /**
   * Number of pixels to scroll on each step
   * @type {number}
   */
  size?: number

  /**
   * Delay after each completed scroll step
   * @type {number}
   */
  delay?: number

  /**
   * Max number of steps to scroll
   * @type {number}
   */
  stepsLimit?: number
}

function scrollPage(scrollDirection: 'top' | 'bottom') {
  return async (page: Page, { size = 250, delay = 100, stepsLimit = undefined }: Options = {}) => {
    const lastScrollPosition = await page.evaluate(
      async (pixelsToScroll, delayAfterStep, limit, direction) => {
        const getElementScrollHeight = (element: HTMLElement) => {
          if (!element)
            return 0
          const { scrollHeight, offsetHeight, clientHeight } = element
          return Math.max(scrollHeight, offsetHeight, clientHeight)
        }

        const initialScrollPosition = window.pageYOffset
        const availableScrollHeight = getElementScrollHeight(document.body)
        let lastPosition = direction === 'bottom' ? 0 : initialScrollPosition

        const scrollFn = (resolve: (arg0: number) => void) => {
          const intervalId = setInterval(() => {
            window.scrollBy(0, direction === 'bottom' ? pixelsToScroll : -pixelsToScroll)
            lastPosition += direction === 'bottom' ? pixelsToScroll : -pixelsToScroll

            if (
              (direction === 'bottom' && lastPosition >= availableScrollHeight)
              || (direction === 'bottom'
                && limit !== undefined
                && lastPosition >= pixelsToScroll * limit)
              || (direction === 'top' && lastPosition <= 0)
              || (direction === 'top'
                && limit !== undefined
                && lastPosition <= initialScrollPosition - pixelsToScroll * limit)
            ) {
              clearInterval(intervalId)
              resolve(lastPosition)
            }
          }, delayAfterStep)
        }

        return new Promise(scrollFn)
      },
      size,
      delay,
      stepsLimit,
      scrollDirection,
    )

    return lastScrollPosition
  }
}

export const scrollPageToBottom = scrollPage('bottom')
export const scrollPageToTop = scrollPage('top')
