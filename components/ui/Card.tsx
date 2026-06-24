import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { cx } from '@/lib/cx'

/**
 * Card primitive for Collective Calling.
 *
 * Follows the brand board card spec (section 6):
 * - white surface on the warm ivory page, 1px warm taupe border (`border-muted/20`)
 * - radius 0.75rem (`rounded-xl`), soft warm shadow that lifts a touch on hover
 * - optional top image in a 16:9 frame (`next/image`, sharing the top radius)
 * - a thin top rule coloured by programme theme:
 *     general = antique gold accent, spain = dignified indigo brand, tanzania = clay
 * - title in Fraunces (H4), body in Mulish
 *
 * When `href` is set the whole card becomes a single locale-aware `Link` (internal
 * route) so the entire surface is one clear target with no nested interactive
 * elements. The title gains a gold underline on hover to signal the affordance.
 */

export type CardTheme = 'general' | 'spain' | 'tanzania' | 'seasonal'

export type CardProps = {
  image?: string
  alt?: string
  theme?: CardTheme
  href?: string
  eyebrow?: string
  title: string
  children?: React.ReactNode
  className?: string
  // `large` makes a more prominent card: a taller image, roomier padding and a
  // bigger title (used for the homepage "see your impact" feature cards).
  large?: boolean
}

// Thin top rule colour per programme theme.
const themeRule: Record<CardTheme, string> = {
  general: 'bg-accent',
  spain: 'bg-brand',
  tanzania: 'bg-clay',
  seasonal: 'bg-accent',
}

export function Card({
  image,
  alt,
  theme = 'general',
  href,
  eyebrow,
  title,
  children,
  className,
  large = false,
}: CardProps) {
  const isLink = href !== undefined

  // Shared surface: white card on warm ivory, warm taupe hairline border, rounded
  // 0.75rem, soft warm shadow. `group` drives the image and title hover treatment.
  const surface = cx(
    'group relative flex flex-col overflow-hidden rounded-xl bg-white',
    'border border-muted/20 shadow-[0_8px_24px_rgba(31,27,22,0.08)]',
    'transition-shadow duration-200 ease-out',
    isLink &&
      'hover:shadow-[0_12px_32px_rgba(31,27,22,0.12)] focus-visible:outline-none ' +
        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ' +
        'focus-visible:ring-offset-paper',
    className,
  )

  const inner = (
    <>
      {/* Thin programme rule sits flush across the very top of the card. */}
      <span aria-hidden className={cx('h-1 w-full shrink-0', themeRule[theme])} />

      {image ? (
        <div
          className={cx(
            'relative w-full overflow-hidden bg-muted/10',
            large ? 'aspect-[3/2]' : 'aspect-[16/9]',
          )}
        >
          <Image
            src={image}
            alt={alt ?? ''}
            fill
            sizes={large ? '(min-width: 640px) 50vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <div className={cx('flex flex-1 flex-col gap-2', large ? 'p-8' : 'p-6')}>
        {eyebrow ? (
          <span className="font-body text-sm font-bold uppercase tracking-[0.08em] text-muted">
            {eyebrow}
          </span>
        ) : null}

        <h3
          className={cx(
            'font-heading leading-[1.25] font-bold text-ink',
            large ? 'text-2xl sm:text-[1.75rem]' : 'text-[1.375rem]',
            isLink &&
              'underline decoration-accent decoration-2 underline-offset-4 ' +
                'decoration-transparent transition-[text-decoration-color] duration-200 ' +
                'group-hover:decoration-accent',
          )}
        >
          {title}
        </h3>

        {children ? (
          <div className="font-body text-base leading-[1.6] text-muted">{children}</div>
        ) : null}
      </div>
    </>
  )

  if (isLink) {
    return (
      <Link href={href} className={surface}>
        {inner}
      </Link>
    )
  }

  return <div className={surface}>{inner}</div>
}

export default Card
