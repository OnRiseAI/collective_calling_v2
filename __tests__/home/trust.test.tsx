import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { TrustSignals } from '@/components/home/TrustSignals'
import type { HomeContent } from '@/lib/content/types'

// Mirrors the seed shape in lib/content/home.ts. The registration string carries
// middot separators and must render verbatim, so the test asserts on the exact
// reg-number fragment rather than reformatting it.
const trust: HomeContent['trust'] = {
  registration: 'Registered nonprofit · Reg. 611.510 · CIF G93524130',
  statement:
    'We are transparent and accountable. No donation is too small, and we are glad to be reviewed by third parties.',
  partners: ['Rotary Club Guadalmina Marbella', 'Ayuntamiento de Marbella'],
}

test('shows the registration line containing the reg number', () => {
  render(<TrustSignals content={trust} />)
  expect(screen.getByText(/611\.510/)).toBeInTheDocument()
})

test('shows the accountability statement as a heading + supporting line', () => {
  render(<TrustSignals content={trust} />)
  // The first sentence becomes the section heading, the rest the supporting line.
  expect(
    screen.getByRole('heading', { name: /we are transparent and accountable/i }),
  ).toBeInTheDocument()
  expect(screen.getByText(/no donation is too small/i)).toBeInTheDocument()
})

test('shows the partners and supporters logo strip', () => {
  render(<TrustSignals content={trust} />)
  // The supporters label introduces the strip, and each sponsor logo carries
  // its organisation name as alt text.
  expect(screen.getByText(/partners and supporters/i)).toBeInTheDocument()
  expect(screen.getByAltText('Junta de Andalucía')).toBeInTheDocument()
  expect(screen.getByAltText('SANA Catering')).toBeInTheDocument()
  expect(screen.getByAltText('Rotary Club Marbella-Guadalmina')).toBeInTheDocument()
})
