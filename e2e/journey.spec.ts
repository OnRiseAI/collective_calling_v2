import { test, expect } from '@playwright/test'

/**
 * Find Your Path end to end: begin, answer all ten questions (first option
 * each time — a volunteer-weighted run), ride the auto-advancing beats, and
 * land on the summary, result and what-happens-next frames. The result's
 * Explore action is a real link out to a /get-involved route; the next frame
 * is reached with ArrowRight, since Enter and click on the link would leave
 * the journey.
 */
test('the journey runs from landing to the final frame', async ({ page }) => {
  await page.goto('/journey')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(/every journey begins/i)
  await page.getByRole('button', { name: /begin your journey/i }).click()

  // Ten questions; the three interstitial beats between them advance on their
  // own after four seconds, hence the generous visibility timeout.
  for (let q = 1; q <= 10; q++) {
    await expect(page.getByText(`Question ${q} of 10`)).toBeVisible({ timeout: 15_000 })
    await page.locator('button[data-cc-opt]').first().click()
  }

  await expect(page.getByText('YOUR JOURNEY SUMMARY')).toBeVisible({ timeout: 15_000 })
  await expect(page.getByText(/you've travelled 100%/i)).toBeVisible()

  await page.getByRole('button', { name: /see your path/i }).click()
  await expect(page.getByText('YOUR RECOMMENDED PATH')).toBeVisible()
  await expect(page.getByRole('link', { name: /explore this path/i })).toHaveAttribute(
    'href',
    /\/get-involved/,
  )

  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('heading', { name: /what happens next\?/i })).toBeVisible()
})
