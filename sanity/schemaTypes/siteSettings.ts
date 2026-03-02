import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroBadge',
      title: 'Hero Badge',
      type: 'string',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      description: 'Alternative eyebrow text displayed above the hero title.',
      type: 'string',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroSlides',
      title: 'Hero Slideshow',
      description: 'Optional. If provided, these slides replace the single hero image on the homepage.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Slide Image',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Accessible description for this slide image.',
            }),
            defineField({
              name: 'tags',
              title: 'Slide Tags',
              description: 'Short labels shown on top of the image, e.g. Municipal, Pumps, Controls.',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'slideLabel',
              title: 'Slide Label',
              description: 'Caption plate label, e.g. "Application Focus"',
              type: 'string',
            }),
            defineField({
              name: 'slideTitle',
              title: 'Slide Title',
              description: 'Caption plate title, e.g. "Municipal Treatment"',
              type: 'string',
            }),
            defineField({
              name: 'slideLocation',
              title: 'Slide Location',
              description: 'Caption plate location, e.g. "Salt Lake City, UT"',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'alt',
              media: 'image',
              subtitle: 'tags.0',
            },
            prepare({ title, media, subtitle }) {
              return {
                title: title || 'Hero Slide',
                subtitle: subtitle ? `Tag: ${subtitle}` : 'No tags',
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'href', title: 'Href', type: 'string' }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'string' }),
        defineField({ name: 'href', title: 'Href', type: 'string' }),
      ],
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
    }),
    defineField({
      name: 'manufacturerStrip',
      title: 'Manufacturer Strip',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'manufacturer' }] }],
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
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
          ],
        },
      ],
    }),
  ],
})

