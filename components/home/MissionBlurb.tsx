import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
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
    // Bold full-width gold band (the CC analog of Tearfund's yellow mission
    // band). Mirrors "Where your money goes": that section bleeds left, this one
    // bleeds right. Dark navy text and eyebrow for contrast on gold.
    <Section tone="accent" container={false} className="overflow-x-clip">
      <Container size="wide" className="relative">
        {/* LEFT: existing mission content, contained in the left half. */}
        <div className="lg:mr-auto lg:flex lg:min-h-[600px] lg:w-1/2 lg:items-center lg:pr-12">
          <div className="max-w-2xl">
            <Eyebrow tone="dark">{content.eyebrow}</Eyebrow>

            {/* Section heading: text-balance, NBSP between the last two words. h2
                because the hero owns the page h1. */}
            <h2 className="mt-5 text-balance font-heading text-3xl font-bold leading-[1.12] text-brand-dark sm:text-[38px] lg:text-[2.75rem]">
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
        </div>

        {/* RIGHT: photo. Full-bleed below the text on mobile; on desktop it
            bleeds to the right viewport edge (square right, rounded left) while
            its left edge meets the contained grid at centre. */}
        <div className="relative -mx-6 mt-10 h-[380px] overflow-hidden sm:-mx-8 sm:h-[440px] lg:absolute lg:inset-y-0 lg:right-[calc(50%_-_50vw)] lg:mx-0 lg:mt-0 lg:h-auto lg:w-[50vw] lg:rounded-l-2xl">
          <Image
            src="/images/mission-tanzania.png"
            alt="A Collective Calling worker walking hand in hand with a child in Tanzania."
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      </Container>
    </Section>
  )
}

export default MissionBlurb
