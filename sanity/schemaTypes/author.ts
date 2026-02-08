import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    preview: {
        select: { title: 'name', media: 'image' },
    },
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
        }),
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
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'text',
            rows: 4,
            description: 'Short biography for author cards',
        }),
    ],
})
