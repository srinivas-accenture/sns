import { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
import { PayloadRequest, CollectionSlug } from 'payload'

import { DEFAULT_LANGUAGE_CODE } from '@/i18n/languages'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  // posts: '/posts',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

const buildFrontendPath = (slug: string, locale: string): string => {
  if (!slug) return `/${locale}`
  const encodedSlug = encodeURIComponent(slug)
  return slug === 'home'
    ? `/${locale}`
    : `/${locale}${collectionPrefixMap['pages']}/${encodedSlug}`
}

export const generatePreviewPath = ({ slug, req }: Props): string | null => {
  if (slug === undefined || slug === null) return null

  const locale = (req as PayloadRequest & { locale?: string }).locale || DEFAULT_LANGUAGE_CODE
  const path = buildFrontendPath(slug, locale)

  const encodedParams = new URLSearchParams({
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)

  return `/next/preview?${encodedParams.toString()}`
}

export const generateLivePreviewUrl = ({ slug, req }: Omit<Props, 'collection'>): string => {
  const locale = (req as PayloadRequest & { locale?: string }).locale || DEFAULT_LANGUAGE_CODE
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return `${base}${buildFrontendPath(slug, locale)}`
}
