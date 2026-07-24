import type { Metadata } from 'next'

import { LANGUAGES, DEFAULT_LANGUAGE_CODE } from '@/i18n/languages'

const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'SNS'

type MetaImage = {
  url?: string | null
  width?: number | null
  height?: number | null
  alt?: string | null
}

type PageMeta = {
  title?: string | null
  description?: string | null
  image?: MetaImage | string | null
}

type Input = {
  /** Payload page title (fallback when meta.title is empty) */
  pageTitle: string | null | undefined
  /** The slug field value */
  slug: string
  /** Active locale for this request */
  locale: string
  /** Contents of the page's meta tab */
  meta?: PageMeta | null
}

function pageUrl(slug: string, locale: string): string {
  return slug === 'home' ? `${SITE_URL}/${locale}` : `${SITE_URL}/${locale}/${slug}`
}

function resolveImage(image: MetaImage | string | null | undefined) {
  if (!image) return undefined
  const url = typeof image === 'string' ? image : image.url
  if (!url) return undefined
  return {
    url,
    width: typeof image === 'object' ? (image.width ?? undefined) : undefined,
    height: typeof image === 'object' ? (image.height ?? undefined) : undefined,
    alt: typeof image === 'object' ? (image.alt ?? undefined) : undefined,
  }
}

export function generatePageMeta({ pageTitle, slug, locale, meta }: Input): Metadata {
  const canonical = pageUrl(slug, locale)
  const title = meta?.title || pageTitle || SITE_NAME
  const description = meta?.description || undefined
  const ogImage = resolveImage(meta?.image)

  // hreflang alternates — one entry per language + x-default pointing to default locale
  const languageAlternates: Record<string, string> = {}
  for (const { code } of LANGUAGES) {
    languageAlternates[code] = pageUrl(slug, code)
  }
  languageAlternates['x-default'] = pageUrl(slug, DEFAULT_LANGUAGE_CODE)

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(ogImage && { images: [ogImage.url] }),
    },
  }
}
