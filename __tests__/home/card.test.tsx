import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { Card } from '@/components/ui/Card'

// The Card renders the locale-aware Link from next-intl, which reads the active
// locale from context. Provide a minimal provider so the link resolves.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('renders a linked card with its title pointing at the href', () => {
  renderWithLocale(<Card title="Appeals" href="/appeals" />)
  const link = screen.getByRole('link', { name: /appeals/i })
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute('href', expect.stringContaining('/appeals'))
  expect(screen.getByText('Appeals')).toBeInTheDocument()
})
