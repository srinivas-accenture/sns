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
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-6 text-center">
        {richText && (
          <div className="prose mx-auto max-w-2xl">
            <RichText data={richText} />
          </div>
        )}
        {links && links.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
                      ? 'rounded border border-gray-900 px-8 py-3 text-sm font-medium transition hover:bg-gray-900 hover:text-white'
                      : 'rounded bg-gray-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-700'
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
