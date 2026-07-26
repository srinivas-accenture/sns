import type { CollectionConfig } from 'payload'

import { CallToActionBlock } from '@/blocks/CallToAction/config'
import { ContentBlock } from '@/blocks/Content/config'
import { ContentWithImage } from '@/blocks/ContentWithImage/config'
import { FormBlock } from '@/blocks/Form/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { Slider } from '@/blocks/Slider/config'
import { Team } from '@/blocks/Team/config'
import { heroField } from '@/heros/config'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { isAdminOrHigher } from '../../access/isAdminOrHigher'
import { isEditorOrHigher } from '../../access/isEditorOrHigher'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath, generateLivePreviewUrl } from '../../utilities/generatePreviewPath'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: isEditorOrHigher,
    delete: isAdminOrHigher,
    read: authenticatedOrPublished,
    update: isEditorOrHigher,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'publishedAt', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generateLivePreviewUrl({
          slug: data?.slug as string,
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
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
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date().toISOString()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL path segment — lowercase letters, numbers, and hyphens only.',
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
              blocks: [ContentBlock, MediaBlock, CallToActionBlock, Slider, ContentWithImage, Team, FormBlock],
              required: false,
            },
          ],
        },
      ],
    },
  ],
}
