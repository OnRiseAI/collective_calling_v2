import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Eyebrow } from '@/components/ui/Eyebrow'

test('renders the children as text', () => {
  render(<Eyebrow>Give today</Eyebrow>)
  expect(screen.getByText('Give today')).toBeInTheDocument()
})

test('renders as a <p> element with text-accent and uppercase classes', () => {
  const { container } = render(<Eyebrow>Give today</Eyebrow>)
  const p = container.querySelector('p')
  expect(p).not.toBeNull()
  expect(p!.className).toContain('text-accent')
  expect(p!.className).toContain('uppercase')
})

test('contains an aria-hidden rule span', () => {
  const { container } = render(<Eyebrow>Give today</Eyebrow>)
  const span = container.querySelector('span[aria-hidden="true"]')
  expect(span).not.toBeNull()
  expect(span!.className).toContain('bg-accent')
})

test('does not include justify-center by default (left alignment)', () => {
  const { container } = render(<Eyebrow>Give today</Eyebrow>)
  const p = container.querySelector('p')
  expect(p!.className).not.toContain('justify-center')
})

test('includes justify-center when align="center"', () => {
  const { container } = render(<Eyebrow align="center">x</Eyebrow>)
  const p = container.querySelector('p')
  expect(p!.className).toContain('justify-center')
})
