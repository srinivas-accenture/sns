import Image from 'next/image'
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

type HighImpactHeroProps = {
  richText?: any
  media?: {
    url?: string
    alt?: string
    width?: number
    height?: number
  }
  links?: Array<{
    link?: {
      label?: string
      url?: string
      newTab?: boolean
      appearance?: string
    }
  }>
}

export function HighImpact({ richText, media, links }: HighImpactHeroProps) {
  return (
    <section className="relative flex min-h-[80vh] items-center">
      {media?.url && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={media.url}
            alt={media.alt ?? ''}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      <div className="mx-auto w-full max-w-6xl px-6 py-24 text-white">
        {richText && <RichText data={richText} />}
        {links && links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4">
            {links.map((item, i) => {
              const { link } = item
              if (!link?.label) return null
              return (
                <a
                  key={i}
                  href={link.url ?? '#'}
                  target={link.newTab ? '_blank' : undefined}
                  rel={link.newTab ? 'noopener noreferrer' : undefined}
                  className={
                    link.appearance === 'outline'
                      ? 'rounded border border-white px-6 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black'
                      : 'rounded bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-gray-100'
                  }
                >
                  {link.label}
                </a>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
