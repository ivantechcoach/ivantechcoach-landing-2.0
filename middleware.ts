import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supportedLanguages } from '@/lib/content'

const DEFAULT_LOCALE = 'es'

/**
 * Detecta el idioma preferido del usuario basado en Accept-Language header
 */
function getLocaleFromHeaders(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  
  if (!acceptLanguage) {
    return DEFAULT_LOCALE
  }

  // Parse Accept-Language header (formato: "es-ES,es;q=0.9,en;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [locale, q = 'q=1'] = lang.trim().split(';')
      const quality = parseFloat(q.replace('q=', ''))
      return { locale: locale.split('-')[0].toLowerCase(), quality }
    })
    .sort((a, b) => b.quality - a.quality)

  // Encuentra el primer idioma soportado
  for (const { locale } of languages) {
    if (supportedLanguages.includes(locale as typeof supportedLanguages[number])) {
      return locale
    }
  }

  return DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if pathname is missing locale
  const pathnameIsMissingLocale = supportedLanguages.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Detecta idioma preferido del navegador o usa el default
    const locale = getLocaleFromHeaders(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|.*\\..*|images).*)',
  ],
}





