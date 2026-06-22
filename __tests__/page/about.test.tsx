import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'

// The page is an async server component that calls setRequestLocale from
// next-intl/server. Under jsdom that server-only API throws, so we stub it to a
// no-op, matching the sibling page tests.
vi.mock('next-intl/server', () => ({
  setRequestLocale: () => {},
}))
import { aboutContent } from '@/lib/content/pages/about'
import { SubNavCards } from '@/components/page/SubNavCards'
import AboutPage from '@/app/[locale]/about/page'

// The page and SubNavCards render the locale-aware Link from next-intl, which
// reads the active locale from context. Provide a minimal provider so anything
// that resolves a link or locale works under jsdom.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

const HUB_TARGETS = [
  '/about/who-we-are',
  '/about/what-we-do',
  '/about/our-impact',
  '/about/our-team',
  '/about/financial-accountability',
  '/about/partners',
  '/contact',
]

test('aboutContent overview names the mission and the 2017 founding', () => {
  const overview = aboutContent.overview.body.join(' ').toLowerCase()
  expect(overview).toContain('2017')
  expect(overview).toContain('spain')
  expect(overview).toContain('tanzania')
})

test('aboutContent sub-nav routes to every About cluster page', () => {
  const hrefs = aboutContent.subNav.cards.map((c) => c.href)
  expect(hrefs).toEqual(HUB_TARGETS)
})

test('SubNavCards renders each title as an h3 (no second h1)', () => {
  renderWithLocale(<SubNavCards cards={aboutContent.subNav.cards} />)

  const whoWeAre = screen.getByRole('heading', { name: 'Who We Are' })
  expect(whoWeAre.tagName).toBe('H3')

  expect(screen.queryByRole('heading', { level: 1 })).toBeNull()
})

test('the page renders an h1 containing "About"', async () => {
  const ui = await AboutPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const h1 = screen.getByRole('heading', { level: 1 })
  expect(h1).toHaveTextContent('About')
})

test('the page SubNavCards link to Who We Are, Our Team, and Contact', async () => {
  const ui = await AboutPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  // The cards render through the locale-aware Link, which prefixes the active
  // locale, so we match by suffix (the convention across the home card tests).
  const wanted = ['/about/who-we-are', '/about/our-team', '/contact']
  for (const href of wanted) {
    const link = screen
      .getAllByRole('link')
      .find((a) => (a.getAttribute('href') ?? '').endsWith(href))
    expect(link, `expected a SubNavCards link to ${href}`).toBeDefined()
  }
})

test('the page renders a Donate link pointing at the donate route', async () => {
  const ui = await AboutPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const donateLinks = screen.getAllByRole('link', { name: /donate/i })
  expect(donateLinks.length).toBeGreaterThan(0)
  for (const donate of donateLinks) {
    expect(donate.getAttribute('href')).toContain('/donate')
  }
})
