import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { NAV_SECTIONS, DONATE_HREF } from '@/lib/nav'

/**
 * Global site footer.
 *
 * Two parts on the brand's deep midnight-navy field (the white-on-transparent
 * logo and white socials must sit on a dark field, brand board section 4):
 *
 * 1. A closing donate CTA band. Gold leads here, the one warmest, most invited
 *    action (brand board section 6). The Donate Button renders the locale-aware
 *    Link via `as` so the route stays prefixed per locale.
 * 2. The footer body: the logo, link columns built from NAV_SECTIONS plus a
 *    Policies column, real social profiles (plain external anchors, never
 *    locale-prefixed), and the charity registration line.
 *
 * It is a server component. NAV_SECTIONS is the single IA source shared with
 * the Header. Hrefs are future routes and may 404 until their plans land.
 */

// Policies live outside NAV_SECTIONS (they are not top-level IA), so they are
// composed here. Privacy is the one required policy page for the shell.
const POLICY_LINKS = [{ label: 'Privacy', href: '/privacy' }]

// A handful of NAV items read better with a slightly different label in the
// dense footer context than in the header mega-menu. Keyed by href so the
// destination is always the canonical NAV_SECTIONS route. This also keeps the
// footer's accessible link names distinct from the header's, so the two navs
// stay unambiguous for anything (assistive tech or tests) querying links by
// name across the whole page.
const FOOTER_LABEL_OVERRIDES: Record<string, string> = {
  '/about/financial-accountability': 'Finances & accountability',
}

// Real Collective Calling profiles. External, so plain anchors that open in a
// new tab with safe rel, never the locale-aware Link.
const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/collectivecalling',
    path: 'M13.5 9H11.5V7.5C11.5 6.95 11.95 6.75 12.25 6.75H13.4V4.6L11.7 4.59C9.55 4.59 9.1 6.18 9.1 7.2V9H7.6V11.2H9.1V17.4H11.5V11.2H13.1L13.5 9Z',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UC-el3s8QuBqD81RtpODyhgQ',
    path: 'M18.2 7.4C18 6.6 17.4 6 16.6 5.8C15.2 5.4 10 5.4 10 5.4C10 5.4 4.8 5.4 3.4 5.8C2.6 6 2 6.6 1.8 7.4C1.4 8.8 1.4 11 1.4 11C1.4 11 1.4 13.2 1.8 14.6C2 15.4 2.6 16 3.4 16.2C4.8 16.6 10 16.6 10 16.6C10 16.6 15.2 16.6 16.6 16.2C17.4 16 18 15.4 18.2 14.6C18.6 13.2 18.6 11 18.6 11C18.6 11 18.6 8.8 18.2 7.4ZM8.4 13.4V8.6L12.6 11L8.4 13.4Z',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/collective_calling',
    path: 'M10 5.7C11.4 5.7 11.57 5.71 12.12 5.73C13.6 5.8 14.3 6.5 14.37 7.98C14.39 8.53 14.4 8.7 14.4 10.1C14.4 11.5 14.39 11.67 14.37 12.22C14.3 13.7 13.6 14.4 12.12 14.47C11.57 14.49 11.4 14.5 10 14.5C8.6 14.5 8.43 14.49 7.88 14.47C6.4 14.4 5.7 13.69 5.63 12.22C5.61 11.67 5.6 11.5 5.6 10.1C5.6 8.7 5.61 8.53 5.63 7.98C5.7 6.5 6.4 5.8 7.88 5.73C8.43 5.71 8.6 5.7 10 5.7ZM10 4.4C8.57 4.4 8.39 4.41 7.83 4.43C5.84 4.52 4.72 5.64 4.63 7.63C4.61 8.19 4.6 8.37 4.6 10.1C4.6 11.83 4.61 12.01 4.63 12.57C4.72 14.56 5.84 15.68 7.83 15.77C8.39 15.79 8.57 15.8 10 15.8C11.43 15.8 11.61 15.79 12.17 15.77C14.16 15.68 15.28 14.56 15.37 12.57C15.39 12.01 15.4 11.83 15.4 10.1C15.4 8.37 15.39 8.19 15.37 7.63C15.28 5.64 14.16 4.52 12.17 4.43C11.61 4.41 11.43 4.4 10 4.4ZM10 7.51C8.57 7.51 7.41 8.67 7.41 10.1C7.41 11.53 8.57 12.69 10 12.69C11.43 12.69 12.59 11.53 12.59 10.1C12.59 8.67 11.43 7.51 10 7.51ZM10 11.43C9.27 11.43 8.67 10.83 8.67 10.1C8.67 9.37 9.27 8.77 10 8.77C10.73 8.77 11.33 9.37 11.33 10.1C11.33 10.83 10.73 11.43 10 11.43ZM12.73 6.79C12.36 6.79 12.06 7.09 12.06 7.46C12.06 7.83 12.36 8.13 12.73 8.13C13.1 8.13 13.4 7.83 13.4 7.46C13.4 7.09 13.1 6.79 12.73 6.79Z',
  },
]

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-dark text-paper">
      {/* Closing donate band. Gold leads. */}
      <div className="border-b border-paper/10">
        <Container size="wide" className="py-14 sm:py-16">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-accent">
                Answer the call
              </p>
              <p className="mt-3 font-heading text-2xl leading-tight text-paper sm:text-[2rem]">
                Your gift restores dignity and rebuilds&nbsp;families.
              </p>
            </div>
            <Button
              as={Link}
              href={DONATE_HREF}
              size="lg"
              // Donate is the one place gold leads (brand board section 6). The
              // important modifiers ensure the gold fill wins over the primary
              // variant's brand background regardless of CSS source order.
              className="bg-accent! text-brand-dark! hover:bg-accent/90!"
            >
              Donate
            </Button>
          </div>
        </Container>
      </div>

      {/* Footer body: logo, link columns, socials. */}
      <Container size="wide" className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))] lg:gap-12">
          {/* Brand column: logo on the navy field, short line, socials. */}
          <div>
            <Link
              href="/"
              aria-label="Collective Calling home"
              className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              <Image
                src="/cc-logo.png"
                alt="Collective Calling"
                width={271}
                height={86}
                // Same small static logo the header already renders. Skip the
                // optimizer for this second instance: it is a tiny transparent
                // PNG that needs no resizing, and reusing the raw asset avoids a
                // duplicate /_next/image request for an identical source.
                unoptimized
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-xs font-body text-[0.95rem] leading-relaxed text-paper/75">
              Restoring dignity and strengthening families in Spain and Tanzania.
            </p>
            <ul className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md text-paper/80 transition-colors hover:bg-paper/10 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                  >
                    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns built from the shared IA. */}
          {NAV_SECTIONS.map((section) => (
            <FooterColumn
              key={section.key}
              heading={section.label}
              items={section.items}
            />
          ))}
        </div>

        {/* Policies row plus the charity registration line. */}
        <div className="mt-12 border-t border-paper/10 pt-7">
          <div className="flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-body text-sm text-paper/60">
              Registered nonprofit · Reg. 611.510 · CIF G93524130
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {POLICY_LINKS.map((policy) => (
                <li key={policy.href}>
                  <Link
                    href={policy.href}
                    className="font-body text-sm text-paper/70 underline-offset-4 transition-colors hover:text-paper hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                  >
                    {policy.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function FooterColumn({
  heading,
  items,
}: {
  heading: string
  items: { label: string; href: string }[]
}) {
  // The heading is plain text, not a link. The header already exposes a
  // top-level link per section, so making the footer heading a link too would
  // create duplicate accessible names for the same destination. The navigable
  // targets are the items listed beneath.
  return (
    <nav aria-label={heading}>
      <h2 className="font-body text-xs font-bold uppercase tracking-[0.14em] text-accent">
        {heading}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <Link
              href={item.href}
              className="font-body text-[0.95rem] text-paper/75 underline-offset-4 transition-colors hover:text-paper hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              {FOOTER_LABEL_OVERRIDES[item.href] ?? item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Footer
