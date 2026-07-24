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
    <section style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      {media?.url && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src={media.url}
            alt={media.alt ?? ''}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      )}
      <div style={{ position: 'relative', zIndex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {richText && <RichText data={richText} />}
        {links && links.length > 0 && (
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            {links.map((item, i) => {
              const { link } = item
              if (!link?.label) return null
              return (
                <a
                  key={i}
                  href={link.url ?? '#'}
                  target={link.newTab ? '_blank' : undefined}
                  rel={link.newTab ? 'noopener noreferrer' : undefined}
                  data-appearance={link.appearance ?? 'default'}
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
