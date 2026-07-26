import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Categories } from './collections/Categories'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { SiteSettings } from './globals/SiteSettings'
import { DEFAULT_LANGUAGE_CODE, LANGUAGES } from './i18n/languages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

const generateTitle: GenerateTitle = ({ doc }) => {
  const title = doc?.title as string | undefined
  return title ? `${title} | SNS` : 'SNS'
}

const generateURL: GenerateURL = ({ doc, locale }) => {
  const slug = doc?.slug as string | undefined
  const lang = (locale as string) || DEFAULT_LANGUAGE_CODE
  if (!slug) return SITE_URL
  return slug === 'home' ? `${SITE_URL}/${lang}` : `${SITE_URL}/${lang}/${slug}`
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Categories],
  globals: [Header, Footer, SiteSettings],
  localization: {
    locales: LANGUAGES.map(({ code, label }) => ({ code, label })),
    defaultLocale: DEFAULT_LANGUAGE_CODE,
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: false,
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['pages'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle,
      generateURL,
    }),
  ],
})
