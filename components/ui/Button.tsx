import * as React from 'react'
import { cx } from '@/lib/cx'

/**
 * Button primitive for Collective Calling.
 *
 * Variants follow the brand board button specs:
 * - primary:   brand indigo background, white text, hover brand-dark, gold focus ring.
 * - secondary: transparent with a brand border and brand text, hover fills brand with white text.
 * - ghost:     no border, brand text, animated gold underline on hover.
 *
 * When an `href` is provided the component renders an anchor (for CTAs) while keeping
 * link semantics. Otherwise it renders a native button.
 *
 * For internal app routes the caller can pass a polymorphic `as` prop (for
 * example the locale-aware `Link` from "@/i18n/navigation") so the rendered
 * element stays locale-aware. When `as` is omitted but `href` is present the
 * component renders a plain anchor, which is the right choice for external links
 * (Donorbox, socials) that must never be locale-prefixed.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'md' | 'lg'

type CommonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined
    as?: undefined
  }

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string
    // Optional element/component used to render when `href` is present. Defaults
    // to a plain 'a'. Pass a locale-aware Link for internal routes. The extra
    // props it receives are typed loosely because the renderer can be any
    // anchor-compatible component.
    as?: React.ElementType
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

// Shared shape, focus, and motion. Calm, grounded radius per the brand board (0.5rem).
const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-body font-semibold ' +
  'leading-none text-center align-middle select-none transition-colors duration-200 ease-out ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50'

const sizes: Record<ButtonSize, string> = {
  // Comfortable padding from the brand board (roughly 0.85rem 1.6rem).
  md: 'px-6 py-[0.7rem] text-base',
  lg: 'px-8 py-[0.85rem] text-lg',
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-paper hover:bg-brand-dark',
  secondary:
    'bg-transparent text-brand border-[1.5px] border-brand hover:bg-brand hover:text-paper',
  ghost:
    'bg-transparent text-brand px-0 py-0 underline decoration-accent decoration-2 ' +
    'underline-offset-4 decoration-transparent hover:decoration-accent ' +
    'transition-[color,text-decoration-color] duration-200',
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...rest
  } = props

  // Ghost is an inline text action, so it ignores the boxed size padding.
  const classes = cx(
    base,
    variant !== 'ghost' && sizes[size],
    variants[variant],
    className,
  )

  if ('href' in props && props.href !== undefined) {
    // `as` lets the caller render an internal link via a locale-aware component
    // (Link). Default to a plain anchor so external links stay non-prefixed.
    const { as: Component = 'a', ...anchorRest } =
      rest as { as?: React.ElementType } & React.AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <Component className={classes} {...anchorRest}>
        {children}
      </Component>
    )
  }

  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={classes} type={buttonRest.type ?? 'button'} {...buttonRest}>
      {children}
    </button>
  )
}

export default Button
