import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Story document. Mirrors the Story type in lib/content/types.ts.
 * Field names match STORIES_QUERY in lib/sanity/stories.query.ts exactly.
 * Bodies are plain text fields, not portable text arrays.
 *
 * No em dashes anywhere in this file.
 */
export const story = defineType({
  name: 'story',
  title: 'Story',
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
      name: 'location',
      title: 'Location',
      type: 'string',
      options: {
        list: [
          { title: 'Tanzania', value: 'tanzania' },
          { title: 'Spain', value: 'spain' },
          { title: 'General', value: 'general' },
        ],
        layout: 'radio',
      },
      initialValue: 'general',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
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
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'boolean',
      description: 'Mark true if this is seed/placeholder content, not a real story.',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'placeholder' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled story',
        subtitle: subtitle ? 'Placeholder' : 'Live',
      }
    },
  },
})
