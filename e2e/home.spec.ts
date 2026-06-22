import { test, expect } from '@playwright/test'

/**
 * Homepage end-to-end coverage for the assembled page.
 *
 * These assertions exercise the load-bearing pieces of the homepage: the hero
 * owns the single page h1 and the gold-led Donate action, the testimonials
 * carousel advances on Next, and the donate widget swaps its tiers when the
 * frequency toggle changes. They run against the production build started by the
 * Playwright webServer, so they reflect what ships.
 */

test('hero renders the page h1 headline', async ({ page }) => {
  await page.goto('/')

  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()
  await expect(h1).toContainText(/answer the call/i)
})

test('hero Donate CTA targets the donate route or Donorbox', async ({
  page,
}) => {
  await page.goto('/')

  // The hero is the first section; scope the Donate link to it so we do not
  // pick up the donate widget's action lower on the page.
  const hero = page.locator('section').first()
  const donate = hero.getByRole('link', { name: /^donate$/i })

  await expect(donate).toBeVisible()
  const href = await donate.getAttribute('href')
  expect(href).toBeTruthy()
  expect(href).toMatch(/\/donate(\/|$|\?)|donorbox\.org/i)
})

test('testimonials Next button advances the visible quote', async ({
  page,
}) => {
  await page.goto('/')

  const next = page.getByRole('button', { name: /next testimonial/i })
  await expect(next).toBeVisible()

  const quote = page.locator('blockquote').first()
  const before = (await quote.textContent())?.trim()
  expect(before).toBeTruthy()

  await next.click()

  // The quote text should change once the carousel advances.
  await expect(quote).not.toHaveText(before as string)
})

test('donate widget Monthly/Once toggle switches the rendered tiers', async ({
  page,
}) => {
  await page.goto('/')

  const amounts = page.getByRole('radiogroup', { name: /donation amount/i })
  await amounts.scrollIntoViewIfNeeded()

  // Monthly is the default interval. Its tiers are €15 / €30 / €58.
  await expect(amounts.getByText('€58', { exact: true })).toBeVisible()
  await expect(amounts.getByText('€100', { exact: true })).toHaveCount(0)

  // Switch to Once. Its tiers are €25 / €50 / €100.
  await page.getByRole('radio', { name: /^once$/i }).click()

  await expect(amounts.getByText('€100', { exact: true })).toBeVisible()
  await expect(amounts.getByText('€58', { exact: true })).toHaveCount(0)
})
