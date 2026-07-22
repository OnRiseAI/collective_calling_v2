import * as React from 'react'
import Image from 'next/image'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Chapter 1 — Understanding. Full-viewport photographic opening. One image,
 * warm-dark scrim deepening toward the copy, the client's invitation headline
 * very large, and two in-page CTAs that make the page itself the journey
 * (Start Your Journey -> #participation, See What's Possible -> #possibility).
 * Owns the page h1 and the LCP image; renders immediately, no reveal.
 */
export function HeroChapter({
  content,
  id,
  stage,
}: {
  content: HomeContent['hero']
  id: string
  stage: string
}): React.JSX.Element {
  return (
    <section
      id={id}
      data-stage={stage}
      className="relative isolate overflow-hidden bg-brand-dark text-paper"
    >
      <Image
        src={content.image}
        alt={content.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Scrim: nearly clear up top so the photograph breathes, deep at the
          bottom-left where the copy sits. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(15,35,71,0.82) 0%, rgba(15,35,71,0.45) 40%, rgba(15,35,71,0.12) 70%, transparent 100%)',
        }}
      />
      <div className="relative mx-auto flex min-h-dvh w-full max-w-7xl flex-col justify-end px-6 pb-24 pt-32 sm:px-8 lg:px-12 lg:pb-28">
        <div className="max-w-3xl">
          <h1 className="text-balance font-heading text-5xl font-bold leading-[1.04] sm:text-6xl lg:text-[4.5rem]">
            {noOrphan(content.headline)}
          </h1>
          {content.text.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? 'mt-6 max-w-2xl text-balance text-xl leading-relaxed text-paper/95'
                  : 'mt-4 max-w-2xl text-lg leading-relaxed text-paper/80'
              }
            >
              {paragraph}
            </p>
          ))}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`#${content.primaryCta.targetId}`}
              className="inline-flex items-center justify-center rounded-md bg-accent px-7 py-3.5 font-heading font-semibold text-brand-dark transition-colors duration-200 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              {content.primaryCta.label}
            </a>
            <a
              href={`#${content.secondaryCta.targetId}`}
              className="inline-flex items-center justify-center rounded-md border border-paper/40 px-7 py-3.5 font-heading font-semibold text-paper transition-colors duration-200 hover:border-paper/70 hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              {content.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroChapter
