import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { Header } from '@/components/layout/Header'
import { NAV_SECTIONS } from '@/lib/nav'

// The Header uses locale-aware Link from "@/i18n/navigation", which reads the
// next-intl context via useLocale(). In a real request that context comes from
// the locale layout's NextIntlClientProvider. In the jsdom test we provide a
// minimal provider (locale only, no messages needed) so Link can resolve.
function renderHeader() {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      <Header />
    </NextIntlClientProvider>,
  )
}

test('header shows every top-level section link flat (mockup nav)', () => {
  renderHeader()
  for (const section of NAV_SECTIONS) {
    expect(
      screen.getAllByRole('link', { name: new RegExp(`^${section.label}$`, 'i') }).length,
    ).toBeGreaterThan(0)
  }
})

test('header CTA is Get Involved, not Donate', () => {
  renderHeader()
  expect(screen.getByRole('link', { name: /get involved/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/get-involved$/),
  )
  expect(screen.queryByRole('link', { name: /^donate$/i })).not.toBeInTheDocument()
})

test('header has a mobile menu toggle', () => {
  renderHeader()
  const toggle = screen.getByRole('button', { name: /menu/i })
  expect(toggle).toHaveAttribute('aria-expanded', 'false')
})
