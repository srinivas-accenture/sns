import type { Block } from 'payload'

export const Events: Block = {
  slug: 'events',
  interfaceName: 'EventsBlock',
  labels: { singular: 'Events', plural: 'Events' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          admin: { width: '50%' },
        },
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Background Color',
          admin: {
            width: '50%',
            description: 'CSS color (e.g. #111827). Leave blank for dark default.',
          },
        },
      ],
    },
    { name: 'subtitle', type: 'text', label: 'Subtitle' },
    {
      name: 'events',
      type: 'array',
      label: 'Events',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Event Title' },
        { name: 'description', type: 'text', label: 'Short Description' },
        {
          type: 'row',
          fields: [
            {
              name: 'date',
              type: 'date',
              required: true,
              label: 'Date',
              admin: {
                width: '50%',
                date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' },
              },
            },
            {
              name: 'time',
              type: 'text',
              label: 'Time (e.g. 9:00 AM & 11:00 AM)',
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'location', type: 'text', label: 'Location Name', admin: { width: '50%' } },
            {
              name: 'mapUrl',
              type: 'text',
              label: 'Google Maps URL',
              admin: { width: '50%', description: 'Paste a Google Maps share link.' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'category', type: 'text', label: 'Category Badge', admin: { width: '50%' } },
            {
              name: 'categoryColor',
              type: 'select',
              label: 'Badge Color',
              defaultValue: 'blue',
              admin: { width: '50%' },
              options: [
                { label: 'Blue', value: 'blue' },
                { label: 'Green', value: 'green' },
                { label: 'Purple', value: 'purple' },
                { label: 'Orange', value: 'orange' },
                { label: 'Red', value: 'red' },
                { label: 'Gray', value: 'gray' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
