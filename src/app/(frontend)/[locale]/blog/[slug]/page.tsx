import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'
import config from '@payload-config'
import { isValidLocale, type Locale } from '@/i18n/locales'

type BlogPostPageProps = {
  params: Promise<{ locale: Locale; slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params
  if (!isValidLocale(locale)) notFound()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const slugNorm = slug.trim()
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      or: [
        { slug: { equals: slugNorm } },
        { slug: { equals: `${slugNorm} ` } },
      ],
    },
    limit: 1,
    depth: 1,
  })
  const postBySlug = docs[0]
  if (!postBySlug) notFound()

  const post = await payload.findByID({
    collection: 'posts',
    id: postBySlug.id,
    locale,
    depth: 1,
  })

  const image = post.image && typeof post.image === 'object' ? post.image : null
  const category =
    post.category && typeof post.category === 'object' ? post.category : null

  return (
    <article>
      <h1>{post.title}</h1>
      {image?.url && <img src={image.url} alt={image.alt ?? post.title} />}
      {post.publishedDate && (
        <p>
          <time dateTime={new Date(post.publishedDate).toISOString()}>
            {new Date(post.publishedDate).toLocaleDateString(locale)}
          </time>
        </p>
      )}
      {post.readTime && <p>{post.readTime}</p>}
      {category && 'name' in category && (
        <p>{String((category as { name?: string }).name)}</p>
      )}
      {post.excerpt && <p>{post.excerpt}</p>}
      {post.content && (
        <section>
          <p>Content (richText)</p>
        </section>
      )}
    </article>
  )
}
