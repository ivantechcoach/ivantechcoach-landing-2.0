import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supportedLanguages } from '@/lib/content'

const DEFAULT_LOCALE = 'es'

/**
 * Detecta el idioma preferido del usuario basado en Accept-Language header
 */
export function getLocaleFromHeaders(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  
  if (!acceptLanguage) {
    return DEFAULT_LOCALE
  }

  // Parse Accept-Language header (formato: "es-ES,es;q=0.9,en;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const parts = lang.trim().split(';')
      const locale = parts[0]
      const q = parts[1] || 'q=1' // Maneja casos donde no hay punto y coma
      
      // Maneja casos malformados como "es;" (punto y coma sin valor)
      const qualityStr = q.trim().replace('q=', '')
      const quality = qualityStr === '' ? 1.0 : parseFloat(qualityStr)
      
      // Si parseFloat retorna NaN, usar calidad por defecto de 1.0
      const finalQuality = isNaN(quality) ? 1.0 : quality
      
      return { locale: locale.split('-')[0].toLowerCase(), quality: finalQuality }
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
  
  // Skip API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  // Check if pathname is missing locale
  const pathnameIsMissingLocale = supportedLanguages.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Detecta idioma preferido del navegador o usa el default
    const locale = getLocaleFromHeaders(request)
    
    // Ensure locale is valid
    const validLocale = supportedLanguages.includes(locale as typeof supportedLanguages[number])
      ? locale
      : DEFAULT_LOCALE
    
    // Normalize pathname to avoid double slashes
    const normalizedPath = pathname === '/' ? '' : pathname.startsWith('/') ? pathname : `/${pathname}`
    
    const newUrl = new URL(`/${validLocale}${normalizedPath}`, request.url)
    return NextResponse.redirect(newUrl)
  }
  
  // Validate locale in pathname
  const pathLocale = pathname.split('/')[1]
  if (pathLocale && !supportedLanguages.includes(pathLocale as typeof supportedLanguages[number])) {
    const locale = getLocaleFromHeaders(request)
    const validLocale = supportedLanguages.includes(locale as typeof supportedLanguages[number])
      ? locale
      : DEFAULT_LOCALE
    
    const restOfPath = pathname.split('/').slice(2).join('/')
    const normalizedPath = restOfPath ? `/${restOfPath}` : ''
    
    const newUrl = new URL(`/${validLocale}${normalizedPath}`, request.url)
    return NextResponse.redirect(newUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|.*\\..*|images).*)',
  ],
}





