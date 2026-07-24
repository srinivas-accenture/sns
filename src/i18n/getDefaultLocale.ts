import { getPayload } from 'payload'

import config from '@/payload.config'
import { DEFAULT_LANGUAGE_CODE } from './languages'

export async function getDefaultLocale(): Promise<string> {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
    return (siteSettings?.defaultLanguage as string) ?? DEFAULT_LANGUAGE_CODE
  } catch {
    return DEFAULT_LANGUAGE_CODE
  }
}
