import { test, expect } from '@playwright/test'

test('en home loads at /', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Collective Calling'
  )
})

test('es route resolves', async ({ page }) => {
  const res = await page.goto('/es')
  expect(res?.status()).toBeLessThan(400)
})
