import * as React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Testimonials } from '@/components/home/Testimonials'
import type { Testimonial } from '@/lib/content/types'

// The three placeholder supporter testimonials from the seed content. Generic
// attributions only, no fabricated named people.
const sampleTestimonials: Testimonial[] = [
  {
    quote:
      'Through Collective Calling I can love my neighbour in places I could never reach on my own.',
    attribution: 'Supporter',
    placeholder: true,
  },
  {
    quote:
      'I give because they treat every person with dignity, and because nearly every euro reaches the people who need it.',
    attribution: 'Monthly giver',
    placeholder: true,
  },
  {
    quote:
      'Seeing a child go from the street back to a loving home is the most hopeful thing I know.',
    attribution: 'Supporter',
    placeholder: true,
  },
]

test('renders the first quote inside a blockquote', () => {
  const { container } = render(<Testimonials testimonials={sampleTestimonials} />)
  const blockquote = container.querySelector('blockquote')
  expect(blockquote).not.toBeNull()
  expect(blockquote).toHaveTextContent(/love my neighbour/i)
})

test('renders the first attribution', () => {
  render(<Testimonials testimonials={sampleTestimonials} />)
  expect(screen.getByText('Supporter')).toBeInTheDocument()
})

test('shows accessible previous and next controls when more than one testimonial', () => {
  render(<Testimonials testimonials={sampleTestimonials} />)
  expect(
    screen.getByRole('button', { name: /previous testimonial/i }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('button', { name: /next testimonial/i }),
  ).toBeInTheDocument()
})

// The active figure is re-keyed on each change so the cross-fade can replay,
// which means the DOM blockquote node is replaced. Re-query it after navigating.
function currentQuote(container: HTMLElement): HTMLElement {
  return container.querySelector('blockquote') as HTMLElement
}

test('clicking next advances the visible quote', () => {
  const { container } = render(<Testimonials testimonials={sampleTestimonials} />)

  expect(currentQuote(container)).toHaveTextContent(/love my neighbour/i)

  fireEvent.click(screen.getByRole('button', { name: /next testimonial/i }))

  expect(currentQuote(container)).toHaveTextContent(/every person with dignity/i)
})

test('next wraps from the last testimonial back to the first', () => {
  const { container } = render(<Testimonials testimonials={sampleTestimonials} />)

  const next = screen.getByRole('button', { name: /next testimonial/i })
  fireEvent.click(next)
  fireEvent.click(next)
  fireEvent.click(next)

  expect(currentQuote(container)).toHaveTextContent(/love my neighbour/i)
})

test('previous wraps from the first testimonial to the last', () => {
  const { container } = render(<Testimonials testimonials={sampleTestimonials} />)

  fireEvent.click(screen.getByRole('button', { name: /previous testimonial/i }))

  expect(currentQuote(container)).toHaveTextContent(/back to a loving home/i)
})

test('with a single testimonial it renders the quote and hides the controls', () => {
  render(<Testimonials testimonials={[sampleTestimonials[0]]} />)
  expect(screen.getByText(/love my neighbour/i)).toBeInTheDocument()
  expect(
    screen.queryByRole('button', { name: /next testimonial/i }),
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('button', { name: /previous testimonial/i }),
  ).not.toBeInTheDocument()
})

test('with an empty list it renders nothing and does not crash', () => {
  const { container } = render(<Testimonials testimonials={[]} />)
  expect(container.querySelector('blockquote')).toBeNull()
})

test('exposes a polite live region around the active quote', () => {
  const { container } = render(<Testimonials testimonials={sampleTestimonials} />)
  const live = container.querySelector('[aria-live="polite"]')
  expect(live).not.toBeNull()
  expect(live).toHaveTextContent(/love my neighbour/i)
})
