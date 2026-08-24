'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { cx } from '@/lib/cx'
import { MobileNav } from '@/components/layout/MobileNav'
import { NAV_SECTIONS, HEADER_NAV_SECTIONS, JOURNEY_HREF } from '@/lib/nav'

/**
 * Global site header, transcribed from the design: absolute over the hero,
 * 30px / 64px of padding, nothing on the left, flat links at 36px apart in
 * white, and the gold pill. The Aug 24 revision keeps this design but swaps
 * the subjects for the editorial pages' set (Home, Who We Are, What We Do,
 * Get Involved, Impact, Contact) and points the pill at the journey.
 *
 * The design only covers the homepage. Everywhere else the same bar is given a
 * navy field and made sticky, since there is no photograph under it to sit on.
 * Below lg the links give way to the mobile panel, which the design also does
 * not cover.
 *
 * A client component only so it can read the route; the links are static.
 */
export function Header() {
  const pathname = usePathname()
  const overlay = pathname === '/'

  return (
    <header
      className={cx(
        // The safe-area inset is folded into the padding rather than set
        // inline, so the design's 64px survives and the breakpoint variant
        // still applies. env() is 0 without a notch, so desktop is exactly
        // 64px as drawn.
        'left-0 right-0 top-0 z-50 flex items-center justify-between py-[30px] max-md:py-5',
        'pl-[calc(4rem+env(safe-area-inset-left))] pr-[calc(4rem+env(safe-area-inset-right))]',
        'max-md:pl-[calc(1.5rem+env(safe-area-inset-left))] max-md:pr-[calc(1.5rem+env(safe-area-inset-right))]',
        overlay ? 'absolute' : 'sticky bg-brand-dark',
      )}
    >
      <div />
      <nav
        aria-label="Primary"
        className="flex items-center gap-9 whitespace-nowrap max-lg:gap-4"
      >
        <span className="contents max-lg:hidden">
          {HEADER_NAV_SECTIONS.map((section) => (
            <Link
              key={section.key}
              href={section.href}
              className="text-[15.5px] font-medium text-white transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              {section.label}
            </Link>
          ))}
        </span>
        <Link
          href={JOURNEY_HREF}
          className="tap-min inline-flex items-center justify-center rounded-full bg-accent px-[26px] py-3 text-[14px] font-semibold text-brand-dark transition-all duration-[250ms] hover:bg-[#f8f4eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark max-md:px-4 max-md:text-[13px]"
        >
          Start Your Journey &rarr;
        </Link>
        <MobileNav sections={NAV_SECTIONS} />
      </nav>
    </header>
  )
}

export default Header
