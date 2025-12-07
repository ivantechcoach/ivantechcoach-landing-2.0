import { middleware } from '@/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn((url: URL) => ({ type: 'redirect', url })),
    next: jest.fn(() => ({ type: 'next' })),
  },
}))

function createMockRequest(pathname: string, acceptLanguage?: string): NextRequest {
  return {
    nextUrl: {
      pathname,
      href: `http://localhost:3000${pathname}`,
    },
    headers: {
      get: jest.fn((name: string) => {
        if (name === 'accept-language') {
          return acceptLanguage || null
        }
        return null
      }),
    },
  } as unknown as NextRequest
}

describe('Middleware - Routing', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should redirect root path to /es', () => {
    const request = createMockRequest('/', 'es-ES,es;q=0.9')
    middleware(request)
    
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      expect.objectContaining({
        href: expect.stringContaining('/es')
      })
    )
  })

  it('should not redirect paths with valid locale', () => {
    const request = createMockRequest('/es/about')
    const result = middleware(request)
    
    expect(NextResponse.next).toHaveBeenCalled()
  })

  it('should validate locale and redirect invalid ones', () => {
    const request = createMockRequest('/fr/invalid', 'es-ES')
    middleware(request)
    
    expect(NextResponse.redirect).toHaveBeenCalled()
  })

  it('should not redirect API routes', () => {
    const request = createMockRequest('/api/contact')
    const result = middleware(request)
    
    expect(NextResponse.next).toHaveBeenCalled()
  })

  it('should not redirect static files', () => {
    const request = createMockRequest('/images/logo.png')
    const result = middleware(request)
    
    expect(NextResponse.next).toHaveBeenCalled()
  })

  it('should ensure URLs follow /es/... or /en/... pattern', () => {
    const request = createMockRequest('/about', 'en-US')
    middleware(request)
    
    const redirectCall = (NextResponse.redirect as jest.Mock).mock.calls[0][0]
    expect(redirectCall.href).toMatch(/^\/(es|en)\//)
  })
})

