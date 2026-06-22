import * as React from 'react'
import { Section } from '@/components/ui/Section'
import type { ImpactStat } from '@/lib/content/types'

/**
 * Impact stats band for the Collective Calling homepage.
 *
 * A calm, premium three-up band that frames the charity's real, defining facts
 * (Spain's first mobile shower unit, the Centre of Hope, and the share of every
 * euro that reaches the programs). These are framings, not invented numbers.
 *
 * Per the brand board:
 *  - sits in a soft indigo-tint band to create rhythm against the paper hero.
 *  - opens with a gold eyebrow (H5, uppercase, with a short gold rule echoing the
 *    gala poster) above an h2 section heading.
 *  - each tile pairs a tasteful inline gold icon (gold is decorative / large only,
 *    section 2) with a large Fraunces value and a Mulish label in warm taupe.
 *
 * The grid is a <ul> of <li> tiles so the three facts read as a list to assistive
 * technology (and the test can find three list items).
 */

type IconProps = { className?: string }

/**
 * Local icon map for the three content keys. Tasteful, single-weight line icons
 * drawn on a 24x24 grid, rendered in gold (`text-accent`) by the caller. They are
 * decorative beside the visible value text, so each is marked aria-hidden.
 */
const icons: Record<ImpactStat['icon'], (props: IconProps) => React.JSX.Element> = {
  // Shower head with falling water: Spain's mobile shower unit.
  shower: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 4h4a6 6 0 0 1 6 6" />
      <path d="M14 10a6 6 0 0 1 6 6v0H8v0a6 6 0 0 1 6-6Z" />
      <path d="M11 19v1.5M14 20v1.5M17 19v1.5" />
    </svg>
  ),
  // A house: the Centre of Hope, a safe haven in Tanzania.
  home: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 11 12 4l8 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  ),
  // A heart: the share of every euro that reaches the programs.
  heart: ({ className }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 20s-7-4.6-7-9.7A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 3.3C19 15.4 12 20 12 20Z" />
    </svg>
  ),
}

export function ImpactStats(props: { stats: ImpactStat[] }): React.JSX.Element {
  const { stats } = props

  return (
    <Section tone="indigo-tint" containerSize="wide">
      {/* Eyebrow: gold, uppercase, with a short gold rule echoing the gala poster. */}
      <p className="flex items-center justify-center gap-3 font-body text-sm font-bold uppercase tracking-[0.18em] text-accent">
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        Our impact
      </p>

      {/* Section heading. The hero owns the page h1, so this is an h2. */}
      <h2 className="mx-auto mt-5 max-w-2xl text-balance text-center font-heading text-3xl font-medium leading-[1.15] text-ink sm:text-4xl">
        The difference your support makes
      </h2>

      <ul className="mx-auto mt-14 grid max-w-4xl gap-x-10 gap-y-12 sm:grid-cols-3 sm:gap-y-0">
        {stats.map((stat) => {
          const Icon = icons[stat.icon]
          return (
            <li key={stat.icon} className="flex flex-col items-center text-center">
              {/* Gold inline icon in a soft, calm ring. */}
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/20">
                <Icon className="h-7 w-7" />
              </span>

              {/* Large Fraunces value. Not interactive. */}
              <p className="mt-6 font-heading text-3xl font-medium leading-tight text-brand sm:text-[2.25rem]">
                {stat.value}
              </p>

              {/* Mulish label in warm taupe. */}
              <p className="mt-3 max-w-[22rem] font-body text-base leading-relaxed text-muted">
                {stat.label}
              </p>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

export default ImpactStats
