/** @param {import('@playwright/test').Page} page */

const Helper = (page) => {
  async function gotoIfNeed(url) {
    const currentPageURL = page.url()
    if (!currentPageURL.endsWith(url)) {
      await page.goto(url)
      await page.waitForLoadState()
    }
  }

  async function dismissCookie() {
    await page.waitForLoadState()
    const cookieMessageVisible = await page.getByLabel('dismiss cookie message').isVisible()
    if (cookieMessageVisible) {
      await page.getByLabel('dismiss cookie message').click()
    }
  }

  async function popupJourney() {
    const popupJourneyVisible = await page.getByText('Quer acelerar a sua jornada?').isVisible()
    if (popupJourneyVisible) {
      await page.getByTestId('btn-close-popup').click()
    }
  }

  return {
    gotoIfNeed,
    dismissCookie,
    popupJourney,
  }
}

const helper = (page) => Helper(page)

export default helper