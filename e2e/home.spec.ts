import { test, expect } from '@playwright/test'

/**
 * Homepage end-to-end coverage for the mockup-theme page: the hero owns the h1
 * with the gold accent word, its CTAs route to real pages, the three ways cards
 * link out, the snapshot stats render, and the involve band routes donate,
 * volunteer, partner, and the charity shops page.
 */

test('hero renders the mockup headline as the page h1', async ({ page }) => {
  await page.goto('/')
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()
  // \s* between words: the headline words render as stacked block spans, so
  // the text content may carry no whitespace between them.
  await expect(h1).toContainText(/where\s*values\s*become/i)
  await expect(h1).toContainText(/visible\./i)
})

test('hero CTAs route to impact and Values in Action', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: /explore our impact/i })).toHaveAttribute(
    'href',
    /\/about\/our-impact$/,
  )
  await expect(page.getByRole('link', { name: /discover values in action/i })).toHaveAttribute(
    'href',
    /\/get-involved\/partner$/,
  )
})

test('three ways cards link to their routes', async ({ page }) => {
  await page.goto('/')
  const learnMore = page.getByRole('link', { name: /learn more/i })
  await expect(learnMore).toHaveCount(3)
  await expect(learnMore.nth(0)).toHaveAttribute('href', /\/spain$/)
  await expect(learnMore.nth(1)).toHaveAttribute('href', /\/tanzania$/)
  await expect(learnMore.nth(2)).toHaveAttribute('href', /\/get-involved\/partner$/)
})

test('impact snapshot renders the five stats', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('10,000+')).toBeVisible()
  await expect(page.getByText('People Supported')).toBeVisible()
  await expect(page.getByText('Business Partners')).toBeVisible()
})

test('involve band routes to the charity shops page', async ({ page }) => {
  await page.goto('/')
  const shops = page.getByRole('link', { name: /find out more/i })
  await shops.scrollIntoViewIfNeeded()
  await expect(shops).toHaveAttribute('href', /\/charity-shops$/)
  await shops.click()
  await page.waitForLoadState()
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/charity\sshops/i)
})
