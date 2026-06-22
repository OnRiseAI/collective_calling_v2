'use client'

import Script from 'next/script'
import type { JSX } from 'react'
import { DONORBOX_FORM } from '@/lib/donate'

/**
 * Props for the DonorboxEmbed component.
 *
 * Every donate page renders this to host the charity's live Donorbox form
 * on-site rather than sending supporters off to the hosted page.
 */
export interface DonorboxEmbedProps {
  /** Donorbox campaign slug. Defaults to the charity's campaign (DONORBOX_FORM). */
  formId?: string
  /** Accessible iframe title. Defaults to "Collective Calling donation form". */
  title?: string
  /** Pre-fill values appended to the embed URL as a query string (e.g. amount, recurring). */
  query?: Record<string, string | number | boolean>
  /** Iframe height in pixels. Defaults to 900. */
  height?: number
  /** Extra classes for the outer wrapper. */
  className?: string
}

/**
 * Build the Donorbox embed src deterministically.
 *
 * Returns https://donorbox.org/embed/<formId>, appending any query entries as a
 * stable, sorted query string. Undefined is never appended (only defined entries
 * of the record are walked).
 */
function buildEmbedSrc(formId: string, query?: Record<string, string | number | boolean>): string {
  const base = `https://donorbox.org/embed/${formId}`
  if (!query) {
    return base
  }

  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    params.set(key, String(value))
  }
  params.sort()

  const search = params.toString()
  return search ? `${base}?${search}` : base
}

/**
 * DonorboxEmbed renders the charity's live Donorbox donation form in a responsive,
 * lazy-loaded iframe, framed as a calm card in the brand palette.
 *
 * The Donorbox widget script is loaded once (deduped by a stable id) so the iframe
 * auto-resizes to its content. A noscript anchor links to the hosted form so giving
 * still works with JavaScript disabled.
 */
export function DonorboxEmbed({
  formId,
  title = 'Collective Calling donation form',
  query,
  height = 900,
  className,
}: DonorboxEmbedProps): JSX.Element {
  const resolvedForm = formId ?? DONORBOX_FORM
  const src = buildEmbedSrc(resolvedForm, query)
  const hostedUrl = `https://donorbox.org/${resolvedForm}`

  const wrapperClass = [
    'mx-auto w-full max-w-[33rem] overflow-hidden rounded-xl border border-muted/25 bg-paper shadow-[0_8px_24px_rgba(31,27,22,0.08)]',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapperClass}>
      <Script id="donorbox-widget" src="https://donorbox.org/widget.js" strategy="afterInteractive" />
      <iframe
        src={src}
        name="donorbox"
        title={title}
        allow="payment"
        seamless
        loading="lazy"
        scrolling="no"
        height={height}
        style={{
          maxWidth: 500,
          minWidth: 250,
          maxHeight: 'none',
          width: '100%',
          display: 'block',
          margin: '0 auto',
        }}
      />
      <noscript>
        <p className="px-6 py-5 text-center font-body text-ink">
          To donate, please{' '}
          <a
            href={hostedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand underline decoration-accent underline-offset-2 hover:text-brand-dark"
          >
            open the Collective Calling donation form
          </a>
          .
        </p>
      </noscript>
    </div>
  )
}

export default DonorboxEmbed
