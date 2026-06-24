import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { FaithBand } from '@/components/home/FaithBand'

// FaithBand uses the locale-aware Link from next-intl; provide a minimal
// provider so its link resolves to a real href.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('renders the faith heading', () => {
  renderWithLocale(<FaithBand />)
  // noOrphan glues the last two words with a non-breaking space, so match
  // "loved" and "us" across any whitespace (\s includes U+00A0).
  expect(
    screen.getByRole('heading', { name: /because he first loved\s+us/i }),
  ).toBeInTheDocument()
})

test('names the Christian motivation and Jesus', () => {
  renderWithLocale(<FaithBand />)
  expect(screen.getByText(/Christian charity/i)).toBeInTheDocument()
  expect(screen.getByText(/follow Jesus/i)).toBeInTheDocument()
})

test('cites the scripture reference', () => {
  renderWithLocale(<FaithBand />)
  expect(screen.getByText(/1 John 4:19/)).toBeInTheDocument()
})

test('links to the who-we-are page', () => {
  renderWithLocale(<FaithBand />)
  const link = screen.getByRole('link', { name: /who we are/i })
  expect(link).toHaveAttribute('href', expect.stringContaining('/about/who-we-are'))
})
