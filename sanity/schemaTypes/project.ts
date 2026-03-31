import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      type: "text",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      description:
        "Use lead text, body images, and simple section blocks to build a clear project story.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Body", value: "normal" },
            { title: "Lead", value: "lead" },
            { title: "Eyebrow", value: "eyebrow" },
            { title: "Fine Print", value: "finePrint" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        },
        {
          type: "image",
          title: "Body Image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              description: "Describe the image for accessibility.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              validation: (rule) => rule.max(160),
            }),
            defineField({
              name: "display",
              title: "Display width",
              type: "string",
              initialValue: "normal",
              options: {
                list: [
                  { title: "Normal", value: "normal" },
                  { title: "Wide", value: "wide" },
                ],
                layout: "radio",
              },
            }),
          ],
        },
        {
          type: "object",
          name: "sectionBreak",
          title: "Section Break",
          description: "Create a visual section break. Optional label shown above the divider.",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.max(80),
            }),
          ],
          preview: {
            select: { label: "label" },
            prepare({ label }: { label?: string }) {
              return {
                title: label || "Section Break",
                subtitle: "Divider",
              };
            },
          },
        },
      ],
    }),
  ],
});
