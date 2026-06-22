import type { StructureResolver } from 'sanity/structure'

// Desk structure for the Studio. The site renders a single homePage document,
// so it is pinned as one editable singleton (it opens the one homePage doc)
// rather than a "create many" document list. Other types, if any are added
// later, fall through to the default list below the divider.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(
          S.document().schemaType('homePage').documentId('homePage'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'homePage',
      ),
    ])
