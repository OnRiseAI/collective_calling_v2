import { defineField, defineType } from 'sanity'

/** A single impact statistic. Mirrors HomeContent.impactStats[]. */
export const impactStat = defineType({
  name: 'impactStat',
  title: 'Impact stat',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Shower', value: 'shower' },
          { title: 'Home', value: 'home' },
          { title: 'Heart', value: 'heart' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
})
