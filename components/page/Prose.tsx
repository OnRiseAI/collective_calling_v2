import * as React from 'react'
import { cx } from '@/lib/cx'

/**
 * Prose is the long-form body wrapper for About and programme pages. It holds
 * narrative copy to a comfortable reading measure (`max-w-prose`, roughly 65ch
 * from the brand board) and applies the Mulish body voice with calm vertical
 * rhythm.
 *
 * It styles the common flow elements via a scoped selector set so callers can
 * drop in plain `<p>`, `<h2>`, `<h3>`, lists and links without per-element
 * classes:
 * - paragraphs: Mulish, 18px, line-height 1.65, taupe-warm ink, spaced apart.
 * - h2 / h3: Fraunces section and sub-section sizes with generous space above.
 * - links: brand indigo with a gold underline offset.
 * - lists: comfortable indent and item spacing.
 *
 * Headings inside Prose are h2/h3 only; the page `<h1>` belongs to PageHero.
 */

type ProseProps = {
  children: React.ReactNode
  className?: string
}


export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cx(
        'max-w-prose font-body text-lg leading-[1.65] text-ink',
        // Paragraph and list rhythm.
        '[&_p]:mt-5 [&_p:first-child]:mt-0',
        '[&_ul]:mt-5 [&_ol]:mt-5 [&_ul]:list-disc [&_ol]:list-decimal',
        '[&_ul]:pl-6 [&_ol]:pl-6 [&_li]:mt-2 [&_li]:marker:text-accent',
        // Section and sub-section headings in Fraunces, with space above.
        '[&_h2]:mt-12 [&_h2]:font-heading [&_h2]:text-[38px] [&_h2]:leading-[1.15] [&_h2]:font-medium [&_h2]:text-ink [&_h2]:text-balance',
        '[&_h3]:mt-10 [&_h3]:font-heading [&_h3]:text-[1.75rem] [&_h3]:leading-[1.2] [&_h3]:font-semibold [&_h3]:text-ink [&_h3]:text-balance',
        // Inline links: brand indigo with a warm gold underline.
        '[&_a]:font-medium [&_a]:text-brand [&_a]:underline [&_a]:decoration-accent [&_a]:decoration-2 [&_a]:underline-offset-4',
        '[&_strong]:font-bold [&_strong]:text-ink',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Prose
