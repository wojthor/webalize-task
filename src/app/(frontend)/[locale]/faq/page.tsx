import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'
import config from '@payload-config'
import { getDictionary } from '@/dictionaries'
import { isValidLocale, type Locale } from '@/i18n/locales'

type FaqPageProps = {
  params: Promise<{ locale: Locale }>
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const t = getDictionary(locale)
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: faqs } = await payload.find({
    collection: 'faq',
    locale,
    depth: 0,
  })

  return (
    <>
      <h1>{t.faq}</h1>
      <p>Locale: {locale}</p>
      <ul>
        {faqs.map((item) => (
          <li key={item.id}>
            <h2>{item.question}</h2>
            <p>{item.answer}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
