import { unstable_cache } from 'next/cache'

// No redirects plugin configured — returns empty list.
// Install @payloadcms/plugin-redirects and add it to payload.config.ts to enable redirects.
export const getCachedRedirects = () =>
  unstable_cache(
    async () =>
      [] as {
        from: string
        to?: {
          url?: string
          reference?: {
            relationTo?: string
            value?: string | { slug?: string }
          }
        }
      }[],
    ['redirects'],
    {
      tags: ['redirects'],
    },
  )
