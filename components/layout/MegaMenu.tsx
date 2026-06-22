'use client'

import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { type NavSection } from '@/lib/nav'

/**
 * Desktop mega-menu (Tearfund pattern).
 *
 * Each top-level section opens a dropdown on hover AND on keyboard focus. The
 * panel pairs the section's link list with a featured teaser card (the warm
 * image/teaser slot beside the links). Accessibility:
 * - the trigger is a real link with aria-haspopup / aria-expanded,
 * - the panel opens on focus-within and pointer enter, and closes on Escape,
 *   on blur leaving the section, and on pointer leave,
 * - Escape returns focus to the section trigger,
 * - nothing is trapped: Tab moves naturally through the panel and onward.
 */

// A short, dignified teaser per section. Programme accent follows the brand
// board cue (clay = Tanzania, indigo = Spain, gold = general). Kept calm.
type Teaser = {
  eyebrow: string
  title: string
  body: string
  cta: string
  href: string
  accent: 'gold' | 'clay' | 'indigo'
}

const TEASERS: Record<string, Teaser> = {
  appeals: {
    eyebrow: 'Where we work',
    title: 'Restoring dignity, family by family',
    body: 'Spain and Tanzania: two countries, one calling to bring people home to each other.',
    cta: 'See all appeals',
    href: '/appeals',
    accent: 'gold',
  },
  stories: {
    eyebrow: 'Real moments',
    title: 'The people behind the work',
    body: 'Honest stories from the shower van in Marbella to the Centre of Hope in Tanzania.',
    cta: 'Read the stories',
    href: '/stories',
    accent: 'clay',
  },
  'get-involved': {
    eyebrow: 'Join in',
    title: 'There is a place for you here',
    body: 'Sponsor a child, fundraise, pray, or invite us to speak. Every part matters.',
    cta: 'Find your way in',
    href: '/get-involved',
    accent: 'indigo',
  },
  about: {
    eyebrow: 'Who we are',
    title: 'A charity built on trust',
    body: 'Our team, our impact, and full financial accountability, all in the open.',
    cta: 'About Collective Calling',
    href: '/about',
    accent: 'gold',
  },
}

const accentRule: Record<Teaser['accent'], string> = {
  gold: 'before:bg-accent',
  clay: 'before:bg-clay',
  indigo: 'before:bg-brand',
}

const accentTint: Record<Teaser['accent'], string> = {
  gold: 'bg-paper',
  clay: 'bg-clay-tint',
  indigo: 'bg-indigo-tint',
}

function SectionMenu({
  section,
  align,
}: {
  section: NavSection
  align: 'left' | 'right'
}) {
  const [open, setOpen] = React.useState(false)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerRef = React.useRef<HTMLAnchorElement>(null)
  const teaser = TEASERS[section.key]
  const panelId = `mega-${section.key}`

  const cancelClose = React.useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  // Small grace delay on pointer leave so the diagonal travel to the panel
  // does not snap it shut.
  const scheduleClose = React.useCallback(() => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }, [cancelClose])

  React.useEffect(() => cancelClose, [cancelClose])

  function onKeyDown(e: React.KeyboardEvent<HTMLLIElement>) {
    if (e.key === 'Escape' && open) {
      e.stopPropagation()
      setOpen(false)
      triggerRef.current?.focus()
    }
  }

  return (
    <li
      className="relative"
      onPointerEnter={() => {
        cancelClose()
        setOpen(true)
      }}
      onPointerLeave={scheduleClose}
      onFocus={() => {
        cancelClose()
        setOpen(true)
      }}
      onBlur={(e) => {
        // Close only when focus leaves the whole section (trigger + panel).
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setOpen(false)
        }
      }}
      onKeyDown={onKeyDown}
    >
      <Link
        ref={triggerRef}
        href={section.href}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex items-center gap-1.5 rounded-md px-1 py-2 text-paper/90 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
      >
        {section.label}
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={`mt-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {/* Gold underline draws in under the open / hovered section. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-px left-1 right-4 h-0.5 origin-left rounded-full bg-accent transition-transform duration-200 ${
          open ? 'scale-x-100' : 'scale-x-0'
        }`}
      />

      <div
        id={panelId}
        role="group"
        aria-label={section.label}
        hidden={!open}
        className={`absolute top-full z-50 pt-3 ${align === 'right' ? 'right-0' : 'left-0'}`}
      >
        <div className="grid w-[34rem] grid-cols-[1fr_1.1fr] overflow-hidden rounded-xl border border-muted/20 bg-paper text-ink shadow-[0_18px_44px_rgba(15,35,71,0.22)]">
          <ul className="flex flex-col gap-1 p-4">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base text-ink/90 transition-colors hover:bg-indigo-tint hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {teaser ? (
            <Link
              href={teaser.href}
              className={`group relative flex flex-col justify-end gap-2 p-5 ${accentTint[teaser.accent]} before:absolute before:inset-y-5 before:left-0 before:w-1 before:rounded-full ${accentRule[teaser.accent]} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
            >
              <span className="font-body text-xs font-bold uppercase tracking-[0.12em] text-clay">
                {teaser.eyebrow}
              </span>
              <span className="text-balance font-heading text-xl leading-tight text-brand-dark">
                {teaser.title}
              </span>
              <span className="text-sm leading-relaxed text-muted">{teaser.body}</span>
              <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                {teaser.cta}
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </li>
  )
}

export function MegaMenu({ sections }: { sections: NavSection[] }) {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-7 font-body text-base font-medium">
        {sections.map((section, i) => (
          <SectionMenu
            key={section.key}
            section={section}
            // Right-align the panels for the trailing sections so the wide
            // dropdown never overflows the right edge of the viewport.
            align={i >= sections.length - 2 ? 'right' : 'left'}
          />
        ))}
      </ul>
    </nav>
  )
}

export default MegaMenu
