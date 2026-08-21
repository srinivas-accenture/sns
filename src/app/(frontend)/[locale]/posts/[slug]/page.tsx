import type { Metadata } from 'next'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import config from '@/payload.config'
import { RenderBlocks } from '@/components/RenderBlocks'
import RichText from '@/components/RichText'
import { LANGUAGES } from '@/i18n/languages'
import { generatePageMeta } from '@/utilities/generatePageMeta'
import { getPostTableOfContents } from '@/utilities/tableOfContents'

type Props = { params: Promise<{ locale: string; slug: string }> }

export const dynamic = 'force-dynamic'

type LexicalNode = {
  text?: string
  children?: LexicalNode[]
}

function hasRichTextContent(value: unknown): boolean {
  const node = value as LexicalNode | null | undefined
  if (!node) return false
  if (typeof node.text === 'string' && node.text.trim()) return true
  return Boolean(node.children?.some((child) => hasRichTextContent(child)))
}

async function getPost(slug: string, locale: string) {
  const payload = await getPayload({ config: await config })
  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    locale: locale as 'en' | 'mr',
    draft: false,
    depth: 2,
    limit: 1,
  })
  return result.docs[0] ?? null
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: await config })
  const result = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    select: { slug: true },
  })
  return LANGUAGES.flatMap(({ code }) => result.docs.map(({ slug }) => ({ locale: code, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPost(slug, locale)
  if (!post) return {}
  return generatePageMeta({
    pageTitle: post.title,
    slug: `posts/${slug}`,
    locale,
    meta: post.meta as any,
  })
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params
  if (!LANGUAGES.some((language) => language.code === locale)) notFound()
  const post = await getPost(slug, locale)
  if (!post) notFound()

  const payload = await getPayload({ config: await config })
  const related = await payload.find({
    collection: 'posts',
    where: { slug: { not_equals: slug } },
    locale: locale as 'en' | 'mr',
    draft: false,
    depth: 1,
    limit: 3,
    sort: '-publishedAt',
  })

  const layout = (post.layout ?? []) as unknown[]
  const { items, headingIdsByBlock } = getPostTableOfContents(layout)
  const image = typeof post.featuredImage === 'object' ? post.featuredImage : null
  const excerpt = post.excerpt as { root?: LexicalNode } | null | undefined
  const hasExcerpt = hasRichTextContent(excerpt?.root)

  return (
    <article className="post-article">
      <div className="post-breadcrumbs container">
        <span>Home</span>
        <span aria-hidden="true">›</span>
        <span>Posts</span>
        <span aria-hidden="true">›</span>
        <span>{post.title}</span>
      </div>
      <div className="post-layout container">
        <div className="post-main-column">
          <header className="post-header">
            <h1>{post.title}</h1>
            {image?.url && (
              <img src={image.url} alt={image.alt ?? post.title} className="post-featured-image" />
            )}
            <div className="post-byline">
              {post.author && <span>By {post.author}</span>}
              <time dateTime={post.publishedAt ?? post.createdAt}>
                {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString(locale)}
              </time>
            </div>
            {hasExcerpt && (
              <div className="post-quick-answer">
                <strong>Quick Answer</strong>
                <RichText data={excerpt as any} enableGutter={false} />
              </div>
            )}
          </header>
          <div className="post-content">
            {post.layout && (
              <RenderBlocks blocks={post.layout as any} headingIdsByBlock={headingIdsByBlock} />
            )}
          </div>
        </div>
        {items.length > 0 && (
          <aside className="post-toc">
            <nav aria-label="Table of contents">
              <p>Table of Contents</p>
              <ol>
                {items.map((item) => (
                  <li key={item.id} className={item.level > 2 ? 'pl-4' : undefined}>
                    <a href={`#${item.id}`}>{item.label}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        )}
      </div>
      {related.docs.length > 0 && (
        <section className="post-related">
          <div className="container">
            <div className="post-section-heading">
              <span>Explore More</span>
              <h2>Explore Other Stories</h2>
            </div>
            <div className="post-related-grid">
              {related.docs.map((relatedPost) => {
                const relatedImage =
                  typeof relatedPost.featuredImage === 'object' ? relatedPost.featuredImage : null
                return (
                  <article key={relatedPost.id} className="post-related-card">
                    {relatedImage?.url && (
                      <img src={relatedImage.url} alt={relatedImage.alt ?? relatedPost.title} />
                    )}
                    <div>
                      <h3>
                        <a href={`/${locale}/posts/${relatedPost.slug}`}>{relatedPost.title}</a>
                      </h3>
                      <p>{relatedPost.author ?? 'SNS'}</p>
                      <a className="post-card-link" href={`/${locale}/posts/${relatedPost.slug}`}>
                        Read More
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
