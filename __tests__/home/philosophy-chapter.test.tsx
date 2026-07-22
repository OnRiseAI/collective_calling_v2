import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { PhilosophyChapter } from '@/components/home/PhilosophyChapter'
import { SEED_HOME } from '@/lib/content/home.seed'

test('philosophy renders headline as h2 and the pulled line', () => {
  render(<PhilosophyChapter content={SEED_HOME.philosophy} id="philosophy" stage="understanding" />)
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
    /everyone has something to give/i,
  )
  expect(screen.getByText(/stories are changed/i)).toBeInTheDocument()
})

test('philosophy renders every body paragraph', () => {
  render(<PhilosophyChapter content={SEED_HOME.philosophy} id="philosophy" stage="understanding" />)
  for (const paragraph of SEED_HOME.philosophy.body) {
    expect(screen.getByText(paragraph)).toBeInTheDocument()
  }
})
