import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { noOrphan } from '@/lib/text'
import type { HomeContent, InvolveAction } from '@/lib/content/home.types'

/**
 * Get Involved band + charity shops (mockup section 7), four-part split:
 * photograph | dark Get Involved panel with the Donate / Volunteer / Partner
 * icon trio | goods-donation photograph | cream "Visit Our Charity Shops"
 * panel. The photographs hide on small screens; the two panels stack.
 */

const ICONS: Record<InvolveAction['icon'], React.JSX.Element> = {
  donate: (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21C7 17 3.5 13.6 3.5 9.9 3.5 7.2 5.6 5 8.3 5c1.5 0 2.9.7 3.7 1.8C12.8 5.7 14.2 5 15.7 5c2.7 0 4.8 2.2 4.8 4.9 0 3.7-3.5 7.1-8.5 11.1Z" />
    </svg>
  ),
  volunteer: (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <circle cx="12" cy="12" r="4.5" />
    </svg>
  ),
  partner: (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
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
        {/* Volunteers photograph */}
        <div className="relative hidden lg:col-span-2 lg:block" aria-hidden="true">
          <Image
            src={content.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 17vw, 0vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(15,22,32,0.1), rgba(15,22,32,0.6))',
            }}
          />
        </div>

        {/* Get Involved actions */}
        <div className="px-6 py-12 text-center sm:px-10 lg:col-span-5 lg:py-14">
          <h2 className="text-balance font-heading text-3xl">{noOrphan(content.heading)}</h2>
          <p className="mx-auto mt-2.5 max-w-sm font-body text-sm leading-relaxed text-paper/70">
            {content.body}
          </p>
          <ul className="mt-8 grid grid-cols-3 gap-5">
            {content.actions.map((action) => (
              <li key={action.icon}>
                <Link
                  href={action.href}
                  className="group flex flex-col items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/50 text-accent transition-colors group-hover:bg-accent group-hover:text-brand-dark">
                    {ICONS[action.icon]}
                  </span>
                  <span className="font-body text-[11px] font-semibold uppercase tracking-[0.18em]">
                    {action.title}
                  </span>
                  <span className="font-body text-[11px] leading-snug text-paper/60">
                    {action.blurb}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Goods-donation photograph */}
        <div className="relative hidden lg:col-span-2 lg:block" aria-hidden="true">
          <Image
            src="/images/spain/help-4.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 17vw, 0vw"
            className="object-cover"
          />
        </div>

        {/* Charity shops panel: cream, dark text (mockup). */}
        <div className="flex flex-col justify-center bg-paper px-8 py-12 text-ink sm:px-10 lg:col-span-3 lg:py-14">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
            Collective Calling
          </p>
          <h2 className="mt-3 text-balance font-heading text-2xl text-brand-dark sm:text-[1.7rem]">
            {noOrphan(content.shops.heading)}
          </h2>
          <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-muted">
            {content.shops.body}
          </p>
          <Link
            href={content.shops.cta.href}
            className="group mt-5 inline-block w-fit font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-dark transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
