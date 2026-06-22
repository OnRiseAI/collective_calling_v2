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
import { donateHubContent } from '@/lib/content/pages/donateHub'
import DonatePage from '@/app/[locale]/donate/page'

// The page renders the locale-aware Link from next-intl, which reads the active
// locale from context. Provide a minimal provider so links resolve under jsdom.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('donateHubContent carries a giving headline in the hero', () => {
  expect(donateHubContent.hero.eyebrow).toBe('Give today')
  expect(donateHubContent.hero.title.toLowerCase()).toMatch(/gift|give|dignity/)
})

test('donateHubContent carries the real 83/17 split', () => {
  expect(donateHubContent.money.programsPct).toBe(83)
  expect(donateHubContent.money.adminPct).toBe(17)
})

test('the page renders exactly one h1 with a giving headline', async () => {
  const ui = await DonatePage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const h1s = screen.getAllByRole('heading', { level: 1 })
  expect(h1s).toHaveLength(1)
  expect(h1s[0]).toHaveTextContent(/gift|give|dignity/i)
})

test('the page embeds the Donorbox giving-41 form', async () => {
  const ui = await DonatePage({ params: Promise.resolve({ locale: 'en' }) })
  const { container } = renderWithLocale(ui)

  const iframe = container.querySelector('iframe')
  expect(iframe).not.toBeNull()
  expect(iframe?.getAttribute('src')).toContain('donorbox.org/embed/giving-41')
})

test('the page renders both the 83% and 17% figures', async () => {
  const ui = await DonatePage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  expect(screen.getAllByText(/83%/).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/17%/).length).toBeGreaterThan(0)
})

test('the page links to the full financial breakdown', async () => {
  const ui = await DonatePage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const links = screen.getAllByRole('link')
  const breakdown = links.find((link) =>
    link.getAttribute('href')?.includes('/about/financial-accountability'),
  )
  expect(breakdown).toBeDefined()
})
