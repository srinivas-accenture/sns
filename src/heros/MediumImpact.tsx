import Image from 'next/image'
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

type MediumImpactHeroProps = {
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

export function MediumImpact({ richText, media, links }: MediumImpactHeroProps) {
  return (
    <section>
      {media?.url && (
        <div style={{ position: 'relative', height: '400px' }}>
          <Image
            src={media.url}
            alt={media.alt ?? ''}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      )}
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {richText && <RichText data={richText} />}
        {links && links.length > 0 && (
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
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
