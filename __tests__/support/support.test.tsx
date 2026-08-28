import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'

vi.mock('next-intl/server', () => ({
  setRequestLocale: () => {},
}))

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>()
  return {
    ...actual,
    usePathname: () => '/support',
    useParams: () => ({ locale: 'en' }),
    useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  }
})

import SupportPage from '@/app/[locale]/support/page'

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('the support page renders exactly one h1', async () => {
  const ui = await SupportPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const h1s = screen.getAllByRole('heading', { level: 1 })
  expect(h1s).toHaveLength(1)
  expect(h1s[0]).toHaveTextContent(/support\s*our work/i)
})

test('the donate control points at Donorbox', async () => {
  const ui = await SupportPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const donate = screen.getByRole('link', { name: /donate securely/i })
  expect(donate).toHaveAttribute('href', expect.stringContaining('donorbox.org'))
})

test('the support page carries the site wordmark', async () => {
  const ui = await SupportPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  expect(screen.getByRole('link', { name: /collective calling home/i })).toBeInTheDocument()
})
