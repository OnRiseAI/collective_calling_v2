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
import { financialsContent } from '@/lib/content/pages/financials'
import FinancialAccountabilityPage from '@/app/[locale]/about/financial-accountability/page'

// The page renders the locale-aware Link from next-intl, which reads the active
// locale from context. Provide a minimal provider so links resolve under jsdom.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('financialsContent carries the page h1 naming the page', () => {
  expect(financialsContent.hero.title).toContain('Financial')
})

test('financialsContent carries the real 83/17 split', () => {
  expect(financialsContent.money.programsPct).toBe(83)
  expect(financialsContent.money.adminPct).toBe(17)
})

test('financialsContent carries the registration line with 611.510', () => {
  expect(financialsContent.registration).toContain('611.510')
})

test('the page renders an h1 containing "Financial"', async () => {
  const ui = await FinancialAccountabilityPage({
    params: Promise.resolve({ locale: 'en' }),
  })
  renderWithLocale(ui)

  const h1 = screen.getByRole('heading', { level: 1 })
  expect(h1).toHaveTextContent('Financial')
})

test('the page renders both the 83% and 17% figures', async () => {
  const ui = await FinancialAccountabilityPage({
    params: Promise.resolve({ locale: 'en' }),
  })
  renderWithLocale(ui)

  expect(screen.getAllByText(/83%/).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/17%/).length).toBeGreaterThan(0)
})

test('the page renders the registration string containing 611.510', async () => {
  const ui = await FinancialAccountabilityPage({
    params: Promise.resolve({ locale: 'en' }),
  })
  renderWithLocale(ui)

  expect(screen.getByText(/611\.510/)).toBeInTheDocument()
})

test('the page renders a Donate link', async () => {
  const ui = await FinancialAccountabilityPage({
    params: Promise.resolve({ locale: 'en' }),
  })
  renderWithLocale(ui)

  // WhereMoneyGoes contributes its own Donate action and the page closes with a
  // second one, so there are two Donate links. Both must point at the donate
  // route.
  const donateLinks = screen.getAllByRole('link', { name: /donate/i })
  expect(donateLinks.length).toBeGreaterThan(0)
  for (const donate of donateLinks) {
    expect(donate.getAttribute('href')).toContain('/donate')
  }
})
