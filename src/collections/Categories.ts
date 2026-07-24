import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { isAdminOrHigher } from '../access/isAdminOrHigher'
import { isEditorOrHigher } from '../access/isEditorOrHigher'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: isEditorOrHigher,
    delete: isAdminOrHigher,
    read: anyone,
    update: isEditorOrHigher,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}
