import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'
import { LANGUAGES } from '../../../i18n/languages'

const postPaths = (slug: string): string[] => LANGUAGES.map(({ code }) => `/${code}/posts/${slug}`)

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published') {
    postPaths(doc.slug).forEach((path) => revalidatePath(path))
    revalidatePath('/posts')
    LANGUAGES.forEach(({ code }) => revalidatePath(`/${code}/posts`))
    revalidateTag('posts-sitemap', 'max')
    revalidateTag(`posts_${doc.slug}`, 'max')
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    postPaths(previousDoc.slug).forEach((path) => revalidatePath(path))
    LANGUAGES.forEach(({ code }) => revalidatePath(`/${code}/posts`))
    revalidateTag('posts-sitemap', 'max')
  }

  payload.logger.info(`Post revalidation completed: ${doc.slug}`)
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (context.disableRevalidate) return doc

  postPaths(doc?.slug ?? '').forEach((path) => revalidatePath(path))
  LANGUAGES.forEach(({ code }) => revalidatePath(`/${code}/posts`))
  revalidateTag('posts-sitemap', 'max')
  return doc
}
