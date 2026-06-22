import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { DonorboxEmbed } from '@/components/donate/DonorboxEmbed'

test('renders a lazy Donorbox iframe for the default form', () => {
  render(<DonorboxEmbed />)
  const frame = screen.getByTitle('Collective Calling donation form')
  expect(frame.tagName).toBe('IFRAME')
  expect(frame).toHaveAttribute('src', expect.stringContaining('donorbox.org/embed/giving-41'))
  expect(frame).toHaveAttribute('loading', 'lazy')
})

test('appends query entries to the embed src', () => {
  render(<DonorboxEmbed query={{ amount: 58, recurring: true }} />)
  const frame = screen.getByTitle('Collective Calling donation form')
  const src = frame.getAttribute('src') ?? ''
  expect(src).toContain('amount=58')
  expect(src).toContain('recurring=true')
})
