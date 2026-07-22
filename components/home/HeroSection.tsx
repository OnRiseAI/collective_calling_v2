import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Mockup hero: dark charcoal band, copy left at reading width, photograph
 * blended on the right through a charcoal gradient. Serif display headline
 * with the final word set in gold italic ("Visible."). Two CTAs and a small
 * "Scroll to discover" cue centred beneath the band.
 */
export function HeroSection({ content }: { content: HomeContent['hero'] }): React.JSX.Element {
  return (
    <section className="relative isolate overflow-hidden bg-brand-dark text-paper">
      {/* Right-side photograph, blended into the charcoal field. */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-3/5" aria-hidden="true">
        <Image
          src={content.image}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-center opacity-70 lg:opacity-100"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, #0f1620 0%, rgba(15,22,32,0.85) 25%, rgba(15,22,32,0.35) 60%, rgba(15,22,32,0.55) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ backgroundImage: 'linear-gradient(to top, #0f1620, transparent)' }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[82dvh] w-full max-w-7xl flex-col justify-center px-6 py-24 sm:px-8 lg:px-12">
        <div className="max-w-xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {content.eyebrow}
          </p>
          <h1 className="mt-6 text-balance font-heading text-5xl leading-[1.08] sm:text-6xl lg:text-[4.75rem]">
            {content.headlineLead}{' '}
            <span className="italic text-accent">{content.headlineAccent}</span>
          </h1>
          <p className="mt-7 max-w-md font-body text-lg leading-relaxed text-paper/80">
            {noOrphan(content.lede)}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={content.primaryCta.href}
              className="inline-flex items-center justify-center rounded-[--radius] bg-accent px-6 py-3 font-body text-sm font-semibold uppercase tracking-wider text-brand-dark transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              {content.primaryCta.label}
            </Link>
            <Link
              href={content.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-[--radius] border border-paper/40 px-6 py-3 font-body text-sm font-semibold uppercase tracking-wider text-paper transition-colors hover:border-paper/70 hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              {content.secondaryCta.label}
            </Link>
          </div>
        </div>

        {/* Scroll cue, centred at the band's foot. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2">
          <p className="font-body text-[11px] uppercase tracking-[0.25em] text-paper/50">
            {content.scrollCue}
          </p>
          <span aria-hidden="true" className="h-6 w-px bg-accent/70" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
