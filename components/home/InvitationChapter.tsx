import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { RevealLines } from '@/components/ui/RevealLines'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Chapter 6 — Participation. The invitation: warm gold field (the one
 * accent-washed chapter on the page), the four "Some people bring..." lines,
 * and the single journey CTA into /get-involved.
 */
export function InvitationChapter({
  content,
  id,
  stage,
}: {
  content: HomeContent['invitation']
  id: string
  stage: string
}): React.JSX.Element {
  return (
    <section id={id} data-stage={stage} className="bg-accent py-28 text-brand-dark sm:py-36">
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
        <h2 className="text-balance font-heading text-4xl font-bold leading-tight sm:text-5xl">
          {noOrphan(content.headline)}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-brand-dark/80">{content.intro}</p>
        <RevealLines
          lines={content.bring}
          className="mt-8 space-y-2"
          lineClassName="font-heading text-xl font-semibold"
        />
        <p className="mt-8 text-lg leading-relaxed text-brand-dark/80">{content.outro}</p>
        <Link
          href={content.cta.href}
          className="mt-10 inline-flex items-center justify-center rounded-md bg-brand-dark px-8 py-4 font-heading font-semibold text-paper transition-colors duration-200 hover:bg-brand-dark/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
        >
          {content.cta.label}
        </Link>
      </div>
    </section>
  )
}

export default InvitationChapter
