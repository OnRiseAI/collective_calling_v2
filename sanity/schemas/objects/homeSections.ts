import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Object types for the v2 homepage. Field names mirror lib/content/home.types.ts
 * one to one; the GROQ in lib/sanity/home.query.ts selects exactly these names.
 * Editors can override any field; anything left empty falls back to the
 * canonical seed copy, so a half-filled document still renders the full page.
 */

export const linkCta = defineType({
  name: 'linkCta',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'href', title: 'Href', type: 'string' }),
  ],
})

export const splitHeading = defineType({
  name: 'splitHeading',
  title: 'Heading',
  type: 'object',
  description: 'The closing phrase renders in gold italic.',
  fields: [
    defineField({ name: 'lead', title: 'Heading', type: 'string' }),
    defineField({ name: 'accent', title: 'Closing phrase (gold italic)', type: 'string' }),
  ],
})

export const homeHero = defineType({
  name: 'homeHero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'splitHeading' }),
    defineField({ name: 'lede', title: 'Lede', type: 'text' }),
    defineField({ name: 'image', title: 'Photograph', type: 'image' }),
    defineField({ name: 'alt', title: 'Photograph alt text', type: 'string' }),
    defineField({ name: 'primaryCta', title: 'Primary action', type: 'linkCta' }),
    defineField({ name: 'secondaryCta', title: 'Secondary action', type: 'linkCta' }),
  ],
})

export const homePhilosophy = defineType({
  name: 'homePhilosophy',
  title: 'Philosophy',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'splitHeading' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
    defineField({ name: 'pullquote', title: 'Closing line (serif italic)', type: 'text' }),
  ],
})

export const expressionCard = defineType({
  name: 'expressionCard',
  title: 'Expression',
  type: 'object',
  fields: [
    defineField({ name: 'key', title: 'Key', type: 'string', readOnly: true }),
    defineField({ name: 'index', title: 'Numeral', type: 'string', readOnly: true }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline (gold italic)', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
    defineField({ name: 'image', title: 'Photograph', type: 'image' }),
    defineField({ name: 'alt', title: 'Photograph alt text', type: 'string' }),
    defineField({ name: 'cta', title: 'Link', type: 'linkCta' }),
  ],
})

export const homeExpressions = defineType({
  name: 'homeExpressions',
  title: 'Expressions of the mission',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text' }),
    defineField({
      name: 'cards',
      title: 'Expressions',
      type: 'array',
      of: [defineArrayMember({ type: 'expressionCard' })],
    }),
  ],
})

export const homeVia = defineType({
  name: 'homeVia',
  title: 'Values In Action band',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'splitHeading' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
    defineField({ name: 'cta', title: 'Link', type: 'linkCta' }),
    defineField({ name: 'image', title: 'Photograph', type: 'image' }),
    defineField({ name: 'alt', title: 'Photograph alt text', type: 'string' }),
  ],
})

export const impactStat = defineType({
  name: 'impactStat',
  title: 'Impact figure',
  type: 'object',
  description: 'The figure counts up to this number as the band scrolls into view.',
  fields: [
    defineField({ name: 'key', title: 'Key', type: 'string', readOnly: true }),
    defineField({ name: 'value', title: 'Figure', type: 'number' }),
    defineField({ name: 'suffix', title: 'Suffix', type: 'string', description: 'Usually "+", or empty for an exact count.' }),
    defineField({ name: 'label', title: 'Label', type: 'string' }),
  ],
})

export const homeImpact = defineType({
  name: 'homeImpact',
  title: 'Impact figures',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text' }),
    defineField({
      name: 'stats',
      title: 'Figures',
      type: 'array',
      of: [defineArrayMember({ type: 'impactStat' })],
    }),
  ],
})

export const storyCard = defineType({
  name: 'storyCard',
  title: 'Story card',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'blurb', title: 'Blurb', type: 'string' }),
    defineField({ name: 'image', title: 'Photograph', type: 'image' }),
    defineField({ name: 'alt', title: 'Photograph alt text', type: 'string' }),
    defineField({ name: 'href', title: 'Href', type: 'string' }),
  ],
})

export const homeStories = defineType({
  name: 'homeStories',
  title: 'Stories',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'splitHeading' }),
    defineField({ name: 'viewAll', title: 'View-all link', type: 'linkCta' }),
    defineField({ name: 'feature', title: 'Featured story', type: 'storyCard' }),
    defineField({
      name: 'cards',
      title: 'Supporting stories',
      type: 'array',
      of: [defineArrayMember({ type: 'storyCard' })],
    }),
  ],
})

export const homeImpactCta = defineType({
  name: 'homeImpactCta',
  title: 'Impact invitation card',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'splitHeading' }),
    defineField({ name: 'cta', title: 'Action', type: 'linkCta' }),
    defineField({ name: 'image', title: 'Background photograph', type: 'image' }),
    defineField({
      name: 'alt',
      title: 'Photograph alt text',
      type: 'string',
      description: 'Leave empty: the photograph sits behind the copy and is decorative.',
    }),
  ],
})

export const partnerMark = defineType({
  name: 'partnerMark',
  title: 'Partner',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Optional. Without a logo the partner renders as its name in type.',
    }),
  ],
})

export const homePartners = defineType({
  name: 'homePartners',
  title: 'Partners',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({
      name: 'marks',
      title: 'Partners',
      type: 'array',
      of: [defineArrayMember({ type: 'partnerMark' })],
    }),
    defineField({ name: 'logoSlot', title: 'Open invitation slot', type: 'linkCta' }),
  ],
})

export const homeClosing = defineType({
  name: 'homeClosing',
  title: 'Closing invitation',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'splitHeading' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
    defineField({ name: 'primaryCta', title: 'Primary action', type: 'linkCta' }),
    defineField({ name: 'secondaryCta', title: 'Secondary action', type: 'linkCta' }),
  ],
})
