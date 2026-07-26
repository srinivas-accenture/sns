import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: { singular: 'FAQ / Accordion', plural: 'FAQ / Accordions' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Background Color',
          admin: {
            description: 'CSS color for the section background (e.g. #f9f5f0). Leave blank for default.',
            width: '50%',
          },
        },
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'left',
          label: 'Image Position',
          options: [
            { label: 'Image Left', value: 'left' },
            { label: 'Image Right', value: 'right' },
          ],
          admin: {
            description: 'Side for the optional image (only applies when an image is uploaded).',
            width: '50%',
          },
        },
      ],
    },
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Optional image shown beside the FAQ. Leave blank for a centred layout.',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Questions',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        { name: 'question', type: 'text', required: true },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
  ],
}
