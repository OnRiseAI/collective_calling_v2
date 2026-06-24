import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { NAV_SECTIONS, DONATE_HREF } from '@/lib/nav'

/**
 * Global site footer (Tearfund's bold footer pattern, CC palette).
 *
 * A full-width gold block with navy text, the shared IA link columns, and a
 * navy "answer the call" CTA card (the white-on-transparent logo and Donate
 * live inside that dark card, since the logo must never sit on a light field).
 * A quiet bottom row carries the socials, the charity registration line, and
 * the policy links.
 *
 * Server component. NAV_SECTIONS is the single IA source shared with the Header.
 */

const POLICY_LINKS = [{ label: 'Privacy', href: '/privacy' }]

const FOOTER_LABEL_OVERRIDES: Record<string, string> = {
  '/about/financial-accountability': 'Finances & accountability',
}

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
    <footer className="mt-auto bg-accent text-brand-dark">
      <Container size="wide" className="py-16 sm:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_1.5fr] lg:gap-12">
          {/* Link columns built from the shared IA. */}
          {NAV_SECTIONS.map((section) => (
            <FooterColumn key={section.key} heading={section.label} items={section.items} />
          ))}

          {/* Navy "answer the call" CTA card. The white logo and Donate live on
              this dark field, where they belong. */}
          <div className="rounded-md bg-brand-dark p-8 text-paper md:col-span-2 lg:col-span-1">
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
                unoptimized
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-6 font-body text-xs font-bold uppercase tracking-[0.18em] text-accent">
              Answer the call
            </p>
            <p className="mt-3 font-heading text-2xl font-bold leading-tight text-paper">
              Your gift restores dignity and rebuilds&nbsp;families.
            </p>
            <div className="mt-6">
              <Button
                as={Link}
                href={DONATE_HREF}
                size="lg"
                className="bg-accent! font-bold text-brand-dark! hover:bg-accent/90!"
              >
                Donate
              </Button>
            </div>
          </div>
        </div>

        {/* Quiet bottom row: socials, registration, policies, all in navy on gold. */}
        <div className="mt-14 border-t border-brand-dark/15 pt-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <ul className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand-dark transition-colors hover:bg-brand-dark/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
                  >
                    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            <p className="font-body text-sm text-brand-dark/75">
              Restoring dignity and strengthening families in Spain and Tanzania. Registered
              nonprofit · Reg. 611.510 · CIF G93524130
            </p>

            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {POLICY_LINKS.map((policy) => (
                <li key={policy.href}>
                  <Link
                    href={policy.href}
                    className="font-body text-sm font-medium text-brand-dark underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
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
  return (
    <nav aria-label={heading}>
      <h2 className="font-body text-xs font-bold uppercase tracking-[0.14em] text-brand-dark">
        {heading}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <Link
              href={item.href}
              className="font-body text-[0.95rem] font-medium text-brand-dark/80 underline-offset-4 transition-colors hover:text-brand-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
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
