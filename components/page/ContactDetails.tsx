import * as React from 'react'
import { cx } from '@/lib/cx'
import { Button } from '@/components/ui/Button'
import type { ContactInfo } from '@/lib/content/pages/types'
import type { SocialLink } from '@/lib/content/pages/contact'

/**
 * ContactDetails renders Collective Calling's real contact details as a calm,
 * card-led block, following the brand board card and button specs (sections 6
 * and 7). There is no email-form backend yet, so the warmest, most useful
 * actions are to call, email, or write. Each detail is a working link where one
 * makes sense:
 *
 * - Phone: a `tel:` link so a tap dials on mobile, with a note that we also take
 *   WhatsApp on the same number.
 * - Address: the real postal address, shown as text (no map embed is invented).
 * - Email: a `mailto:` link, echoed by a gold-led "Email us" button, which is the
 *   one place gold leads per the brand board.
 *
 * Each row carries a tasteful inline SVG icon in a soft indigo-tint disc, so no
 * icon dependency is added. Socials are the charity's real public profiles,
 * rendered as plain external anchors that open in a new tab with
 * `rel="noopener noreferrer"` and never carry a locale prefix.
 *
 * The block uses h3 sub-headings only, so the page hero keeps the only h1.
 */

type ContactDetailsProps = {
  info: ContactInfo
  emailNote?: string
  phoneNote?: string
  socials?: SocialLink[]
}


const ICON_BASE =
  'h-5 w-5 text-brand'

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={ICON_BASE}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={ICON_BASE}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={ICON_BASE}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function IconDisc({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-indigo-tint">
      {children}
    </span>
  )
}

const linkClasses = cx(
  'font-body text-lg font-medium text-ink',
  'underline decoration-accent decoration-2 underline-offset-4 decoration-transparent',
  'transition-[text-decoration-color] duration-200 hover:decoration-accent',
)

export function ContactDetails({
  info,
  emailNote,
  phoneNote,
  socials,
}: ContactDetailsProps) {
  return (
    <div className="max-w-xl">
      <div
        className={cx(
          'rounded-xl border border-muted/20 bg-white p-7 lg:p-8',
          'shadow-[0_8px_24px_rgba(31,27,22,0.08)]',
        )}
      >
        <dl className="flex flex-col gap-7">
          {/* Phone: a tel: link that dials on mobile. */}
          <div className="flex items-start gap-4">
            <IconDisc>
              <PhoneIcon />
            </IconDisc>
            <div>
              <dt className="font-body text-sm font-semibold uppercase tracking-[0.08em] text-muted">
                Call us
              </dt>
              <dd className="mt-1">
                <a href={info.phoneHref} className={linkClasses}>
                  {info.phone}
                </a>
                {phoneNote ? (
                  <p className="mt-1 font-body text-base leading-[1.6] text-muted">
                    {phoneNote}
                  </p>
                ) : null}
              </dd>
            </div>
          </div>

          {/* Address: the real postal address, shown as text. */}
          <div className="flex items-start gap-4">
            <IconDisc>
              <MapPinIcon />
            </IconDisc>
            <div>
              <dt className="font-body text-sm font-semibold uppercase tracking-[0.08em] text-muted">
                Visit us
              </dt>
              <dd className="mt-1 font-body text-lg leading-[1.5] text-ink">
                {info.address}
              </dd>
            </div>
          </div>

          {/* Email: a mailto: link, echoed by the gold-led button below. */}
          <div className="flex items-start gap-4">
            <IconDisc>
              <MailIcon />
            </IconDisc>
            <div>
              <dt className="font-body text-sm font-semibold uppercase tracking-[0.08em] text-muted">
                Email us
              </dt>
              <dd className="mt-1">
                <a href={`mailto:${info.email}`} className={linkClasses}>
                  {info.email}
                </a>
                {emailNote ? (
                  <p className="mt-1 font-body text-base leading-[1.6] text-muted">
                    {emailNote}
                  </p>
                ) : null}
              </dd>
            </div>
          </div>
        </dl>

        {/* The gold-led primary action: open the visitor's mail client. Gold is
            the one place it leads (brand board section 6), so the important
            modifiers win over the primary variant's brand background. */}
        <div className="mt-8">
          <Button
            href={`mailto:${info.email}`}
            size="lg"
            className="bg-accent! text-brand-dark! hover:bg-accent/90!"
          >
            Email us
          </Button>
        </div>
      </div>

      {/* Socials: real public profiles, external anchors in a new tab. */}
      {socials && socials.length > 0 ? (
        <div className="mt-8">
          <h3 className="font-body text-sm font-semibold uppercase tracking-[0.08em] text-muted">
            Follow the work
          </h3>
          <ul className="mt-3 flex flex-wrap gap-3">
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(
                    'inline-flex items-center gap-1.5 rounded-lg border border-muted/30 px-4 py-2',
                    'font-body text-base font-semibold text-brand',
                    'transition-colors duration-200 hover:border-brand hover:bg-brand hover:text-paper',
                  )}
                >
                  <span>{social.label}</span>
                  <span aria-hidden>{'↗'}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default ContactDetails
