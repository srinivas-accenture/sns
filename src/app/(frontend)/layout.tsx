import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { DEFAULT_LANGUAGE_CODE } from '@/i18n/languages'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

async function getDefaultLanguage(): Promise<string> {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
    return (siteSettings?.defaultLanguage as string) ?? DEFAULT_LANGUAGE_CODE
  } catch {
    return DEFAULT_LANGUAGE_CODE
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const lang = await getDefaultLanguage()

  return (
    <html lang={lang}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
