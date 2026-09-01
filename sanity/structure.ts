import type { StructureResolver } from 'sanity/structure'

// Desk structure for the Studio.
// The homePage is a singleton pinned at the top. The three collection types
// (Stories, Appeals, Events) are explicit document-list entries so staff can
// browse, create and edit them. All other auto-generated items (object types
// etc.) are hidden by the filter below.
//
// No em dashes anywhere in this file.
const SINGLETON_TYPES = new Set(['homePage'])
const COLLECTION_TYPES = ['story', 'appealEntry', 'eventItem', 'visualPage'] as const

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
      S.documentTypeListItem('story').title('Stories'),
      S.documentTypeListItem('appealEntry').title('Appeals'),
      S.documentTypeListItem('eventItem').title('Events'),
      S.divider(),
      S.documentTypeListItem('visualPage').title('Visual pages'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => {
          const id = item.getId()
          return id !== undefined && !SINGLETON_TYPES.has(id) && !(COLLECTION_TYPES as readonly string[]).includes(id)
        },
      ),
    ])
