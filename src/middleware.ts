import { NextRequest, NextResponse } from 'next/server';
import { ROUTE_RULES, ROLE_HOME, toRole } from '@/lib/role';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass through Next internals, static files, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') || // Let login API run
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const userRoleCookie = request.cookies.get('user_role')?.value;

  // 1. Not logged in and not on login page -> redirect to login
  if (!userRoleCookie && !pathname.startsWith('/login')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 2. Already logged in and on login page -> redirect to home
  if (userRoleCookie && pathname.startsWith('/login')) {
    const role = toRole(userRoleCookie);
    const url = request.nextUrl.clone();
    url.pathname = ROLE_HOME[role];
    return NextResponse.redirect(url);
  }

  // 3. Route guarding by role
  if (userRoleCookie) {
    const role = toRole(userRoleCookie);

    const rule = ROUTE_RULES.find(r => pathname.startsWith(r.prefix));
    if (rule && !rule.allowed.includes(role)) {
      const url = request.nextUrl.clone();
      url.pathname = ROLE_HOME[role];
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
