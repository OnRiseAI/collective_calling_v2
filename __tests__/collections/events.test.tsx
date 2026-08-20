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

// Mock the events read layer so tests never touch Sanity or real I/O.
vi.mock('@/lib/content/events', () => ({
  getEvents: async () => [
    {
      slug: 'annual-gala',
      title: 'Annual Gala',
      summary:
        'Our flagship fundraising evening, bringing together supporters of Collective Calling for a night of inspiration, celebration, and generous giving.',
      image: '/images/gala-poster.jpeg',
      alt: 'Poster for the Collective Calling Annual Gala.',
      // dateLabel intentionally absent
    },
    {
      slug: 'spring-fair',
      title: 'Spring Fair',
      summary:
        'A family-friendly community fair raising funds for our work in Spain and Tanzania.',
      // dateLabel intentionally absent
      placeholder: true,
    },
    {
      slug: 'lunch-with-santa',
      title: 'Lunch with Santa',
      summary:
        'A festive fundraising lunch for families and children, celebrating Christmas while supporting the children and families Collective Calling serves.',
      // dateLabel intentionally absent
      placeholder: true,
    },
  ],
}))

// next/navigation is used by next-intl internals. Use importOriginal to
// pick up everything and only override the pieces that would blow up in jsdom.
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

import EventsPage from '@/app/[locale]/(site)/events/page'

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

test('the events page renders all three event titles', async () => {
  const ui = await EventsPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  expect(screen.getByText('Annual Gala')).toBeInTheDocument()
  expect(screen.getByText('Spring Fair')).toBeInTheDocument()
  expect(screen.getByText('Lunch with Santa')).toBeInTheDocument()
})

test('"Date to be announced" appears for an event without a dateLabel', async () => {
  const ui = await EventsPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const pills = screen.getAllByText('Date to be announced')
  expect(pills.length).toBeGreaterThan(0)
})
