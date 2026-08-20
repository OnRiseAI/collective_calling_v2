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
import { partnersContent } from '@/lib/content/pages/partners'
import { PartnerList } from '@/components/page/PartnerList'
import OurPartnersPage from '@/app/[locale]/(site)/about/partners/page'

// The page and PartnerList render the locale-aware Link from next-intl and
// next/image, which read the active locale from context. Provide a minimal
// provider so anything that resolves a link or locale works under jsdom.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('partnersContent carries the page h1 naming Partners', () => {
  expect(partnersContent.hero.title).toContain('Partners')
})

test('partnersContent lists the real partners with source names', () => {
  const names = partnersContent.partners.map((p) => p.name)
  for (const name of ['Drumelia Real Estate', 'Sana Catering', 'Spence Clarke']) {
    expect(names).toContain(name)
  }
})

test('PartnerList renders each partner name as an h3 (no second h1)', () => {
  renderWithLocale(<PartnerList partners={partnersContent.partners} />)

  for (const name of ['Drumelia Real Estate', 'Sana Catering', 'Spence Clarke']) {
    const heading = screen.getByRole('heading', { name })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H3')
  }

  expect(screen.queryByRole('heading', { level: 1 })).toBeNull()
})

test('the page renders an h1 containing "Partners"', async () => {
  const ui = await OurPartnersPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const h1 = screen.getByRole('heading', { level: 1 })
  expect(h1).toHaveTextContent('Partners')
})

test('the page renders at least three named partners', async () => {
  const ui = await OurPartnersPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  for (const name of ['Drumelia Real Estate', 'Sana Catering', 'Spence Clarke']) {
    expect(screen.getByRole('heading', { name })).toBeInTheDocument()
  }
})

test('the page mentions the accountability bodies', async () => {
  const ui = await OurPartnersPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  expect(screen.getByText(/Rotary Club Guadalmina Marbella/)).toBeInTheDocument()
  expect(screen.getByText(/Ayuntamiento de Marbella/)).toBeInTheDocument()
})

test('the page renders a Donate link pointing at the donate route', async () => {
  const ui = await OurPartnersPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const donateLinks = screen.getAllByRole('link', { name: /donate/i })
  expect(donateLinks.length).toBeGreaterThan(0)
  for (const donate of donateLinks) {
    expect(donate.getAttribute('href')).toContain('/donate')
  }
})
