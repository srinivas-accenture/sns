import type { CollectionConfig } from 'payload'
import type { User } from '@/payload-types'

import { isAdminOrHigher } from '../access/isAdminOrHigher'
import { isAdminOrHigher as checkAdminOrHigher, isSuperAdmin } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    // Any authenticated user can access the admin panel
    admin: ({ req: { user } }) => Boolean(user),
    // Only admin+ can create new users
    create: isAdminOrHigher,
    // Only super-admin can delete users
    delete: ({ req: { user } }) => isSuperAdmin(user as User | null),
    // Admin+ can read all users; others can only read their own document
    read: ({ req: { user } }) => {
      if (!user) return false
      if (checkAdminOrHigher(user as User)) return true
      return { id: { equals: user.id } }
    },
    // Admin+ can update any user; others can only update their own document
    update: ({ req: { user } }) => {
      if (!user) return false
      if (checkAdminOrHigher(user as User)) return true
      return { id: { equals: user.id } }
    },
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
    // Hide Users collection from nav for editors and viewers
    hidden: ({ user }) => !checkAdminOrHigher(user as User),
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
      defaultValue: ['viewer'],
      // Stored in JWT so access control never needs a DB lookup
      saveToJWT: true,
      access: {
        // Admin+ can set the initial role when creating a user
        create: ({ req: { user } }) => checkAdminOrHigher(user as User | null),
        // Only super-admin can change roles after creation
        update: ({ req: { user } }) => isSuperAdmin(user as User | null),
      },
      admin: {
        position: 'sidebar',
        description: 'Roles determine what the user can access in the admin panel.',
      },
    },
  ],
  timestamps: true,
}
