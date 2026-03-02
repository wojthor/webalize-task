import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'
import config from '@payload-config'
import { getDictionary } from '@/dictionaries'
import { isValidLocale, type Locale } from '@/i18n/locales'

type IntegrationsPageProps = {
  params: Promise<{ locale: Locale }>
}

export default async function IntegrationsPage({
  params,
}: IntegrationsPageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const t = getDictionary(locale)
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: categories } = await payload.find({
    collection: 'integration-categories',
    locale,
    depth: 0,
    sort: '-createdAt',
  })

  const { docs: integrations } = await payload.find({
    collection: 'integrations',
    locale,
    depth: 1,
  })

  const byCategory = new Map<number, typeof integrations>()
  const uncategorized: typeof integrations = []

  for (const item of integrations) {
    const catId =
      typeof item.category === 'object' && item.category !== null
        ? (item.category as { id: number }).id
        : item.category
    if (catId != null) {
      const list = byCategory.get(Number(catId)) ?? []
      list.push(item)
      byCategory.set(Number(catId), list)
    } else {
      uncategorized.push(item)
    }
  }

  return (
    <>
      <h1>{t.integrations}</h1>
      {categories.map((cat) => {
        const items = byCategory.get(cat.id) ?? []
        return (
          <section key={cat.id}>
            <h2>{cat.name}</h2>
            <ul>
              {items.map((item) => {
                const logo =
                  item.logo && typeof item.logo === 'object' ? item.logo : null
                return (
                  <li key={item.id}>
                    <article>
                      {logo?.url && (
                        <img src={logo.url} alt={logo.alt ?? item.name ?? ''} />
                      )}
                      <h3>{item.name}</h3>
                      {item.description && <p>{item.description}</p>}
                    </article>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
      {uncategorized.length > 0 && (
        <section>
          <h2>Uncategorized</h2>
          <ul>
            {uncategorized.map((item) => {
              const logo =
                item.logo && typeof item.logo === 'object' ? item.logo : null
              return (
                <li key={item.id}>
                  <article>
                    {logo?.url && (
                      <img src={logo.url} alt={logo.alt ?? item.name ?? ''} />
                    )}
                    <h3>{item.name}</h3>
                    {item.description && <p>{item.description}</p>}
                  </article>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </>
  )
}
