import {test, expect} from '@playwright/test'
import data from '../fixtures/data'

/** @type {import('@playwright/test').Page} */
let page

test.beforeAll(async ({browser}) => {
  page = await browser.newPage()
  await page.goto(data.APP.URL)
  await page.getByLabel('dismiss cookie message').click()
})


test.describe('Login', () => {
  test('should be able to login', async () => {
    await page.getByTestId('loc-login').click()
    await page.locator('#EmailCpf').getByText('Email or CPF').click()
    await page.getByLabel('Email or CPF *').fill(data.USER.EMAIL)
    await page.getByLabel('Password *').fill(data.USER.SENHA)
    await page.getByRole('button', {name: 'Enter'}).click()
    await page.waitForLoadState()
    await expect(page.getByText(data.USER.NOME)).toBeVisible()
  })
})
