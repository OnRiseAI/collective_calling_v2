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

// Mock the stories read layer so tests never touch Sanity or real I/O.
vi.mock('@/lib/content/stories', () => ({
  getStories: async () => [
    {
      slug: 'caleb',
      title: 'Meet Caleb',
      location: 'tanzania',
      excerpt:
        'Caleb was found in desperate need with his brothers and sisters after their older brother fell ill. Today he is thriving at the Centre of Hope, enrolled in school, and smiling.',
      body: 'Caleb was born in a village near Kasulu town.\n\nHe is 5 years old and the youngest of 5 orphans.',
      images: ['/images/tanzania/caleb-before.jpg'],
      placeholder: false,
    },
    {
      slug: 'your-story-here',
      title: 'Real supporter stories coming soon',
      location: 'general',
      excerpt:
        'We are collecting real accounts from supporters and families whose lives have been touched by the work of Collective Calling.',
      body: 'Real supporter stories are coming.',
      placeholder: true,
    },
  ],
  getStory: async (slug: string) => {
    const stories = [
      {
        slug: 'caleb',
        title: 'Meet Caleb',
        location: 'tanzania',
        excerpt: 'Caleb was found in desperate need.',
        body: 'Caleb was born in a village near Kasulu town.\n\nHe is 5 years old and the youngest of 5 orphans.',
        images: ['/images/tanzania/caleb-before.jpg'],
        placeholder: false,
      },
    ]
    return stories.find((s) => s.slug === slug)
  },
}))

// next/navigation is used by the detail page (notFound) and by next-intl
// internals (redirect, permanentRedirect, usePathname, useParams, etc.).
// Use importOriginal to pick up everything and only override notFound so
// it throws a recognisable sentinel instead of invoking real Next internals.
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

import StoriesPage from '@/app/[locale]/stories/page'
import StoryDetailPage from '@/app/[locale]/(site)/stories/[slug]/page'

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
  const ui = await StoriesPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const h1s = screen.getAllByRole('heading', { level: 1 })
  expect(h1s).toHaveLength(1)
  expect(h1s[0]).toHaveTextContent(/Lives\.\s*Journeys\.\s*Transformation/)
})

// ---------------------------------------------------------------------------
// Detail page tests
// ---------------------------------------------------------------------------

test('the caleb detail page renders exactly one h1 with Caleb title', async () => {
  const ui = await StoryDetailPage({
    params: Promise.resolve({ locale: 'en', slug: 'caleb' }),
  })
  renderWithLocale(ui)

  const h1s = screen.getAllByRole('heading', { level: 1 })
  expect(h1s).toHaveLength(1)
  expect(h1s[0]).toHaveTextContent(/caleb/i)
})

test('the caleb detail page renders body text', async () => {
  const ui = await StoryDetailPage({
    params: Promise.resolve({ locale: 'en', slug: 'caleb' }),
  })
  renderWithLocale(ui)

  expect(document.body.textContent).toContain('Kasulu')
})

test('the caleb detail page links back to /stories', async () => {
  const ui = await StoryDetailPage({
    params: Promise.resolve({ locale: 'en', slug: 'caleb' }),
  })
  renderWithLocale(ui)

  const links = screen.getAllByRole('link')
  const back = links.find((l) => {
    const href = l.getAttribute('href') ?? ''
    return href === '/stories' || href.endsWith('/stories')
  })
  expect(back).toBeDefined()
})

test('detail page calls notFound for unknown slug', async () => {
  await expect(
    StoryDetailPage({ params: Promise.resolve({ locale: 'en', slug: 'does-not-exist' }) }),
  ).rejects.toThrow('NEXT_NOT_FOUND')
})
