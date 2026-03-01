import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'
import config from '@payload-config'
import { getDictionary } from '@/dictionaries'
import { isValidLocale, type Locale } from '@/i18n/locales'

type BlogListPageProps = {
  params: Promise<{ locale: Locale }>
}

export default async function BlogListPage({ params }: BlogListPageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const t = getDictionary(locale)
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: posts } = await payload.find({
    collection: 'posts',
    locale,
    depth: 0,
  })

  return (
    <>
      <h1>{t.blog}</h1>
      <p>Locale: {locale}</p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/${locale}/blog/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
