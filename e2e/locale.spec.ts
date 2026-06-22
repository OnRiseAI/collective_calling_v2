import { test, expect } from '@playwright/test'

test('en home loads at /', async ({ page }) => {
  await page.goto('/')
  // The hero owns the single page h1, which now carries the headline (the brand
  // name moved into the hero eyebrow). Assert the h1 renders with the headline.
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    /answer the call/i
  )
})

test('es route resolves', async ({ page }) => {
  const res = await page.goto('/es')
  expect(res?.status()).toBeLessThan(400)
})
