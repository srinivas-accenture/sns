import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'

import config from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'
import { RenderHero } from '@/components/RenderHero'
import { LANGUAGES } from '@/i18n/languages'
import { generatePageMeta } from '@/utilities/generatePageMeta'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const result = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 1000,
      select: { slug: true },
    })

    return LANGUAGES.flatMap(({ code }) => result.docs.map(({ slug }) => ({ locale: code, slug })))
  } catch {
    return []
  }
}

async function getPage(slug: string, locale: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    locale: locale as 'en' | 'mr',
    limit: 1,
    depth: 2,
    draft: false,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const page = await getPage(slug, locale)
  if (!page) return {}

  return generatePageMeta({
    pageTitle: page.title,
    slug,
    locale,
    meta: page.meta as any,
  })
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params

  if (!LANGUAGES.some((l) => l.code === locale)) notFound()

  const page = await getPage(slug, locale)
  if (!page) notFound()

  return (
    <article>
      <RenderHero hero={page.hero as any} />
      {page.layout && <RenderBlocks blocks={page.layout as any} locale={locale} />}
    </article>
  )
}
