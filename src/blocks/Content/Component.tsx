import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

const columnWidths: Record<string, string> = {
  oneThird: '33.333%',
  half: '50%',
  twoThirds: '66.666%',
  full: '100%',
}

type Column = {
  size?: string
  richText?: any
  enableLink?: boolean
  link?: {
    label?: string
    url?: string
    reference?: any
    newTab?: boolean
    appearance?: string
  }
}

type ContentBlockProps = {
  columns?: Column[]
}

export function ContentBlock({ columns }: ContentBlockProps) {
  if (!columns?.length) return null

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {columns.map((col, i) => (
        <div key={i} style={{ width: columnWidths[col.size ?? 'full'] ?? '100%' }}>
          {col.richText && <RichText data={col.richText} />}
          {col.enableLink && col.link?.label && (
            <a
              href={col.link.url ?? '#'}
              target={col.link.newTab ? '_blank' : undefined}
              rel={col.link.newTab ? 'noopener noreferrer' : undefined}
              data-appearance={col.link.appearance ?? 'default'}
            >
              {col.link.label}
            </a>
          )}
        </div>
      ))}
    </div>
  )
}
