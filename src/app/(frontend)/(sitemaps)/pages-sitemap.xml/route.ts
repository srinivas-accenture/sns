import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { LANGUAGES } from '@/i18n/languages'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    })

    const dateFallback = new Date().toISOString()

    // One sitemap entry per locale per page
    const sitemap =
      results.docs?.flatMap((page) => {
        if (!page?.slug) return []
        return LANGUAGES.map(({ code }) => ({
          loc:
            page.slug === 'home' ? `${SITE_URL}/${code}` : `${SITE_URL}/${code}/${page.slug}`,
          lastmod: page.updatedAt || dateFallback,
        }))
      }) ?? []

    return sitemap
  },
  ['pages-sitemap'],
  { tags: ['pages-sitemap'] },
)

export async function GET() {
  const sitemap = await getPagesSitemap()
  return getServerSideSitemap(sitemap)
}
