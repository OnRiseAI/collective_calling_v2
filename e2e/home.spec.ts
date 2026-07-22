import { test, expect } from '@playwright/test'

/**
 * Homepage end-to-end coverage for the experience-led journey page: the hero
 * owns the h1 and its CTAs are in-page anchors; the three expressions link to
 * their real routes; the invitation routes to /get-involved; the journey rail
 * exists on desktop and not on mobile.
 */

test('hero renders the client headline as the page h1', async ({ page }) => {
  await page.goto('/')
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()
  // \s (not a literal space) before the final word: noOrphan glues the last
  // two words of every headline with a non-breaking space.
  await expect(h1).toContainText(/a life beyond\sourselves/i)
})

test('primary CTA walks the reader to the participation chapter', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /start your journey/i }).first().click()
  await expect(page.locator('section#participation')).toBeInViewport()
})

test('the three expressions link to their routes', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: /see their stories/i })).toHaveAttribute(
    'href',
    /\/stories$/,
  )
  await expect(page.getByRole('link', { name: /explore community impact/i })).toHaveAttribute(
    'href',
    /\/spain$/,
  )
  await expect(page.getByRole('link', { name: /explore values in action/i })).toHaveAttribute(
    'href',
    /\/get-involved\/partner$/,
  )
})

test('journey rail shows on desktop and hides on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await expect(page.getByRole('navigation', { name: /journey/i })).toBeVisible()

  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.getByRole('navigation', { name: /journey/i })).toBeHidden()
})

test('invitation chapter routes to get-involved', async ({ page }) => {
  await page.goto('/')
  const invitation = page.locator('section#participation')
  await invitation.scrollIntoViewIfNeeded()
  await expect(invitation.getByRole('link', { name: /start your journey/i })).toHaveAttribute(
    'href',
    /\/get-involved$/,
  )
})
