import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * The homepage singleton. Its fields mirror the HomeContent type in
 * lib/content/types.ts one to one. Only one document of this type is expected;
 * the Studio structure enforces the singleton (see Task 4).
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({ name: 'hero', title: 'Hero', type: 'heroBlock' }),
    defineField({
      name: 'impactStats',
      title: 'Impact stats',
      type: 'array',
      of: [defineArrayMember({ type: 'impactStat' })],
    }),
    defineField({
      name: 'appeals',
      title: 'Appeals',
      type: 'array',
      of: [defineArrayMember({ type: 'appeal' })],
    }),
    defineField({ name: 'mission', title: 'Mission', type: 'mission' }),
    defineField({ name: 'scripture', title: 'Scripture', type: 'scripture' }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [defineArrayMember({ type: 'testimonial' })],
    }),
    defineField({
      name: 'exploreCards',
      title: 'Explore cards',
      type: 'array',
      of: [defineArrayMember({ type: 'exploreCard' })],
    }),
    defineField({ name: 'money', title: 'Money split', type: 'moneySplit' }),
    defineField({
      name: 'donate',
      title: 'Donate',
      type: 'object',
      fields: [
        defineField({
          name: 'monthlyTiers',
          title: 'Monthly tiers',
          type: 'array',
          of: [defineArrayMember({ type: 'donateTier' })],
        }),
        defineField({
          name: 'onceTiers',
          title: 'One time tiers',
          type: 'array',
          of: [defineArrayMember({ type: 'donateTier' })],
        }),
      ],
    }),
    defineField({ name: 'trust', title: 'Trust', type: 'trust' }),
  ],
  preview: {
    select: { title: 'hero.headline' },
    prepare({ title }) {
      return { title: title || 'Home page' }
    },
  },
})
