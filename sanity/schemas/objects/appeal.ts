import { defineField, defineType } from 'sanity'

/**
 * A fundraising appeal card. Mirrors HomeContent.appeals[].
 * Image and alt are sibling fields, matching the content contract.
 */
export const appeal = defineType({
  name: 'appeal',
  title: 'Appeal',
  type: 'object',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
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
      description: 'Describes the appeal image for screen readers.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Spain', value: 'spain' },
          { title: 'Tanzania', value: 'tanzania' },
          { title: 'General', value: 'general' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'theme', media: 'image' },
  },
})
