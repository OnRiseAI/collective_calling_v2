import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { HeroChapter } from '@/components/home/HeroChapter'
import { SEED_HOME } from '@/lib/content/home.seed'

test('hero renders the client headline as the page h1', () => {
  render(<HeroChapter content={SEED_HOME.hero} id="understanding" stage="understanding" />)
  const heading = screen.getByRole('heading', { level: 1 })
  expect(heading).toHaveTextContent(/a life beyond ourselves/i)
})

test('hero CTAs are in-page anchors to participation and possibility', () => {
  render(<HeroChapter content={SEED_HOME.hero} id="understanding" stage="understanding" />)
  expect(screen.getByRole('link', { name: /start your journey/i })).toHaveAttribute(
    'href',
    '#participation',
  )
  expect(screen.getByRole('link', { name: /see what/i })).toHaveAttribute('href', '#possibility')
})

test('hero section carries its stage id for the journey rail', () => {
  render(<HeroChapter content={SEED_HOME.hero} id="understanding" stage="understanding" />)
  const section = document.querySelector('section#understanding')
  expect(section).not.toBeNull()
  expect(section).toHaveAttribute('data-stage', 'understanding')
})
