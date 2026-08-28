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
    usePathname: () => '/events/fashion-show',
    useParams: () => ({ locale: 'en' }),
    useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  }
})

import FashionShowPage from '@/app/[locale]/events/fashion-show/page'

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('the fashion show page renders exactly one h1', async () => {
  const ui = await FashionShowPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const h1s = screen.getAllByRole('heading', { level: 1 })
  expect(h1s).toHaveLength(1)
  expect(h1s[0]).toHaveTextContent(/the fashion show/i)
})

test('the fashion show page has a reservation mailto and no mock TBC brackets', async () => {
  const ui = await FashionShowPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const reserve = screen.getAllByRole('link', { name: /reserve your place/i })[0]
  expect(reserve).toHaveAttribute('href', expect.stringMatching(/^mailto:info@collectivecalling\.org/))
  expect(document.body.textContent).not.toMatch(/\[TBC\]/)
  expect(document.body.textContent).not.toMatch(/\[programme TBC\]/)
})
