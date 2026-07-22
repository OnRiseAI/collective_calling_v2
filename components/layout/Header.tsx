import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { MobileNav } from '@/components/layout/MobileNav'
import { NAV_SECTIONS, GET_INVOLVED_HREF } from '@/lib/nav'

/**
 * Global site header (design-theme mockup): a near-black charcoal bar with the
 * logo left, the section links rendered flat (no dropdowns), and one gold
 * "Get Involved" CTA — the invitation, not the ask. The mobile panel is the
 * client component; everything else is server-rendered.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-brand-dark text-paper">
      <Container size="wide" className="flex items-center justify-between gap-8 py-4">
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
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <div className="flex items-center gap-2 lg:gap-6">
          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
            {NAV_SECTIONS.map((section) => (
              <Link
                key={section.key}
                href={section.href}
                className="font-body text-[15px] text-paper/85 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
              >
                {section.label}
              </Link>
            ))}
          </nav>

          <Link
            href={GET_INVOLVED_HREF}
            className="hidden shrink-0 items-center rounded-[--radius] bg-accent px-5 py-2.5 font-body text-[15px] font-semibold text-brand-dark transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark sm:inline-flex"
          >
            Get Involved
          </Link>

          <MobileNav sections={NAV_SECTIONS} />
        </div>
      </Container>
    </header>
  )
}

export default Header
