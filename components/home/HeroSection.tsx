import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Mockup hero: dark charcoal band split cleanly — copy in a narrow left
 * column, photograph filling the right. The serif headline stacks one word
 * per line (mockup proportion: the headline IS the left column) with the
 * final word in gold italic. A "Scroll to discover" cue with a small gold
 * ornament sits centred at the band's foot.
 */
export function HeroSection({ content }: { content: HomeContent['hero'] }): React.JSX.Element {
  return (
    <section className="relative isolate overflow-hidden bg-brand-dark text-paper">
      {/* Right-half photograph with a charcoal blend on its left edge. */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%]" aria-hidden="true">
        <Image
          src={content.image}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover object-center opacity-50 lg:opacity-100"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, #0f1620 0%, rgba(15,22,32,0.55) 30%, rgba(15,22,32,0.12) 60%, rgba(15,22,32,0.3) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{ backgroundImage: 'linear-gradient(to top, #0f1620, transparent)' }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[72dvh] w-full max-w-7xl flex-col justify-center px-6 pb-24 pt-14 sm:px-8 lg:px-12">
        <div className="max-w-lg">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            {content.eyebrow}
          </p>
          {/* One word per line: the stacked headline is the mockup's core
              gesture, so each lead word renders as its own block. */}
          <h1 className="mt-5 font-heading text-6xl leading-[1.04] sm:text-7xl lg:text-[5.5rem]">
            {content.headlineLead.split(' ').map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
            <span className="block italic text-accent">{content.headlineAccent}</span>
          </h1>
          <p className="mt-6 max-w-xs font-body text-base leading-relaxed text-paper/80">
            {content.lede}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={content.primaryCta.href}
              className="inline-flex items-center justify-center rounded-[--radius] bg-accent px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-brand-dark transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              {content.primaryCta.label}
            </Link>
            <Link
              href={content.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-[--radius] border border-paper/40 px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-paper transition-colors hover:border-paper/70 hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              {content.secondaryCta.label}
            </Link>
          </div>
        </div>

        {/* Scroll cue with the mockup's small ornament. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-5 flex flex-col items-center gap-2.5">
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-paper/50">
            {content.scrollCue}
          </p>
          <span aria-hidden="true" className="flex items-center gap-2 text-accent/70">
            <span className="h-px w-8 bg-current" />
            <span className="h-1.5 w-1.5 rotate-45 bg-current" />
            <span className="h-px w-8 bg-current" />
          </span>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
