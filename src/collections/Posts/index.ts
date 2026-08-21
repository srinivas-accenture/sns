import type { CollectionConfig } from 'payload'

import { CallToActionBlock } from '@/blocks/CallToAction/config'
import { ContentBlock } from '@/blocks/Content/config'
import { ContentWithImage } from '@/blocks/ContentWithImage/config'
import { Events } from '@/blocks/Events/config'
import { FAQ } from '@/blocks/FAQ/config'
import { FormBlock } from '@/blocks/Form/config'
import { Gallery } from '@/blocks/Gallery/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Slider } from '@/blocks/Slider/config'
import { Team } from '@/blocks/Team/config'
import { generateLivePreviewUrl, generatePreviewPath } from '@/utilities/generatePreviewPath'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { isAdminOrHigher } from '../../access/isAdminOrHigher'
import { isEditorOrHigher } from '../../access/isEditorOrHigher'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

const postBlocks = [
  ContentBlock,
  MediaBlock,
  CallToActionBlock,
  Slider,
  ContentWithImage,
  Team,
  FormBlock,
  Events,
  Gallery,
  FAQ,
]

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Posts' },
  access: {
    create: isEditorOrHigher,
    delete: isAdminOrHigher,
    read: authenticatedOrPublished,
    update: isEditorOrHigher,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt', '_status', 'updatedAt'],
    group: 'Content',
    livePreview: {
      url: ({ data, req }) =>
        generateLivePreviewUrl({ slug: data?.slug as string, collection: 'posts', req }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({ slug: data?.slug as string, collection: 'posts', req }),
  },
  defaultSort: '-publishedAt',
  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'text',
      localized: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) return new Date().toISOString()
            return value
          },
        ],
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Excerpt',
          fields: [
            {
              name: 'excerpt',
              type: 'richText',
              localized: true,
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              localized: true,
              blocks: postBlocks,
              required: false,
            },
          ],
        },
      ],
    },
  ],
}
