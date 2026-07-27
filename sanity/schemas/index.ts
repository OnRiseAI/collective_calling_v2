import { homePage } from './homePage'
import {
  linkCta,
  splitHeading,
  homeHero,
  homePhilosophy,
  expressionCard,
  homeExpressions,
  homeVia,
  impactStat,
  homeImpact,
  storyCard,
  homeStories,
  homeImpactCta,
  partnerMark,
  homePartners,
  homeClosing,
} from './objects/homeSections'
import { story } from './documents/story'
import { appealEntry } from './documents/appealEntry'
import { eventItem } from './documents/eventItem'

/**
 * All schema types registered with the Studio. Consumed by sanity.config.ts.
 * Objects are listed before the document that references them. Collection
 * documents (story, appealEntry, eventItem) are registered last.
 */
export const schemaTypes = [
  linkCta,
  splitHeading,
  homeHero,
  homePhilosophy,
  expressionCard,
  homeExpressions,
  homeVia,
  impactStat,
  homeImpact,
  storyCard,
  homeStories,
  homeImpactCta,
  partnerMark,
  homePartners,
  homeClosing,
  homePage,
  story,
  appealEntry,
  eventItem,
]
