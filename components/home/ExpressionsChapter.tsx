import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Reveal } from '@/components/ui/Reveal'
import { RevealLines } from '@/components/ui/RevealLines'
import { noOrphan } from '@/lib/text'
import { cx } from '@/lib/cx'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Chapter 3 — Connection. Opens with the shared-belief credo, then the three
 * expressions (branches of the tree) as full-width alternating photo/copy rows.
 * Deliberately not a 3-card grid: each expression gets room to be its own
 * story, and the alternation gives the chapter a walking rhythm.
 */
export function ExpressionsChapter({
  content,
  id,
  stage,
}: {
  content: HomeContent['expressions']
  id: string
  stage: string
}): React.JSX.Element {
  return (
    <section id={id} data-stage={stage} className="bg-indigo-tint py-28 text-ink sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance font-heading text-4xl font-bold leading-tight text-brand-dark sm:text-5xl">
            {noOrphan(content.headline)}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">{content.intro}</p>
          <RevealLines
            lines={content.credo}
            className="mt-8 space-y-2"
            lineClassName="font-heading text-xl font-semibold text-brand-dark"
          />
        </div>

        <div className="mt-20 space-y-20 sm:mt-24 sm:space-y-24">
          {content.rows.map((row, index) => (
            <Reveal key={row.key}>
              <article
                className={cx(
                  'flex flex-col items-center gap-10 lg:gap-16',
                  index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row',
                )}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md lg:w-1/2">
                  <Image
                    src={row.image}
                    alt={row.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <p className="text-sm font-semibold uppercase tracking-widest text-brand">
                    {row.eyebrow}
                  </p>
                  <h3 className="mt-3 text-balance font-heading text-2xl font-bold leading-snug text-brand-dark sm:text-3xl">
                    {noOrphan(row.heading)}
                  </h3>
                  <p className="mt-5 font-heading text-lg font-semibold leading-relaxed text-ink">
                    {row.belief}
                  </p>
                  <p className="mt-4 text-lg leading-relaxed text-ink/80">{row.body}</p>
                  <Link
                    href={row.cta.href}
                    className="group mt-7 inline-flex items-center gap-2 font-heading font-semibold text-brand underline decoration-2 decoration-transparent underline-offset-[6px] transition-[text-decoration-color] duration-200 hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    {row.cta.label}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
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

export default ExpressionsChapter
