import * as React from 'react'
import { Section } from '@/components/ui/Section'
import type { HomeContent } from '@/lib/content/types'

/**
 * Scripture banner for the Collective Calling homepage.
 *
 * A single reverent, faith-forward moment: a verse set large in Fraunces on a
 * deep midnight-navy (`brand-dark`) band, with its reference in warm gold
 * beneath. Per the brand board, gold reads as warm light on brand-dark, so it
 * is the right place for a gold text line. Centred, with generous spacing for a
 * calm, premium pause between the busier sections.
 *
 * The verse is a quotation, not a heading, so it sits in a <blockquote> element
 * rather than an h-level. A short gold rule above the quote echoes the gala
 * poster's gold lettering and gives the pause a quiet anchor.
 *
 * It takes only the provided scripture content. No invented copy.
 */
export function ScriptureBanner(props: { content: HomeContent['scripture'] }): React.JSX.Element {
  const { content } = props

  return (
    <Section tone="dark" containerSize="prose">
      <figure className="mx-auto max-w-3xl text-center">
        {/* Short gold rule: a quiet anchor echoing the gala poster's gold. */}
        <span aria-hidden="true" className="mx-auto block h-px w-12 bg-accent" />

        {/* The verse: a quotation, set large in Fraunces. text-balance keeps the
            lines even; leading is open for a reverent, unhurried read. */}
        <blockquote className="mt-8 text-balance font-heading text-2xl font-medium italic leading-[1.4] text-paper sm:text-3xl lg:text-[2.25rem] lg:leading-[1.35]">
          {content.quote}
        </blockquote>

        {/* Reference in warm gold. On brand-dark, gold reads as warm light, the
            one place gold may carry a small text line. */}
        <figcaption className="mt-7 font-body text-sm font-bold uppercase tracking-[0.18em] text-accent">
          {content.reference}
        </figcaption>
      </figure>
    </Section>
  )
}

export default ScriptureBanner
