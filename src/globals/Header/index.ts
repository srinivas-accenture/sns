import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { isAdminOrHigher } from '@/access/isAdminOrHigher'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
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
        description: 'CSS color for the header bar (e.g. #3C1500). Leave blank for default.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Site logo shown in the header. Falls back to the text logo if not set.',
      },
    },
    {
      name: 'logoText',
      type: 'text',
      label: 'Logo Text',
      localized: true,
      admin: {
        description: 'Optional text shown next to the logo image (e.g. "Swami Namasmarana Seva").',
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
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
