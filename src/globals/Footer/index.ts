import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { isAdminOrHigher } from '@/access/isAdminOrHigher'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: isAdminOrHigher,
  },
  fields: [
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      admin: {
        description: 'CSS color for the footer (e.g. #111827). Leave blank for default.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Site logo shown in the footer. Falls back to the text logo if not set.',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      localized: true,
      admin: {
        description: 'Short description shown below the logo.',
      },
    },
    {
      name: 'navColumnLabel',
      type: 'text',
      label: 'Links Column Heading',
      defaultValue: 'Quick Links',
      localized: true,
      admin: {
        description: 'Heading above the navigation links column.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'contactColumnLabel',
      type: 'text',
      label: 'Contact Column Heading',
      defaultValue: 'Contact Us',
      localized: true,
      admin: {
        description: 'Heading above the contact info column.',
      },
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      localized: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
      localized: true,
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      localized: true,
    },
    {
      name: 'hours',
      type: 'text',
      label: 'Office Hours',
      localized: true,
      admin: {
        description: 'e.g. Mon–Fri, 9 AM – 5 PM',
      },
    },
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Copyright Text',
      localized: true,
      admin: {
        description: 'Bottom bar text. Use {year} for the current year.',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      maxRows: 8,
      admin: {
        description: 'Icons shown in the footer bottom bar next to the copyright.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          label: 'Platform',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'Website', value: 'website' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
