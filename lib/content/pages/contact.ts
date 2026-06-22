import type { PageHero, ContactInfo } from './types'

/**
 * Content for the Contact page (/contact).
 *
 * Adapted faithfully from Collective Calling's own Contact Us page. The phone,
 * postal address, and email are the charity's real details, so the page can
 * offer working `tel:` and `mailto:` links and a real address. There is no
 * email-form backend yet, so this page deliberately does not submit a form: a
 * real contact form is deferred to a later plan. Until then the warmest, most
 * useful actions are to call, email, or write.
 *
 * The short invitation keeps the brand voice from the brand board (section 7):
 * warm, faith-forward, dignified, and direct. It includes the "invite us to
 * speak" mention so a church, school, or supporter group knows they can ask us
 * to come and share the work in person.
 *
 * Socials are the charity's real public profiles. They are external links, so
 * the component renders them as plain anchors that open in a new tab and never
 * carry a locale prefix. This is plain typed data so the page and its tests stay
 * simple, and there are no em dashes anywhere.
 */

/** A single social profile: a label, the external URL, and a short handle. */
export type SocialLink = {
  label: string
  href: string
  handle: string
}

export type ContactContent = {
  hero: PageHero
  /** A short warm invitation to get in touch, one paragraph per line. */
  invitation: string[]
  /** The charity's real contact details for tel/mailto links and the address. */
  info: ContactInfo
  /** A note shown beside the email action. */
  emailNote: string
  /** A note shown beside the phone, the charity also takes WhatsApp here. */
  phoneNote: string
  /** Eyebrow and heading for the details section. */
  details: {
    eyebrow: string
    heading: string
  }
  /** Eyebrow and heading for the social section. */
  social: {
    eyebrow: string
    heading: string
    links: SocialLink[]
  }
  /** The gold-led Donate close. */
  donate: {
    eyebrow: string
    heading: string
    body: string
    cta: string
  }
}

export const contactContent: ContactContent = {
  hero: {
    eyebrow: 'Get in touch',
    title: 'Contact Us',
    lede:
      'We would love to hear from you. Whether you have a question, want to partner with us, or would like to invite us to speak, we are only a message away.',
  },

  invitation: [
    'Collective Calling is a small team doing big things across Spain and Tanzania, and we read every message that comes in. If you want to know more about the work, support a family, or partner with us, please reach out. We will get back to you as soon as we can.',
    'If you would like to invite us to speak at your church, school, business, or community group, we would be glad to come and share the story of the work and the people behind it. Just send us an email or give us a call to start the conversation.',
  ],

  info: {
    phone: '+34 711 006 961',
    phoneHref: 'tel:+34711006961',
    address: 'Av. Pablo Ruiz Picasso, 4, 29670, San Pedro Alcantara, Malaga',
    email: 'info@collectivecalling.org',
  },

  emailNote: 'Feel free to email us your questions.',
  phoneNote: 'You can call or WhatsApp us anytime.',

  details: {
    eyebrow: 'Get in touch',
    heading: 'How to reach us',
  },

  social: {
    eyebrow: 'Stay connected',
    heading: 'Follow the work',
    links: [
      {
        label: 'Facebook',
        href: 'https://facebook.com/collectivecalling',
        handle: 'facebook.com/collectivecalling',
      },
      {
        label: 'YouTube',
        href: 'https://www.youtube.com/channel/UC-el3s8QuBqD81RtpODyhgQ',
        handle: 'youtube.com/collectivecalling',
      },
      {
        label: 'Instagram',
        href: 'https://instagram.com/collective_calling',
        handle: 'instagram.com/collective_calling',
      },
    ],
  },

  donate: {
    eyebrow: 'Join the calling',
    heading: 'Restore dignity, strengthen families',
    body: 'Your gift keeps the shower unit on the road in Spain and the Centre of Hope a safe haven in Tanzania. No gift is too small, and every act of generosity helps restore dignity and reunite families.',
    cta: 'Donate',
  },
}

export default contactContent
