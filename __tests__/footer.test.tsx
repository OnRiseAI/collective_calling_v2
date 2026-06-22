import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { Footer } from '@/components/layout/Footer'

// The Footer uses the locale-aware Link from "@/i18n/navigation" for its
// internal links and Donate CTA. Link reads the next-intl context via
// useLocale(), which in a real request comes from the locale layout's
// NextIntlClientProvider. In jsdom we provide a minimal provider (locale only,
// no messages needed) so Link can resolve, mirroring the Header test.
function renderFooter() {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      <Footer />
    </NextIntlClientProvider>,
  )
}

test('footer shows registration and a donate CTA', () => {
  renderFooter()
  expect(screen.getByText(/611\.510/)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /^donate/i })).toBeInTheDocument()
})
