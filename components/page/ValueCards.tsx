import * as React from 'react'
import { cx } from '@/lib/cx'
import { Section, type SectionTone } from '@/components/ui/Section'
import type { ValueItem } from '@/lib/content/pages/types'

/**
 * ValueCards renders a charity's stated values as a calm, editorial grid within
 * a Section of the given tone. It is the About-page expression of the brand
 * board card spec (section 6): a warm white surface on the band, a 0.75rem
 * radius, a soft warm shadow, and a thin antique-gold top rule that flags each
 * value as a point of conviction.
 *
 * Each card carries a Fraunces title (h3, a sub-section heading so the page hero
 * keeps the only h1) and a Mulish body in warm taupe. The grid is responsive:
 * one column on phones, two from the small breakpoint up, holding a comfortable
 * reading measure per card so the longer value statements stay legible.
 *
 * `items` are the values to show; `tone` selects the band background (defaults
 * to the soft cool indigo tint so the white cards lift off the page).
 */

type ValueCardsProps = {
  items: ValueItem[]
  tone?: SectionTone
}


export function ValueCards({ items, tone = 'indigo-tint' }: ValueCardsProps) {
  return (
    <Section tone={tone} aria-label="Our values">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
        {items.map((item) => (
          <li
            key={item.title}
            className={cx(
              'group relative flex h-full flex-col overflow-hidden rounded-xl bg-white',
              'border border-muted/20 shadow-[0_8px_24px_rgba(31,27,22,0.08)]',
              'transition-shadow duration-200 ease-out',
              'hover:shadow-[0_12px_32px_rgba(31,27,22,0.12)]',
            )}
          >
            {/* Thin antique-gold rule flags each value as a point of conviction. */}
            <span aria-hidden className="h-1 w-full shrink-0 bg-accent" />

            <div className="flex flex-1 flex-col gap-3 p-7 lg:p-8">
              <h3 className="font-heading text-[1.75rem] leading-[1.2] font-semibold text-balance text-ink">
                {item.title}
              </h3>
              <p className="font-body text-base leading-[1.65] text-muted">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default ValueCards
