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
import { sponsorChildContent } from '@/lib/content/pages/sponsorChild'
import SponsorChildPage from '@/app/[locale]/(site)/get-involved/sponsor-a-child/page'

// The page renders the locale-aware Link from next-intl, which reads the active
// locale from context. Provide a minimal provider so links resolve under jsdom.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('sponsorChildContent carries the Sponsor a child hero and the 58 euro price', () => {
  expect(sponsorChildContent.hero.title.toLowerCase()).toContain('sponsor')
  expect(JSON.stringify(sponsorChildContent)).toContain('58')
})

test('the page renders exactly one h1 that mentions Sponsor', async () => {
  const ui = await SponsorChildPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const h1s = screen.getAllByRole('heading', { level: 1 })
  expect(h1s).toHaveLength(1)
  expect(h1s[0]).toHaveTextContent(/sponsor/i)
})

test('the page renders the 58 euro price and the Centre of Hope', async () => {
  const ui = await SponsorChildPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  expect(document.body.textContent).toContain('58')
  expect(document.body.textContent).toContain('Centre of Hope')
})

test('the DonorboxEmbed iframe presets the sponsorship amount and recurring', async () => {
  const ui = await SponsorChildPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const frame = screen.getByTitle(/sponsor/i)
  expect(frame.tagName).toBe('IFRAME')
  const src = frame.getAttribute('src') ?? ''
  expect(src).toContain('amount=58')
  expect(src).toContain('recurring=true')
})
