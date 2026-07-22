import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Values In Action band (mockup section 3): dark charcoal, gold eyebrow, serif
 * heading, short body, gold CTA; photograph fills the right half.
 */
export function ViaBand({ content }: { content: HomeContent['via'] }): React.JSX.Element {
  return (
    <section className="relative isolate overflow-hidden bg-brand-dark text-paper">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block" aria-hidden="true">
        <Image
          src={content.image}
          alt=""
          fill
          sizes="50vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, #0f1620 0%, rgba(15,22,32,0.45) 35%, rgba(15,22,32,0.15) 100%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="max-w-xl">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {content.eyebrow}
          </p>
          <h2 className="mt-5 text-balance font-heading text-3xl leading-snug sm:text-4xl">
            {noOrphan(content.heading)}
          </h2>
          <p className="mt-6 max-w-md font-body text-[15px] leading-relaxed text-paper/75">
            {content.body}
          </p>
          <Link
            href={content.cta.href}
            className="mt-8 inline-flex items-center justify-center rounded-[--radius] bg-accent px-6 py-3 font-body text-sm font-semibold uppercase tracking-wider text-brand-dark transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
          >
            {content.cta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ViaBand
