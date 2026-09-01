import { test, expect } from '@playwright/test'

test('isolated editor test page renders without leaking a draft-only banner', async ({ page }) => {
  const response = await page.goto('/editor-test')
  expect(response).toBeTruthy()
  expect(response?.status() ?? 500).toBeLessThan(400)
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  await expect(page.locator('body')).not.toContainText('Draft preview')
})
