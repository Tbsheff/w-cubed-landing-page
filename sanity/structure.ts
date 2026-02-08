import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singletons
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
      S.listItem()
        .title('Territory Info')
        .child(
          S.document()
            .schemaType('territoryInfo')
            .documentId('territoryInfo')
            .title('Territory Info')
        ),

      S.divider(),

      // Content
      S.listItem()
        .title('Blog Posts')
        .child(S.documentTypeList('post').title('Blog Posts')),
      S.listItem()
        .title('Projects')
        .child(S.documentTypeList('project').title('Projects')),

      S.divider(),

      // Reference data
      S.listItem()
        .title('Manufacturers')
        .child(S.documentTypeList('manufacturer').title('Manufacturers')),
      S.listItem()
        .title('Representatives')
        .child(S.documentTypeList('representative').title('Representatives')),

      S.divider(),

      // Taxonomies
      S.listItem()
        .title('Authors')
        .child(S.documentTypeList('author').title('Authors')),
      S.listItem()
        .title('Categories')
        .child(S.documentTypeList('category').title('Categories')),
    ])
