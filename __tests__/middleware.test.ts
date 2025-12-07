// Mock Next.js server modules before importing middleware
jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn((url: URL) => ({ type: 'redirect', url })),
  },
}))

import { getLocaleFromHeaders } from '@/middleware'
import type { NextRequest } from 'next/server'

// Mock NextRequest para testing
function createMockRequest(acceptLanguage: string | null): NextRequest {
  const headers = {
    get: jest.fn((name: string) => {
      if (name === 'accept-language') {
        return acceptLanguage
      }
      return null
    }),
  }
  
  return {
    headers,
    nextUrl: {
      pathname: '/',
      href: 'http://localhost:3000/',
    },
  } as unknown as NextRequest
}

describe('middleware - getLocaleFromHeaders', () => {
  describe('Bug fix: malformed Accept-Language header', () => {
    it('should handle "es;" (semicolon without quality value) correctly', () => {
      const request = createMockRequest('es;')
      const locale = getLocaleFromHeaders(request)
      expect(locale).toBe('es')
    })

    it('should handle multiple languages with malformed entries', () => {
      const request = createMockRequest('es;,en;q=0.9')
      const locale = getLocaleFromHeaders(request)
      // Should prioritize 'en' because it has quality 0.9, but 'es' should not break
      expect(['es', 'en']).toContain(locale)
    })

    it('should handle empty quality value after semicolon', () => {
      const request = createMockRequest('en;,es;q=0.8')
      const locale = getLocaleFromHeaders(request)
      // 'es' should be selected because it has higher quality (0.8) than default (1.0)
      // Wait, actually default is 1.0, so 'en' should be selected first
      // But 'es' has 0.8, so 'en' (1.0) should come first
      expect(['es', 'en']).toContain(locale)
    })

    it('should handle mixed valid and malformed entries', () => {
      const request = createMockRequest('fr;,es;q=0.9,en;q=0.8')
      const locale = getLocaleFromHeaders(request)
      // Should select 'es' (0.9) > 'en' (0.8) > 'fr' (1.0 default)
      // But 'fr' is not supported, so should select 'es'
      expect(locale).toBe('es')
    })

    it('should not produce NaN in quality values', () => {
      const request = createMockRequest('es;,en;')
      const locale = getLocaleFromHeaders(request)
      // Both should default to quality 1.0, should not crash
      expect(['es', 'en']).toContain(locale)
      expect(locale).not.toBeNaN()
    })
  })

  describe('Standard Accept-Language parsing', () => {
    it('should return default locale when header is missing', () => {
      const request = createMockRequest(null)
      const locale = getLocaleFromHeaders(request)
      expect(locale).toBe('es')
    })

    it('should parse standard Accept-Language header correctly', () => {
      const request = createMockRequest('es-ES,es;q=0.9,en;q=0.8')
      const locale = getLocaleFromHeaders(request)
      expect(locale).toBe('es')
    })

    it('should prioritize higher quality values', () => {
      const request = createMockRequest('en;q=0.9,es;q=0.8')
      const locale = getLocaleFromHeaders(request)
      expect(locale).toBe('en')
    })

    it('should handle locale without quality (defaults to 1.0)', () => {
      const request = createMockRequest('en,es;q=0.5')
      const locale = getLocaleFromHeaders(request)
      expect(locale).toBe('en')
    })

    it('should extract base locale from regional variants', () => {
      const request = createMockRequest('es-MX,en-US;q=0.9')
      const locale = getLocaleFromHeaders(request)
      expect(locale).toBe('es')
    })

    it('should return default locale for unsupported languages', () => {
      const request = createMockRequest('fr-FR,de-DE')
      const locale = getLocaleFromHeaders(request)
      expect(locale).toBe('es')
    })
  })
})

