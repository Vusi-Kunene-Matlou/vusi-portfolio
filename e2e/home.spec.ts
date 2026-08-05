import { test, expect } from '@playwright/test'

test('home page loads and shows the name', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /vusi kunene matlou/i })).toBeVisible()
})
