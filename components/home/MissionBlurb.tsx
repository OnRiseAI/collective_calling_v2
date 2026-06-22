import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import type { HomeContent } from '@/lib/content/types'

/**
 * Mission blurb for the Collective Calling homepage.
 *
 * A calm editorial band that states, in the brand's own voice, who the charity
 * is and what it does. Per the brand board this is a warm ivory paper band with
 * a gold eyebrow (H5, uppercase) above a Fraunces section heading, a Mulish body
 * passage held to a comfortable reading width, and a quiet secondary action
 * through to the About page.
 *
 * Heading hierarchy: the hero owns the page h1, so this section heading is an h2.
 *
 * It takes only the provided mission content. No invented copy.
 */

/**
 * Join the last two words of a heading with a non-breaking space so a single
 * trailing word never wraps onto its own line (orphan). text-balance handles the
 * rest of the line breaking (brand board headline rule).
 */
function noOrphan(text: string): string {
  const trimmed = text.trim()
  const lastSpace = trimmed.lastIndexOf(' ')
  if (lastSpace === -1) return trimmed
  return trimmed.slice(0, lastSpace) + ' ' + trimmed.slice(lastSpace + 1)
}

export function MissionBlurb(props: { content: HomeContent['mission'] }): React.JSX.Element {
  const { content } = props

  return (
    <Section tone="paper">
      {/* Prose width: a single comfortable reading column, left aligned for a
          calm editorial feel. */}
      <div className="max-w-2xl">
        {/* Eyebrow: gold, uppercase, bold body face, with a short gold rule that
            echoes the gala poster's warm gold lettering. */}
        <p className="flex items-center gap-3 font-body text-sm font-bold uppercase tracking-[0.18em] text-accent">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          {content.eyebrow}
        </p>

        {/* Section heading: Fraunces, text-balance, NBSP between the last two
            words. h2 because the hero owns the page h1. */}
        <h2 className="mt-5 text-balance font-heading text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
          {noOrphan(content.heading)}
        </h2>

        {/* Body: Mulish, generous line height for a calm long passage. */}
        <p className="mt-6 font-body text-lg leading-relaxed text-ink/90">
          {content.body}
        </p>

        {/* Quiet secondary action through to the About page. Locale-aware Link. */}
        <div className="mt-8">
          <Button as={Link} href="/about" variant="secondary">
            About us
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default MissionBlurb
