import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Reveal } from '@/components/ui/Reveal'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * "Stories That Inspire" (mockup section 4): cream band, serif heading with a
 * short subline, "View all stories" aligned right, and the mockup's three
 * curated cards (a story, the Mobile Shower Unit, Business in Action) — not a
 * CMS story feed, so the row is always full.
 */
export function StoriesSection({
  content,
}: {
  content: HomeContent['storiesIntro']
}): React.JSX.Element {
  return (
    <section className="bg-paper py-14 text-ink sm:py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-balance font-heading text-3xl text-brand-dark sm:text-4xl">
              {noOrphan(content.heading)}
            </h2>
            <p className="mt-1.5 font-body text-sm text-muted">{content.subline}</p>
          </div>
          <Link
            href={content.viewAll.href}
            className="group font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {content.viewAll.label}{' '}
            <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </div>

        <div className="mt-8 grid gap-7 md:grid-cols-3">
          {content.cards.map((card) => (
            <Reveal key={card.title}>
              <Link
                href={card.href}
                className="group block h-full border border-ink/10 bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="relative m-3 mb-0 block aspect-[16/10] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </span>
                <span className="block px-5 py-5">
                  <span className="block font-heading text-xl text-brand-dark">{card.title}</span>
                  <span className="mt-1.5 block font-body text-sm leading-relaxed text-muted">
                    {card.blurb}
                  </span>
                  <span className="mt-3.5 block font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-dark transition-colors group-hover:text-accent">
                    Read more{' '}
                    <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">
                      &rarr;
                    </span>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StoriesSection
