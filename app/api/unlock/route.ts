import { NextResponse } from 'next/server'
import { ACCESS_COOKIE, accessToken } from '@/lib/access'

export async function POST(req: Request) {
  const password = process.env.DECK_PASSWORD
  const { password: attempt } = await req.json().catch(() => ({ password: '' }))

  if (!password || typeof attempt !== 'string' || attempt !== password) {
    // Small delay to slow down guessing
    await new Promise((r) => setTimeout(r, 600))
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(ACCESS_COOKIE, await accessToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}
