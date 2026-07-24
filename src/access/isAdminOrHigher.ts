import type { Access } from 'payload'
import type { User } from '@/payload-types'
import { isAdminOrHigher as checkAdminOrHigher } from './roles'

export const isAdminOrHigher: Access = ({ req: { user } }) =>
  checkAdminOrHigher(user as User | null)
