import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'state',
  title: 'State',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Full state name (e.g., "Utah")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      description: 'Two-letter state code (e.g., "UT")',
      validation: (rule) =>
        rule
          .required()
          .length(2)
          .uppercase()
          .custom((value) => {
            if (value && !/^[A-Z]{2}$/.test(value)) {
              return 'Must be exactly 2 uppercase letters'
            }
            return true
          }),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in lists (lower numbers first)',
    }),
  ],
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Code',
      name: 'codeAsc',
      by: [{ field: 'code', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'code',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled State',
        subtitle: subtitle ? `(${subtitle})` : undefined,
      }
    },
  },
})
