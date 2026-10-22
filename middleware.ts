import { NextResponse, type NextRequest } from 'next/server'
import { ACCESS_COOKIE, accessToken } from '@/lib/access'

export async function middleware(req: NextRequest) {
  const password = process.env.DECK_PASSWORD
  // No password configured: open locally, closed in production
  if (!password) {
    if (process.env.NODE_ENV === 'development') return NextResponse.next()
    return new NextResponse('Deck password is not configured.', { status: 503 })
  }

  if (req.cookies.get(ACCESS_COOKIE)?.value === (await accessToken(password))) {
    return NextResponse.next()
  }

  const url = req.nextUrl.clone()
  url.pathname = '/unlock'
  url.search = ''
  return NextResponse.redirect(url)
}

export const config = {
  // Everything except the unlock page, its API, Next internals and the logo shown on the unlock page
  matcher: ['/((?!unlock|api/unlock|_next/static|_next/image|favicon.ico|kvad-logo.svg).*)'],
}
