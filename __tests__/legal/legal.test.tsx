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
    usePathname: () => '/privacy',
    useParams: () => ({ locale: 'en' }),
    useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  }
})

import PrivacyPage from '@/app/[locale]/privacy/page'
import TermsPage from '@/app/[locale]/terms/page'

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('privacy renders one h1 and the charity identity', async () => {
  const ui = await PrivacyPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/privacy/i)
  expect(document.body.textContent).toMatch(/G93524130/)
  expect(document.body.textContent).toMatch(/cc_welcomed/)
  expect(
    screen.getAllByRole('link', { name: /info@collectivecalling\.org/i }).length,
  ).toBeGreaterThan(0)
})

test('terms renders one h1 and links to privacy', async () => {
  const ui = await TermsPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/terms/i)
  const privacy = screen.getAllByRole('link', { name: 'Privacy' })
  expect(privacy[0]).toHaveAttribute('href', expect.stringMatching(/\/privacy$/))
})
