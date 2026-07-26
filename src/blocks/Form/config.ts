import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Background Color',
          admin: {
            description: 'CSS color for the section background. Leave blank for transparent.',
            width: '34%',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description: 'Optional image beside the form. Leave blank for a centred layout.',
            width: '33%',
          },
        },
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Image Left', value: 'left' },
            { label: 'Image Right', value: 'right' },
            { label: 'Background', value: 'background' },
          ],
          admin: {
            description: 'Only used when an image is uploaded.',
            width: '33%',
            condition: (_, { image }) => Boolean(image),
          },
        },
      ],
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: 'Form Blocks',
    singular: 'Form Block',
  },
}
