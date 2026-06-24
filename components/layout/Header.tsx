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
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.18 25.18 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.003-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
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
