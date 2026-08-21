import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import config from '@/payload.config'
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
  const [posts, categories] = await Promise.all([
    payload.find({
      collection: 'posts',
      locale: locale as 'en' | 'mr',
      draft: false,
      depth: 1,
      limit: 12,
      sort: '-publishedAt',
      where: category ? { 'categories.slug': { equals: category } } : undefined,
    }),
    payload.find({ collection: 'categories', locale: locale as 'en' | 'mr', limit: 100 }),
  ])

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
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.docs.map((post) => (
          <article key={post.id} className="overflow-hidden rounded-lg border">
            {typeof post.featuredImage === 'object' && post.featuredImage?.url && (
              <img
                src={post.featuredImage.url}
                alt={post.featuredImage.alt ?? post.title}
                className="aspect-[16/10] w-full object-cover"
              />
            )}
            <div className="p-6">
              <time dateTime={post.publishedAt ?? post.createdAt} className="text-sm opacity-70">
                {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString(locale)}
              </time>
              <h2 className="mt-2 text-2xl font-bold">
                <Link href={`/${locale}/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              {post.author && <p className="mt-2 text-sm opacity-70">By {post.author}</p>}
            </div>
          </article>
        ))}
      </div>
    </article>
  )
}
