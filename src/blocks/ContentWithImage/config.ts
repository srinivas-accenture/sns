import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

export const ContentWithImage: Block = {
  slug: 'contentWithImage',
  interfaceName: 'ContentWithImageBlock',
  labels: { singular: 'Content with Image', plural: 'Content with Image' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'imagePosition',
          type: 'select',
          required: true,
          defaultValue: 'right',
          admin: {
            description: 'Where the image appears relative to the text content.',
            width: '33%',
          },
          options: [
            { label: 'Image Left', value: 'left' },
            { label: 'Image Right', value: 'right' },
            { label: 'Image Top', value: 'top' },
            { label: 'Image Bottom', value: 'bottom' },
          ],
        },
        {
          name: 'imageShape',
          type: 'select',
          defaultValue: 'square',
          admin: {
            description: 'Shape applied to the image.',
            width: '33%',
          },
          options: [
            { label: 'Square / Rectangle', value: 'square' },
            { label: 'Circle', value: 'circle' },
          ],
        },
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Background Color',
          admin: {
            description: 'CSS color for the section background (e.g. #f9f5f0). Leave blank for white.',
            width: '34%',
          },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: { description: 'Small label shown above the title (e.g. "About Us", "Features").' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      defaultValue: false,
      label: 'Add a call to action',
    },
    link({
      appearances: ['default', 'outline'],
      overrides: {
        admin: {
          condition: (_, siblingData) => Boolean(siblingData?.enableLink),
        },
      },
    }),
  ],
}
