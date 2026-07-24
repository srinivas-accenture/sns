import type { Access } from 'payload'
import type { User } from '@/payload-types'
import { isEditorOrHigher as checkEditorOrHigher } from './roles'

export const isEditorOrHigher: Access = ({ req: { user } }) =>
  checkEditorOrHigher(user as User | null)
