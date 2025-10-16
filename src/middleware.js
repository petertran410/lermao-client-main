import { NextResponse } from 'next/server';
import { CK_TOKEN } from './utils/const';

export function middleware(request) {
  const { nextUrl, cookies, url } = request;
  const { pathname } = nextUrl;
  const token = cookies.get(CK_TOKEN)?.value;

  if (pathname.startsWith('/quan-tri/')) {
    if (!token) {
      return NextResponse.redirect(new URL('/dang-nhap', url));
    }
    return NextResponse.next();
  }

  if (pathname === '/dang-nhap') {
    if (token) {
      return NextResponse.redirect(new URL('/quan-tri/san-pham', url));
    }
    return NextResponse.next();
  }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: ['/dang-nhap', '/quan-tri/:path*']
};
