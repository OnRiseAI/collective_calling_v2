import * as React from 'react'

/**
 * Container constrains content to a comfortable reading measure and applies
 * consistent gutters. Used inside Section and standalone where needed.
 *
 * `size` controls the max width:
 * - prose:  narrow, for long-form reading (~65ch).
 * - default: standard page content.
 * - wide:   broad layouts (feature grids, galleries).
 */

export type ContainerSize = 'prose' | 'default' | 'wide'

type ContainerProps = {
  as?: React.ElementType
  size?: ContainerSize
  className?: string
  children: React.ReactNode
} & Omit<React.HTMLAttributes<HTMLElement>, 'children'>

const sizes: Record<ContainerSize, string> = {
  prose: 'max-w-prose',
  default: 'max-w-5xl',
  wide: 'max-w-7xl',
}

function cx(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ')
}

export function Container({
  as: Tag = 'div',
  size = 'default',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag className={cx('mx-auto w-full px-6 sm:px-8', sizes[size], className)} {...rest}>
      {children}
    </Tag>
  )
}

export default Container
