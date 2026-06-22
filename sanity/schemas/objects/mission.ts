import { defineField, defineType } from 'sanity'

/** The mission statement. Mirrors HomeContent.mission. */
export const mission = defineType({
  name: 'mission',
  title: 'Mission',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
  ],
})
