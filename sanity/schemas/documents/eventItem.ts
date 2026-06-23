import { defineField, defineType } from 'sanity'

/**
 * EventItem document. Mirrors the EventItem type in lib/content/types.ts.
 * Field names match EVENTS_QUERY in lib/sanity/events.query.ts exactly.
 * Summary is a plain text field, not a portable text array.
 *
 * No em dashes anywhere in this file.
 */
export const eventItem = defineType({
  name: 'eventItem',
  title: 'Event',
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
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
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
      name: 'dateLabel',
      title: 'Date label',
      type: 'string',
      description: 'Human-readable date string, e.g. "14 June 2025".',
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
    select: { title: 'title', subtitle: 'dateLabel', media: 'image' },
  },
})
