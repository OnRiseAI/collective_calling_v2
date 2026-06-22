import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'

// The page is an async server component that calls setRequestLocale from
// next-intl/server. Under jsdom that server-only API throws, so we stub it to a
// no-op, matching the Spain and What We Do page tests. We exercise the rendered
// output (h1, the Centre of Hope facts, the Donate/Sponsor link), which is what
// the brief asks.
vi.mock('next-intl/server', () => ({
  setRequestLocale: () => {},
}))
import { tanzaniaContent } from '@/lib/content/pages/tanzania'
import TanzaniaPage from '@/app/[locale]/tanzania/page'

// The page renders the locale-aware Link from next-intl, which reads the active
// locale from context. Provide a minimal provider so links resolve under jsdom,
// matching the sibling page tests.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('tanzaniaContent carries the page h1 and the Centre of Hope facts', () => {
  // The hero title is the only h1 and must name the page.
  expect(tanzaniaContent.hero.title).toContain('Tanzania')

  // The Centre of Hope and the count of children cared for are present.
  const centreText = tanzaniaContent.centre.body.join(' ')
  expect(centreText).toContain('Centre of Hope')
  expect(centreText).toContain('18')
  expect(centreText).toContain('Kasulu')
})

test('the page renders an h1 containing "Tanzania"', async () => {
  const ui = await TanzaniaPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const h1 = screen.getByRole('heading', { level: 1 })
  expect(h1).toHaveTextContent('Tanzania')
})

test('the page mentions the Centre of Hope and the 18 children', async () => {
  const ui = await TanzaniaPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  expect(screen.getAllByText(/Centre of Hope/i).length).toBeGreaterThan(0)
  expect(screen.getByText(/18 children/i)).toBeInTheDocument()
})

test('the page renders a Donate or Sponsor link', async () => {
  const ui = await TanzaniaPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const donate = screen.getByRole('link', { name: /donate|sponsor/i })
  expect(donate.getAttribute('href')).toContain('/donate')
})
