import * as React from 'react'
import { Card } from '@/components/ui/Card'
import { PlaceholderBadge } from './PlaceholderBadge'
import type { CardTheme } from '@/components/ui/Card'

/**
 * CollectionCard is a linked content card for Stories, Appeals, and Events.
 *
 * It wraps the shared `Card` primitive (which handles the image, theme rule,
 * title as h3, and hover treatment) and adds an optional `PlaceholderBadge`
 * beneath the description for seed / sample entries.
 *
 * The caller provides:
 * - `href` - the internal route this card links to.
 * - `title` - the card heading (rendered as an h3 by Card).
 * - `description` - a short summary string. Stories pass `excerpt`; appeals
 *   pass `blurb`. Kept as a plain string so the card stays reusable.
 * - `image` / `alt` - optional hero image (16:9 frame inside Card).
 * - `theme` - programme colour for the thin top rule.
 * - `placeholder` - when true, renders a PlaceholderBadge after the description.
 */
export type CollectionCardProps = {
  href: string
  title: string
  description: string
  image?: string
  alt?: string
  theme?: CardTheme
  placeholder?: boolean
}

export function CollectionCard({
  href,
  title,
  description,
  image,
  alt,
  theme = 'general',
  placeholder,
}: CollectionCardProps) {
  return (
    <Card href={href} title={title} image={image} alt={alt} theme={theme}>
      <p>{description}</p>
      {placeholder ? (
        <span className="mt-3 block">
          <PlaceholderBadge />
        </span>
      ) : null}
    </Card>
  )
}

export default CollectionCard
