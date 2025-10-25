import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Sales Team section
      S.listItem()
        .title('Sales Team')
        .child(
          S.list()
            .title('Sales Team')
            .items([
              S.documentTypeListItem('salesperson').title('Salespeople'),
            ])
        ),

      // Geography section
      S.listItem()
        .title('Geography')
        .child(
          S.list()
            .title('Geography')
            .items([
              S.documentTypeListItem('county').title('Counties'),
            ])
        ),

      S.divider(),

      // Content section
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('author').title('Authors'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('project').title('Projects'),
    ])
