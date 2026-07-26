import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

export const Slider: Block = {
  slug: 'slider',
  interfaceName: 'SliderBlock',
  labels: { singular: 'Slider', plural: 'Sliders' },
  fields: [
    { name: 'title', type: 'text', label: 'Section Title (optional)' },
    {
      type: 'row',
      fields: [
        {
          name: 'autoplay',
          type: 'checkbox',
          defaultValue: false,
          label: 'Autoplay',
          admin: { width: '33%' },
        },
        {
          name: 'autoplaySpeed',
          type: 'number',
          defaultValue: 4000,
          admin: {
            width: '33%',
            description: 'Milliseconds between slides.',
            condition: (_, siblingData) => Boolean(siblingData?.autoplay),
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'showArrows',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show prev / next arrows',
          admin: { width: '33%' },
        },
        {
          name: 'showDots',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show dot indicators',
          admin: { width: '33%' },
        },
        {
          name: 'showScrollIndicator',
          type: 'checkbox',
          defaultValue: false,
          label: 'Show scroll-down indicator',
          admin: {
            width: '34%',
            description: 'Animated arrow at the bottom prompting users to scroll.',
          },
        },
      ],
    },
    {
      name: 'slides',
      type: 'array',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'mobileImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Mobile Image (optional)',
          admin: { description: 'Shown on small screens instead of the main image.' },
        },
        {
          name: 'imageAlt',
          type: 'text',
          label: 'Image Alt Text (SEO)',
          admin: {
            description: 'Overrides the media item alt text. Describe the image for screen readers and search engines.',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Eyebrow / Label',
          admin: {
            description: 'Small text shown above the heading — e.g. "New" or "Welcome".',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Heading',
              admin: { width: '50%' },
            },
            {
              name: 'headingTag',
              type: 'select',
              defaultValue: 'h2',
              label: 'Heading Tag (SEO)',
              admin: {
                width: '25%',
                description: 'Use h1 if this is the main page heading.',
              },
              options: [
                { label: 'H1 (main page heading)', value: 'h1' },
                { label: 'H2 (section heading)', value: 'h2' },
                { label: 'H3 (subsection)', value: 'h3' },
              ],
            },
            {
              name: 'overlayPosition',
              type: 'select',
              defaultValue: 'bottom-left',
              label: 'Content Position',
              admin: { width: '25%' },
              options: [
                { label: 'Bottom Left', value: 'bottom-left' },
                { label: 'Bottom Center', value: 'bottom-center' },
                { label: 'Center', value: 'center' },
              ],
            },
          ],
        },
        {
          name: 'overlayStrength',
          type: 'select',
          defaultValue: 'medium',
          label: 'Overlay Darkness',
          admin: {
            description: 'Controls how dark the gradient over the image is.',
          },
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Medium', value: 'medium' },
            { label: 'Strong', value: 'strong' },
          ],
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        { name: 'enableLink', type: 'checkbox', defaultValue: false },
        link({
          appearances: ['default', 'outline'],
          overrides: {
            admin: {
              condition: (_, siblingData) => Boolean(siblingData?.enableLink),
            },
          },
        }),
      ],
    },
  ],
}
