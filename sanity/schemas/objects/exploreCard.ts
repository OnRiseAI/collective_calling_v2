import { defineField, defineType } from 'sanity'

/**
 * An explore card. Mirrors HomeContent.exploreCards[].
 * Image and alt are sibling fields, matching the content contract.
 */
export const exploreCard = defineType({
  name: 'exploreCard',
  title: 'Explore card',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'blurb', title: 'Blurb', type: 'text', rows: 3 }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'alt',
      title: 'Image alt text',
      type: 'string',
      description: 'Describes the card image for screen readers.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'href', media: 'image' },
  },
})
