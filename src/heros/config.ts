import type { Field } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const heroField: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      required: true,
      options: [
        { label: 'None', value: 'none' },
        { label: 'Low Impact', value: 'lowImpact' },
        { label: 'Medium Impact', value: 'mediumImpact' },
        { label: 'High Impact', value: 'highImpact' },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor(),
      localized: true,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, sibling) =>
          sibling?.type === 'highImpact' || sibling?.type === 'mediumImpact',
      },
    },
    {
      name: 'links',
      type: 'array',
      admin: {
        condition: (_, sibling) => sibling?.type !== 'none',
      },
      fields: [link()],
    },
  ],
}
