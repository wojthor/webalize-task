import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'
import config from '@payload-config'
import type { Post } from '@/payload-types'
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

  const { docs: categories } = await payload.find({
    collection: 'categories',
    locale,
    depth: 0,
    sort: '-createdAt',
  })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    locale,
    depth: 1,
    sort: '-publishedDate',
  })

  const byCategoryId = new Map<number, { name: string; posts: Post[] }>()
  const uncategorized: Post[] = []

  for (const post of posts) {
    const category =
      post.category && typeof post.category === 'object' ? post.category : null
    if (category && 'id' in category && 'name' in category) {
      const id = (category as { id: number; name: string }).id
      const name = (category as { id: number; name: string }).name
      const existing = byCategoryId.get(id)
      if (existing) {
        existing.posts.push(post)
      } else {
        byCategoryId.set(id, { name, posts: [post] })
      }
    } else {
      uncategorized.push(post)
    }
  }

  const orderedSections: { name: string; posts: Post[] }[] = []
  for (const cat of categories) {
    const group = byCategoryId.get(cat.id)
    if (group) orderedSections.push(group)
  }
  const orphanedIds = [...byCategoryId.keys()].filter(
    (id) => !categories.some((c) => c.id === id),
  )
  for (const id of orphanedIds) {
    orderedSections.push(byCategoryId.get(id)!)
  }
  if (uncategorized.length > 0) {
    orderedSections.push({ name: 'Uncategorized', posts: uncategorized })
  }

  return (
    <>
      <h1>{t.blog}</h1>
      {orderedSections.map((section) => (
        <section key={section.name}>
          <h2>{section.name}</h2>
          <ul>
            {section.posts.map((post) => (
              <li key={post.id}>
                <article>
                  <h3>
                    <a href={`/${locale}/blog/${post.slug}`}>{post.title}</a>
                  </h3>
                  {post.excerpt && <p>{post.excerpt}</p>}
                  {post.publishedDate && (
                    <p>
                      <time
                        dateTime={new Date(post.publishedDate).toISOString()}
                      >
                        {new Date(post.publishedDate).toLocaleDateString(
                          locale,
                        )}
                      </time>
                    </p>
                  )}
                  {post.readTime != null && post.readTime !== '' && (
                    <p>
                      <span>{post.readTime}</span>
                    </p>
                  )}
                </article>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  )
}
