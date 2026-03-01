import type { Locale } from '@/i18n/locales'

export const dictionaries: Record<
  Locale,
  { home: string; blog: string; faq: string }
> = {
  en: {
    home: 'Home',
    blog: 'Blog',
    faq: 'FAQ',
  },
  pl: {
    home: 'Strona Główna',
    blog: 'Aktualności',
    faq: 'Częste Pytania',
  },
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}
