import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

const columnWidthClass: Record<string, string> = {
  oneThird: 'w-full md:w-1/3',
  half: 'w-full md:w-1/2',
  twoThirds: 'w-full md:w-2/3',
  full: 'w-full',
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
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap gap-8">
        {columns.map((col, i) => (
          <div key={i} className={columnWidthClass[col.size ?? 'full'] ?? 'w-full'}>
            {col.richText && (
              <div className="prose max-w-none">
                <RichText data={col.richText} />
              </div>
            )}
            {col.enableLink && col.link?.label && (
              <a
                href={col.link.url ?? '#'}
                target={col.link.newTab ? '_blank' : undefined}
                rel={col.link.newTab ? 'noopener noreferrer' : undefined}
                className={
                  col.link.appearance === 'outline'
                    ? 'mt-4 inline-block rounded border border-gray-900 px-5 py-2.5 text-sm font-medium transition hover:bg-gray-900 hover:text-white'
                    : 'mt-4 inline-block rounded bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700'
                }
              >
                {col.link.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
