import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section', default: true },
    { name: 'stats', title: 'Stats' },
    { name: 'manufacturers', title: 'Manufacturer Strip' },
    { name: 'highlights', title: 'Highlights' },
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
  fields: [
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      validation: (rule) => rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility and SEO',
        }),
      ],
      group: 'hero',
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
      group: 'hero',
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
      group: 'hero',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'detail', title: 'Detail', type: 'string' }),
          ],
        },
      ],
      group: 'stats',
    }),
    defineField({
      name: 'manufacturerStrip',
      title: 'Manufacturer Strip',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'manufacturer' }] }],
      group: 'manufacturers',
    }),
    defineField({
      name: 'highlights',
      title: 'Project Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'category', title: 'Category', type: 'string' }),
            defineField({ name: 'states', title: 'States', type: 'array', of: [{ type: 'string' }] }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Describe the image for accessibility and SEO',
                }),
              ],
            }),
          ],
        },
      ],
      group: 'highlights',
    }),
  ],
})
