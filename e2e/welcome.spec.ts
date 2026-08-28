import { test, expect } from '@playwright/test'

/**
 * Welcome gate and editorial pages (Aug 24 design export).
 *
 * The homepage is the default URL. /welcome stays a reachable campaign page.
 */

test.describe('welcome gate', () => {
  test.use({ storageState: { cookies: [], origins: [] } })

  test('a first visit to the homepage is the homepage, not the gate', async ({ page }) => {
    await page.goto('/')
    await expect(page).not.toHaveURL(/welcome/)
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toContainText(/a life/i)
  })

  test('skipping the gate writes the cookie and lands on the homepage', async ({ page }) => {
    await page.goto('/welcome')
    await page.getByRole('link', { name: /skip this experience/i }).click()
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/a life/i)
    const cookies = await page.context().cookies()
    expect(cookies.find((c) => c.name === 'cc_welcomed')?.value).toBe('1')

    // A repeat homepage visit now passes straight through.
    await page.goto('/')
    await expect(page).not.toHaveURL(/welcome/)
  })

  test('the gate card opens the journey', async ({ page }) => {
    await page.goto('/welcome')
    await expect(page.getByRole('link', { name: /begin your journey/i })).toHaveAttribute(
      'href',
      /\/journey$/,
    )
  })

  test('deep links are not gated', async ({ page }) => {
    const response = await page.goto('/stories')
    expect(response?.status()).toBeLessThan(400)
    await expect(page).not.toHaveURL(/welcome/)
  })
})

test.describe('editorial pages', () => {
  const PAGES = [
    { path: '/who-we-are', h1: /every life\s*carries worth\./i },
    { path: '/what-we-do', h1: /where something\s*different can begin\./i },
  ]

  for (const { path, h1 } of PAGES) {
    test(`${path} renders its designed h1 and header`, async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status()).toBeLessThan(400)
      await expect(page.getByRole('heading', { level: 1 })).toContainText(h1)
      // The editorial header carries the wordmark (the global site header
      // deliberately has an empty left slot, so this distinguishes them).
      await expect(
        page.getByRole('link', { name: /collective calling home/i }),
      ).toBeVisible()
      await expect(
        page.locator('header').getByRole('link', { name: /start your journey/i }),
      ).toHaveAttribute('href', /\/journey$/)
    })
  }

  test('the two pages cross-link through the editorial nav', async ({ page }) => {
    await page.goto('/who-we-are')
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'WHAT WE DO' }).click()
    await expect(page).toHaveURL(/\/what-we-do$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/where something/i)
  })
})
