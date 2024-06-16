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
    let btnEntrar = await page.locator('.btn-localiza').isVisible()
    while (btnEntrar) { //esse while não é o ideal. existe um bug na ferramenta e mesmo depois do clique no botão "entrar". A intenção aqui é fazer a automação seguir os steps, não resolver um bug 
      await page.locator('.btn-localiza').click()
      await page.waitForTimeout(1000)
      btnEntrar = await page.locator('.btn-localiza').isVisible()
    }
    await page.waitForURL(data.APP.URL)
    await expect(page.getByTestId('loc-login')).toBeHidden()
    await Helper.dismissCookie()
    await Helper.popupJourney()
    await expect(page.getByText(data.USER.NOME)).toBeVisible()
  })

  test.only('should not be possible to log in with invalid data', async () =>{
    await page.getByTestId('loc-login').click()
    await page.locator('#EmailCpf').click()
    await page.locator('#mat-input-0').fill('email@mail.com')
    await page.locator('#mat-input-1').fill('password@')
    await page.waitForTimeout(1000)
    let errorMessage = await page.locator('#msgsAlerts').isHidden()
    while (errorMessage) { //esse while não é o ideal. existe um bug na ferramenta e mesmo depois do clique no botão "entrar". A intenção aqui é fazer a automação seguir os steps, não resolver um bug 
      await page.locator('.btn-localiza').click()
      await page.waitForTimeout(2000)
      errorMessage = await page.locator('#msgsAlerts').isHidden()
    }
    await expect(page.locator('#msgsAlerts')).toBeVisible()
  })
})
