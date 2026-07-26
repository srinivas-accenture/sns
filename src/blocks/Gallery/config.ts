import type { Block } from 'payload'

import { link } from '@/fields/link'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Gallery',
    plural: 'Galleries',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'carousel',
          options: [
            { label: 'Carousel', value: 'carousel' },
            { label: 'Masonry', value: 'masonry' },
            { label: 'Grid', value: 'grid' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'columns',
          type: 'select',
          defaultValue: '4',
          options: [
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
          admin: {
            width: '50%',
            condition: (_, siblingData) => siblingData?.layout !== 'carousel',
          },
        },
      ],
    },
    {
      name: 'images',
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
          name: 'caption',
          type: 'text',
        },
        {
          name: 'alt',
          type: 'text',
          admin: { description: 'Alt text for accessibility (defaults to image alt if empty).' },
        },
      ],
    },
    // ── CTA Section ────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'CTA Section (below images)',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'ctaTitle',
          type: 'text',
          label: 'Heading',
          admin: {
            description: 'Leave empty to hide the CTA section entirely.',
          },
        },
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Background Color',
          defaultValue: '#3C1500',
          admin: {
            description: 'CSS color value for the CTA strip background (e.g. #3C1500, #1a1a2e, navy).',
          },
        },
        link({
          appearances: ['default', 'outline'],
          overrides: {
            name: 'ctaLink',
            label: 'CTA Button',
          },
        }),
      ],
    },
  ],
}
