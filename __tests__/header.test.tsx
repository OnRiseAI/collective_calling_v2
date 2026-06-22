import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { Header } from '@/components/layout/Header'

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

test('header shows top-level nav and a Donate CTA', () => {
  renderHeader()
  expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /^donate$/i })).toBeInTheDocument()
})

test('header exposes all four top-level section links', () => {
  renderHeader()
  expect(screen.getByRole('link', { name: /^appeals$/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /^stories$/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /get involved/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument()
})

test('header has an accessible search affordance and a mobile menu toggle', () => {
  renderHeader()
  expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  const toggle = screen.getByRole('button', { name: /menu/i })
  expect(toggle).toHaveAttribute('aria-expanded', 'false')
})
