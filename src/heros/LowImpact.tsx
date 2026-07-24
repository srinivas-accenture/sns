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
    <section className="mx-auto max-w-6xl px-6 py-16">
      {richText && <RichText data={richText} />}
      {links && links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-4">
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
                    ? 'rounded border border-gray-900 px-6 py-3 text-sm font-medium transition hover:bg-gray-900 hover:text-white'
                    : 'rounded bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-700'
                }
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
