import type { HomeContent } from './types'

/**
 * Seed homepage content. Returned as-is for now; a later plan will read a CMS
 * and fall back to this object, so this function is async by design.
 *
 * Real facts are kept verbatim. Testimonials are flagged `placeholder: true`
 * and must be replaced with real supporter quotes before launch (spec section 10).
 */
export async function getHomeContent(): Promise<HomeContent> {
  return {
    hero: {
      eyebrow: 'Collective Calling',
      headline: 'Answer the call to restore dignity and rebuild families.',
      lede: 'A Christian charity walking with people sleeping rough in Spain and street-connected children in Tanzania, restoring dignity and bringing families back together.',
      image: '/images/tanzania-children.jpg',
      alt: 'Children smiling outside the Centre of Hope in Tanzania.',
    },
    impactStats: [
      { icon: 'shower', value: "Spain's first", label: 'mobile shower unit, restoring dignity to people sleeping rough in Marbella.' },
      { icon: 'home', value: 'Centre of Hope', label: 'a safe haven that rescues and reunites street-connected children in Tanzania.' },
      { icon: 'heart', value: '83%', label: 'of every euro goes directly to our programs.' },
    ],
    appeals: [
      { slug: 'spain', title: 'Restoring dignity in Spain', blurb: 'Our mobile shower unit and outreach bring hygiene, warmth, and human connection to people sleeping rough.', image: '/images/spain-mobile-shower.jpg', alt: 'The Collective Calling mobile shower unit serving people in Spain.', href: '/spain', theme: 'spain' },
      { slug: 'tanzania', title: 'Rebuilding families in Tanzania', blurb: 'Through our Centre of Hope we rescue, restore, and reunite street-connected children with safe, loving homes.', image: '/images/tanzania-children.jpg', alt: 'Children at the Centre of Hope in Tanzania.', href: '/tanzania', theme: 'tanzania' },
      { slug: 'sponsor', title: 'Sponsor a child', blurb: 'For 58 euros a month you can give a child food, shelter, education, and the chance of a future.', image: '/images/speaking-event.jpg', alt: 'A Collective Calling gathering.', href: '/get-involved/sponsor-a-child', theme: 'general' },
    ],
    mission: {
      eyebrow: 'Our mission',
      heading: 'When people are pushed to the margins, we walk with them.',
      body: 'Collective Calling restores dignity and strengthens families. We support people experiencing homelessness in Spain through our mobile shower service, and we work toward family reunification for vulnerable street children in Tanzania, helping children return to safe, loving homes. Every person we serve is treated as exactly that: a person, made and loved.',
    },
    scripture: {
      quote: 'Beloved, if God so loved us, we also ought to love one another.',
      reference: '1 John 4:11',
    },
    // PLACEHOLDER: replace these with real supporter quotes before launch (spec section 10).
    testimonials: [
      { quote: 'Through Collective Calling I can love my neighbour in places I could never reach on my own.', attribution: 'Supporter', placeholder: true },
      { quote: 'I give because they treat every person with dignity, and because nearly every euro reaches the people who need it.', attribution: 'Monthly giver', placeholder: true },
      { quote: 'Seeing a child go from the street back to a loving home is the most hopeful thing I know.', attribution: 'Supporter', placeholder: true },
    ],
    exploreCards: [
      { title: 'Appeals', blurb: 'Stand with families in Spain and Tanzania through our current appeals.', image: '/images/spain-homelessness.jpg', alt: 'Outreach in Spain.', href: '/appeals' },
      { title: 'Stories', blurb: 'Read how lives are being reclaimed, one person and one family at a time.', image: '/images/transform-5.png', alt: 'A life reclaimed.', href: '/stories' },
      { title: 'Get involved', blurb: 'Sponsor a child, fundraise, pray, or invite us to speak.', image: '/images/speaking-event.jpg', alt: 'A Collective Calling speaking event.', href: '/get-involved' },
      { title: 'About us', blurb: 'Who we are, what we do, and how we stay accountable.', image: '/images/tanzania-children.jpg', alt: 'Children in Tanzania.', href: '/about' },
    ],
    money: {
      programsPct: 83,
      adminPct: 17,
      programsLabel: 'funds our programs',
      adminLabel: 'keeps us running and growing',
      note: 'In 2025, 83% of our total operating expenses went directly to programs supporting children and parents living in poverty, including the logistics of running them.',
    },
    donate: {
      monthlyTiers: [
        { amount: 15, interval: 'monthly', impact: 'could help provide hot meals and hygiene for people sleeping rough.' },
        { amount: 30, interval: 'monthly', impact: 'could help keep the mobile shower unit on the road each week.' },
        { amount: 58, interval: 'monthly', impact: 'sponsors a child in Tanzania with food, shelter, and education.' },
      ],
      onceTiers: [
        { amount: 25, interval: 'once', impact: 'could provide hygiene kits for several people sleeping rough.' },
        { amount: 50, interval: 'once', impact: 'could help a child settle back into a safe home.' },
        { amount: 100, interval: 'once', impact: 'could help fund a family reunification.' },
      ],
    },
    trust: {
      registration: 'Registered nonprofit · Reg. 611.510 · CIF G93524130',
      statement: 'We are transparent and accountable. No donation is too small, and we are glad to be reviewed by third parties.',
      partners: ['Rotary Club Guadalmina Marbella', 'Ayuntamiento de Marbella'],
    },
  }
}
