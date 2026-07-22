import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { RevealLines } from '@/components/ui/RevealLines'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Chapter 5 — Possibility, continued. Typography is the visual: the five
 * coming-together lines land in rhythm on a dark field. No stat counters, no
 * charts; the chapter says what impact is made of, not how big it is.
 */
export function ImpactChapter({
  content,
  id,
  stage,
}: {
  content: HomeContent['impact']
  id: string
  stage: string
}): React.JSX.Element {
  return (
    <section id={id} data-stage={stage} className="bg-brand-dark py-28 text-paper sm:py-36">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <h2 className="text-balance font-heading text-4xl font-bold leading-tight sm:text-5xl">
          {noOrphan(content.headline)}
        </h2>
        <div className="mt-8 space-y-4">
          {content.intro.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-paper/80">
              {paragraph}
            </p>
          ))}
        </div>
        <RevealLines
          lines={content.moments}
          className="mt-12 space-y-4"
          lineClassName="font-heading text-2xl font-semibold leading-snug text-paper sm:text-3xl"
        />
        <p className="mt-12 text-lg leading-relaxed text-paper/80">{content.outro}</p>
        <Link
          href={content.cta.href}
          className="mt-8 inline-flex items-center justify-center rounded-md border border-paper/40 px-7 py-3.5 font-heading font-semibold text-paper transition-colors duration-200 hover:border-paper/70 hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
        >
          {content.cta.label}
        </Link>
      </div>
    </section>
  )
}

export default ImpactChapter
