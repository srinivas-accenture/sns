import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'
import { LANGUAGES } from '../../../i18n/languages'

const pagePaths = (slug: string): string[] =>
  LANGUAGES.map(({ code }) => (slug === 'home' ? `/${code}` : `/${code}/${slug}`))

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published') {
    const paths = pagePaths(doc.slug)
    paths.forEach((p) => {
      payload.logger.info(`Revalidating page: ${p}`)
      revalidatePath(p)
    })
    revalidateTag('pages-sitemap', 'max')
  }

  // Page was unpublished — revalidate the old paths so they go to 404
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const paths = pagePaths(previousDoc.slug)
    paths.forEach((p) => {
      payload.logger.info(`Revalidating unpublished page: ${p}`)
      revalidatePath(p)
    })
    revalidateTag('pages-sitemap', 'max')
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (context.disableRevalidate) return doc

  pagePaths(doc?.slug ?? '').forEach((p) => revalidatePath(p))
  revalidateTag('pages-sitemap', 'max')

  return doc
}
