import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { DEFAULT_LANGUAGE_CODE, LANGUAGES } from './i18n/languages'

const validLocales = new Set(LANGUAGES.map((l) => l.code))

export function middleware(request: NextRequest) {
  const firstSegment = request.nextUrl.pathname.split('/').filter(Boolean)[0] ?? ''
  const locale = validLocales.has(firstSegment) ? firstSegment : DEFAULT_LANGUAGE_CODE

  const response = NextResponse.next()
  response.headers.set('x-locale', locale)
  return response
}

export const config = {
  // Skip Next.js internals, static files, Payload admin and API routes
  matcher: ['/((?!_next/static|_next/image|favicon.ico|admin|api).*)'],
}
