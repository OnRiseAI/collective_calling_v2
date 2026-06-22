import * as React from 'react'
import { Container, type ContainerSize } from './Container'

/**
 * Section is the vertical rhythm primitive. It alternates warm bands per the
 * brand board (paper, soft tints, and deep navy) with generous vertical spacing
 * (5 to 7rem on desktop) for a calm, premium pace.
 *
 * `tone` selects the band background and the matching text colour:
 * - paper:      default warm ivory background, ink text.
 * - indigo-tint: soft cool band, ink text.
 * - clay-tint:   soft warm band, ink text.
 * - dark:       deep midnight navy band, paper text (donate and emphasis moments).
 *
 * Set `container={false}` to lay out full-bleed content yourself.
 */

export type SectionTone = 'paper' | 'indigo-tint' | 'clay-tint' | 'dark'

type SectionProps = {
  as?: React.ElementType
  tone?: SectionTone
  container?: boolean
  containerSize?: ContainerSize
  className?: string
  children: React.ReactNode
} & Omit<React.HTMLAttributes<HTMLElement>, 'children'>

const tones: Record<SectionTone, string> = {
  paper: 'bg-paper text-ink',
  'indigo-tint': 'bg-indigo-tint text-ink',
  'clay-tint': 'bg-clay-tint text-ink',
  dark: 'bg-brand-dark text-paper',
}

// Generous, premium vertical pace that scales up on larger screens.
const spacing = 'py-16 sm:py-20 lg:py-28'

function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ')
}

export function Section({
  as: Tag = 'section',
  tone = 'paper',
  container = true,
  containerSize = 'default',
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag className={cx(tones[tone], spacing, className)} {...rest}>
      {container ? <Container size={containerSize}>{children}</Container> : children}
    </Tag>
  )
}

export default Section
