import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

type LinkItem = {
  link?: {
    label?: string
    url?: string
    reference?: any
    newTab?: boolean
    appearance?: string
  }
}

type CallToActionBlockProps = {
  richText?: any
  links?: LinkItem[]
}

export function CallToActionBlock({ richText, links }: CallToActionBlockProps) {
  return (
    <div>
      {richText && <RichText data={richText} />}
      {links && links.length > 0 && (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
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
  )
}
