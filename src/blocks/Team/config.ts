import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

const richTextEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    OrderedListFeature(),
    UnorderedListFeature(),
  ],
})

export const Team: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  labels: { singular: 'Team', plural: 'Teams' },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    {
      name: 'topContent',
      type: 'richText',
      label: 'Top Content',
      editor: richTextEditor,
      admin: { description: 'Shown below the title, above the main team members.' },
    },
    {
      name: 'members',
      type: 'array',
      minRows: 1,
      admin: {
        initCollapsed: true,
        description:
          'First 4 members are featured with large portrait photos. Remaining members appear as compact name tiles.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'role', type: 'text', admin: { width: '50%' } },
          ],
        },
        { name: 'bio', type: 'textarea' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social Links',
          admin: { initCollapsed: true },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Twitter / X', value: 'twitter' },
                    { label: 'GitHub', value: 'github' },
                    { label: 'Website', value: 'website' },
                  ],
                  admin: { width: '40%' },
                },
                { name: 'url', type: 'text', required: true, admin: { width: '60%' } },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'otherMembersTitle',
      type: 'text',
      label: 'Other Members Section Title',
      admin: {
        description:
          'Heading for the secondary members section (appears when there are more than 4 members).',
      },
    },
    {
      name: 'bottomContent',
      type: 'richText',
      label: 'Bottom Content',
      editor: richTextEditor,
      admin: { description: 'Shown below all team members.' },
    },
  ],
}
