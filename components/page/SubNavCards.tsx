import * as React from 'react'
import { Card } from '@/components/ui/Card'

/**
 * SubNavCards is the in-page navigation grid used on hub pages (for example the
 * About hub linking to Story, Team, and Partners). Each card is the shared ui
 * `Card` in its linked mode, so the whole surface is one locale-aware target,
 * the title renders as an `<h3>`, and the brand card treatment (warm border,
 * soft shadow, gold hover underline) comes for free.
 *
 * The grid is responsive: one column on small screens, two from `sm`, three
 * from `lg`, with comfortable gutters and the brand's calm pace.
 */

export type SubNavCard = {
  title: string
  blurb: string
  href: string
  image?: string
}

type SubNavCardsProps = {
  cards: SubNavCard[]
}

export function SubNavCards({ cards }: SubNavCardsProps) {
  return (
    <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <li key={card.href} className="flex">
          <Card
            href={card.href}
            image={card.image}
            alt=""
            title={card.title}
            className="w-full"
          >
            {card.blurb}
          </Card>
        </li>
      ))}
    </ul>
  )
}

export default SubNavCards
