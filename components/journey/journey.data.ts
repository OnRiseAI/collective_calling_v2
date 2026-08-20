/**
 * Find Your Path journey content and geometry, transcribed from the Claude
 * Design file "Find Your Path.dc.html" (design-export/journey/prototype/
 * find-your-path.latest.dc.html). Every string, weight, path `d`, node
 * coordinate and crop value is the design's own — do not tune them here, tune
 * them in the prototype with ?calibrate=1 and port the numbers back.
 *
 * The one thing the design does not supply is destinations: its result links
 * are all `href="#"`. Each is pointed at the real route its path names.
 */

export type PathKey = 'values' | 'volunteer' | 'partner' | 'founding'

/** Per-option score weights; absent keys score zero. */
export type Weights = Partial<Record<PathKey, number>>

export type Question = {
  q: string
  /** [label, weights] pairs, in display order. */
  o: Array<[string, Weights]>
}

export type Frame =
  | { type: 'landing' | 'forest' | 'quote' | 'sunrise' | 'summary' | 'result' | 'next' }
  | { type: 'q'; i: number }

/** A photo panel with a glow path traced over its road, in SOURCE pixels. */
export type PhotoTrace = {
  src: string
  alt: string
  /** Source image size the `d` string and nodes were traced against. */
  w: number
  h: number
  /** Mirror of the img's object-position, so the overlay sees the same crop. */
  px: number
  py: number
  d: string
  nodes: Array<{ x: number; y: number; t: number }>
}

export type PhotoKey = 'valley' | 'village' | 'forest' | 'quote' | 'sunrise'

// Traced against each photo's real road, in SOURCE pixel coordinates.
// Nudge these with ?calibrate=1 — nothing else needs touching.
export const PATHS: Record<PhotoKey, PhotoTrace> = {
  valley: {
    src: '/images/journey/journey-02-valley.jpg',
    alt: 'A track winding up through a sunlit valley',
    w: 1168,
    h: 880,
    px: 0.72,
    py: 1.0,
    d: 'M 400 880 C 545 835, 665 775, 745 725 C 825 675, 905 645, 932 596 C 952 556, 895 528, 828 512',
    nodes: [
      { x: 555, y: 828, t: 0.16 },
      { x: 770, y: 712, t: 0.42 },
      { x: 905, y: 620, t: 0.68 },
      { x: 900, y: 548, t: 0.9 },
    ],
  },
  village: {
    src: '/images/journey/journey-05-village.jpg',
    alt: 'A road winding down towards a village in the valley',
    w: 1280,
    h: 816,
    px: 0.72,
    py: 1.0,
    d: 'M 620 816 C 760 770, 880 715, 960 645 C 1030 585, 1090 545, 1082 480 C 1074 425, 1098 400, 1130 384',
    nodes: [
      { x: 770, y: 762, t: 0.18 },
      { x: 985, y: 628, t: 0.45 },
      { x: 1070, y: 520, t: 0.7 },
      { x: 1108, y: 400, t: 0.92 },
    ],
  },
  forest: {
    src: '/images/journey/journey-03-forest.jpg',
    alt: 'A trail winding through misty pine forest',
    w: 1168,
    h: 880,
    px: 0.5,
    py: 1.0,
    d: 'M 448 880 C 520 826, 486 772, 540 726 C 596 680, 668 668, 700 622 C 730 578, 662 548, 632 508 C 608 476, 640 446, 606 420 C 578 398, 556 386, 544 372',
    nodes: [
      { x: 494, y: 832, t: 0.1 },
      { x: 540, y: 726, t: 0.24 },
      { x: 652, y: 672, t: 0.4 },
      { x: 706, y: 610, t: 0.55 },
      { x: 642, y: 520, t: 0.7 },
      { x: 620, y: 442, t: 0.84 },
      { x: 566, y: 392, t: 0.95 },
    ],
  },
  quote: {
    src: '/images/journey/journey-04-quote.jpg',
    alt: 'Mist rising over a wooded hillside path',
    w: 1264,
    h: 816,
    px: 1.0,
    py: 1.0,
    d: 'M 1090 816 C 1010 752, 1052 700, 996 660 C 950 626, 984 600, 946 574',
    nodes: [
      { x: 1042, y: 764, t: 0.24 },
      { x: 1014, y: 674, t: 0.58 },
      { x: 958, y: 588, t: 0.9 },
    ],
  },
  sunrise: {
    src: '/images/journey/journey-06-sunrise.jpg',
    alt: 'Sunrise over rolling hills with a winding track',
    w: 1264,
    h: 816,
    px: 0.6,
    py: 1.0,
    d: 'M 730 816 C 850 745, 960 690, 1010 620 C 1055 558, 1000 512, 955 470 C 925 442, 900 425, 880 408',
    nodes: [
      { x: 872, y: 742, t: 0.2 },
      { x: 1022, y: 605, t: 0.48 },
      { x: 990, y: 495, t: 0.74 },
      { x: 900, y: 424, t: 0.94 },
    ],
  },
}

export type MapSpot = { x: number; y: number; matched?: boolean; anchor?: 'end' }

// journey-07-map.jpg ships with its glow already rendered, so labels are pinned
// to the baked-in nodes in source coordinates and ride the same crop maths.
export const MAP: {
  src: string
  alt: string
  w: number
  h: number
  px: number
  py: number
  fit: 'contain'
  spots: MapSpot[]
} = {
  src: '/images/journey/journey-07-map.jpg',
  alt: 'A glowing path leading to the matched destination',
  w: 1328,
  h: 784,
  px: 0.5,
  py: 0.5,
  fit: 'contain',
  spots: [
    { x: 897, y: 148, matched: true },
    { x: 698, y: 402 },
    { x: 1158, y: 318, anchor: 'end' },
    { x: 959, y: 652 },
  ],
}

export type PathInfo = {
  name: string
  desc: string
  short: string
  href: string
}

export const PATH_INFO: Record<PathKey, PathInfo> = {
  values: {
    name: 'Values in Action',
    desc: 'You seem to be someone who wants to use your skills, influence and resources to create meaningful change. Values in Action connects people like you with practical opportunities that make a real difference in communities.',
    short: 'Put your skills and influence to work',
    href: '/get-involved/partner',
  },
  volunteer: {
    name: 'Volunteer',
    desc: 'You are drawn to being close to the people it affects, with your sleeves rolled up. Volunteering places you alongside our teams in the shops, on the streets and out in the community, giving whatever time you genuinely have.',
    short: 'Hands-on, in the community',
    href: '/get-involved',
  },
  partner: {
    name: 'Community Partner',
    desc: 'You are thinking on behalf of an organisation as much as yourself. Partnering lets a business put real weight behind local work, from staff time and premises through to shared campaigns and long-running support.',
    short: 'Bring your organisation with you',
    href: '/get-involved/partner',
  },
  founding: {
    name: 'Founding 100',
    desc: 'You are ready for something deeper than a single project. The Founding 100 is a small group committing for the long term, helping shape what Collective Calling becomes and staying close to the decisions that matter.',
    short: 'A founding, long-term role',
    // TODO: point at the Founding 100 page once one exists; /get-involved is
    // the closest real destination today.
    href: '/get-involved',
  },
}

export const QUESTIONS: Question[] = [
  {
    q: 'When you look at the world around you... Which thought resonates with you most?',
    o: [
      ['I wish I could make more of a difference.', { volunteer: 2, values: 1 }],
      ['I want my work to have greater meaning.', { values: 3 }],
      ['I feel most alive when helping others.', { volunteer: 3 }],
      ['I believe businesses can create lasting change.', { partner: 3 }],
      ["I'm still discovering where I fit.", { volunteer: 1, values: 1 }],
    ],
  },
  {
    q: 'What first drew you towards Collective Calling?',
    o: [
      ['Someone I trust invited me in.', { volunteer: 2, founding: 1 }],
      ['I have been looking for work that means something.', { values: 3 }],
      ['My organisation wants to give something back.', { partner: 3 }],
      ['I want to help build something from the ground up.', { founding: 3 }],
      ['Honestly, curiosity.', { volunteer: 1, values: 1 }],
    ],
  },
  {
    q: 'Realistically, how much time could you give?',
    o: [
      ['An hour here and there.', { volunteer: 2 }],
      ['A regular slot each week.', { volunteer: 3 }],
      ['A few focused days a year.', { values: 2, partner: 1 }],
      ['Whatever it takes to see it through.', { founding: 3 }],
      ['I would rather give resources than hours.', { values: 2, partner: 2 }],
    ],
  },
  {
    q: 'When you picture yourself contributing, what are you holding?',
    o: [
      ['A pair of hands.', { volunteer: 3 }],
      ['A skill I have spent years building.', { values: 3 }],
      ['A network of people I could open up.', { partner: 3 }],
      ['A commitment I intend to keep.', { founding: 3 }],
      ['An idea I cannot quite let go of.', { founding: 2, values: 1 }],
    ],
  },
  {
    q: 'How far ahead do you tend to think?',
    o: [
      ['The next few weeks.', { volunteer: 2 }],
      ['The year ahead.', { values: 2, partner: 1 }],
      ['Five years and beyond.', { founding: 3 }],
      ['In generations.', { founding: 2, values: 1 }],
      ['I try to stay in the present.', { volunteer: 2 }],
    ],
  },
  {
    q: 'Which environment brings out the best in you?',
    o: [
      ['A team working towards a shared goal.', { values: 2, partner: 1 }],
      ['A close-knit community.', { volunteer: 3 }],
      ['A flexible, creative space.', { values: 2 }],
      ['One-to-one with people.', { volunteer: 2 }],
      ['Leading and inspiring others.', { founding: 2, partner: 2 }],
    ],
  },
  {
    q: 'A year from now, what would make you glad you started?',
    o: [
      ['Knowing one particular person is better off.', { volunteer: 3 }],
      ['Seeing my values show up in my work.', { values: 3 }],
      ['Watching my organisation change how it operates.', { partner: 3 }],
      ['Being part of the group that made it possible.', { founding: 3 }],
      ['Having learned something about myself.', { volunteer: 1, values: 1 }],
    ],
  },
  {
    q: 'Which of these sounds most like where you are now?',
    o: [
      ['I have capacity and want to be useful.', { volunteer: 3 }],
      ['I have influence and want to use it well.', { values: 3 }],
      ['I speak for an organisation, not only myself.', { partner: 3 }],
      ['I am ready to commit properly.', { founding: 3 }],
      ['I am right at the beginning of working it out.', { volunteer: 2 }],
    ],
  },
  {
    q: 'How would you like us to involve you?',
    o: [
      ['Tell me where to turn up.', { volunteer: 3 }],
      ['Bring me a problem worth solving.', { values: 3 }],
      ['Talk to me about a partnership.', { partner: 3 }],
      ['Keep me close to the decisions.', { founding: 3 }],
      ['Start gently, and we will see.', { volunteer: 2 }],
    ],
  },
  {
    q: 'Last one. What feels true right now?',
    o: [
      ['I want to give my time.', { volunteer: 3 }],
      ['I want my values to travel further.', { values: 3 }],
      ['I want to bring my organisation with me.', { partner: 3 }],
      ['I want to help lay the foundations.', { founding: 3 }],
      ['I want to stay close and find out.', { volunteer: 1, values: 1, founding: 1 }],
    ],
  },
]

export const FLOW: Frame[] = [
  { type: 'landing' },
  { type: 'q', i: 0 },
  { type: 'q', i: 1 },
  { type: 'q', i: 2 },
  { type: 'forest' },
  { type: 'q', i: 3 },
  { type: 'quote' },
  { type: 'q', i: 4 },
  { type: 'q', i: 5 },
  { type: 'q', i: 6 },
  { type: 'q', i: 7 },
  { type: 'sunrise' },
  { type: 'q', i: 8 },
  { type: 'q', i: 9 },
  { type: 'summary' },
  { type: 'result' },
  { type: 'next' },
]

/** The two question-screen photos alternate so nothing repeats back to back. */
export function questionPhoto(i: number): PhotoKey {
  return i % 2 === 0 ? 'valley' : 'village'
}
