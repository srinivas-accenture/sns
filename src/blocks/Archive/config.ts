import type { Block } from 'payload'

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  labels: { singular: 'Archive', plural: 'Archives' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    {
      name: 'collection',
      type: 'text',
      required: true,
      defaultValue: 'posts',
      admin: { description: 'Payload collection slug to list, for example posts or events.' },
    },
    {
      name: 'pathPrefix',
      type: 'text',
      defaultValue: 'posts',
      admin: { description: 'URL prefix for each item. Leave empty for /{locale}/{slug}.' },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      min: 1,
      max: 24,
      admin: { description: 'Number of published items to show.' },
    },
  ],
}
