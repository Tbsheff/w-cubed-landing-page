import { defineType, defineField } from 'sanity'
import { STATE_CODES } from '@/lib/constants/states'

export default defineType({
  name: 'county',
  title: 'County',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'County Name',
      type: 'string',
      description: 'Name of the county (without "County" suffix)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stateCode',
      title: 'State',
      type: 'string',
      description: 'Two-letter state code',
      options: {
        list: STATE_CODES.map((code) => ({
          title: code,
          value: code,
        })),
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return 'State code is required'
          if (!STATE_CODES.includes(value)) {
            return `State code must be one of: ${STATE_CODES.join(', ')}`
          }
          return true
        }),
    }),
    defineField({
      name: 'fipsCode',
      title: 'FIPS Code',
      type: 'string',
      description: '5-digit FIPS code (zero-padded)',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return 'FIPS code is required'
          if (!/^\d{5}$/.test(value)) {
            return 'FIPS code must be exactly 5 digits'
          }
          return true
        }),
    }),
    defineField({
      name: 'served',
      title: 'Served',
      type: 'boolean',
      description: 'Is this county in our service area?',
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'salesperson',
      title: 'Assigned Salesperson',
      type: 'reference',
      to: [{ type: 'salesperson' }],
      description: 'The salesperson assigned to this county (optional for served counties)',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      stateCode: 'stateCode',
      served: 'served',
      salesperson: 'salesperson.name',
    },
    prepare({ name, stateCode, served, salesperson }) {
      return {
        title: `${name} County`,
        subtitle: `${stateCode} • ${served ? (salesperson ? `Served by ${salesperson}` : 'Served (unassigned)') : 'Not served'}`,
      }
    },
  },
})
