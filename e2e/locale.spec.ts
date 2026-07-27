import { test, expect } from '@playwright/test'

test('en home loads at /', async ({ page }) => {
  await page.goto('/')
  // The hero owns the single page h1, which carries the v2 headline.
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    /a life\s*beyond\s*ourselves\./i
  )
})

test('es route resolves', async ({ page }) => {
  const res = await page.goto('/es')
  expect(res?.status()).toBeLessThan(400)
})
