import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { JourneyRail } from '@/components/home/JourneyRail'

test('renders the four journey stages as in-page anchors', () => {
  render(<JourneyRail />)
  const nav = screen.getByRole('navigation', { name: /journey/i })
  const links = ['Understanding', 'Connection', 'Possibility', 'Participation']
  for (const label of links) {
    const link = screen.getByRole('link', { name: label })
    expect(nav).toContainElement(link)
  }
  expect(screen.getByRole('link', { name: 'Understanding' })).toHaveAttribute(
    'href',
    '#understanding',
  )
  expect(screen.getByRole('link', { name: 'Participation' })).toHaveAttribute(
    'href',
    '#participation',
  )
})

test('is hidden from small viewports via lg-only display classes', () => {
  render(<JourneyRail />)
  const nav = screen.getByRole('navigation', { name: /journey/i })
  expect(nav.className).toMatch(/hidden/)
  expect(nav.className).toMatch(/lg:flex/)
})
