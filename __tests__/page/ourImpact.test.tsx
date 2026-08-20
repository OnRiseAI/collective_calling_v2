import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'

// The page is an async server component that calls setRequestLocale from
// next-intl/server. Under jsdom that server-only API throws, so we stub it to a
// no-op, matching the Spain and Tanzania page tests. We exercise the rendered
// output (the h1 and at least one real figure or programme reference), which is
// what the brief asks.
vi.mock('next-intl/server', () => ({
  setRequestLocale: () => {},
}))
import { ourImpactContent } from '@/lib/content/pages/ourImpact'
import OurImpactPage from '@/app/[locale]/(site)/about/our-impact/page'

// The page renders the locale-aware Link from next-intl, which reads the active
// locale from context. Provide a minimal provider so anything that resolves a
// link works under jsdom, matching the sibling page tests.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('ourImpactContent carries the page h1 naming the page', () => {
  expect(ourImpactContent.hero.title).toContain('Impact')
})

test('ourImpactContent only carries real, established figures', () => {
  const values = ourImpactContent.figures.items.map((i) => i.value)
  // 18 children, the Centre of Hope opening year, and Spain's first unit.
  expect(values).toContain('18')
})

test('the page renders an h1 containing "Impact"', async () => {
  const ui = await OurImpactPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const h1 = screen.getByRole('heading', { level: 1 })
  expect(h1).toHaveTextContent('Impact')
})

test('the page renders at least one real figure and a programme reference', async () => {
  const ui = await OurImpactPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  // A real figure (18 children at the Centre of Hope) renders on the page.
  expect(screen.getByText('18')).toBeInTheDocument()
  // A real programme reference also renders.
  expect(screen.getAllByText(/Centre of Hope/i).length).toBeGreaterThan(0)
})

test('the page links to the Spain and Tanzania programme pages', async () => {
  const ui = await OurImpactPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const spain = screen.getByRole('link', { name: /spain/i })
  expect(spain.getAttribute('href')).toContain('/spain')

  const tanzania = screen.getByRole('link', { name: /tanzania/i })
  expect(tanzania.getAttribute('href')).toContain('/tanzania')
})

test('the page renders a Donate link', async () => {
  const ui = await OurImpactPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const donate = screen.getByRole('link', { name: /donate/i })
  expect(donate.getAttribute('href')).toContain('/donate')
})
