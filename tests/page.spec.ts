import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/bitbank-depth-chart/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/bitbank-depth-chart/)
})

test('get header title', async ({ page }) => {
  await page.goto('/bitbank-depth-chart/')

  const header = page.locator('header')

  await expect(header).toHaveText(/Depth Chart/)
})
