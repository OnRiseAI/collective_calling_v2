import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { NAV_SECTIONS, DONATE_HREF } from '@/lib/nav'

/**
 * Global site footer (Tearfund's bold footer pattern, CC palette).
 *
 * A full-width gold block with navy text. The link columns fill the left of the
 * container and a navy "answer the call" CTA card is pinned right (the
 * white-on-transparent logo and Donate live on that dark field, where they
 * belong). Beneath, the accountability bar earns the site's "Accountable to you"
 * theme: registered address, contact details, registration numbers, a plain
 * transparency statement, and partner endorsement marks.
 *
 * Server component. NAV_SECTIONS is the single IA source shared with the Header.
 */

const FOOTER_LABEL_OVERRIDES: Record<string, string> = {
  '/about/financial-accountability': 'Finances & accountability',
}

/**
 * Footer-local column model derived from the shared IA. Stories has only one
 * page ("All stories"), which looks broken as a lone item under a bold header,
 * so in the footer it is merged into the Appeals column ("Appeals & stories")
 * rather than standing alone. This is a footer-only presentation choice; it does
 * not mutate NAV_SECTIONS (the Header keeps its own Stories section + teaser).
 */
const FOOTER_COLUMNS = NAV_SECTIONS.filter((section) => section.key !== 'stories').map(
  (section) => {
    if (section.key !== 'appeals') return section
    const stories = NAV_SECTIONS.find((s) => s.key === 'stories')
    return {
      ...section,
      label: 'Appeals & stories',
      items: stories ? [...section.items, ...stories.items] : section.items,
    }
  },
)

// The charity's real, confirmed details (mirrors lib/content/pages/contact.ts).
// Registered office = the confirmed contact address. No formal third-party
// certifier is held, so the accountability line stays a plain transparency
// statement (no fabricated seals).
const LEGAL = {
  org: 'Collective Calling',
  year: 2026,
  registration: 'Registered nonprofit · Reg. 611.510 · CIF G93524130',
  address: 'Av. Pablo Ruiz Picasso 4, 29670 San Pedro Alcántara, Málaga, Spain',
  email: 'info@collectivecalling.org',
  phone: '+34 711 006 961',
  phoneHref: 'tel:+34711006961',
  statement:
    'We publish our finances in full and welcome independent review by our partners and supporters.',
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
      {/* Extra bottom padding leaves clear space at the bottom-left for a fixed
          chat widget (third-party overlay) so it never collides with the social
          icons or legal row. */}
      <Container size="wide" className="pt-16 pb-28 sm:pt-20 sm:pb-28">
        {/* Full-width 12-col grid: link columns fill the left, CTA card pinned
            right. The leftmost column starts at the container's left edge. */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {FOOTER_COLUMNS.map((section) => (
                <FooterColumn key={section.key} heading={section.label} items={section.items} />
              ))}
            </div>
          </div>

          {/* Navy "answer the call" CTA card, one tight vertically-centred block. */}
          <div className="lg:col-span-4">
            <div className="flex h-full flex-col justify-center rounded-md bg-brand-dark p-8 text-paper">
              <Link
                href="/"
                aria-label="Collective Calling home"
                className="inline-flex w-fit rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
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
              <p className="mt-5 font-body text-xs font-bold uppercase tracking-[0.18em] text-accent">
                Answer the call
              </p>
              <p className="mt-2 font-body text-2xl font-extrabold leading-tight text-paper">
                Your gift restores <span className="text-accent">dignity</span> and rebuilds
                families.
              </p>
              <div className="mt-5">
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
        </div>

        {/* Accountability bar: two columns aligned to the same top baseline.
            Left = socials + condensed legal run; right = transparency statement. */}
        <div className="mt-14 border-t border-brand-dark/15 pt-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            {/* LEFT: larger social circles, then the condensed legal run. */}
            <div className="lg:max-w-2xl">
              <ul className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-dark text-paper transition-colors hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
                    >
                      <svg aria-hidden="true" width="28" height="28" viewBox="0 0 20 20" fill="currentColor">
                        <path d={social.path} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-5 font-body text-[15px] leading-relaxed text-brand-dark/80">
                © {LEGAL.year} {LEGAL.org} · {LEGAL.registration}
                <br />
                {LEGAL.address} ·{' '}
                <a
                  href={LEGAL.phoneHref}
                  className="font-semibold text-brand-dark/90 underline-offset-4 transition-colors hover:text-brand-dark hover:underline"
                >
                  {LEGAL.phone}
                </a>{' '}
                ·{' '}
                <a
                  href={`mailto:${LEGAL.email}`}
                  className="font-semibold text-brand-dark/90 underline-offset-4 transition-colors hover:text-brand-dark hover:underline"
                >
                  {LEGAL.email}
                </a>{' '}
                ·{' '}
                <Link
                  href="/privacy"
                  className="underline-offset-4 transition-colors hover:text-brand-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
                >
                  Privacy
                </Link>
              </p>
            </div>

            {/* RIGHT: transparency statement. */}
            <div className="lg:max-w-[340px] lg:text-right">
              <p className="font-body text-[15px] leading-relaxed text-brand-dark/80">
                {LEGAL.statement}
              </p>
            </div>
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
      {/* Title Case, 20px extrabold navy, with a thin rule under the full column
          width so each header clearly leads its column. */}
      <h2 className="mb-4 border-b border-brand-dark/15 pb-3 font-body text-xl font-extrabold text-brand-dark">
        {heading}
      </h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.href + item.label}>
            <Link
              href={item.href}
              className="font-body text-base font-normal leading-7 text-brand-dark transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
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
