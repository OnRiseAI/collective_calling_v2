import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Reveal } from '@/components/ui/Reveal'
import { RevealLines } from '@/components/ui/RevealLines'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/home.types'
import type { Story } from '@/lib/content/types'

/**
 * Chapter 4 — Possibility. The three "Someone..." lines land one by one, then
 * up to three real stories appear as moments (photo when there is one, an
 * excerpt, and a quiet link into the story). Placeholder stories never render
 * here; if no real stories exist the chapter simply ends after the outro.
 */
export function PossibleChapter({
  content,
  stories,
  id,
  stage,
}: {
  content: HomeContent['possible']
  stories: Story[]
  id: string
  stage: string
}): React.JSX.Element {
  const moments = stories.filter((story) => !story.placeholder).slice(0, 3)

  return (
    <section id={id} data-stage={stage} className="bg-paper py-28 text-ink sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance font-heading text-4xl font-bold leading-tight text-brand-dark sm:text-5xl">
            {noOrphan(content.headline)}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/80">{content.intro}</p>
          <RevealLines
            lines={content.moments}
            className="mt-8 space-y-2"
            lineClassName="font-heading text-xl font-semibold text-brand-dark"
          />
          <p className="mt-8 text-lg leading-relaxed text-ink/80">{content.outro}</p>
        </div>

        {moments.length > 0 && (
          <div className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-3">
            {moments.map((story) => (
              <Reveal key={story.slug}>
                <Link
                  href={`/stories/${story.slug}`}
                  className="group block focus-visible:outline-none"
                >
                  {story.images?.[0] && (
                    <span className="relative block aspect-[4/3] overflow-hidden rounded-md">
                      <Image
                        src={story.images[0]}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </span>
                  )}
                  <span className="mt-5 block font-heading text-xl font-bold text-brand-dark group-hover:underline group-hover:decoration-accent group-hover:decoration-2 group-hover:underline-offset-4">
                    {story.title}
                  </span>
                  <span className="mt-2 block leading-relaxed text-ink/75">{story.excerpt}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PossibleChapter
