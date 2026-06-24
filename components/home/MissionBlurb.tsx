import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { noOrphan } from '@/lib/text'
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


export function MissionBlurb(props: { content: HomeContent['mission'] }): React.JSX.Element {
  const { content } = props

  return (
    <Section tone="accent">
      {/* Bold full-width gold band (the CC analog of Tearfund's yellow mission
          band). Dark navy text and eyebrow for contrast on gold. */}
      <div className="max-w-2xl">
        <Eyebrow tone="dark">{content.eyebrow}</Eyebrow>

        {/* Section heading: text-balance, NBSP between the last two words. h2
            because the hero owns the page h1. */}
        <h2 className="mt-5 text-balance font-heading text-3xl font-bold leading-[1.12] text-brand-dark sm:text-4xl lg:text-[2.75rem]">
          {noOrphan(content.heading)}
        </h2>

        {/* Body: dark navy on gold, generous line height. */}
        <p className="mt-6 font-body text-lg leading-relaxed text-brand-dark/85">
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
