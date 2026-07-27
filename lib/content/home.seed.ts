import type { HomeContent } from './home.types'

/**
 * Seed homepage content, transcribed from the Claude Design file
 * "Collective Calling v2.dc.html". Every string is the design's own, including
 * the letterspaced capitals it sets labels and actions in; every image path is
 * the design's own upload. Canonical — do not edit without a client-approved
 * copy change.
 *
 * The one thing the design does not supply is destinations: its links are all
 * `href="#"`. Each is pointed at the real route its label names.
 */
export const SEED_HOME: HomeContent = {
  hero: {
    eyebrow: 'COLLECTIVE CALLING',
    heading: { lead: 'A life', accent: 'beyond ourselves.' },
    lede: 'We believe every person carries something that can impact the life of another.',
    image: '/design/grok-image-4f23d86d-5943-42da-9cd4-253b4accee36.jpg',
    alt: 'Father and son on the beach at sunset',
    primaryCta: { label: 'START YOUR JOURNEY', href: '/get-involved' },
    secondaryCta: { label: "SEE WHAT'S POSSIBLE", href: '/stories' },
  },
  philosophy: {
    eyebrow: 'OUR PHILOSOPHY',
    heading: { lead: 'Everyone has', accent: 'something to give.' },
    body: 'We believe every person carries something unique. Our experiences, abilities, resources and influence were never meant to exist in isolation. They have the power to create something far beyond ourselves.',
    pullquote:
      'Because when what we carry becomes part of something bigger than ourselves, stories are changed, including our own.',
  },
  expressions: {
    eyebrow: 'HOW IT COMES TO LIFE',
    heading: 'Different expressions.\nOne shared purpose.',
    intro:
      'Every person has value. Everyone carries something they can contribute. And when people come together, new possibilities are created.',
    cards: [
      {
        key: 'children-families',
        index: '01',
        title: 'Children & Families',
        tagline: 'Creating futures beyond circumstances.',
        body: 'Through protection, education and long-term support in Tanzania, we create environments where children and families can heal, grow and discover what is possible.',
        image: '/design/grok-image-f288450f-8906-4d10-b41c-cb29ab6a5dcf.jpg',
        alt: 'Two smiling children',
        cta: { label: 'SEE THEIR STORIES', href: '/tanzania' },
      },
      {
        key: 'community',
        index: '02',
        title: 'Community',
        tagline: 'Restoring dignity through connection.',
        body: 'Through our Mobile Shower Unit, charity shops and local initiatives in Spain, we create opportunities for communities to come together and remind people that their story matters.',
        image: '/design/shopfront-crop.jpg',
        alt: 'Collective Calling charity shop front',
        cta: { label: 'EXPLORE COMMUNITY IMPACT', href: '/spain' },
      },
      {
        key: 'business',
        index: '03',
        title: 'Business',
        tagline: 'Extending the impact of what you already believe.',
        body: 'Values In Action exists to recognise what is already there and create opportunities for those values to travel further, beyond the walls of an organisation and into the lives of others.',
        image: '/design/business-crop.jpg',
        alt: 'Business team meeting',
        cta: { label: 'EXPLORE VALUES IN ACTION', href: '/get-involved/partner' },
      },
    ],
  },
  via: {
    eyebrow: 'VALUES IN ACTION',
    heading: { lead: 'When values lead, business becomes', accent: 'a force for good.' },
    body: 'We partner with business leaders who want to create impact that matters, for people, communities and the world we share.',
    cta: { label: 'DISCOVER VALUES IN ACTION', href: '/get-involved/partner' },
    image: '/design/values-crop.jpg',
    alt: 'Business leaders around a table',
  },
  impact: {
    eyebrow: 'IMPACT',
    heading: 'What happens when\nwe come together',
    intro:
      'Impact is not created by one person, one organisation or one action. It is created when many different parts come together.',
    stats: [
      { key: 'people', value: 10000, suffix: '+', label: 'PEOPLE SUPPORTED' },
      { key: 'education', value: 150, suffix: '+', label: 'CHILDREN IN EDUCATION' },
      { key: 'projects', value: 25, suffix: '+', label: 'PROJECTS DELIVERED' },
      { key: 'shops', value: 2, suffix: '', label: 'CHARITY SHOPS' },
      { key: 'partners', value: 100, suffix: '+', label: 'BUSINESS PARTNERS' },
    ],
  },
  stories: {
    eyebrow: "SEE WHAT'S POSSIBLE",
    heading: { lead: 'Every story begins with someone', accent: 'choosing to respond.' },
    viewAll: { label: 'VIEW ALL STORIES', href: '/stories' },
    feature: {
      title: "Nacho's Story",
      blurb: 'A journey of hope and opportunity.',
      image: '/design/grok-image-a54441ea-aa59-4b3d-ad74-beb0546afc1a.jpg',
      alt: "Nacho's story, boy playing with water",
      href: '/stories',
    },
    cards: [
      {
        title: 'Mobile Shower Unit',
        blurb: 'Dignity on the streets of the Costa del Sol.',
        image: '/design/grok-image-4e01e5a7-5e71-4156-ae1d-e45cb926aa0a.jpg',
        alt: 'Mobile shower unit',
        href: '/spain',
      },
      {
        title: 'Business in Action',
        blurb: 'How values drive real change.',
        image: '/design/unsplash-1529156069898.jpg',
        alt: 'People arm in arm at sunset',
        href: '/get-involved/partner',
      },
    ],
  },
  impactCta: {
    eyebrow: 'IMPACT',
    heading: { lead: 'A simple action becomes', accent: 'part of something bigger.' },
    cta: { label: 'SEE THE IMPACT', href: '/about/our-impact' },
    image: '/design/grok-image-439c81b2-540f-4b8b-9477-833cab26c010.jpg',
    alt: '',
  },
  partners: {
    label: 'TRUSTED PARTNERS',
    marks: [
      { name: 'Drumelia Real Estate', logo: '/design/drumelia_logo.jpg' },
      { name: 'MANIFESTO', style: 'caps' },
      { name: 'Not Just a Gym', style: 'italic' },
      { name: 'BOUNCE', style: 'caps' },
    ],
    logoSlot: { label: 'YOUR LOGO HERE', href: '/get-involved/partner' },
  },
  closing: {
    eyebrow: 'START YOUR JOURNEY',
    heading: { lead: 'Find your place', accent: 'in the story.' },
    body: 'Some people bring time. Some bring experience. Some bring resources. Each contribution is different, but together they become part of something greater.',
    primaryCta: { label: 'START YOUR JOURNEY', href: '/get-involved' },
    secondaryCta: { label: 'VISIT OUR CHARITY SHOPS', href: '/charity-shops' },
  },
}
