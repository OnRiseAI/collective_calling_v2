import { Link } from '@/i18n/navigation'

/**
 * Global site footer, transcribed from the design: a single 56px / 64px band,
 * six links at 28px apart on the left, the copyright line and two legal links
 * on the right.
 */

const FOOTER_LINKS: { label: string; href: string }[] = [
  { label: 'Impact', href: '/about/our-impact' },
  { label: 'Stories', href: '/stories' },
  { label: 'Events', href: '/events' },
  { label: 'Charity Shops', href: '/charity-shops' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const LEGAL_LINKS: { label: string; href: string }[] = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]

export function Footer() {
  return (
    <footer className="bg-footer px-16 py-14 max-md:px-6">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-8">
        <nav aria-label="Footer" className="flex flex-wrap gap-7">
          {FOOTER_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] text-slate-dim transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-6 text-[12px] text-slate-faint">
          <span>&copy; Collective Calling 2026</span>
          {LEGAL_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-slate-faint transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
