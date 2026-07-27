import { test, expect } from '@playwright/test'

/**
 * Homepage end-to-end coverage for the v2 design: the hero owns the h1 over a
 * full-height photograph with the header laid over it, the three expressions
 * link out, the impact figures actually count up in a real browser, and the
 * closing band reaches the charity shops page.
 */

test('hero renders the v2 headline as the page h1', async ({ page }) => {
  await page.goto('/')
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()
  await expect(h1).toContainText(/a life/i)
  await expect(h1).toContainText(/beyond\sourselves\./i)
})

test('the header sits over the hero on the homepage and is solid elsewhere', async ({ page }) => {
  await page.goto('/')
  const header = page.locator('header').first()
  await expect(header).toHaveCSS('position', 'absolute')

  await page.goto('/stories')
  await expect(page.locator('header').first()).toHaveCSS('position', 'sticky')
})

test('hero CTAs open the journey and the stories', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: /start your journey/i }).first()).toHaveAttribute(
    'href',
    /\/get-involved$/,
  )
  await expect(page.getByRole('link', { name: /see what's possible/i })).toHaveAttribute(
    'href',
    /\/stories$/,
  )
})

test('the three expressions link to their pages', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: /see their stories/i })).toHaveAttribute(
    'href',
    /\/tanzania$/,
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

test('impact figures count up to their final values on scroll', async ({ page }) => {
  await page.goto('/')
  const label = page.getByText('People supported')
  await label.scrollIntoViewIfNeeded()
  // The figure is drawn beside its label; the count settles well inside 1.4s.
  const figure = page.locator('dl div', { has: label }).locator('dd span[aria-hidden="true"]')
  await expect(figure).toHaveText('10,000+', { timeout: 5000 })
})

test('the closing band reaches the charity shops page', async ({ page }) => {
  await page.goto('/')
  const shops = page.getByRole('link', { name: /visit our charity shops/i })
  await shops.scrollIntoViewIfNeeded()
  await expect(shops).toHaveAttribute('href', /\/charity-shops$/)
  await shops.click()
  await page.waitForLoadState()
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/charity\sshops/i)
})
