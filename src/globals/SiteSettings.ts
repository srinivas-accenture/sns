import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'

import { DEFAULT_LANGUAGE_CODE, LANGUAGES } from '../i18n/languages'

const revalidateSiteSettings: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info('Revalidating site-settings cache')
  revalidateTag('global_site-settings', 'max')
  return doc
}

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
  fields: [
    {
      name: 'defaultLanguage',
      type: 'select',
      label: 'Default Language',
      defaultValue: DEFAULT_LANGUAGE_CODE,
      options: LANGUAGES.map(({ code, label }) => ({ value: code, label })),
      admin: {
        description:
          'The default language shown to website visitors. Defaults to English if not set.',
      },
    },
    {
      name: 'googleAnalyticsId',
      type: 'text',
      label: 'Google Analytics Measurement ID',
      admin: {
        description: 'e.g. G-XXXXXXXXXX — leave blank to disable analytics.',
        placeholder: 'G-XXXXXXXXXX',
      },
    },
    {
      name: 'devanagariFont',
      type: 'select',
      label: 'Devanagari Font',
      defaultValue: 'noto-sans-devanagari',
      options: [
        { label: 'Noto Sans Devanagari (default)', value: 'noto-sans-devanagari' },
        { label: 'Mukta', value: 'mukta' },
        { label: 'Hind', value: 'hind' },
        { label: 'Tiro Devanagari Marathi', value: 'tiro-devanagari' },
      ],
      admin: {
        description: 'Font applied to all Hindi and Marathi (Devanagari script) content.',
      },
    },
    {
      type: 'group',
      name: 'seo',
      label: 'SEO & Robots',
      fields: [
        {
          name: 'sitemapUrl',
          type: 'text',
          label: 'Sitemap URL',
          admin: {
            description:
              'Full URL to your sitemap. Included in robots.txt automatically.',
            placeholder: 'https://www.example.com/sitemap.xml',
          },
        },
        {
          name: 'robotsDisallowPaths',
          type: 'array',
          label: 'Disallow Paths (robots.txt)',
          admin: {
            description:
              'Paths that search engine crawlers should not access. /admin/ is always blocked automatically.',
          },
          fields: [
            {
              name: 'path',
              type: 'text',
              required: true,
              admin: {
                placeholder: '/secret-page/',
              },
            },
          ],
        },
      ],
    },
  ],
}
