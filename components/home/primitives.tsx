import * as React from 'react'
import { Link } from '@/i18n/navigation'
import { cx } from '@/lib/cx'
import type { Cta, SplitHeading } from '@/lib/content/home.types'

/**
 * The repeated pieces of the Claude Design file, transcribed at its own values.
 * Anything that varies between instances (type size, padding, colour on a dark
 * band) is passed in rather than assumed, so each section can match the design
 * exactly rather than approximately.
 */

/** Gold letterspaced label: 12px / 600 / 3px tracking, inline as in the design. */
export function Eyebrow({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <span className="text-[12px] font-semibold tracking-[3px] text-accent">{children}</span>
  )
}

/**
 * A display heading whose closing phrase is set in gold italic, joined to the
 * lead by a single space exactly as the design writes it. `\n` in a heading
 * string renders as the design's explicit line break.
 */
export function DisplayHeading({
  as: Tag = 'h2',
  heading,
  breakBefore = false,
  className,
}: {
  as?: 'h1' | 'h2' | 'h3'
  heading: SplitHeading
  /** The stories heading is the one place the design breaks before the phrase. */
  breakBefore?: boolean
  className?: string
}): React.JSX.Element {
  return (
    <Tag className={cx('font-heading font-normal', className)}>
      {heading.lead}
      {breakBefore ? <br /> : ' '}
      <span className="italic text-accent">{heading.accent}</span>
    </Tag>
  )
}

/** A heading with no gold phrase; `\n` becomes the design's explicit break. */
export function PlainHeading({
  text,
  className,
}: {
  text: string
  className?: string
}): React.JSX.Element {
  const lines = text.split('\n')
  return (
    <h2 className={cx('font-heading font-normal', className)}>
      {lines.map((line, index) => (
        <React.Fragment key={line}>
          {index > 0 ? <br /> : null}
          {line}
        </React.Fragment>
      ))}
    </h2>
  )
}

const PILL =
  'tap-min inline-flex items-center justify-center gap-[10px] rounded-full text-[13px] font-semibold tracking-[0.8px] transition-all duration-[250ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'

/**
 * The design's two pill actions. `solid` is gold going to cream on hover;
 * `outline` is a hairline in white going gold. Both lift 2px on hover.
 * Padding is passed in because the design uses three different insets.
 */
export function PillLink({
  cta,
  variant = 'solid',
  padding,
  className,
}: {
  cta: Cta
  variant?: 'solid' | 'outline'
  padding: string
  className?: string
}): React.JSX.Element {
  return (
    <Link
      href={cta.href}
      className={cx(
        PILL,
        padding,
        'focus-visible:ring-offset-brand-dark motion-safe:hover:-translate-y-[2px]',
        variant === 'solid'
          ? 'bg-accent text-brand-dark hover:bg-[#f8f4eb]'
          : 'border border-white/45 text-[#f8f4eb] hover:border-accent hover:text-accent',
        className,
      )}
    >
      {cta.label} <span className="text-[15px]">&rarr;</span>
    </Link>
  )
}

/**
 * The quiet gold action used under cards and beside section headings. The
 * design writes the arrow into the link text itself, so it is plain text here
 * too rather than a separate element.
 */
export function ArrowLink({
  cta,
  className,
}: {
  cta: Cta
  className?: string
}): React.JSX.Element {
  return (
    <Link
      href={cta.href}
      className={cx(
        // tap-44: on a touch device the 15px-tall link gets a 44px hit area
        // laid over it, so nothing shifts but it can actually be pressed.
        'tap-44 inline-block text-[12.5px] font-semibold tracking-[1px] text-accent transition-colors hover:text-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        className,
      )}
    >
      {/* One text node, exactly as the design writes it — JSX would drop the
          space if the arrow were a sibling of the label expression. */}
      {`${cta.label} →`}
    </Link>
  )
}
