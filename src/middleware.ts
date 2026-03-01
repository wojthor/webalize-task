import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './i18n/locales'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/admin')
  ) {
    return NextResponse.next()
  }

  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = `/${DEFAULT_LOCALE}`
    return NextResponse.redirect(url)
  }

  const segment = pathname.slice(1).split('/')[0]
  const isSupportedLocale =
    segment &&
    SUPPORTED_LOCALES.includes(segment as (typeof SUPPORTED_LOCALES)[number])
  if (!isSupportedLocale) {
    const url = request.nextUrl.clone()
    const rest = segment ? pathname.slice(segment.length + 2) : ''
    url.pathname = rest ? `/${DEFAULT_LOCALE}/${rest}` : `/${DEFAULT_LOCALE}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|admin).*)'],
}
