'use client'

import * as React from 'react'
import { cx } from '@/lib/cx'

/**
 * JourneyRail is the fixed wayfinding element for the experience-led homepage:
 * the four journey stages down the left edge on large screens, with a dot that
 * fills as the reader crosses into each stage. Clicking a stage jumps to its
 * anchor (smooth via the motion-safe html rule in globals.css).
 *
 * It observes section[data-stage] elements; several chapters may share one
 * stage, and the last stage whose section crossed the observation band wins.
 * Hidden entirely below lg; on small screens the page pacing does the work.
 */
const STAGES = [
  { id: 'understanding', label: 'Understanding' },
  { id: 'connection', label: 'Connection' },
  { id: 'possibility', label: 'Possibility' },
  { id: 'participation', label: 'Participation' },
] as const

type StageId = (typeof STAGES)[number]['id']

export function JourneyRail(): React.JSX.Element {
  const [active, setActive] = React.useState<StageId>('understanding')

  React.useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-stage]'))
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const stage = (entry.target as HTMLElement).dataset.stage as StageId | undefined
          if (stage) setActive(stage)
        }
      },
      // A narrow horizontal band around the upper third of the viewport, so the
      // active stage flips as a chapter's body reaches reading position.
      { rootMargin: '-30% 0px -60% 0px' },
    )

    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Journey"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-6 lg:flex"
    >
      {STAGES.map((stage) => {
        const isActive = stage.id === active
        return (
          <a
            key={stage.id}
            href={`#${stage.id}`}
            aria-current={isActive ? 'true' : undefined}
            className="group flex items-center gap-3 focus-visible:outline-none"
          >
            <span
              aria-hidden="true"
              className={cx(
                'h-2.5 w-2.5 rounded-full border-2 transition-colors duration-300',
                isActive ? 'border-accent bg-accent' : 'border-muted/60 bg-transparent',
              )}
            />
            <span
              className={cx(
                'text-xs font-semibold tracking-wide transition-colors duration-300',
                isActive ? 'text-ink' : 'text-muted/80',
                'group-hover:text-ink group-focus-visible:text-ink',
              )}
            >
              {stage.label}
            </span>
          </a>
        )
      })}
    </nav>
  )
}

export default JourneyRail
