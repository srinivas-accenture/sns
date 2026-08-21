import { getPayload } from 'payload'
import config from '@/payload.config'

import { LANGUAGES, DEFAULT_LANGUAGE_CODE } from '@/i18n/languages'

const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

function pageUrl(slug: string, locale: string): string {
  return slug === 'home' ? `${SITE_URL}/${locale}` : `${SITE_URL}/${locale}/${slug}`
}

function postUrl(slug: string, locale: string): string {
  return `${SITE_URL}/${locale}/posts/${slug}`
}

export async function GET() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const [pages, posts] = await Promise.all([
      payload.find({
        collection: 'pages',
        draft: false,
        limit: 1000,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: 'posts',
        draft: false,
        limit: 1000,
        select: { slug: true, updatedAt: true },
      }),
    ])

    const pageEntries = pages.docs.map((page) => {
      const slug = page.slug as string
      const lastmod = page.updatedAt ? new Date(page.updatedAt).toISOString() : undefined

      const loc = pageUrl(slug, LANGUAGES[0].code)

      const hreflangLinks = LANGUAGES.map(
        ({ code }) =>
          `    <xhtml:link rel="alternate" hreflang="${code}" href="${pageUrl(slug, code)}"/>`,
      )
      hreflangLinks.push(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(slug, DEFAULT_LANGUAGE_CODE)}"/>`,
      )

      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
        ...hreflangLinks,
        '  </url>',
      ].join('\n')
    })

    const postEntries = posts.docs.flatMap((post) => {
      const slug = post.slug as string
      const lastmod = post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined
      const loc = postUrl(slug, LANGUAGES[0].code)
      const hreflangLinks = LANGUAGES.map(
        ({ code }) =>
          `    <xhtml:link rel="alternate" hreflang="${code}" href="${postUrl(slug, code)}"/>`,
      )
      hreflangLinks.push(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${postUrl(slug, DEFAULT_LANGUAGE_CODE)}"/>`,
      )
      return [
        [
          '  <url>',
          `    <loc>${loc}</loc>`,
          ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
          ...hreflangLinks,
          '  </url>',
        ].join('\n'),
      ]
    })

    const urlEntries = [...pageEntries, ...postEntries].join('\n')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urlEntries}
</urlset>`

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    })
  } catch (err) {
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>',
      {
        status: 500,
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
      },
    )
  }
}
