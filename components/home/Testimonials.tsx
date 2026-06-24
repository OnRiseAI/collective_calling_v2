import * as React from 'react'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/Eyebrow'
import type { Testimonial } from '@/lib/content/types'

/**
 * Supporter testimonials for the Collective Calling homepage.
 *
 * Tearfund's pattern: three quote cards shown side by side on a bold navy band.
 * Each card is white with a large gold quote mark, the quote, and the
 * attribution. The grid stacks to a single column on mobile.
 *
 * Heading hierarchy: the hero owns the page h1, so this section heading is an h2.
 * Honesty: attributions render exactly as provided (generic, e.g. "Supporter");
 * no named people are invented. An empty list renders nothing.
 */
export function Testimonials(props: { testimonials: Testimonial[] }): React.JSX.Element | null {
  const { testimonials } = props
  if (!testimonials || testimonials.length === 0) return null

  return (
    <Section tone="dark">
      <div className="text-center">
        <Eyebrow align="center">Why our supporters give</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-2xl text-balance font-heading text-3xl font-bold leading-[1.12] text-paper sm:text-4xl">
          The people who stand with us
        </h2>
        <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-12 rounded-full bg-accent" />
      </div>

      <ul className="mx-auto mt-14 grid max-w-6xl items-stretch gap-6 md:grid-cols-3">
        {testimonials.slice(0, 3).map((t, i) => (
          <li key={i} className="flex">
            <figure className="flex w-full flex-col rounded-md bg-paper p-8 shadow-[0_12px_32px_rgba(15,35,71,0.18)]">
              <span aria-hidden="true" className="font-heading text-6xl leading-none text-accent">
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 text-balance font-heading text-xl font-medium leading-[1.4] text-brand-dark">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 font-body text-sm font-bold uppercase tracking-[0.16em] text-muted">
                {t.attribution}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default Testimonials
