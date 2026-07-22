import * as React from 'react'
import { noOrphan } from '@/lib/text'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Chapter 2 — Understanding, continued. Deliberately image-free: after the
 * photographic hero, a quiet white chapter with copy at reading width. The one
 * emphasis is the pulled line, set large with a gold underline. The stillness
 * is the design; nothing competes with the words.
 */
export function PhilosophyChapter({
  content,
  id,
  stage,
}: {
  content: HomeContent['philosophy']
  id: string
  stage: string
}): React.JSX.Element {
  return (
    <section id={id} data-stage={stage} className="bg-paper py-28 text-ink sm:py-36">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <h2 className="text-balance font-heading text-4xl font-bold leading-tight text-brand-dark sm:text-5xl">
          {noOrphan(content.headline)}
        </h2>
        <div className="mt-10 space-y-6">
          {content.body.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-ink/85">
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-14 text-balance font-heading text-2xl font-semibold leading-snug text-brand-dark sm:text-3xl">
          <span className="box-decoration-clone bg-[linear-gradient(transparent_82%,var(--color-accent)_82%)] pb-1">
            {content.pullLine}
          </span>
        </p>
      </div>
    </section>
  )
}

export default PhilosophyChapter
