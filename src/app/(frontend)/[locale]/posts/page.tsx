import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import config from '@/payload.config'
import { ArchiveBlock } from '@/blocks/Archive/Component'
import { LANGUAGES } from '@/i18n/languages'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return { title: `Posts | SNS`, alternates: { canonical: `/${locale}/posts` } }
}

export default async function PostsPage({ params, searchParams }: Props) {
  const { locale } = await params
  const { category } = await searchParams
  if (!LANGUAGES.some((language) => language.code === locale)) notFound()

  const payload = await getPayload({ config: await config })
  const categories = await payload.find({
    collection: 'categories',
    locale: locale as 'en' | 'mr',
    limit: 100,
  })

  return (
    <article className="container py-16">
      <header className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
          Journal
        </p>
        <h1 className="mt-3 text-5xl font-bold text-brand-primary">Posts</h1>
      </header>
      <nav aria-label="Post categories" className="mb-10 flex flex-wrap gap-3">
        <Link href={`/${locale}/posts`} className="rounded-full border px-4 py-2 text-sm">
          All
        </Link>
        {categories.docs.map((item) => (
          <Link
            key={item.id}
            href={`/${locale}/posts?category=${encodeURIComponent(item.slug ?? '')}`}
            className="rounded-full border px-4 py-2 text-sm"
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <ArchiveBlock
        title="Latest posts"
        collection="posts"
        pathPrefix="posts"
        limit={12}
        locale={locale}
        category={
          category ? (categories.docs.find((item) => item.slug === category)?.id ?? null) : null
        }
      />
    </article>
  )
}
