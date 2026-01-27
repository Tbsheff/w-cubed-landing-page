import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'county',
  title: 'County',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'County name (e.g., "Salt Lake")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'reference',
      to: [{ type: 'state' }],
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'State, then Name',
      name: 'stateNameAsc',
      by: [
        { field: 'state.name', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      stateName: 'state.name',
      stateCode: 'state.code',
    },
    prepare({ title, stateName, stateCode }) {
      return {
        title: title || 'Untitled County',
        subtitle: stateCode ? `${stateName} (${stateCode})` : stateName,
      }
    },
  },
})
