'use client'

import * as React from 'react'
import { Link, usePathname } from '@/i18n/navigation'
import { cx } from '@/lib/cx'
import { Emblem } from '@/components/layout/Emblem'
import {
  JOURNEY_HREF,
  SITE_HEADER_WHAT_WE_DO,
  SUPPORT_HREF,
  type SiteHeaderActive,
} from '@/lib/nav'

/**
 * v3 site chrome for editorial pages (Who We Are, What We Do, Stories,
 * Support, Events). Fixed over the hero. Dark pages start transparent with
 * cream type; light pages (What We Do) start in the solid cream state. Scroll
 * always locks the cream bar. Below 1280px the link row yields to a drawer.
 */

const SCROLL_LOCK_PX = 8

export function SiteHeader({
  active = '',
  tone,
}: {
  active?: SiteHeaderActive
  tone?: 'dark' | 'light'
}): React.JSX.Element {
  const pathname = usePathname()
  const isHome = pathname === '/' || pathname === ''
  const resolvedTone = tone ?? (isHome ? 'dark' : 'light')
  const [scrolled, setScrolled] = React.useState(false)
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const solid = resolvedTone === 'light' || scrolled

  React.useEffect(() => {
    if (resolvedTone === 'light') return
    const onScroll = () => setScrolled(window.scrollY > SCROLL_LOCK_PX)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [resolvedTone])

  React.useEffect(() => {
    if (!drawerOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [drawerOpen])

  const ink = solid ? 'text-[#1E1B17]' : 'text-[#F7F3EA]'
  const activeClass = solid
    ? 'text-[#8A5F16] shadow-[inset_0_-2px_0_#8A5F16]'
    : 'text-[#C89A3C] shadow-[inset_0_-2px_0_#C89A3C]'

  return (
    <>
      <header
        className={cx(
          'fixed inset-x-0 top-0 z-[1000] border-b transition-[background,box-shadow,border-color] duration-300',
          solid
            ? 'border-[#D6CFC2] bg-[rgba(244,240,232,0.96)] shadow-none backdrop-blur-[10px]'
            : 'border-transparent bg-transparent',
        )}
      >
        <div
          className={cx(
            'flex items-center justify-between gap-7 px-16 transition-[height] duration-300 max-[680px]:px-7',
            solid ? 'h-[70px]' : 'h-[84px]',
          )}
        >
          <Link
            href="/"
            aria-label="Collective Calling home"
            className={cx('flex items-center gap-3', ink)}
          >
            <Emblem />
            <span className="text-[13.5px] font-bold leading-[1.25] tracking-[1.5px]">
              COLLECTIVE
              <br />
              CALLING
            </span>
          </Link>

          <nav
            aria-label="Main"
            className="flex items-center gap-[34px] max-xl:hidden"
          >
            <Link
              href="/who-we-are"
              aria-current={active === 'who' ? 'page' : undefined}
              className={cx(
                'flex min-h-11 items-center text-[13px] font-semibold tracking-[1.2px] transition-colors hover:text-[#C89A3C]',
                active === 'who' ? activeClass : ink,
              )}
            >
              WHO WE ARE
            </Link>
            <div className="group relative">
              <Link
                href="/what-we-do"
                aria-haspopup="true"
                aria-current={active === 'what' ? 'page' : undefined}
                className={cx(
                  'flex min-h-11 items-center gap-[7px] text-[13px] font-semibold tracking-[1.2px] transition-colors hover:text-[#C89A3C]',
                  active === 'what' ? activeClass : ink,
                )}
              >
                WHAT WE DO
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="h-[13px] w-[13px] transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                >
                  <path
                    d="M6 9.5 12 15l6-5.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <div className="invisible absolute top-full left-[-24px] z-10 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 translate-y-1.5">
                <div className="min-w-[288px] rounded-[10px] border border-[#D6CFC2] bg-[#FAF7F1] py-2 shadow-[0_14px_40px_rgba(30,27,23,0.14)]">
                  {SITE_HEADER_WHAT_WE_DO.map((item, index) => (
                    <React.Fragment key={item.href}>
                      {item.href === '/events' && (
                        <div className="mx-[22px] my-2 h-px bg-[#D6CFC2]" />
                      )}
                      <Link
                        href={item.href}
                        className="block px-[22px] py-[13px] hover:bg-[#F4F0E8]"
                      >
                        <span className="block text-[14.5px] font-semibold text-[#1E1B17]">
                          {item.label}
                        </span>
                        {index === 0 && (
                          <span className="mt-0.5 block text-[12.5px] text-[#5F594E]">
                            Tanzania
                          </span>
                        )}
                        {index === 1 && (
                          <span className="mt-0.5 block text-[12.5px] text-[#5F594E]">
                            Spain
                          </span>
                        )}
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/stories"
              aria-current={active === 'stories' ? 'page' : undefined}
              className={cx(
                'flex min-h-11 items-center text-[13px] font-semibold tracking-[1.2px] transition-colors hover:text-[#C89A3C]',
                active === 'stories' ? activeClass : ink,
              )}
            >
              STORIES
            </Link>
            <Link
              href="/contact"
              aria-current={active === 'contact' ? 'page' : undefined}
              className={cx(
                'flex min-h-11 items-center text-[13px] font-semibold tracking-[1.2px] transition-colors hover:text-[#C89A3C]',
                active === 'contact' ? activeClass : ink,
              )}
            >
              CONTACT
            </Link>
          </nav>

          <div className="flex items-center gap-3.5">
            <Link
              href={JOURNEY_HREF}
              className={cx(
                'inline-flex min-h-11 items-center gap-2.5 rounded-[6px] border px-[22px] text-[12.5px] font-semibold tracking-[1.4px] whitespace-nowrap transition-all duration-[250ms] hover:border-[#C89A3C] hover:text-[#C89A3C] max-xl:hidden',
                solid
                  ? 'border-[#1E1B17] bg-transparent text-[#1E1B17]'
                  : 'border-[rgba(247,243,234,0.7)] bg-[rgba(16,12,6,0.3)] text-[#F7F3EA]',
              )}
            >
              START YOUR JOURNEY <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={SUPPORT_HREF}
              className="inline-flex min-h-11 items-center rounded-[6px] bg-[#D9A83F] px-[26px] text-[12.5px] font-bold tracking-[1.4px] text-[#2A2415] whitespace-nowrap transition-all duration-[250ms] hover:-translate-y-px hover:bg-[#C89A3C]"
            >
              GIVE
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className={cx(
                'hidden h-11 w-11 items-center justify-center max-xl:inline-flex',
                ink,
              )}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-[26px] w-[26px]" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-[1001] bg-[rgba(16,12,6,0.55)]"
            onClick={() => setDrawerOpen(false)}
          />
          <aside
            role="dialog"
            aria-label="Site menu"
            className="fixed top-0 right-0 bottom-0 z-[1002] flex w-[min(380px,88vw)] flex-col bg-[#FAF7F1] shadow-[-16px_0_50px_rgba(16,12,6,0.3)]"
          >
            <div className="flex items-center justify-end px-5 pt-5">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="flex h-11 w-11 items-center justify-center text-[#1E1B17]"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                  <path
                    d="m6 6 12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <nav
              aria-label="Menu"
              className="flex flex-1 flex-col overflow-y-auto px-8 pt-2 pb-6"
            >
              <DrawerLink href="/" onClick={() => setDrawerOpen(false)}>
                HOME
              </DrawerLink>
              <DrawerLink href="/who-we-are" onClick={() => setDrawerOpen(false)}>
                WHO WE ARE
              </DrawerLink>
              <DrawerLink href="/what-we-do" onClick={() => setDrawerOpen(false)}>
                WHAT WE DO
              </DrawerLink>
              <div className="flex flex-col pl-[18px]">
                {SITE_HEADER_WHAT_WE_DO.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="flex min-h-11 items-center text-[14.5px] font-medium text-[#4A443B]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <DrawerLink href="/stories" onClick={() => setDrawerOpen(false)}>
                STORIES
              </DrawerLink>
              <DrawerLink href="/about/our-impact" onClick={() => setDrawerOpen(false)}>
                IMPACT
              </DrawerLink>
              <DrawerLink href="/contact" onClick={() => setDrawerOpen(false)}>
                CONTACT
              </DrawerLink>
            </nav>
            <div className="flex flex-col gap-3 border-t border-[#D6CFC2] px-8 pt-5 pb-7">
              <Link
                href={SUPPORT_HREF}
                onClick={() => setDrawerOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-[6px] bg-[#D9A83F] text-[13px] font-bold tracking-[1.4px] text-[#2A2415]"
              >
                GIVE
              </Link>
              <Link
                href={JOURNEY_HREF}
                onClick={() => setDrawerOpen(false)}
                className="flex min-h-12 items-center justify-center gap-2.5 rounded-[6px] border border-[#1E1B17] text-[13px] font-semibold tracking-[1.4px] text-[#1E1B17]"
              >
                START YOUR JOURNEY <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  )
}

function DrawerLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex min-h-12 items-center text-[14px] font-semibold tracking-[1.2px] text-[#1E1B17]"
    >
      {children}
    </Link>
  )
}

export default SiteHeader
