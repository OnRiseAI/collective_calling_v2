import { homePage } from './homePage'
import {
  linkCta,
  homeHero,
  wayCard,
  homeWays,
  homeVia,
  homeStoriesIntro,
  snapshotStat,
  homeSnapshot,
  homePartners,
  involveAction,
  homeInvolve,
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
  homeHero,
  wayCard,
  homeWays,
  homeVia,
  homeStoriesIntro,
  snapshotStat,
  homeSnapshot,
  homePartners,
  involveAction,
  homeInvolve,
  homePage,
  story,
  appealEntry,
  eventItem,
]
