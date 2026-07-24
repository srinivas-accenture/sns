import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { linkField } from '@/fields/link'

export const ContentBlock: Block = {
  slug: 'content',
  labels: { singular: 'Content', plural: 'Content Blocks' },
  fields: [
    {
      name: 'columns',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'size',
          type: 'select',
          defaultValue: 'full',
          options: [
            { label: 'One Third', value: 'oneThird' },
            { label: 'Half', value: 'half' },
            { label: 'Two Thirds', value: 'twoThirds' },
            { label: 'Full', value: 'full' },
          ],
        },
        {
          name: 'richText',
          type: 'richText',
          editor: lexicalEditor(),
          localized: true,
        },
        {
          name: 'enableLink',
          type: 'checkbox',
        },
        {
          ...linkField(),
          admin: {
            condition: (_, sibling) => Boolean(sibling?.enableLink),
          },
        },
      ],
    },
  ],
}
