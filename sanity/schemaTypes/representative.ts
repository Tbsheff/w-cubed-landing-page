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
      name: 'states',
      title: 'States',
      type: 'array',
      of: [{ type: 'string' }],
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

