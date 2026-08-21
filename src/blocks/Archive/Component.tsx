import Link from 'next/link'
import { getPayload } from 'payload'
import type { CollectionSlug } from 'payload'
import { ArrowRight } from 'lucide-react'

import config from '@/payload.config'
import type { ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

type Props = Omit<ArchiveBlockProps, 'blockType'> & {
  locale?: string
  category?: number | string | null
}

type ArchiveItem = {
  id: number | string
  slug?: string | null
  title?: string | null
  intro?: string | null
  author?: string | null
  publishedAt?: string | null
  createdAt?: string
  featuredImage?: { url?: string | null; alt?: string | null } | number | null
}

export async function ArchiveBlock({
  title,
  collection = 'posts',
  pathPrefix = 'posts',
  limit = 6,
  category,
  locale = 'en',
}: Props) {
  const payload = await getPayload({ config: await config })
  const result = await payload.find({
    collection: collection as CollectionSlug,
    locale: locale as 'en' | 'mr',
    draft: false,
    depth: 1,
    limit: Math.min(Math.max(limit ?? 6, 1), 24),
    sort: '-publishedAt',
    where: category ? { categories: { equals: category } } : undefined,
  })

  if (!result.docs.length) return null

  return (
    <section className="posts-archive">
      <div className="container">
        {title && <h2 className="posts-archive-title">{title}</h2>}
        <div className="posts-archive-grid">
          {result.docs.map((rawItem) => {
            const item = rawItem as unknown as ArchiveItem
            const image = typeof item.featuredImage === 'object' ? item.featuredImage : null
            const href = `/${locale}/${pathPrefix ? `${pathPrefix}/` : ''}${item.slug ?? ''}`

            return (
              <article key={item.id} className="posts-archive-card">
                <Link href={href} className="posts-archive-image-link">
                  {image?.url ? (
                    <img src={image.url} alt={image.alt ?? item.title ?? ''} />
                  ) : (
                    <div className="posts-archive-image-placeholder">SNS</div>
                  )}
                </Link>
                <div className="posts-archive-card-body">
                  <h3>
                    <Link href={href}>{item.title ?? 'Untitled'}</Link>
                  </h3>
                  {item.intro && <p className="posts-archive-intro">{item.intro}</p>}
                  <div className="posts-archive-card-footer">
                    <div className="posts-archive-meta">
                      {item.author && <span>By {item.author}</span>}
                      {item.publishedAt && (
                        <time dateTime={item.publishedAt}>
                          {new Date(item.publishedAt).toLocaleDateString(locale)}
                        </time>
                      )}
                    </div>
                    <Link href={href} className="posts-archive-read-more">
                      <span>Read more</span>
                      <ArrowRight aria-hidden="true" size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
