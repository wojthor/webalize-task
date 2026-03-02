import type { Locale } from '@/i18n/locales'

export const dictionaries: Record<
  Locale,
  { home: string; blog: string; faq: string; integrations: string }
> = {
  en: {
    home: 'Home',
    blog: 'Blog',
    faq: 'FAQ',
    integrations: 'Integrations',
  },
  pl: {
    home: 'Strona Główna',
    blog: 'Blog',
    faq: 'Częste Pytania',
    integrations: 'Integracje',
  },
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}
