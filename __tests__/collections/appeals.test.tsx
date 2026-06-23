import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'

// The pages are async server components that call setRequestLocale from
// next-intl/server. Under jsdom that server-only API throws, so we stub it
// to a no-op, matching the sibling page tests.
vi.mock('next-intl/server', () => ({
  setRequestLocale: () => {},
}))

// Mock the appeals read layer so tests never touch Sanity or real I/O.
vi.mock('@/lib/content/appeals', () => ({
  getAppeals: async () => [
    {
      slug: 'spain-homelessness',
      title: 'Restoring dignity in Spain',
      theme: 'spain',
      blurb:
        "Spain's first mobile shower unit travels along the Costa del Sol bringing hygiene, warmth, and human connection to people sleeping rough.",
      body: 'At Collective Calling, we believe everyone deserves to feel clean, valued, and dignified.\n\nOur mobile shower unit travels along the Costa del Sol, offering something so simple, yet so powerful.',
      image: '/images/spain/hero-mobile-shower.jpg',
      alt: 'The Collective Calling mobile shower unit serving people along the Costa del Sol.',
      relatedHref: '/spain',
      donationDesignation: 'Spain',
    },
    {
      slug: 'sponsor-a-child',
      title: 'Sponsor a child',
      theme: 'general',
      blurb:
        'For EUR 58 a month you can give a child at the Centre of Hope the care that gives them the chance to heal and go home.',
      body: 'Sponsoring a child means giving them everything they need to move from crisis to recovery.\n\nYour monthly gift of EUR 58 covers nutritious meals, safe accommodation, and medical care.',
      image: '/images/tanzania/caleb-after.jpg',
      alt: 'Caleb, thriving and smiling at the Centre of Hope in Tanzania.',
      relatedHref: '/get-involved/sponsor-a-child',
      donationDesignation: 'Sponsor A Child',
      donorboxQuery: { amount: 58, recurring: true, default_interval: 'm' },
    },
  ],
  getAppeal: async (slug: string) => {
    const appeals = [
      {
        slug: 'spain-homelessness',
        title: 'Restoring dignity in Spain',
        theme: 'spain',
        blurb:
          "Spain's first mobile shower unit travels along the Costa del Sol bringing hygiene, warmth, and human connection to people sleeping rough.",
        body: 'At Collective Calling, we believe everyone deserves to feel clean, valued, and dignified.\n\nOur mobile shower unit travels along the Costa del Sol, offering something so simple, yet so powerful.',
        image: '/images/spain/hero-mobile-shower.jpg',
        alt: 'The Collective Calling mobile shower unit serving people along the Costa del Sol.',
        relatedHref: '/spain',
        donationDesignation: 'Spain',
      },
      {
        slug: 'sponsor-a-child',
        title: 'Sponsor a child',
        theme: 'general',
        blurb:
          'For EUR 58 a month you can give a child at the Centre of Hope the care that gives them the chance to heal and go home.',
        body: 'Sponsoring a child means giving them everything they need to move from crisis to recovery.\n\nYour monthly gift of EUR 58 covers nutritious meals, safe accommodation, and medical care.',
        image: '/images/tanzania/caleb-after.jpg',
        alt: 'Caleb, thriving and smiling at the Centre of Hope in Tanzania.',
        relatedHref: '/get-involved/sponsor-a-child',
        donationDesignation: 'Sponsor A Child',
        donorboxQuery: { amount: 58, recurring: true, default_interval: 'm' },
      },
    ]
    return appeals.find((a) => a.slug === slug)
  },
}))

// next/navigation is used by the detail page (notFound) and by next-intl
// internals. Use importOriginal to pick up everything and only override
// notFound so it throws a recognisable sentinel instead of invoking real
// Next internals.
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

import AppealsPage from '@/app/[locale]/appeals/page'
import AppealDetailPage from '@/app/[locale]/appeals/[slug]/page'

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

// ---------------------------------------------------------------------------
// Hub page tests
// ---------------------------------------------------------------------------

test('the hub renders exactly one h1', async () => {
  const ui = await AppealsPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const h1s = screen.getAllByRole('heading', { level: 1 })
  expect(h1s).toHaveLength(1)
})

test('the hub renders a link to /appeals/spain-homelessness', async () => {
  const ui = await AppealsPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const links = screen.getAllByRole('link')
  const spainLinks = links.filter((l) =>
    l.getAttribute('href')?.includes('/appeals/spain-homelessness'),
  )
  expect(spainLinks.length).toBeGreaterThan(0)
})

test('the hub renders a link to /appeals/sponsor-a-child', async () => {
  const ui = await AppealsPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const links = screen.getAllByRole('link')
  const sponsorLinks = links.filter((l) =>
    l.getAttribute('href')?.includes('/appeals/sponsor-a-child'),
  )
  expect(sponsorLinks.length).toBeGreaterThan(0)
})

// ---------------------------------------------------------------------------
// Detail page tests: sponsor-a-child
// ---------------------------------------------------------------------------

test('sponsor-a-child detail renders exactly one h1', async () => {
  const ui = await AppealDetailPage({
    params: Promise.resolve({ locale: 'en', slug: 'sponsor-a-child' }),
  })
  renderWithLocale(ui)

  const h1s = screen.getAllByRole('heading', { level: 1 })
  expect(h1s).toHaveLength(1)
})

test('sponsor-a-child detail renders Donorbox iframe src containing donorbox.org/embed/giving-41', async () => {
  const ui = await AppealDetailPage({
    params: Promise.resolve({ locale: 'en', slug: 'sponsor-a-child' }),
  })
  renderWithLocale(ui)

  const iframes = document.querySelectorAll('iframe')
  const donorboxIframe = Array.from(iframes).find((el) =>
    el.getAttribute('src')?.includes('donorbox.org/embed/giving-41'),
  )
  expect(donorboxIframe).toBeDefined()
})

test('sponsor-a-child detail Donorbox iframe src contains amount=58', async () => {
  const ui = await AppealDetailPage({
    params: Promise.resolve({ locale: 'en', slug: 'sponsor-a-child' }),
  })
  renderWithLocale(ui)

  const iframes = document.querySelectorAll('iframe')
  const donorboxIframe = Array.from(iframes).find((el) =>
    el.getAttribute('src')?.includes('donorbox.org/embed/giving-41'),
  )
  expect(donorboxIframe?.getAttribute('src')).toContain('amount=58')
})

test('sponsor-a-child detail renders a link to /get-involved/sponsor-a-child', async () => {
  const ui = await AppealDetailPage({
    params: Promise.resolve({ locale: 'en', slug: 'sponsor-a-child' }),
  })
  renderWithLocale(ui)

  const links = screen.getAllByRole('link')
  const relatedLink = links.find((l) =>
    l.getAttribute('href')?.includes('/get-involved/sponsor-a-child'),
  )
  expect(relatedLink).toBeDefined()
})

// ---------------------------------------------------------------------------
// Detail page tests: spain-homelessness
// ---------------------------------------------------------------------------

test('spain-homelessness detail renders a link to /spain', async () => {
  const ui = await AppealDetailPage({
    params: Promise.resolve({ locale: 'en', slug: 'spain-homelessness' }),
  })
  renderWithLocale(ui)

  const links = screen.getAllByRole('link')
  const spainLink = links.find((l) => {
    const href = l.getAttribute('href') ?? ''
    return href === '/spain' || href.endsWith('/spain')
  })
  expect(spainLink).toBeDefined()
})

test('detail page calls notFound for unknown slug', async () => {
  await expect(
    AppealDetailPage({
      params: Promise.resolve({ locale: 'en', slug: 'does-not-exist' }),
    }),
  ).rejects.toThrow('NEXT_NOT_FOUND')
})
