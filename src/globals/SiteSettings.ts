import type { GlobalConfig } from 'payload'

import { DEFAULT_LANGUAGE_CODE, LANGUAGES } from '../i18n/languages'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
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
  ],
}
