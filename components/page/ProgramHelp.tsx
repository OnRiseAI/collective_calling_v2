import * as React from 'react'
import { cx } from '@/lib/cx'
import { noOrphan } from '@/lib/text'
import { Section, type SectionTone } from '@/components/ui/Section'
import type { ProgramHelpItem } from '@/lib/content/pages/types'

/**
 * ProgramHelp renders a programme's "how we help" section: a gold eyebrow, a
 * Fraunces section heading (h2), and the ways the work helps as a clean,
 * responsive grid. Each way is a card with a Fraunces sub-section title (h3, so
 * the page hero keeps the only h1) and a Mulish body in warm taupe.
 *
 * It follows the brand board card spec (section 6): a warm white surface lifted
 * off a soft band, a 0.75rem radius, a soft warm shadow, and a thin indigo top
 * rule that flags each way as part of one connected programme. The eyebrow and
 * heading sit above the grid, on the same band, so the lead-in and the cards
 * read as a single section.
 *
 * The component is deliberately general so both Spain and Tanzania can reuse it
 * with their own eyebrow, heading, and items. Pass `tone` to set the band; it
 * defaults to warm ivory paper.
 *
 * Props:
 * - eyebrow: the small uppercase label above the heading (for example "How we help").
 * - heading: the section heading, rendered as an h2. It also names the section
 *            landmark, so the section is never mislabeled for a different programme.
 * - items:   the ways the work helps, each a `{ title, body }` rendered as an h3 card.
 * - tone:    the Section band background (defaults to paper).
 * - accent:  the colour of the thin decorative top rule on each card, flagging
 *            the programme (brand indigo for Spain, clay terracotta for Tanzania,
 *            gold for general). Defaults to brand indigo so Spain is unchanged.
 */

type ProgramHelpAccent = 'brand' | 'clay' | 'accent'

type ProgramHelpProps = {
  eyebrow: string
  heading: string
  items: ProgramHelpItem[]
  tone?: SectionTone
  accent?: ProgramHelpAccent
}

// The thin top rule that flags each card as part of one connected programme.
// Defaulting to brand indigo keeps Spain's existing look unchanged.
const accentRule: Record<ProgramHelpAccent, string> = {
  brand: 'bg-brand',
  clay: 'bg-clay',
  accent: 'bg-accent',
}



export function ProgramHelp({
  eyebrow,
  heading,
  items,
  tone = 'paper',
  accent = 'brand',
}: ProgramHelpProps) {
  return (
    // The h2 heading names this landmark, so the section is labelled by its own
    // heading rather than a hardcoded label that could mislabel another programme.
    <Section tone={tone} aria-label={heading}>
      <div className="max-w-2xl">
        <p className="font-body text-lg font-bold uppercase tracking-[0.08em] text-accent">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-heading text-[38px] leading-[1.15] font-medium text-balance text-ink">
          {noOrphan(heading)}
        </h2>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
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
            {/* Thin rule flags each way as part of one connected programme.
                Its colour comes from the accent prop (indigo, clay, or gold). */}
            <span aria-hidden className={cx('h-1 w-full shrink-0', accentRule[accent])} />

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

export default ProgramHelp
