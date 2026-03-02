import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'
import config from '@payload-config'
import { getDictionary } from '@/dictionaries'
import { isValidLocale, type Locale } from '@/i18n/locales'

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export async function generateStaticParams() {
  return [{ locale: 'pl' }, { locale: 'en' }]
}

export const metadata = {
  description: 'Payload CMS frontend with i18n.',
  title: 'Payload Frontend',
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const t = getDictionary(locale)
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const footer = await payload.findGlobal({
    slug: 'footer',
    locale,
  })

  return (
    <html lang={locale}>
      <body>
        <nav>
          <ul>
            <li>
              <a href={`/${locale}`}>{t.home}</a>
            </li>
            <li>
              <a href={`/${locale}/blog`}>{t.blog}</a>
            </li>
            <li>
              <a href={`/${locale}/faq`}>{t.faq}</a>
            </li>
            <li>
              <a href={`/${locale}/integrations`}>{t.integrations}</a>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
        <footer>{footer?.copyrightText ?? null}</footer>
      </body>
    </html>
  )
}
