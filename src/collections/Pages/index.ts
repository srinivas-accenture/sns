import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { CallToActionBlock } from '@/blocks/CallToAction/config'
import { ContentBlock } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { heroField } from '@/heros/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL path segment, e.g. "about-us". Use lowercase letters, numbers, and hyphens.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [heroField],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [ContentBlock, MediaBlock, CallToActionBlock],
              required: false,
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Meta Title',
                  localized: true,
                  admin: {
                    description: 'Overrides the page title in search engine results.',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Meta Description',
                  localized: true,
                  admin: {
                    description: 'Summary shown under the title in search results (150–160 chars recommended).',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  label: 'OG Image',
                  relationTo: 'media',
                  admin: {
                    description: 'Image shown when shared on social media (1200×630px recommended).',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
