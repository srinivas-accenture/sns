import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'

import config from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'
import { RenderHero } from '@/components/RenderHero'
import { LANGUAGES } from '@/i18n/languages'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    locale: locale as any,
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) return {}

  const meta = page.meta as any
  return {
    title: meta?.title ?? page.title,
    description: meta?.description,
    openGraph: meta?.image ? { images: [{ url: (meta.image as any)?.url }] } : undefined,
  }
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params

  if (!LANGUAGES.some((l) => l.code === locale)) notFound()

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    locale: locale as any,
    limit: 1,
    draft: false,
  })

  const page = result.docs[0]
  if (!page) notFound()

  return (
    <article>
      <RenderHero hero={page.hero as any} />
      {page.layout && <RenderBlocks blocks={page.layout as any} />}
    </article>
  )
}
