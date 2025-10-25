import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'salesperson',
  title: 'Salesperson',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return 'Email is required'
          // Basic email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            return 'Please enter a valid email address'
          }
          return true
        }),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Phone number (e.g., 801-232-8241)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      description: 'Profile photo',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Is this salesperson currently active?',
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      active: 'active',
      photo: 'photo',
    },
    prepare({ name, email, active, photo }) {
      return {
        title: name,
        subtitle: `${email} • ${active ? 'Active' : 'Inactive'}`,
        media: photo,
      }
    },
  },
})
