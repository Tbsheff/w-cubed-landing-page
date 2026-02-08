import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    orderings: [
        { title: 'Published (Newest)', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
        { title: 'Published (Oldest)', name: 'publishedAtAsc', by: [{ field: 'publishedAt', direction: 'asc' }] },
    ],
    preview: {
        select: { title: 'title', media: 'mainImage' },
    },
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Summary',
            type: 'text',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main image',
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
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (rule: any) => rule.required(),
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'category' }] }],
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
                        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'client',
            title: 'Client',
            type: 'string',
            description: 'Client or facility name',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
            description: 'City, State',
        }),
        defineField({
            name: 'completionDate',
            title: 'Completion Date',
            type: 'date',
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true },
                fields: [
                    defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
                    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
                ],
            }],
        }),
    ],
})
