import type { Metadata } from 'next'

import { LANGUAGES, DEFAULT_LANGUAGE_CODE } from '@/i18n/languages'

const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'SNS'

// Maps locale code → OG locale string (BCP47 with territory)
const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  mr: 'mr_IN',
}

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
  keywords?: string | null
  noIndex?: boolean | null
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
  const keywords = meta?.keywords || undefined
  const noIndex = meta?.noIndex === true

  // og:locale — map code to BCP47 territory form; fall back to raw code
  const ogLocale = OG_LOCALE_MAP[locale] ?? locale

  // og:locale:alternate — other supported languages
  const ogLocaleAlternates = LANGUAGES.filter((l) => l.code !== locale).map(
    (l) => OG_LOCALE_MAP[l.code] ?? l.code,
  )

  // hreflang alternates — one entry per language + x-default pointing to default locale
  const languageAlternates: Record<string, string> = {}
  for (const { code } of LANGUAGES) {
    languageAlternates[code] = pageUrl(slug, code)
  }
  languageAlternates['x-default'] = pageUrl(slug, DEFAULT_LANGUAGE_CODE)

  return {
    title,
    description,
    ...(keywords && { keywords }),
    ...(noIndex && { robots: { index: false, follow: false } }),
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
      locale: ogLocale,
      ...(ogLocaleAlternates.length > 0 && { alternateLocale: ogLocaleAlternates }),
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
