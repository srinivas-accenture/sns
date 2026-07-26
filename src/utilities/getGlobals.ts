import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { type DataFromGlobalSlug, type TypedLocale, getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(slug: T, depth = 0, locale: TypedLocale = 'en'): Promise<DataFromGlobalSlug<T>> {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    locale: locale,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug and locale.
 * All locales share the same revalidation tag so a single revalidateTag call clears all.
 */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0, locale: TypedLocale = 'en') =>
  unstable_cache(async () => getGlobal<T>(slug, depth, locale), [slug, locale], {
    tags: [`global_${slug}`],
  })
