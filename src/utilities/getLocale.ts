import { cookies, headers } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

export type SupportedLocale = 'en' | 'hi' | 'mr'
export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'hi', 'mr']

const getCachedDefaultLocale = unstable_cache(
  async (): Promise<SupportedLocale> => {
    try {
      const payload = await getPayload({ config: configPromise })
      const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
      const val = settings?.defaultLanguage as SupportedLocale
      return SUPPORTED_LOCALES.includes(val) ? val : 'en'
    } catch {
      return 'en'
    }
  },
  ['site-settings-default-locale'],
  { tags: ['global_site-settings'] },
)

export async function getLocale(): Promise<SupportedLocale> {
  // x-locale is set by middleware from the URL prefix — highest priority
  const headerStore = await headers()
  const headerLocale = headerStore.get('x-locale') as SupportedLocale | undefined
  if (headerLocale && SUPPORTED_LOCALES.includes(headerLocale)) return headerLocale

  // Cookie fallback (set by middleware on previous visit with locale prefix)
  const cookieStore = await cookies()
  const cookieVal = cookieStore.get('locale')?.value as SupportedLocale | undefined
  if (cookieVal && SUPPORTED_LOCALES.includes(cookieVal)) return cookieVal

  return getCachedDefaultLocale()
}
