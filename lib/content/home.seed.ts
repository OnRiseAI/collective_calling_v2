import type { HomeContent } from './home.types'

/**
 * Seed homepage content: the client's homepage copy verbatim (canonical, do not
 * edit without a client-approved copy change). Rendered whenever Sanity is
 * unconfigured, unreachable, or missing a field.
 */
export const SEED_HOME: HomeContent = {
  hero: {
    headline: 'A Life Beyond Ourselves',
    text: [
      'We believe every person carries something that can impact the life of another.',
      'Collective Calling creates pathways for individuals, communities and organisations to use what they have — their time, skills, resources and influence — to restore dignity, create opportunity and bring lasting change.',
    ],
    image: '/images/mission-tanzania.png',
    alt: 'A Collective Calling team member walking hand in hand with a boy in Tanzania.',
    primaryCta: { label: 'Start Your Journey', targetId: 'participation' },
    secondaryCta: { label: 'See What’s Possible', targetId: 'possibility' },
  },
  philosophy: {
    headline: 'Everyone Has Something To Give',
    body: [
      'We believe every person carries something unique.',
      'Our experiences, abilities, resources and influence were never meant to exist in isolation — they have the power to create something far beyond ourselves.',
      'Collective Calling creates opportunities for people, communities and organisations to discover how what they carry can become part of a bigger story.',
    ],
    pullLine:
      'Because when what we carry becomes part of something bigger than ourselves, stories are changed — including our own.',
  },
  expressions: {
    headline: 'Different Expressions. One Shared Purpose.',
    intro: 'The ways we create change may look different, but they all grow from the same belief:',
    credo: [
      'Every person has value.',
      'Everyone carries something they can contribute.',
      'And when people come together, new possibilities are created.',
    ],
    rows: [
      {
        key: 'children-families',
        eyebrow: 'Children & Families',
        heading: 'Creating futures beyond circumstances.',
        belief:
          'Every child carries potential that should not be limited by the circumstances they were born into.',
        body: 'Through protection, education and long-term support in Tanzania, we create environments where children and families can heal, grow and discover what is possible.',
        image: '/images/tanzania-children.jpg',
        alt: 'Children at the Centre of Hope in Tanzania.',
        cta: { label: 'See Their Stories', href: '/stories' },
      },
      {
        key: 'community',
        eyebrow: 'Community',
        heading: 'Restoring dignity through connection.',
        belief: 'Every person deserves to be seen, valued and recognised.',
        body: 'Through our Mobile Shower Unit, charity shops and local initiatives in Spain, we create opportunities for communities to come together and remind people that their story matters.',
        image: '/images/spain-mobile-shower.jpg',
        alt: 'The Collective Calling mobile shower unit serving people in Spain.',
        cta: { label: 'Explore Community Impact', href: '/spain' },
      },
      {
        key: 'business',
        eyebrow: 'Business',
        heading: 'Extending the impact of what you already believe.',
        belief: 'Every business carries a story — built through its people, culture and values.',
        body: 'Values In Action exists to recognise what is already there and create opportunities for those values to travel further — beyond the walls of an organisation and into the lives of others.',
        image: '/images/speaking-event.jpg',
        alt: 'A Collective Calling speaking event with local businesses.',
        cta: { label: 'Explore Values In Action', href: '/get-involved/partner' },
      },
    ],
  },
  possible: {
    headline: 'Every Story Begins With Someone Choosing To Respond',
    intro: 'Behind every moment of change is a connection.',
    moments: [
      'Someone who saw potential.',
      'Someone who shared what they carried.',
      'Someone who believed a different future was possible.',
    ],
    outro:
      'These stories represent what happens when lives, communities and opportunities come together.',
  },
  impact: {
    headline: 'What Happens When We Come Together',
    intro: [
      'Impact is not created by one person, one organisation or one action.',
      'It is created when many different parts come together.',
    ],
    moments: [
      'A person shares their time.',
      'A business extends its values.',
      'A community responds.',
      'A resource becomes an opportunity.',
      'A simple action becomes part of something bigger.',
    ],
    outro: 'Together, these moments create stories of lasting change.',
    cta: { label: 'See The Impact', href: '/about/our-impact' },
  },
  invitation: {
    headline: 'Find Your Place In The Story',
    intro: 'Every journey looks different.',
    bring: [
      'Some people bring time.',
      'Some bring experience.',
      'Some bring resources.',
      'Some bring ideas, connections or opportunities.',
    ],
    outro: 'Each contribution is different, but together they become part of something greater.',
    cta: { label: 'Start Your Journey', href: '/get-involved' },
  },
}
