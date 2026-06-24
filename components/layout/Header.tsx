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
      <Container size="wide" className="flex items-center justify-between gap-8 py-4 sm:py-5">
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
            className="h-11 w-auto sm:h-14"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <MegaMenu sections={NAV_SECTIONS} />

          {/* Search affordance: a clearly-labelled icon button. Full search is a
              later plan, so this is a present, accessible placeholder. */}
          <button
            type="button"
            aria-label="Search"
            className="inline-flex h-12 w-12 items-center justify-center rounded-md text-paper/90 transition-colors hover:bg-paper/10 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
          >
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 20 20" fill="none">
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
            size="lg"
            // Donate is the one place gold leads. A heart icon and a chunkier
            // weight echo Tearfund's persistent donate affordance.
            className="hidden gap-2 bg-accent! font-bold text-brand-dark! hover:bg-accent/90! sm:inline-flex"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21s-7.5-4.6-10-9.2C.7 9.2 1.6 5.7 4.8 4.9c2-.5 3.8.5 4.9 2 1.1-1.5 2.9-2.5 4.9-2 3.2.8 4.1 4.3 2.8 6.9C19.5 16.4 12 21 12 21z" />
            </svg>
            Donate
          </Button>

          <MobileNav sections={NAV_SECTIONS} />
        </div>
      </Container>
    </header>
  )
}

export default Header
