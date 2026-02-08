import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'representative',
  title: 'Representative',
  type: 'document',
  groups: [
    { name: 'info', title: 'Personal Info', default: true },
    { name: 'coverage', title: 'Coverage' },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'info',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
      group: 'info',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      group: 'info',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'info',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule: any) => rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email', invert: false }).error('Must be a valid email address'),
      group: 'info',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
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
      group: 'info',
    }),
    defineField({
      name: 'states',
      title: 'States (Display)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Display names for states (e.g., "Utah", "Nevada")',
      group: 'coverage',
    }),
    defineField({
      name: 'servedStates',
      title: 'Served States (Codes)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'State codes for territory coverage (e.g., "UT", "NV")',
      group: 'coverage',
    }),
    defineField({
      name: 'servedCounties',
      title: 'Served Counties',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'state', title: 'State Code', type: 'string' }),
            defineField({ name: 'county', title: 'County Name', type: 'string' }),
          ],
        },
      ],
      description: 'Specific counties served (optional, for partial state coverage)',
      group: 'coverage',
    }),
    defineField({
      name: 'regions',
      title: 'Regions / Notes',
      type: 'string',
      group: 'coverage',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      group: 'coverage',
    }),
  ],
})
