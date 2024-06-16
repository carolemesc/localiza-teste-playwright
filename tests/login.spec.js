import {test, expect} from '@playwright/test'
import data from '../fixtures/data'
import helper from '../navigation/helper'

/** @type {import('@playwright/test').Page} */
let page

test.beforeAll(async ({browser}) => {
  page = await browser.newPage()
  await page.goto(data.APP.URL)
})


test.describe('Login', () => {
  test('should be able to login', async () => {
    const Helper = helper(page)
    await page.getByTestId('loc-login').click()
    await page.locator('#EmailCpf').click()
    await page.locator('#mat-input-0').fill(data.USER.EMAIL)
    await page.locator('#mat-input-1').fill(data.USER.SENHA)
    await page.waitForTimeout(1000)
    await page.locator('.btn-localiza').click()
    await expect(page.getByTestId('loc-login')).toBeHidden()
    const currentPageURLTESTE = page.url()
    console.log(currentPageURLTESTE);
    await Helper.dismissCookie()
    await Helper.popupJourney()
    await expect(page.getByText(data.USER.NOME)).toBeVisible()
  })
})
