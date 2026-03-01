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

  const coverImage =
    post.coverImage && typeof post.coverImage === 'object'
      ? post.coverImage
      : null

  return (
    <>
      <h1>{post.title}</h1>
      {coverImage?.url && (
        <img src={coverImage.url} alt={coverImage.alt ?? post.title} />
      )}
      <p>Locale: {locale}</p>
      {post.excerpt && <p>{post.excerpt}</p>}
      {post.content && (
        <div>
          <p>Content (richText): present in payload</p>
        </div>
      )}
    </>
  )
}
