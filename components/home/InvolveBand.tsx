import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { noOrphan } from '@/lib/text'
import type { HomeContent, InvolveAction } from '@/lib/content/home.types'

/**
 * Get Involved band + charity shops panel (mockup section 7): dark charcoal
 * split — photograph left, the Donate / Volunteer / Partner icon trio centre,
 * and the "Visit Our Charity Shops" gold-edged panel right.
 */

const ICONS: Record<InvolveAction['icon'], React.JSX.Element> = {
  donate: (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21C7 17 3.5 13.6 3.5 9.9 3.5 7.2 5.6 5 8.3 5c1.5 0 2.9.7 3.7 1.8C12.8 5.7 14.2 5 15.7 5c2.7 0 4.8 2.2 4.8 4.9 0 3.7-3.5 7.1-8.5 11.1Z" />
    </svg>
  ),
  volunteer: (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <circle cx="12" cy="12" r="4.5" />
    </svg>
  ),
  partner: (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="8" width="17" height="12" rx="1.5" />
      <path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8" />
      <path d="M3.5 13h17" />
    </svg>
  ),
}

export function InvolveBand({ content }: { content: HomeContent['involve'] }): React.JSX.Element {
  return (
    <section className="bg-brand-dark text-paper">
      <div className="grid lg:grid-cols-12">
        {/* Photograph */}
        <div className="relative min-h-64 lg:col-span-3" aria-hidden="true">
          <Image
            src={content.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(15,22,32,0.15), rgba(15,22,32,0.7))',
            }}
          />
        </div>

        {/* Actions */}
        <div className="px-6 py-16 text-center sm:px-10 lg:col-span-5 lg:py-20">
          <h2 className="text-balance font-heading text-3xl sm:text-[2.1rem]">
            {noOrphan(content.heading)}
          </h2>
          <p className="mx-auto mt-3 max-w-sm font-body text-[15px] leading-relaxed text-paper/70">
            {content.body}
          </p>
          <ul className="mt-10 grid grid-cols-3 gap-6">
            {content.actions.map((action) => (
              <li key={action.icon}>
                <Link
                  href={action.href}
                  className="group flex flex-col items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 text-accent transition-colors group-hover:bg-accent group-hover:text-brand-dark">
                    {ICONS[action.icon]}
                  </span>
                  <span className="font-body text-xs font-semibold uppercase tracking-[0.18em]">
                    {action.title}
                  </span>
                  <span className="font-body text-xs leading-snug text-paper/60">
                    {action.blurb}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Charity shops panel */}
        <div className="flex flex-col justify-center border-t border-paper/10 bg-footer px-8 py-14 sm:px-10 lg:col-span-4 lg:border-l lg:border-t-0">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Collective Calling
          </p>
          <h2 className="mt-4 text-balance font-heading text-2xl sm:text-3xl">
            {noOrphan(content.shops.heading)}
          </h2>
          <p className="mt-4 max-w-sm font-body text-[15px] leading-relaxed text-paper/70">
            {content.shops.body}
          </p>
          <Link
            href={content.shops.cta.href}
            className="group mt-6 inline-block w-fit font-body text-xs font-semibold uppercase tracking-[0.18em] text-accent transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {content.shops.cta.label}{' '}
            <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default InvolveBand
