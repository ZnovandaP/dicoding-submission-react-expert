/* eslint-disable import/prefer-default-export */
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const arrayOfPathname = pathname.split('/');
  const currentPathname = `/${arrayOfPathname[1]}`;

  // * protection routes user not auth
  const tokenAuth = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (tokenAuth) {
    if (currentPathname.includes('/login') || currentPathname.includes('/register')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else if (!tokenAuth) {
    if (currentPathname.includes('/create-post')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // * redirect pathname /threads to root pathname

  const pathnameToThreads = ['/threads', '/threads/'];

  if (pathnameToThreads.includes(currentPathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
