import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Reveal } from '@/components/ui/Reveal'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/home.types'
import type { Story } from '@/lib/content/types'

/**
 * "Stories That Inspire" (mockup section 4): cream band, serif heading with a
 * short subline, "View all stories" aligned right, and up to three real story
 * cards from the Sanity collection. Placeholder stories never render.
 */
export function StoriesSection({
  content,
  stories,
}: {
  content: HomeContent['storiesIntro']
  stories: Story[]
}): React.JSX.Element {
  const cards = stories.filter((story) => !story.placeholder).slice(0, 3)

  return (
    <section className="bg-paper py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-balance font-heading text-3xl text-brand-dark sm:text-4xl">
              {noOrphan(content.heading)}
            </h2>
            <p className="mt-2 font-body text-[15px] text-muted">{content.subline}</p>
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

        {cards.length > 0 && (
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {cards.map((story) => (
              <Reveal key={story.slug}>
                <Link
                  href={`/stories/${story.slug}`}
                  className="group block h-full border border-ink/10 bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {story.images?.[0] && (
                    <span className="relative block aspect-[16/10] overflow-hidden">
                      <Image
                        src={story.images[0]}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </span>
                  )}
                  <span className="block px-6 py-6">
                    <span className="block font-heading text-xl text-brand-dark">
                      {story.title}
                    </span>
                    <span className="mt-2 block font-body text-[15px] leading-relaxed text-muted">
                      {story.excerpt}
                    </span>
                    <span className="mt-4 block font-body text-xs font-semibold uppercase tracking-[0.18em] text-brand-dark transition-colors group-hover:text-accent">
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
        )}
      </div>
    </section>
  )
}

export default StoriesSection
