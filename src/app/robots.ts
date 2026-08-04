import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const disallow = ['/admin/']

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })

    const extra = (settings as any)?.seo?.robotsDisallowPaths
    if (Array.isArray(extra)) {
      for (const entry of extra) {
        if (entry?.path && !disallow.includes(entry.path)) {
          disallow.push(entry.path)
        }
      }
    }

    const sitemap = (settings as any)?.seo?.sitemapUrl || `${SITE_URL}/sitemap.xml`

    return {
      rules: { userAgent: '*', allow: '/', disallow },
      sitemap,
    }
  } catch {
    return {
      rules: { userAgent: '*', allow: '/', disallow },
    }
  }
}
