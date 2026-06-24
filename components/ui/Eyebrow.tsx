import * as React from 'react'
import { cx } from '@/lib/cx'

/**
 * Eyebrow renders the shared gold eyebrow label used throughout Collective
 * Calling pages: a bold uppercase body-face label at small size, with a short
 * antique-gold horizontal rule to the left and optional center alignment.
 *
 * Usage:
 *   <Eyebrow>Our mission</Eyebrow>
 *   <Eyebrow align="center">How you can help</Eyebrow>
 *   <Eyebrow className="mb-4">Give now</Eyebrow>
 */
type EyebrowTone = 'gold' | 'dark' | 'light'

const eyebrowText: Record<EyebrowTone, string> = {
  gold: 'text-accent',
  dark: 'text-brand-dark',
  light: 'text-paper',
}

const eyebrowRule: Record<EyebrowTone, string> = {
  gold: 'bg-accent',
  dark: 'bg-brand-dark',
  light: 'bg-paper',
}

export function Eyebrow({
  children,
  align,
  tone = 'gold',
  className,
}: {
  children: React.ReactNode
  align?: 'left' | 'center'
  tone?: EyebrowTone
  className?: string
}): React.JSX.Element {
  return (
    <p
      className={cx(
        'flex items-center gap-3 font-body text-sm font-bold uppercase tracking-[0.18em]',
        eyebrowText[tone],
        align === 'center' && 'justify-center',
        className,
      )}
    >
      <span aria-hidden="true" className={cx('h-px w-8', eyebrowRule[tone])} />
      {children}
    </p>
  )
}

export default Eyebrow
