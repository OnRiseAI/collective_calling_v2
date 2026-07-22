import type { HomeContent } from './home.types'

/**
 * Seed homepage content: the client's design-theme mockup copy verbatim
 * (canonical, do not edit without a client-approved copy change). Rendered
 * whenever Sanity is unconfigured, unreachable, or missing a field.
 *
 * Photography is the real repo imagery standing in for the mockup's
 * placeholder images.
 */
export const SEED_HOME: HomeContent = {
  hero: {
    eyebrow: 'Collective Calling',
    headlineLead: 'Where Values Become',
    headlineAccent: 'Visible.',
    lede: 'We exist to transform values into meaningful action together with communities and businesses.',
    image: '/images/mission-tanzania.png',
    alt: 'A Collective Calling team member walking hand in hand with a boy in Tanzania.',
    primaryCta: { label: 'Explore Our Impact', href: '/about/our-impact' },
    secondaryCta: { label: 'Discover Values in Action', href: '/get-involved/partner' },
    scrollCue: 'Scroll to discover',
  },
  ways: {
    heading: 'Three Ways We Create Impact',
    cards: [
      {
        key: 'community',
        title: 'Community',
        body: 'Local outreach that restores dignity, strengthens communities and creates real opportunities.',
        image: '/images/spain-mobile-shower.jpg',
        alt: 'The Collective Calling mobile shower unit serving people in Spain.',
        href: '/spain',
      },
      {
        key: 'children-families',
        title: 'Children & Families',
        body: 'International and local projects supporting children, education and family reunification.',
        image: '/images/tanzania-children.jpg',
        alt: 'Children at the Centre of Hope in Tanzania.',
        href: '/tanzania',
      },
      {
        key: 'businesses',
        title: 'Businesses',
        body: 'Purpose-led partnerships that help businesses bring their values to life through meaningful action.',
        image: '/images/speaking-event.jpg',
        alt: 'A Collective Calling speaking event with local businesses.',
        href: '/get-involved/partner',
      },
    ],
  },
  via: {
    eyebrow: 'Values In Action',
    heading: 'When values lead, business becomes a force for good.',
    body: 'We partner with business leaders who want to create impact that matters – for people, communities and the world we share.',
    cta: { label: 'Discover VIA', href: '/get-involved/partner' },
    image: '/images/transform-5.png',
    alt: 'Collective Calling working alongside partners.',
  },
  storiesIntro: {
    heading: 'Stories That Inspire',
    subline: 'Real people. Real journeys. Real impact.',
    viewAll: { label: 'View all stories', href: '/stories' },
  },
  snapshot: {
    heading: 'Our Impact Snapshot',
    stats: [
      { icon: 'people', value: '10,000+', label: 'People Supported' },
      { icon: 'education', value: '150+', label: 'Children in Education' },
      { icon: 'projects', value: '25+', label: 'Projects Delivered' },
      { icon: 'shop', value: '2', label: 'Charity Shops' },
      { icon: 'partners', value: '100+', label: 'Business Partners' },
    ],
  },
  partners: {
    heading: 'Stronger Together',
    body: "We're proud to partner with businesses that believe in using their values to create a better world.",
    names: ['Drumelia Real Estate', 'Manifesto Cabinets', 'Not Just A Gift', 'Bounce Beach'],
    logoSlot: 'Your Logo Here',
    cta: { label: 'Meet our partners', href: '/about/partners' },
  },
  involve: {
    heading: 'Get Involved',
    body: 'There are many ways to be part of the Collective Calling mission.',
    actions: [
      { icon: 'donate', title: 'Donate', blurb: 'Make a difference', href: '/donate' },
      { icon: 'volunteer', title: 'Volunteer', blurb: 'Give your time and skills', href: '/get-involved' },
      { icon: 'partner', title: 'Partner', blurb: 'Work with us for impact', href: '/get-involved/partner' },
    ],
    image: '/images/about/hero-group.jpg',
    alt: 'Collective Calling volunteers together.',
    shops: {
      heading: 'Visit Our Charity Shops',
      body: 'Find great items, support our mission and help create impact.',
      cta: { label: 'Find out more', href: '/charity-shops' },
    },
  },
}
