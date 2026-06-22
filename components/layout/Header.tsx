import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { MegaMenu } from '@/components/layout/MegaMenu'
import { MobileNav } from '@/components/layout/MobileNav'
import { NAV_SECTIONS, DONATE_HREF } from '@/lib/nav'

/**
 * Global site header.
 *
 * A server component that renders the nav model from lib/nav. It sits on a
 * midnight-navy field because the supplied logo is white on transparent and
 * must never sit on light (brand board, section 4). Gold leads only the Donate
 * action (the one warmest, most invited action). The interactive pieces, the
 * desktop mega-menu and the mobile panel, are client components that receive
 * the serializable NAV_SECTIONS as props.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-brand-dark text-paper">
      <Container size="wide" className="flex items-center justify-between gap-6 py-3">
        <Link
          href="/"
          aria-label="Collective Calling home"
          className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
        >
          <Image
            src="/cc-logo.png"
            alt="Collective Calling"
            width={271}
            height={86}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <MegaMenu sections={NAV_SECTIONS} />

          {/* Search affordance: a clearly-labelled icon button. Full search is a
              later plan, so this is a present, accessible placeholder. */}
          <button
            type="button"
            aria-label="Search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-paper/90 transition-colors hover:bg-paper/10 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.75" />
              <path
                d="M13.5 13.5 17 17"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Donate: the one place gold leads. Gold on the navy field. */}
          <Button
            as={Link}
            href={DONATE_HREF}
            className="hidden bg-accent text-brand-dark hover:bg-accent/90 sm:inline-flex"
          >
            Donate
          </Button>

          <MobileNav sections={NAV_SECTIONS} />
        </div>
      </Container>
    </header>
  )
}

export default Header
