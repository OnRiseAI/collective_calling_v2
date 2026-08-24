import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { cx } from '@/lib/cx'

/**
 * Header for the editorial pages (Who We Are, What We Do), transcribed from
 * their designs. Unlike the global site Header this one carries branding: the
 * gold three-ring emblem plus a two-line wordmark on the left, six uppercase
 * links, and a squared (6px radius) gold CTA — a different bar from the
 * homepage's on purpose; the two designs have not been reconciled yet.
 *
 * `tone` follows the field the bar sits on: `light` on the What We Do cream
 * hero, `dark` over the Who We Are photo hero. The designs hide the link row
 * below 1180px and keep only the brand and CTA; no mobile panel is drawn.
 */

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: 'HOME', href: '/' },
  { label: 'WHO WE ARE', href: '/who-we-are' },
  { label: 'WHAT WE DO', href: '/what-we-do' },
  { label: 'GET INVOLVED', href: '/get-involved' },
  { label: 'IMPACT', href: '/about/our-impact' },
  { label: 'CONTACT', href: '/contact' },
]

export function EditorialHeader({
  tone,
  current,
}: {
  tone: 'light' | 'dark'
  current: string
}): React.JSX.Element {
  const linkColor = tone === 'dark' ? 'text-[#F7F3EA]' : 'text-[#1E1B17]'

  return (
    <header className="relative z-20 flex items-center justify-between gap-8 px-10 py-[30px] max-[680px]:px-7">
      <Link
        href="/"
        aria-label="Collective Calling home"
        className={cx('flex items-center gap-3', linkColor)}
      >
        <svg viewBox="0 0 38 38" fill="none" className="h-9 w-9 flex-none" aria-hidden="true">
          <circle cx="19" cy="19" r="16.6" stroke="#C89A3C" strokeWidth="1.6" />
          <path
            d="M25.4 12.6A8.8 8.8 0 1 0 25.4 25.4"
            stroke="#C89A3C"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M23.4 15.1A5.4 5.4 0 1 0 23.4 22.9"
            stroke="#C89A3C"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-[14px] font-bold leading-[1.25] tracking-[1.6px]">
          COLLECTIVE
          <br />
          CALLING
        </span>
      </Link>
      <nav aria-label="Main" className="flex items-center gap-9 max-[1180px]:hidden">
        {NAV_ITEMS.map((item) =>
          item.href === current ? (
            <Link
              key={item.label}
              href={item.href}
              aria-current="page"
              className="-mb-[11px] border-b-2 border-[#C89A3C] pb-[9px] text-[13.5px] font-semibold tracking-[1.2px] text-[#C89A3C]"
            >
              {item.label}
            </Link>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className={cx(
                'text-[13.5px] font-semibold tracking-[1.2px] transition-colors hover:text-[#C89A3C]',
                linkColor,
              )}
            >
              {item.label}
            </Link>
          ),
        )}
      </nav>
      <Link
        href="/journey"
        className="inline-flex items-center gap-3 whitespace-nowrap rounded-[6px] bg-[#D9A83F] px-[26px] py-[15px] text-[13px] font-semibold tracking-[1.4px] text-[#2A2415] transition-all duration-[250ms] hover:-translate-y-px hover:bg-[#C89A3C] hover:text-[#1E1B17] max-[680px]:gap-2 max-[680px]:px-3.5 max-[680px]:py-[11px] max-[680px]:text-[10.5px] max-[680px]:tracking-[1px]"
      >
        START YOUR JOURNEY{' '}
        <span aria-hidden="true" className="text-[15px]">
          →
        </span>
      </Link>
    </header>
  )
}

export default EditorialHeader
