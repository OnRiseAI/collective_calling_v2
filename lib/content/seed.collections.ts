/**
 * Seed data for the Stories, Appeals, and Events content collections.
 *
 * Rules:
 * - Real facts only. Anything unverified is flagged `placeholder: true`.
 * - Appeals are keyed to the live Donorbox designations.
 * - Sponsorship amount is EUR 58 per month (real figure).
 * - Programme spend is 83%, admin is 17% (real figure from 2025 accounts).
 * - Three real events (Annual Gala, Spring Fair, Lunch with Santa). Dates are
 *   not published so `dateLabel` is omitted and the UI shows "Date to be announced".
 * - No em dashes anywhere in this file.
 */

import type { Story, AppealEntry, EventItem } from './types'

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * SEED_STORIES: one real story (Caleb, Tanzania) harvested from the Tanzania
 * programme page, plus one clearly-labelled placeholder inviting real
 * supporter stories.
 */
export const SEED_STORIES: Story[] = [
  {
    slug: 'caleb',
    title: 'Meet Caleb',
    location: 'tanzania',
    excerpt:
      'Caleb was found in desperate need with his brothers and sisters after their older brother fell ill. Today he is thriving at the Centre of Hope, enrolled in school, and smiling.',
    body:
      'Caleb was born in a village near Kasulu town. He is 5 years old and the youngest of 5 orphans. He was discovered when his oldest brother, who is 21, became too ill with kidney problems to care for them any longer. The children were suffering from painful feet mites that needed immediate hospital treatment, so they were taken into the Centre of Hope while their older brother recovers and gets back on his feet. Caleb and his brothers and sisters are now thriving: fully recovered, enrolled in a local school, smiling, and happily taking part in everything the Centre of Hope has to offer. Caleb will need medical support for the rest of his life because of HIV he was born with, as both of his parents died of the illness. By sponsoring Caleb, you help us continue to meet his needs at the Centre, and when he is able to return home to his family.',
    images: [
      '/images/tanzania/caleb-before.jpg',
      '/images/tanzania/caleb-after.jpg',
      '/images/tanzania/caleb-family.jpg',
    ],
    placeholder: false,
  },
  {
    slug: 'your-story-here',
    title: 'Real supporter stories coming soon',
    location: 'general',
    excerpt:
      'We are collecting real accounts from supporters and families whose lives have been touched by the work of Collective Calling. This space will be filled with their words.',
    body:
      'Real supporter stories are coming. If you have been part of this journey and would like to share your experience, please get in touch. Every voice matters.',
    placeholder: true,
  },
]

// ---------------------------------------------------------------------------
// Appeals
// ---------------------------------------------------------------------------

/**
 * SEED_APPEALS: four entries keyed to the live Donorbox designations.
 * Content is adapted from the Spain and Tanzania programme pages.
 */
export const SEED_APPEALS: AppealEntry[] = [
  {
    slug: 'spain-homelessness',
    title: 'Restoring dignity in Spain',
    theme: 'spain',
    blurb:
      'Spain\'s first mobile shower unit travels along the Costa del Sol bringing hygiene, warmth, and human connection to people sleeping rough.',
    body:
      'At Collective Calling, we believe everyone deserves to feel clean, valued, and dignified. Our mobile shower unit travels along the Costa del Sol, offering something so simple, yet so powerful: a warm shower and a moment of humanity for those experiencing homelessness. This initiative does more than provide hygiene. It opens the door to relationships, emotional support, and connection to essential services. Often, a shower is the first step toward hope and a new beginning.',
    image: '/images/spain/hero-mobile-shower.jpg',
    alt: 'The Collective Calling mobile shower unit serving people along the Costa del Sol.',
    relatedHref: '/spain',
    donationDesignation: 'Spain',
  },
  {
    slug: 'tanzania-children',
    title: 'Rebuilding families in Tanzania',
    theme: 'tanzania',
    blurb:
      'Through the Centre of Hope in Kasulu we rescue, rehabilitate, and reintegrate street-connected children, giving every child a pathway home to a safe, loving family.',
    body:
      'The Centre of Hope is a transitional rescue centre for street children, located in Kasulu, Tanzania. Established in 2018, it provides a secure 200m home on a 500m plot, enclosed by a protective boundary wall. To date, Collective Calling has rescued and is currently caring for 18 children at the Centre, providing them with a safe haven and a pathway toward healing and reintegration with their families. Research proves that children develop best in a loving family unit. Our three Rs are Rescue, Rehabilitate, and Reintegrate: we find children in dangerous situations, bring them to safety, help them heal, and walk them home.',
    image: '/images/tanzania/centre-of-hope.jpg',
    alt: 'Children cared for at the Centre of Hope in Kasulu, Tanzania.',
    relatedHref: '/tanzania',
    donationDesignation: 'Tanzania',
  },
  {
    slug: 'sponsor-a-child',
    title: 'Sponsor a child',
    theme: 'general',
    blurb:
      'For EUR 58 a month you can give a child at the Centre of Hope the food, shelter, medical care, schooling, and counselling that gives them the chance to heal and go home.',
    body:
      'Sponsoring a child means giving them everything they need to move from crisis to recovery. Your monthly gift of EUR 58 covers nutritious meals, safe accommodation, medical care (including the ongoing HIV treatment Caleb depends on), accelerated schooling, and daily trauma and spiritual counselling. Our social worker also uses sponsor funding to maintain contact with each child\'s family, so that when reunification is safe and stable, it happens. You can sponsor a specific child or ask us to direct your support where it is needed most.',
    image: '/images/tanzania/caleb-after.jpg',
    alt: 'Caleb, thriving and smiling at the Centre of Hope in Tanzania.',
    relatedHref: '/get-involved/sponsor-a-child',
    donationDesignation: 'Sponsor A Child',
    donorboxQuery: {
      amount: 58,
      recurring: true,
      default_interval: 'm',
    },
  },
  {
    slug: 'greatest-need',
    title: 'Give where it is needed most',
    theme: 'general',
    blurb:
      'A gift to our Area of Greatest Need means 83 cents of every euro you give goes directly to the programmes supporting families in Spain and Tanzania.',
    body:
      'When you give to our Area of Greatest Need, you trust us to direct your gift to the work that needs it most, whether that is keeping the mobile shower unit on the road in Spain, caring for children at the Centre of Hope in Tanzania, or supporting the social work and family reunification that makes lasting change possible. In 2025, 83% of our total operating expenses went directly to programmes supporting children and parents living in poverty, including the logistics of running them.',
    relatedHref: '/donate',
    donationDesignation: 'Area of greatest need',
  },
]

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

/**
 * SEED_EVENTS: three real events. Dates are not published so `dateLabel` is
 * omitted. Any event whose description cannot be sourced from real facts is
 * flagged `placeholder: true` so the UI can badge it accordingly.
 */
export const SEED_EVENTS: EventItem[] = [
  {
    slug: 'annual-gala',
    title: 'Annual Gala',
    summary:
      'Our flagship fundraising evening, bringing together supporters of Collective Calling for a night of inspiration, celebration, and generous giving.',
    image: '/images/gala-poster.jpeg',
    alt: 'Poster for the Collective Calling Annual Gala.',
    // dateLabel omitted: date to be announced
  },
  {
    slug: 'spring-fair',
    title: 'Spring Fair',
    summary:
      'A family-friendly community fair raising funds for our work in Spain and Tanzania. A great opportunity to meet the team and learn more about what we do.',
    // dateLabel omitted: date to be announced
    placeholder: true,
  },
  {
    slug: 'lunch-with-santa',
    title: 'Lunch with Santa',
    summary:
      'A festive fundraising lunch for families and children, celebrating Christmas while supporting the children and families Collective Calling serves.',
    // dateLabel omitted: date to be announced
    placeholder: true,
  },
]
