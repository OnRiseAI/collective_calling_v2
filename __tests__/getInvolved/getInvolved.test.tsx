import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'

// The pages are async server components that call setRequestLocale from
// next-intl/server. Under jsdom that server-only API throws, so we stub it to a
// no-op, matching the sibling page tests.
vi.mock('next-intl/server', () => ({
  setRequestLocale: () => {},
}))

import GetInvolvedPage from '@/app/[locale]/get-involved/page'
import FundraisePage from '@/app/[locale]/get-involved/fundraise/page'
import PrayPage from '@/app/[locale]/get-involved/pray/page'
import PartnerPage from '@/app/[locale]/get-involved/partner/page'
import InviteToSpeakPage from '@/app/[locale]/get-involved/invite-us-to-speak/page'

// The pages render the locale-aware Link from next-intl, which reads the active
// locale from context. Provide a minimal provider so anything that resolves a
// link or locale works under jsdom.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

const params = Promise.resolve({ locale: 'en' })

// ── Get Involved hub ──────────────────────────────────────────────────────────

test('hub page renders exactly one h1', async () => {
  const ui = await GetInvolvedPage({ params })
  renderWithLocale(ui)
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
})

const HUB_TARGETS = [
  '/get-involved/sponsor-a-child',
  '/get-involved/fundraise',
  '/events',
  '/get-involved/invite-us-to-speak',
  '/get-involved/pray',
  '/get-involved/partner',
]

test('hub page links to all six Get Involved targets', async () => {
  const ui = await GetInvolvedPage({ params })
  renderWithLocale(ui)

  for (const href of HUB_TARGETS) {
    const link = screen
      .getAllByRole('link')
      .find((a) => (a.getAttribute('href') ?? '').endsWith(href))
    expect(link, `expected a link to ${href}`).toBeDefined()
  }
})

// ── Fundraise ─────────────────────────────────────────────────────────────────

test('fundraise page renders exactly one h1', async () => {
  const ui = await FundraisePage({ params })
  renderWithLocale(ui)
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
})

// ── Pray ─────────────────────────────────────────────────────────────────────

test('pray page renders exactly one h1', async () => {
  const ui = await PrayPage({ params })
  renderWithLocale(ui)
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
})

// ── Partner ───────────────────────────────────────────────────────────────────

test('partner page renders exactly one h1', async () => {
  const ui = await PartnerPage({ params })
  renderWithLocale(ui)
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
})

// ── Invite us to speak ────────────────────────────────────────────────────────

test('invite-us-to-speak page renders exactly one h1', async () => {
  const ui = await InviteToSpeakPage({ params })
  renderWithLocale(ui)
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
})
