import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const CallToActionBlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call To Action', plural: 'Calls To Action' },
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor(),
      localized: true,
    },
    {
      name: 'links',
      type: 'array',
      fields: [link()],
    },
  ],
}
