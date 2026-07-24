import type { Field } from 'payload'

export const linkField = (): Field => ({
  name: 'link',
  type: 'group',
  admin: { hideGutter: true },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'radio',
          admin: { layout: 'horizontal', width: '50%' },
          defaultValue: 'reference',
          options: [
            { label: 'Internal link', value: 'reference' },
            { label: 'Custom URL', value: 'custom' },
          ],
        },
        {
          name: 'newTab',
          type: 'checkbox',
          admin: { width: '50%' },
          label: 'Open in new tab',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'reference',
          type: 'relationship',
          relationTo: ['pages'] as const,
          admin: {
            condition: (_, sibling) => sibling?.type === 'reference',
            width: '50%',
          },
          label: 'Internal page',
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, sibling) => sibling?.type === 'custom',
            width: '50%',
          },
          label: 'Custom URL',
        },
      ],
    },
    {
      name: 'label',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'appearance',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Outline', value: 'outline' },
      ],
    },
  ],
})
