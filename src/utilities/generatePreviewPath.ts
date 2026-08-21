import { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
import { PayloadRequest, CollectionSlug } from 'payload'

import { DEFAULT_LANGUAGE_CODE } from '@/i18n/languages'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: '',
  posts: '/posts',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

const buildFrontendPath = (
  slug: string,
  locale: string,
  collection: keyof typeof collectionPrefixMap,
): string => {
  if (!slug) return `/${locale}`
  const encodedSlug = encodeURIComponent(slug)
  return slug === 'home'
    ? `/${locale}`
    : `/${locale}${collectionPrefixMap[collection] ?? ''}/${encodedSlug}`
}

export const generatePreviewPath = ({ slug, collection, req }: Props): string | null => {
  if (slug === undefined || slug === null) return null

  const locale = (req as PayloadRequest & { locale?: string }).locale || DEFAULT_LANGUAGE_CODE
  const path = buildFrontendPath(slug, locale, collection)

  const encodedParams = new URLSearchParams({
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)

  return `/next/preview?${encodedParams.toString()}`
}

export const generateLivePreviewUrl = ({
  slug,
  collection = 'pages',
  req,
}: Omit<Props, 'collection'> & { collection?: keyof typeof collectionPrefixMap }): string => {
  const locale = (req as PayloadRequest & { locale?: string }).locale || DEFAULT_LANGUAGE_CODE
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return `${base}${buildFrontendPath(slug, locale, collection)}`
}
