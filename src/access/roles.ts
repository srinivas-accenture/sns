import type { User } from '@/payload-types'

export const isSuperAdmin = (user: User | null | undefined): boolean => {
  return Boolean(user?.roles?.includes('super-admin'))
}

export const isAdminOrHigher = (user: User | null | undefined): boolean => {
  return Boolean(user?.roles?.some((role) => ['super-admin', 'admin'].includes(role)))
}

export const isEditorOrHigher = (user: User | null | undefined): boolean => {
  return Boolean(
    user?.roles?.some((role) => ['super-admin', 'admin', 'editor'].includes(role)),
  )
}
