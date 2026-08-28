import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'

// The events page is an async server component that calls setRequestLocale
// from next-intl/server. Under jsdom that server-only API throws, so we
// stub it to a no-op, matching the sibling page tests.
vi.mock('next-intl/server', () => ({
  setRequestLocale: () => {},
}))

// next/navigation is used by next-intl internals and SiteHeader. Use
// importOriginal to pick up everything and only override the pieces that
// would blow up in jsdom.
vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>()
  return {
    ...actual,
    notFound: () => {
      throw new Error('NEXT_NOT_FOUND')
    },
    usePathname: () => '/',
    useParams: () => ({ locale: 'en' }),
    useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  }
})

import EventsPage from '@/app/[locale]/events/page'

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('the events page renders exactly one h1 containing "Events"', async () => {
  const ui = await EventsPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const h1s = screen.getAllByRole('heading', { level: 1 })
  expect(h1s).toHaveLength(1)
  expect(h1s[0]).toHaveTextContent(/events/i)
})

test('the events page shows the empty state and mailing signup', async () => {
  const ui = await EventsPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  expect(screen.getByText('Nothing scheduled right now.')).toBeInTheDocument()
  expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'KEEP ME POSTED' })).toBeInTheDocument()
})
