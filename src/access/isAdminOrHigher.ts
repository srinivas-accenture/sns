import type { Access } from 'payload'
import type { User } from '@/payload-types'

import { isAdminOrHigher as checkAdminOrHigher } from './roles'

export const isAdminOrHigher: Access = ({ req: { user } }) => {
  return checkAdminOrHigher(user as User | null)
}
