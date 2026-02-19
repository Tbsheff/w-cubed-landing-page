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
      name: 'servedStates',
      title: 'Served States',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'state' }],
        },
      ],
      description: 'Full states this representative covers',
    }),
    defineField({
      name: 'servedCounties',
      title: 'Served Counties',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'county' }],
        },
      ],
      description: 'Specific counties for partial state coverage (optional)',
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
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
