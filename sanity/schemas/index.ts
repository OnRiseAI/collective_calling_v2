import { homePage } from './homePage'
import { heroBlock } from './objects/heroBlock'
import { impactStat } from './objects/impactStat'
import { appeal } from './objects/appeal'
import { testimonial } from './objects/testimonial'
import { exploreCard } from './objects/exploreCard'
import { donateTier } from './objects/donateTier'
import { moneySplit } from './objects/moneySplit'
import { scripture } from './objects/scripture'
import { mission } from './objects/mission'
import { trust } from './objects/trust'
import { story } from './documents/story'
import { appealEntry } from './documents/appealEntry'
import { eventItem } from './documents/eventItem'

/**
 * All schema types registered with the Studio. Consumed by sanity.config.ts
 * (Task 4). Objects are listed before the document that references them.
 * Collection documents (story, appealEntry, eventItem) are registered last.
 */
export const schemaTypes = [
  heroBlock,
  impactStat,
  appeal,
  testimonial,
  exploreCard,
  donateTier,
  moneySplit,
  scripture,
  mission,
  trust,
  homePage,
  story,
  appealEntry,
  eventItem,
]
