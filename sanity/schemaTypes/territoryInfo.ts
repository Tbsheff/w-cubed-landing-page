import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'territoryInfo',
  title: 'Territory Info',
  type: 'document',
  preview: {
    prepare: () => ({ title: 'Territory Info' }),
  },
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({
          name: 'href',
          title: 'Href',
          type: 'url',
          validation: (rule: any) => rule.uri({ allowRelative: true }),
        }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({
          name: 'href',
          title: 'Href',
          type: 'url',
          validation: (rule: any) => rule.uri({ allowRelative: true }),
        }),
      ],
    }),
    defineField({
      name: 'coverageBlurb',
      title: 'Coverage Blurb',
      type: 'text',
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
        },
      ],
    }),
  ],
})
