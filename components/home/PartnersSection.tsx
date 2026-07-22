import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * "Stronger Together" (mockup section 6): cream band, intro left with a quiet
 * CTA, partner marks right. The marks render as styled text (no partner logo
 * assets in the repo yet) plus the mockup's "Your Logo Here" slot.
 */
export function PartnersSection({
  content,
}: {
  content: HomeContent['partners']
}): React.JSX.Element {
  return (
    <section className="border-t border-ink/10 bg-paper py-16 text-ink sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="max-w-xs shrink-0">
            <h2 className="text-balance font-heading text-2xl text-brand-dark sm:text-3xl">
              {noOrphan(content.heading)}
            </h2>
            <p className="mt-3 font-body text-[15px] leading-relaxed text-muted">{content.body}</p>
            <Link
              href={content.cta.href}
              className="group mt-5 inline-block font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {content.cta.label}{' '}
              <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </Link>
          </div>

          <ul className="grid flex-1 grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {content.names.map((name) => (
              <li
                key={name}
                className="text-center font-heading text-lg leading-tight text-ink/70"
              >
                {name}
              </li>
            ))}
            <li className="flex items-center justify-center">
              <span className="border border-dashed border-ink/30 px-5 py-3 text-center font-body text-xs uppercase tracking-wider text-muted">
                {content.logoSlot}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default PartnersSection
