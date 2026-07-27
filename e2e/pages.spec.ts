import { test, expect } from '@playwright/test'
import { NAV_SECTIONS, DONATE_HREF } from '../lib/nav'

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
  // Plan 5 donate cluster. Ways to Give has no external embed, so it is fine
  // under the default load wait alongside the rest of the cluster.
  '/donate/ways-to-give',
  // Plan 6 new routes: stories, appeals, events, get-involved cluster.
  '/stories',
  '/stories/caleb',
  '/appeals',
  '/appeals/spain-homelessness',
  '/events',
  '/get-involved',
  '/get-involved/fundraise',
  '/get-involved/pray',
  '/get-involved/partner',
  '/get-involved/invite-us-to-speak',
]

/**
 * Plan 5 donate routes that embed a live Donorbox iframe (donorbox.org).
 *
 * The Donorbox iframe is a slow third-party resource, the same class of issue as
 * the Sanity image load-event stall documented in playwright.config. Waiting for
 * the default "load" event would block on that external frame and time out, so
 * these routes are navigated with waitUntil: 'domcontentloaded'. We assert the
 * page itself rendered (status < 400, one h1) and, on /donate, that the iframe
 * element is attached to the DOM, without ever waiting for the iframe to load.
 *
 * Plan 6 adds /appeals/sponsor-a-child: the appeal detail page for child
 * sponsorship embeds the Donorbox giving-41 form (same form, sponsor-a-child
 * designation preset) so it belongs here alongside /get-involved/sponsor-a-child.
 */
const DONORBOX_ROUTES = [
  '/donate',
  '/get-involved/sponsor-a-child',
  '/appeals/sponsor-a-child',
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

for (const route of DONORBOX_ROUTES) {
  test(`${route} resolves with one h1 (Donorbox embed, domcontentloaded)`, async ({
    page,
  }) => {
    // domcontentloaded only: do not wait for the external Donorbox iframe to
    // load, which would time out the navigation.
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' })

    expect(response, `no response for ${route}`).not.toBeNull()
    expect(
      response!.status(),
      `unexpected status for ${route}`,
    ).toBeLessThan(400)

    await expect(
      page.getByRole('heading', { level: 1 }),
      `${route} should render exactly one h1`,
    ).toHaveCount(1)
  })
}

test('/donate embeds the Donorbox giving-41 iframe element', async ({ page }) => {
  // domcontentloaded so we never block on the external Donorbox frame. We only
  // assert the iframe element is present in the DOM, not that its contents have
  // loaded, so no iframe-load wait is involved.
  await page.goto('/donate', { waitUntil: 'domcontentloaded' })

  const donorbox = page.locator('iframe[src*="donorbox.org/embed/giving-41"]')
  await expect(donorbox).toHaveCount(1)
})

test('/appeals/sponsor-a-child embeds the Donorbox giving-41 iframe element', async ({
  page,
}) => {
  // domcontentloaded only: do not wait for the external Donorbox iframe to
  // load, which would time out the navigation. We only assert the iframe
  // element is attached to the DOM.
  await page.goto('/appeals/sponsor-a-child', { waitUntil: 'domcontentloaded' })

  const donorbox = page.locator('iframe[src*="donorbox.org/embed/giving-41"]')
  await expect(donorbox).toHaveCount(1)
})

// The v2 design puts no Donate link on the homepage — its header CTA is "Get
// Involved →" and its footer carries no ask. Donate is reached from the mobile
// panel and the Get Involved journey instead. What this test still guards is
// the destination itself, which was a 404 once.
test('/donate resolves and is reachable from the mobile panel', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: /^menu$/i }).click()
  const panel = page.getByRole('dialog', { name: /site menu/i })
  await expect(panel.locator('a[href$="/donate"]').first()).toBeVisible()

  // The destination reaches a real page (not the old 404). domcontentloaded
  // because /donate embeds the Donorbox iframe.
  const response = await page.goto('/donate', { waitUntil: 'domcontentloaded' })
  expect(response, 'no response for /donate').not.toBeNull()
  expect(response!.status(), 'unexpected status for /donate').toBeLessThan(400)
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
})

test('homepage "View all stories" link reaches a real page', async ({
  page,
}) => {
  await page.goto('/')

  const storiesLink = page.getByRole('link', { name: /view all stories/i })
  await storiesLink.scrollIntoViewIfNeeded()
  await expect(storiesLink).toBeVisible()

  // Following it must not 404. The target resolves to a real page.
  await storiesLink.click()
  await page.waitForLoadState()
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

/**
 * Nav-resolution check (Plan 6).
 *
 * Every internal href in NAV_SECTIONS and DONATE_HREF must resolve to a real
 * page (HTTP < 400). The previously-404 targets -- /appeals, /stories,
 * /get-involved, /events, /get-involved/fundraise,
 * /get-involved/invite-us-to-speak, /get-involved/pray, /get-involved/partner
 * -- are now built pages and must no longer 404.
 *
 * /get-involved/sponsor-a-child embeds the Donorbox iframe so we navigate it
 * with domcontentloaded to avoid blocking on the external frame. All other
 * internal links use the default load wait.
 *
 * External links (http/https), mailto, and tel hrefs are skipped -- they are
 * not in-app routes and would require network or device access.
 */
const DONORBOX_NAV_HREFS = new Set(['/get-involved/sponsor-a-child'])

// Collect every unique internal href from the nav (section tops + items) and
// the persistent donate link.
const ALL_NAV_HREFS: string[] = [
  ...NAV_SECTIONS.flatMap((section) => [
    section.href,
    ...section.items.map((item) => item.href),
  ]),
  DONATE_HREF,
].filter((href, index, arr) => {
  // Deduplicate and keep only internal paths (no protocol, no mailto/tel).
  return (
    arr.indexOf(href) === index &&
    href.startsWith('/') &&
    !href.startsWith('//')
  )
})

for (const href of ALL_NAV_HREFS) {
  const isDonorbox = DONORBOX_NAV_HREFS.has(href)
  test(`nav href ${href} resolves without 404`, async ({ page }) => {
    const waitUntil = isDonorbox
      ? ({ waitUntil: 'domcontentloaded' } as const)
      : undefined
    const response = await page.goto(href, waitUntil)

    expect(response, `no response for nav href ${href}`).not.toBeNull()
    expect(
      response!.status(),
      `nav href ${href} returned a 4xx/5xx`,
    ).toBeLessThan(400)
  })
}
