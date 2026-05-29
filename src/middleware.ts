import { NextRequest, NextResponse } from 'next/server';
import { verifySession, COOKIE_NAME } from '@/lib/jwt';
import { ROUTE_RULES, ROLE_HOME, toRole } from '@/lib/role';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lewati Next.js internal, static files, dan auth API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const token   = request.cookies.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;

  // 1. Belum login → redirect ke /login
  if (!session && !pathname.startsWith('/login')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 2. Sudah login + buka /login → redirect ke home sesuai role
  if (session && pathname.startsWith('/login')) {
    const role = toRole(session.role);
    const url  = request.nextUrl.clone();
    url.pathname = ROLE_HOME[role];
    return NextResponse.redirect(url);
  }

  // 3. Route guarding berdasarkan role dari JWT (bukan dari cookie yang bisa dimanipulasi)
  if (session) {
    const role = toRole(session.role);
    const rule = ROUTE_RULES.find(r => pathname.startsWith(r.prefix));
    if (rule && !rule.allowed.includes(role)) {
      const url = request.nextUrl.clone();
      url.pathname = ROLE_HOME[role];
      return NextResponse.redirect(url);
    }
  }

  // Teruskan request + inject header user info untuk API routes
  const res = NextResponse.next();
  if (session) {
    res.headers.set('x-user-id',   String(session.id));
    res.headers.set('x-user-role', session.role);
  }
  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
