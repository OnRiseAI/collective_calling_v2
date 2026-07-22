import { defineField, defineType } from 'sanity'

/**
 * The homepage singleton, six-chapter experience-led shape. Fields mirror
 * HomeContent in lib/content/home.types.ts one to one. The Studio structure
 * enforces the singleton.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({ name: 'hero', title: 'Hero', type: 'heroChapter' }),
    defineField({ name: 'philosophy', title: 'Our philosophy', type: 'philosophyChapter' }),
    defineField({ name: 'expressions', title: 'How it comes to life', type: 'expressionsChapter' }),
    defineField({ name: 'possible', title: 'See what’s possible', type: 'possibleChapter' }),
    defineField({ name: 'impact', title: 'Impact', type: 'impactChapter' }),
    defineField({ name: 'invitation', title: 'Start your journey', type: 'invitationChapter' }),
  ],
  preview: {
    select: { title: 'hero.headline' },
    prepare({ title }) {
      return { title: title || 'Home page' }
    },
  },
})
