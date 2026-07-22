import { test, expect } from '@playwright/test'

test('en home loads at /', async ({ page }) => {
  await page.goto('/')
  // The hero owns the single page h1, which carries the mockup headline.
  // \s* between words: the headline renders as stacked block spans, so the
  // text content may carry no whitespace between them.
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    /where\s*values\s*become/i
  )
})

test('es route resolves', async ({ page }) => {
  const res = await page.goto('/es')
  expect(res?.status()).toBeLessThan(400)
})
