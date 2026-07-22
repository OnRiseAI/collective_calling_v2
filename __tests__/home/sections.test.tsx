import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { HeroSection } from '@/components/home/HeroSection'
import { WaysSection } from '@/components/home/WaysSection'
import { ViaBand } from '@/components/home/ViaBand'
import { StoriesSection } from '@/components/home/StoriesSection'
import { SnapshotBand } from '@/components/home/SnapshotBand'
import { PartnersSection } from '@/components/home/PartnersSection'
import { InvolveBand } from '@/components/home/InvolveBand'
import { SEED_HOME } from '@/lib/content/home.seed'
import type { Story } from '@/lib/content/types'

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('hero renders the mockup headline as h1 with the gold accent word', () => {
  renderWithLocale(<HeroSection content={SEED_HOME.hero} />)
  const h1 = screen.getByRole('heading', { level: 1 })
  expect(h1).toHaveTextContent(/where values become/i)
  expect(h1).toHaveTextContent(/visible\./i)
  expect(screen.getByRole('link', { name: /explore our impact/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/about\/our-impact$/),
  )
  expect(screen.getByRole('link', { name: /discover values in action/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/get-involved\/partner$/),
  )
})

test('ways section renders three cards routing to their pages', () => {
  renderWithLocale(<WaysSection content={SEED_HOME.ways} />)
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/three ways/i)
  const learnMore = screen.getAllByRole('link', { name: /learn more/i })
  expect(learnMore).toHaveLength(3)
  expect(learnMore[0]).toHaveAttribute('href', expect.stringMatching(/\/spain$/))
  expect(learnMore[1]).toHaveAttribute('href', expect.stringMatching(/\/tanzania$/))
  expect(learnMore[2]).toHaveAttribute('href', expect.stringMatching(/\/get-involved\/partner$/))
})

test('via band carries the mockup heading and CTA', () => {
  renderWithLocale(<ViaBand content={SEED_HOME.via} />)
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/force for good/i)
  expect(screen.getByRole('link', { name: /discover via/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/get-involved\/partner$/),
  )
})

test('stories section renders real stories only', () => {
  const stories: Story[] = [
    { slug: 'caleb', title: 'Caleb comes home', location: 'tanzania', excerpt: 'x', body: '' },
    { slug: 'ph', title: 'Your story', location: 'general', excerpt: 'x', body: '', placeholder: true },
  ]
  renderWithLocale(<StoriesSection content={SEED_HOME.storiesIntro} stories={stories} />)
  expect(screen.getByRole('link', { name: /caleb comes home/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/stories\/caleb$/),
  )
  expect(screen.queryByText(/your story/i)).not.toBeInTheDocument()
})

test('snapshot band renders all five mockup stats', () => {
  renderWithLocale(<SnapshotBand content={SEED_HOME.snapshot} />)
  for (const stat of SEED_HOME.snapshot.stats) {
    expect(screen.getByText(stat.label)).toBeInTheDocument()
  }
  expect(screen.getByText('10,000+')).toBeInTheDocument()
})

test('partners section renders the marks and the logo slot', () => {
  renderWithLocale(<PartnersSection content={SEED_HOME.partners} />)
  for (const name of SEED_HOME.partners.names) {
    expect(screen.getByText(name)).toBeInTheDocument()
  }
  expect(screen.getByText(/your logo here/i)).toBeInTheDocument()
})

test('involve band routes its three actions and the shops panel', () => {
  renderWithLocale(<InvolveBand content={SEED_HOME.involve} />)
  expect(screen.getByRole('link', { name: /donate/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/donate$/),
  )
  expect(screen.getByRole('link', { name: /find out more/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/charity-shops$/),
  )
})
