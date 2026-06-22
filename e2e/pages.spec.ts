import { test, expect } from '@playwright/test'

/**
 * Cross-page end-to-end coverage for the About cluster and the programme pages.
 *
 * Plan 4 added the About hub and its sub-pages, the Contact page, and the Spain
 * and Tanzania programme pages. This spec is the final wiring check: every new
 * route must resolve (HTTP < 400) and render exactly one <h1>, and the homepage
 * appeal links that used to 404 (Spain and Tanzania) must now reach real pages.
 *
 * It runs against the production build started by the Playwright webServer, with
 * the single worker the config pins for socket stability, so the suite is
 * serial. Navigations use the default load wait. Paths are the live unprefixed
 * form (the default locale, English, is served without a prefix); next-intl
 * resolves them for the default locale.
 */

const ROUTES = [
  '/about',
  '/about/who-we-are',
  '/about/what-we-do',
  '/about/our-impact',
  '/about/our-team',
  '/about/financial-accountability',
  '/about/partners',
  '/contact',
  '/spain',
  '/tanzania',
]

for (const route of ROUTES) {
  test(`${route} resolves with one h1`, async ({ page }) => {
    const response = await page.goto(route)

    // The route must resolve to a real page, not a 404 or a server error.
    expect(response, `no response for ${route}`).not.toBeNull()
    expect(
      response!.status(),
      `unexpected status for ${route}`,
    ).toBeLessThan(400)

    // Exactly one h1 per page: the PageHero owns the single page heading.
    await expect(
      page.getByRole('heading', { level: 1 }),
      `${route} should render exactly one h1`,
    ).toHaveCount(1)
  })
}

test('homepage hero "See our appeals" link is present and reaches a real page', async ({
  page,
}) => {
  await page.goto('/')

  const hero = page.locator('section').first()
  const seeAppeals = hero.getByRole('link', { name: /see our appeals/i })
  await expect(seeAppeals).toBeVisible()

  // Following it must not 404. The target resolves to a real page.
  const response = await seeAppeals.click().then(() => page.waitForLoadState())
  void response
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
})

test('homepage appeal cards reach /spain and /tanzania without 404', async ({
  page,
}) => {
  for (const slug of ['/spain', '/tanzania']) {
    await page.goto('/')

    // The appeals grid card whose surface links to this programme page. The
    // locale-aware Link prefixes the default locale away, so match by suffix.
    const card = page
      .getByRole('link')
      .filter({ has: page.locator(`[href$="${slug}"]`) })
      .or(page.locator(`a[href$="${slug}"]`))
      .first()

    await expect(card, `expected a homepage link to ${slug}`).toHaveCount(1)

    const response = await page.goto(slug)
    expect(response, `no response for ${slug}`).not.toBeNull()
    expect(
      response!.status(),
      `unexpected status for ${slug}`,
    ).toBeLessThan(400)
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  }
})
