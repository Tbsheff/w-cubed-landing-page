import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'representative',
  title: 'Representative',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'states',
      title: 'States (Display)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Display names for states (e.g., "Utah", "Nevada")',
    }),
    defineField({
      name: 'servedStates',
      title: 'Served States (Codes)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'State codes for territory coverage (e.g., "UT", "NV")',
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
          preview: {
            select: {
              state: 'state',
              county: 'county',
            },
            prepare({ state, county }) {
              const stateCode = state || 'State'
              const countyName = county || 'County'
              return {
                title: `${stateCode} - ${countyName}`,
              }
            },
          },
        },
      ],
      description: 'Specific counties served (optional, for partial state coverage)',
    }),
    defineField({
      name: 'regions',
      title: 'Regions / Notes',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
})

