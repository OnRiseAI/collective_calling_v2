import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { Footer } from '@/components/layout/Footer'

// The Footer uses the locale-aware Link from "@/i18n/navigation", which reads
// the next-intl context via useLocale(). In a real request that comes from the
// locale layout's NextIntlClientProvider; in jsdom we provide a minimal one so
// Link can resolve, mirroring the Header test.
function renderFooter() {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      <Footer />
    </NextIntlClientProvider>,
  )
}

test('footer carries the design six links, in order', () => {
  renderFooter()
  const nav = screen.getByRole('navigation', { name: /footer/i })
  const labels = ['Impact', 'Stories', 'Events', 'Charity Shops', 'About', 'Contact']
  expect(
    screen.getAllByRole('link').filter((link) => nav.contains(link)).map((link) => link.textContent),
  ).toEqual(labels)
})

test('footer carries the copyright line and the two legal links', () => {
  renderFooter()
  expect(screen.getByText(/© Collective Calling 2026/)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Privacy' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Terms' })).toBeInTheDocument()
})
