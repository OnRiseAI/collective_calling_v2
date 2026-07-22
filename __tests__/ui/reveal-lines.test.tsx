import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { RevealLines } from '@/components/ui/RevealLines'

const LINES = ['Someone who saw potential.', 'Someone who shared what they carried.']

test('renders every line as its own paragraph, in order', () => {
  render(<RevealLines lines={LINES} />)
  const paragraphs = screen.getAllByText(/someone who/i)
  expect(paragraphs).toHaveLength(2)
  expect(paragraphs[0]).toHaveTextContent(LINES[0])
  expect(paragraphs[1]).toHaveTextContent(LINES[1])
})

test('applies the line class to each line', () => {
  render(<RevealLines lines={LINES} lineClassName="text-2xl" />)
  for (const line of LINES) {
    expect(screen.getByText(line)).toHaveClass('text-2xl')
  }
})
