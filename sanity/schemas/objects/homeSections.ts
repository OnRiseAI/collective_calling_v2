import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Object types for the mockup-theme homepage (spec v2). Field names mirror
 * lib/content/home.types.ts one to one; the GROQ in lib/sanity/home.query.ts
 * selects exactly these names. Editors can override any field; anything left
 * empty falls back to the canonical seed copy.
 */

export const linkCta = defineType({
  name: 'linkCta',
  title: 'Link CTA',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'href', title: 'Href', type: 'string' }),
  ],
})

export const homeHero = defineType({
  name: 'homeHero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'headlineLead', title: 'Headline (lead)', type: 'string' }),
    defineField({ name: 'headlineAccent', title: 'Headline (gold accent word)', type: 'string' }),
    defineField({ name: 'lede', title: 'Lede', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'image' }),
    defineField({ name: 'alt', title: 'Image alt text', type: 'string' }),
    defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'linkCta' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'linkCta' }),
    defineField({ name: 'scrollCue', title: 'Scroll cue', type: 'string' }),
  ],
})

export const wayCard = defineType({
  name: 'wayCard',
  title: 'Impact way',
  type: 'object',
  fields: [
    defineField({ name: 'key', title: 'Key', type: 'string', readOnly: true }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'image' }),
    defineField({ name: 'alt', title: 'Image alt text', type: 'string' }),
    defineField({ name: 'href', title: 'Href', type: 'string' }),
  ],
})

export const homeWays = defineType({
  name: 'homeWays',
  title: 'Three ways we create impact',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [defineArrayMember({ type: 'wayCard' })],
    }),
  ],
})

export const homeVia = defineType({
  name: 'homeVia',
  title: 'Values In Action band',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
    defineField({ name: 'cta', title: 'CTA', type: 'linkCta' }),
    defineField({ name: 'image', title: 'Image', type: 'image' }),
    defineField({ name: 'alt', title: 'Image alt text', type: 'string' }),
  ],
})

export const storyCard = defineType({
  name: 'storyCard',
  title: 'Story card',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'blurb', title: 'Blurb', type: 'string' }),
    defineField({ name: 'image', title: 'Image', type: 'image' }),
    defineField({ name: 'alt', title: 'Image alt text', type: 'string' }),
    defineField({ name: 'href', title: 'Href', type: 'string' }),
  ],
})

export const homeStoriesIntro = defineType({
  name: 'homeStoriesIntro',
  title: 'Stories That Inspire',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subline', title: 'Subline', type: 'string' }),
    defineField({ name: 'viewAll', title: 'View-all CTA', type: 'linkCta' }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [defineArrayMember({ type: 'storyCard' })],
    }),
  ],
})

export const snapshotStat = defineType({
  name: 'snapshotStat',
  title: 'Impact stat',
  type: 'object',
  fields: [
    defineField({ name: 'icon', title: 'Icon key', type: 'string', readOnly: true }),
    defineField({ name: 'value', title: 'Value', type: 'string' }),
    defineField({ name: 'label', title: 'Label', type: 'string' }),
  ],
})

export const homeSnapshot = defineType({
  name: 'homeSnapshot',
  title: 'Impact snapshot',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [defineArrayMember({ type: 'snapshotStat' })],
    }),
  ],
})

export const homePartners = defineType({
  name: 'homePartners',
  title: 'Partners',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
    defineField({
      name: 'names',
      title: 'Partner names',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'logoSlot', title: 'Logo slot label', type: 'string' }),
    defineField({ name: 'cta', title: 'CTA', type: 'linkCta' }),
  ],
})

export const involveAction = defineType({
  name: 'involveAction',
  title: 'Get Involved action',
  type: 'object',
  fields: [
    defineField({ name: 'icon', title: 'Icon key', type: 'string', readOnly: true }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'blurb', title: 'Blurb', type: 'string' }),
    defineField({ name: 'href', title: 'Href', type: 'string' }),
  ],
})

export const homeInvolve = defineType({
  name: 'homeInvolve',
  title: 'Get Involved band',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
    defineField({
      name: 'actions',
      title: 'Actions',
      type: 'array',
      of: [defineArrayMember({ type: 'involveAction' })],
    }),
    defineField({ name: 'image', title: 'Image', type: 'image' }),
    defineField({ name: 'alt', title: 'Image alt text', type: 'string' }),
    defineField({
      name: 'shops',
      title: 'Charity shops panel',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'body', title: 'Body', type: 'text' }),
        defineField({ name: 'cta', title: 'CTA', type: 'linkCta' }),
      ],
    }),
  ],
})
