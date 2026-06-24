import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { noOrphan } from '@/lib/text'

/**
 * "Because of Jesus" faith band for the Collective Calling homepage.
 *
 * A reverent, midnight-navy band that states the charity's Christian motivation
 * plainly and high on the page (right after the mission). The client's gold
 * brush-stroke heart-cross sits centred at the top as the single focal motif
 * (decorative), above white copy that names Jesus, with the 1 John 4:19 line.
 *
 * Copy is held inline, exactly like ImpactStatBand and ScriptureBanner — this is
 * a fixed faith statement, not CMS-editable content. The hero owns the page h1,
 * so the heading here is an h2.
 */
export function FaithBand(): React.JSX.Element {
  return (
    <Section tone="dark" aria-label="Why we do this" className="pb-8 sm:pb-10 lg:pb-12">
      <div className="mx-auto max-w-2xl text-center">
        {/* The gold heart-cross motif: decorative, so alt is empty. */}
        <Image
          src="/images/heart-cross-gold.png"
          alt=""
          width={800}
          height={781}
          className="mx-auto h-auto w-20 sm:w-24"
          priority={false}
        />

        <Eyebrow tone="gold" align="center" className="mt-7">
          Why we do this
        </Eyebrow>

        <h2 className="mx-auto mt-4 max-w-2xl text-balance font-heading text-3xl font-bold leading-[1.12] text-paper sm:text-[38px]">
          {noOrphan('Because he first loved us')}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-paper/90">
          Collective Calling is a Christian charity. We restore dignity and rebuild families
          because we follow Jesus — who met people in their need and taught us to love our
          neighbour as ourselves. Every shower, every meal, every child brought home is that
          love made visible.
        </p>

        <p className="mt-7 font-body text-sm font-bold uppercase tracking-[0.18em] text-accent">
          &ldquo;We love because he first loved us.&rdquo; — 1 John 4:19
        </p>

        <div className="mt-8">
          <Link
            href="/about/who-we-are"
            className="font-body font-semibold text-paper underline decoration-2 decoration-transparent underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
          >
            Who we are →
          </Link>
        </div>
      </div>
    </Section>
  )
}

export default FaithBand
