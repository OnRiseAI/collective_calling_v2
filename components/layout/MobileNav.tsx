'use client'

import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/Button'
import { DONATE_HREF, type NavSection } from '@/lib/nav'

/**
 * Mobile navigation.
 *
 * A single toggle button controls a full-height panel. Accessibility:
 * - the toggle exposes aria-expanded and aria-controls pointing at the panel,
 * - the panel closes on Escape and on backdrop click,
 * - focus moves into the panel when it opens and returns to the toggle on close
 *   (focus management on both edges),
 * - body scroll is locked while open.
 *
 * Sections are shown with their child items as grouped lists (no nested toggles
 * needed at this size), so every destination is reachable in one open.
 */
export function MobileNav({ sections }: { sections: NavSection[] }) {
  const [open, setOpen] = React.useState(false)
  const panelId = 'mobile-nav-panel'
  const toggleRef = React.useRef<HTMLButtonElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)
  // Tracks whether the open transition came from a user toggle, so we only
  // pull focus on a real open (not on initial mount).
  const justOpened = React.useRef(false)

  const close = React.useCallback(() => {
    setOpen(false)
    // Return focus to the trigger that opened the panel.
    toggleRef.current?.focus()
  }, [])

  // Escape closes from anywhere while open. Tab and Shift+Tab are trapped inside
  // the panel so keyboard focus cannot escape to the header controls behind the
  // backdrop while the dialog is modal (aria-modal="true").
  React.useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.tabIndex !== -1)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement | null
      // Wrap forward from last to first, and backward from first to last. Also
      // pull focus back into the panel if it has somehow landed outside.
      if (e.shiftKey) {
        if (active === first || !panel.contains(active)) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (active === last || !panel.contains(active)) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  // Body scroll lock while open.
  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Move focus into the panel when it opens.
  React.useEffect(() => {
    if (open && justOpened.current) {
      justOpened.current = false
      const first = panelRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      first?.focus()
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Menu"
        onClick={() => {
          justOpened.current = !open
          setOpen((v) => !v)
        }}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-paper transition-colors hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
      >
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none">
          {open ? (
            <path
              d="M5 5l12 12M17 5L5 17"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M3 6h16M3 11h16M3 16h16"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          {/* Backdrop. Clicking it closes the panel. */}
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
          />

          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-paper text-ink shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-muted/20 px-5 py-4">
              <span className="font-heading text-lg text-brand-dark">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={close}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors hover:bg-indigo-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 4l12 12M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile primary" className="flex-1 px-5 py-6">
              <ul className="flex flex-col gap-6">
                {sections.map((section) => (
                  <li key={section.key}>
                    <Link
                      href={section.href}
                      onClick={close}
                      className="block font-heading text-xl text-brand-dark focus-visible:outline-none focus-visible:underline focus-visible:decoration-accent focus-visible:decoration-2 focus-visible:underline-offset-4"
                    >
                      {section.label}
                    </Link>
                    <ul className="mt-2 flex flex-col gap-1 border-l border-muted/25 pl-4">
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={close}
                            className="block rounded-md py-1.5 text-base text-ink/85 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-muted/20 p-5">
              <Button as={Link} href={DONATE_HREF} onClick={close} className="w-full bg-accent! text-brand-dark! hover:bg-accent/90!">
                Donate
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav
