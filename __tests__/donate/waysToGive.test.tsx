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
import { waysToGiveContent } from '@/lib/content/pages/waysToGive'
import WaysToGivePage from '@/app/[locale]/(site)/donate/ways-to-give/page'

// The page renders the locale-aware Link from next-intl, which reads the active
// locale from context. Provide a minimal provider so links resolve under jsdom.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('waysToGiveContent carries the Ways to give hero', () => {
  expect(waysToGiveContent.hero.title.toLowerCase()).toContain('ways to give')
})

test('the page renders exactly one h1 containing "Ways to Give"', async () => {
  const ui = await WaysToGivePage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const h1s = screen.getAllByRole('heading', { level: 1 })
  expect(h1s).toHaveLength(1)
  expect(h1s[0]).toHaveTextContent(/ways to give/i)
})

test('the "Sponsor a child" item links to /get-involved/sponsor-a-child', async () => {
  const ui = await WaysToGivePage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const links = screen.getAllByRole('link')
  const sponsor = links.find((link) =>
    link.getAttribute('href')?.includes('/get-involved/sponsor-a-child'),
  )
  expect(sponsor).toBeDefined()
})

test('a "Give once or monthly" item links to /donate', async () => {
  const ui = await WaysToGivePage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  // The card for giving once or monthly is present as a card heading (h3)...
  const giveHeading = screen
    .getAllByRole('heading', { level: 3 })
    .find((heading) => /give once or monthly/i.test(heading.textContent ?? ''))
  expect(giveHeading).toBeDefined()

  // ...and at least one link targets the donate hub.
  const links = screen.getAllByRole('link')
  const donate = links.find((link) => link.getAttribute('href')?.endsWith('/donate'))
  expect(donate).toBeDefined()
})
