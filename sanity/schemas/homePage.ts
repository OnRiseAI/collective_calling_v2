import { defineField, defineType } from 'sanity'

/**
 * The homepage singleton, mockup-theme shape (spec v2). Fields mirror
 * HomeContent in lib/content/home.types.ts one to one. The Studio structure
 * enforces the singleton.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({ name: 'hero', title: 'Hero', type: 'homeHero' }),
    defineField({ name: 'ways', title: 'Three ways we create impact', type: 'homeWays' }),
    defineField({ name: 'via', title: 'Values In Action band', type: 'homeVia' }),
    defineField({ name: 'storiesIntro', title: 'Stories intro', type: 'homeStoriesIntro' }),
    defineField({ name: 'snapshot', title: 'Impact snapshot', type: 'homeSnapshot' }),
    defineField({ name: 'partners', title: 'Partners', type: 'homePartners' }),
    defineField({ name: 'involve', title: 'Get Involved band', type: 'homeInvolve' }),
  ],
  preview: {
    select: { title: 'hero.headlineLead' },
    prepare({ title }) {
      return { title: title || 'Home page' }
    },
  },
})
