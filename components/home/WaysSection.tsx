import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Reveal } from '@/components/ui/Reveal'
import { noOrphan } from '@/lib/text'
import type { HomeContent, WayCard } from '@/lib/content/home.types'

/**
 * "Three Ways We Create Impact" (mockup section 2): centred serif heading over
 * three cream cards — photograph, an overlapping circular gold line icon,
 * letterspaced small-caps title, blurb, and a quiet "Learn more" link.
 */

const ICONS: Record<WayCard['key'], React.JSX.Element> = {
  community: (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" />
      <path d="M15.5 14.6c2.6.3 4.5 1.9 4.5 4.4" />
    </svg>
  ),
  'children-families': (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21C7 17 3.5 13.6 3.5 9.9 3.5 7.2 5.6 5 8.3 5c1.5 0 2.9.7 3.7 1.8C12.8 5.7 14.2 5 15.7 5c2.7 0 4.8 2.2 4.8 4.9 0 3.7-3.5 7.1-8.5 11.1Z" />
    </svg>
  ),
  businesses: (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="8" width="17" height="12" rx="1.5" />
      <path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8" />
      <path d="M3.5 13h17" />
    </svg>
  ),
}

export function WaysSection({ content }: { content: HomeContent['ways'] }): React.JSX.Element {
  return (
    <section className="bg-paper py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <h2 className="text-balance text-center font-heading text-3xl text-brand-dark sm:text-4xl">
          {noOrphan(content.heading)}
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {content.cards.map((card) => (
            <Reveal key={card.key}>
              <article className="flex h-full flex-col border border-ink/10 bg-card">
                <div className="relative m-4 mb-0 aspect-[16/10] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative flex flex-1 flex-col items-center px-7 pb-8 text-center">
                  <span className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-accent/50 bg-brand-dark text-accent">
                    {ICONS[card.key]}
                  </span>
                  <h3 className="mt-5 font-body text-sm font-semibold uppercase tracking-[0.18em] text-brand-dark">
                    {card.title}
                  </h3>
                  <p className="mt-3 font-body text-[15px] leading-relaxed text-muted">
                    {card.body}
                  </p>
                  <Link
                    href={card.href}
                    className="group mt-auto pt-5 font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Learn more{' '}
                    <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WaysSection
