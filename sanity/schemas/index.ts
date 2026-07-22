import { homePage } from './homePage'
import {
  anchorCta,
  linkCta,
  heroChapter,
  philosophyChapter,
  expressionRow,
  expressionsChapter,
  possibleChapter,
  impactChapter,
  invitationChapter,
} from './objects/homeChapters'
import { story } from './documents/story'
import { appealEntry } from './documents/appealEntry'
import { eventItem } from './documents/eventItem'

/**
 * All schema types registered with the Studio. Consumed by sanity.config.ts.
 * Objects are listed before the document that references them. Collection
 * documents (story, appealEntry, eventItem) are registered last.
 */
export const schemaTypes = [
  anchorCta,
  linkCta,
  heroChapter,
  philosophyChapter,
  expressionRow,
  expressionsChapter,
  possibleChapter,
  impactChapter,
  invitationChapter,
  homePage,
  story,
  appealEntry,
  eventItem,
]
