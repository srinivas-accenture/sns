import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
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
import { Posts } from './collections/Posts'
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
  return title
    ? `${title} | Shri Swami Samarth Namasmaran Seva (Malaysia)`
    : 'Shri Swami Samarth Namasmaran Seva (Malaysia)'
}

const generateURL: GenerateURL = ({ collectionConfig, doc, locale }) => {
  const slug = doc?.slug as string | undefined
  const lang = (locale as string) || DEFAULT_LANGUAGE_CODE
  if (!slug) return SITE_URL
  const prefix = collectionConfig?.slug === 'posts' ? '/posts' : ''
  return slug === 'home' ? `${SITE_URL}/${lang}` : `${SITE_URL}/${lang}${prefix}/${slug}`
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Posts, Categories],
  globals: [Header, Footer, SiteSettings],
  localization: {
    locales: LANGUAGES.map(({ code, label }) => ({ code, label })),
    defaultLocale: DEFAULT_LANGUAGE_CODE,
    fallback: true,
  },
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_FROM || 'noreply@example.com',
    defaultFromName: process.env.SMTP_FROM_NAME || 'SNS',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
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
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        state: true,
        country: true,
        checkbox: true,
        number: true,
        message: true,
        payment: false,
      },
    }),
    seoPlugin({
      collections: ['pages', 'posts'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle,
      generateURL,
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'keywords',
          type: 'text',
          localized: true,
          label: 'Keywords',
          admin: {
            description:
              'Comma-separated keywords (e.g. "kirtan, namaskar, swami samarth"). Helps Bing/Yahoo; ignored by Google.',
            placeholder: 'keyword1, keyword2, keyword3',
          },
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          label: 'Hide from search engines (noindex)',
          defaultValue: false,
          admin: {
            description:
              'When checked, adds <meta name="robots" content="noindex, nofollow"> — prevents Google/Bing from indexing this page.',
          },
        },
      ],
    }),
  ],
})
