import { notFound } from 'next/navigation'
import React from 'react'
import { getDictionary } from '@/dictionaries'
import { isValidLocale, type Locale } from '@/i18n/locales'

type HomePageProps = {
  params: Promise<{ locale: Locale }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const t = getDictionary(locale)

  return (
    <>
      <h1>{t.home}</h1>
      <p>Locale: {locale}</p>
    </>
  )
}
