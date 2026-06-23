import { defineField, defineType } from 'sanity'

/**
 * AppealEntry document. Mirrors the AppealEntry type in lib/content/types.ts.
 * Field names match APPEALS_QUERY in lib/sanity/appeals.query.ts exactly.
 * Body and blurb are plain text fields, not portable text arrays.
 *
 * No em dashes anywhere in this file.
 */
export const appealEntry = defineType({
  name: 'appealEntry',
  title: 'Appeal Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
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
          { title: 'Seasonal', value: 'seasonal' },
        ],
        layout: 'radio',
      },
      initialValue: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 10,
    }),
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
      description: 'Describes the image for screen readers.',
    }),
    defineField({
      name: 'relatedHref',
      title: 'Related link',
      type: 'string',
      description: 'Path to a related page, e.g. /stories/spain-mission.',
    }),
    defineField({
      name: 'donationDesignation',
      title: 'Donation designation',
      type: 'string',
      description: 'Fund designation label passed to the donation form.',
    }),
    defineField({
      name: 'donorboxQuery',
      title: 'Donorbox query params',
      type: 'object',
      fields: [
        defineField({
          name: 'amount',
          title: 'Default amount',
          type: 'number',
        }),
        defineField({
          name: 'recurring',
          title: 'Recurring',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'default_interval',
          title: 'Default interval',
          type: 'string',
          options: {
            list: [
              { title: 'Monthly', value: 'm' },
              { title: 'Yearly', value: 'y' },
              { title: 'One-time', value: 'o' },
            ],
            layout: 'radio',
          },
          initialValue: 'o',
        }),
      ],
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'boolean',
      description: 'Mark true if this is seed/placeholder content.',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'theme', media: 'image' },
  },
})
