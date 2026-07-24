import type { User } from '@/payload-types'

export type UserRole = 'super-admin' | 'admin' | 'editor' | 'viewer'

const getUserRoles = (user: User | null | undefined): UserRole[] => {
  if (!user) return []
  const roles = user.roles as UserRole[] | null | undefined
  // Backward-compat: treat existing users with no roles as viewer
  return roles?.length ? roles : ['viewer']
}

export const isSuperAdmin = (user: User | null | undefined): boolean =>
  getUserRoles(user).includes('super-admin')

export const isAdminOrHigher = (user: User | null | undefined): boolean =>
  getUserRoles(user).some((r) => r === 'super-admin' || r === 'admin')

export const isEditorOrHigher = (user: User | null | undefined): boolean =>
  getUserRoles(user).some((r) => r === 'super-admin' || r === 'admin' || r === 'editor')
