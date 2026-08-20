import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { HeroSection } from '@/components/home/HeroSection'
import { PhilosophySection } from '@/components/home/PhilosophySection'
import { ExpressionsSection } from '@/components/home/ExpressionsSection'
import { ViaBand } from '@/components/home/ViaBand'
import { ImpactStats } from '@/components/home/ImpactStats'
import { StoriesSection } from '@/components/home/StoriesSection'
import { ImpactCta } from '@/components/home/ImpactCta'
import { PartnersStrip } from '@/components/home/PartnersStrip'
import { ClosingBand } from '@/components/home/ClosingBand'
import { SEED_HOME } from '@/lib/content/home.seed'

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('hero owns the page h1 and both opening actions', () => {
  renderWithLocale(<HeroSection content={SEED_HOME.hero} />)
  const h1 = screen.getByRole('heading', { level: 1 })
  expect(h1).toHaveTextContent(/a life\s*beyond ourselves\./i)
  expect(screen.getByRole('link', { name: /start your journey/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/journey$/),
  )
  expect(screen.getByRole('link', { name: /see what's possible/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/stories$/),
  )
})

test('philosophy states the heading and closes on the pullquote', () => {
  renderWithLocale(<PhilosophySection content={SEED_HOME.philosophy} />)
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
    /everyone has\s*something to give\./i,
  )
  expect(screen.getByText(/stories are changed, including our own/i)).toBeInTheDocument()
})

test('expressions render three numbered cards linking to their pages', () => {
  renderWithLocale(<ExpressionsSection content={SEED_HOME.expressions} />)
  for (const card of SEED_HOME.expressions.cards) {
    expect(screen.getByRole('heading', { level: 3, name: card.title })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: new RegExp(card.cta.label, 'i') })).toHaveAttribute(
      'href',
      expect.stringMatching(new RegExp(`${card.cta.href}$`)),
    )
  }
  expect(screen.getByText('01')).toBeInTheDocument()
  expect(screen.getByText('03')).toBeInTheDocument()
})

test('Values in Action band links to the partner page', () => {
  renderWithLocale(<ViaBand content={SEED_HOME.via} />)
  expect(
    screen.getByRole('link', { name: /discover values in action/i }),
  ).toHaveAttribute('href', expect.stringMatching(/\/get-involved\/partner$/))
})

test('impact band pairs every label with its final figure for assistive tech', () => {
  // The count-up itself is a browser behaviour (jsdom's IntersectionObserver is
  // a stub that never fires), so it is asserted in the Playwright suite. What
  // must hold everywhere: each label is present, and the final figure is
  // exposed once as text that never changes, so the count is not announced
  // frame by frame.
  renderWithLocale(<ImpactStats content={SEED_HOME.impact} />)
  for (const stat of SEED_HOME.impact.stats) {
    expect(screen.getByText(stat.label)).toBeInTheDocument()
    expect(
      screen.getByText(`${stat.value.toLocaleString('en')}${stat.suffix}`, {
        selector: '.sr-only',
      }),
    ).toBeInTheDocument()
  }
})

test('stories render the feature plus both supporting cards', () => {
  renderWithLocale(<StoriesSection content={SEED_HOME.stories} />)
  expect(screen.getByRole('heading', { level: 3, name: /nacho's story/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 3, name: /mobile shower unit/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { level: 3, name: /business in action/i })).toBeInTheDocument()
  expect(screen.getAllByRole('link', { name: /read more/i })).toHaveLength(3)
  expect(screen.getByRole('link', { name: /view all stories/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/stories$/),
  )
})

test('impact invitation routes to the impact page', () => {
  renderWithLocale(<ImpactCta content={SEED_HOME.impactCta} />)
  expect(screen.getByRole('link', { name: /see the impact/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/about\/our-impact$/),
  )
})

test('partner strip shows the logo, the named marks, and the open slot', () => {
  renderWithLocale(<PartnersStrip content={SEED_HOME.partners} />)
  expect(screen.getByAltText('Drumelia Real Estate')).toBeInTheDocument()
  expect(screen.getByText('MANIFESTO')).toBeInTheDocument()
  expect(screen.getByText('Not Just a Gym')).toBeInTheDocument()
  expect(screen.getByText('BOUNCE')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /your logo here/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/get-involved\/partner$/),
  )
})

test('closing band repeats the journey and charity shops actions', () => {
  renderWithLocale(<ClosingBand content={SEED_HOME.closing} />)
  expect(screen.getByRole('link', { name: /start your journey/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/journey$/),
  )
  expect(screen.getByRole('link', { name: /visit our charity shops/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/charity-shops$/),
  )
})
