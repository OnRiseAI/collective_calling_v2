import { defineField, defineType } from 'sanity'
import { HOME_CONTENT_VERSION } from '../../lib/content/home.types'

/**
 * The homepage singleton, v2 shape. Fields mirror HomeContent in
 * lib/content/home.types.ts one to one, in the order the bands appear on the
 * page. The Studio structure enforces the singleton.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({
      name: 'version',
      title: 'Content shape version',
      type: 'number',
      readOnly: true,
      initialValue: HOME_CONTENT_VERSION,
      description:
        'Set by the seed script. The site ignores this document unless it matches the shape the current homepage expects.',
    }),
    defineField({ name: 'hero', title: 'Hero', type: 'homeHero' }),
    defineField({ name: 'philosophy', title: 'Philosophy', type: 'homePhilosophy' }),
    defineField({ name: 'expressions', title: 'Expressions of the mission', type: 'homeExpressions' }),
    defineField({ name: 'via', title: 'Values In Action band', type: 'homeVia' }),
    defineField({ name: 'impact', title: 'Impact figures', type: 'homeImpact' }),
    defineField({ name: 'stories', title: 'Stories', type: 'homeStories' }),
    defineField({ name: 'impactCta', title: 'Impact invitation card', type: 'homeImpactCta' }),
    defineField({ name: 'partners', title: 'Partners', type: 'homePartners' }),
    defineField({ name: 'closing', title: 'Closing invitation', type: 'homeClosing' }),
  ],
  preview: {
    select: { title: 'hero.heading.lead' },
    prepare({ title }) {
      return { title: title || 'Home page' }
    },
  },
})
