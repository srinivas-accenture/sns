'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Category, Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = {
  slug?: string | null
  title?: string | null
  meta?: {
    title?: string | null
    description?: string | null
    image?: number | MediaType | null
  } | null
  categories?: (number | Category)[] | null
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: string
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard()
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group border border-border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:cursor-pointer transition-all duration-300',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        {!metaImage && <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            resource={metaImage}
            fill
            imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category

                const categoryTitle = titleFromCategory || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {categoryTitle}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              }

              return null
            })}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
