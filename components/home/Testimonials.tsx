'use client'

import * as React from 'react'
import { Section } from '@/components/ui/Section'
import type { Testimonial } from '@/lib/content/types'

/**
 * Supporter testimonials carousel for the Collective Calling homepage.
 *
 * A calm, dignified band (clay-tint per the brand board) that shows one
 * supporter quote at a time. Per the brand board this is a soft warm band with a
 * gold eyebrow (H5, uppercase) above the active quote. The quote sits in Fraunces
 * with a large decorative gold quote mark, and the attribution reads in muted
 * warm taupe beneath. Gold is used here only for the decorative quote mark and
 * the eyebrow rule, never for body text on light, which honours the contrast
 * rules in the brand board.
 *
 * Interaction and accessibility:
 * - One quote is visible at a time, inside a <blockquote>.
 * - Real Previous / Next <button>s with aria-label cycle through the quotes and
 *   wrap around at the ends. They are keyboard operable as native buttons.
 * - The active quote sits in an aria-live="polite" region so screen readers
 *   announce each change without stealing focus.
 * - Dots show position and let a reader jump to a specific quote.
 * - Motion is a quiet cross-fade that is removed under prefers-reduced-motion
 *   (see the motion-reduce utilities), so the switch is instant for readers who
 *   ask for less motion. Nothing animates aggressively either way.
 *
 * Honesty: the placeholder flag is not rendered. Attributions stay exactly as
 * provided in the content (generic, e.g. "Supporter"); no named people are
 * invented.
 *
 * Defensive: an empty list renders nothing. A single testimonial renders the
 * quote with no carousel controls.
 */
export function Testimonials(props: { testimonials: Testimonial[] }): React.JSX.Element | null {
  const { testimonials } = props
  const count = testimonials.length

  // useState is always called (hooks must not be conditional); the early return
  // for an empty list happens after the hooks below.
  const [index, setIndex] = React.useState(0)

  const hasMany = count > 1

  const goTo = React.useCallback(
    (next: number) => {
      if (count === 0) return
      // Wrap around at both ends so the carousel cycles cleanly.
      setIndex(((next % count) + count) % count)
    },
    [count],
  )

  const goPrev = React.useCallback(() => goTo(index - 1), [goTo, index])
  const goNext = React.useCallback(() => goTo(index + 1), [goTo, index])

  // Safe empty state: render nothing rather than crash.
  if (count === 0) return null

  const active = testimonials[index]

  return (
    <Section tone="clay-tint">
      <div className="mx-auto max-w-3xl text-center">
        {/* Eyebrow: gold, uppercase, bold body face, with a short gold rule that
            echoes the gala poster's warm gold lettering. Centred to sit above
            the quote. */}
        <p className="flex items-center justify-center gap-3 font-body text-sm font-bold uppercase tracking-[0.18em] text-accent">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          Why our supporters give
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
        </p>

        {/* Decorative gold quote mark. Large and purely ornamental, so it is
            hidden from assistive tech. Gold on a light band is allowed for a
            large decorative element (never body text). */}
        <span
          aria-hidden="true"
          className="mt-8 block font-heading text-7xl leading-none text-accent sm:text-8xl"
        >
          &ldquo;
        </span>

        {/* Live region: announces the active quote politely on change without
            moving focus. The motion-reduce utilities drop the cross-fade for
            readers who prefer reduced motion. A key on the inner wrapper lets the
            fade replay on each change. */}
        <div aria-live="polite" className="mt-4">
          <figure
            key={index}
            className="motion-safe:animate-[testimonial-fade_300ms_ease-out]"
          >
            {/* The quote: a quotation, set large in Fraunces. text-balance keeps
                the lines even; leading is open for a calm, unhurried read. */}
            <blockquote className="text-balance font-heading text-2xl font-medium leading-[1.4] text-ink sm:text-3xl sm:leading-[1.35]">
              {active.quote}
            </blockquote>

            {/* Attribution in muted warm taupe. Generic, exactly as provided. */}
            <figcaption className="mt-6 font-body text-sm font-bold uppercase tracking-[0.18em] text-muted">
              {active.attribution}
            </figcaption>
          </figure>
        </div>

        {/* Carousel controls: only shown when there is more than one quote. Real
            buttons with aria-labels, keyboard operable by default. Dots in the
            middle show position and allow a direct jump. */}
        {hasMany ? (
          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border-[1.5px] border-brand/30 text-brand transition-colors duration-200 ease-out hover:border-brand hover:bg-brand hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-clay-tint"
            >
              <ChevronLeft />
            </button>

            <ul className="flex items-center gap-2.5" aria-hidden="true">
              {testimonials.map((_, dotIndex) => (
                <li key={dotIndex}>
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => goTo(dotIndex)}
                    className={
                      'block h-2.5 w-2.5 rounded-full transition-colors duration-200 ease-out ' +
                      (dotIndex === index ? 'bg-accent' : 'bg-brand/20 hover:bg-brand/40')
                    }
                  />
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border-[1.5px] border-brand/30 text-brand transition-colors duration-200 ease-out hover:border-brand hover:bg-brand hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-clay-tint"
            >
              <ChevronRight />
            </button>
          </div>
        ) : null}
      </div>
    </Section>
  )
}

// Small inline chevron icons. Decorative within a labelled button, so hidden
// from assistive tech (the button's aria-label carries the meaning).
function ChevronLeft(): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function ChevronRight(): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export default Testimonials
