import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { ImpactStats } from '@/components/home/ImpactStats'
import type { ImpactStat } from '@/lib/content/types'

// Three real Collective Calling framings, one per icon key.
const sampleStats: ImpactStat[] = [
  { icon: 'shower', value: "Spain's first", label: 'mobile shower unit, restoring dignity in Marbella.' },
  { icon: 'home', value: 'Centre of Hope', label: 'reuniting street-connected children in Tanzania.' },
  { icon: 'heart', value: '83%', label: 'of every euro goes directly to our programs.' },
]

test('renders every stat value', () => {
  render(<ImpactStats stats={sampleStats} />)
  for (const stat of sampleStats) {
    expect(screen.getByText(stat.value)).toBeInTheDocument()
  }
})

test('renders every stat label', () => {
  render(<ImpactStats stats={sampleStats} />)
  for (const stat of sampleStats) {
    expect(screen.getByText(stat.label)).toBeInTheDocument()
  }
})

test('renders the three stats as three list items', () => {
  render(<ImpactStats stats={sampleStats} />)
  expect(screen.getAllByRole('listitem')).toHaveLength(3)
})
