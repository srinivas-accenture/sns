import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

type LowImpactHeroProps = {
  richText?: any
  links?: Array<{
    link?: {
      label?: string
      url?: string
      newTab?: boolean
      appearance?: string
    }
  }>
}

export function LowImpact({ richText, links }: LowImpactHeroProps) {
  return (
    <section style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {richText && <RichText data={richText} />}
      {links && links.length > 0 && (
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
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
    </section>
  )
}
