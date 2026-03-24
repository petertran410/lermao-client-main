import { NextResponse } from 'next/server';
import { CK_TOKEN } from './utils/const';

const VALID_ROUTES = [
  '/',
  '/gioi-thieu',
  '/nguyen-lieu-pha-che',
  '/cong-thuc-pha-che',
  '/workshop-pha-che',
  '/tin-tuc',
  '/lien-he',
  '/gio-hang',
  '/dang-nhap',
  '/quan-tri'
];

const VALID_PREFIXES = [
  '/nguyen-lieu-pha-che/',
  '/cong-thuc-pha-che/',
  '/workshop-pha-che/',
  '/tin-tuc/',
  '/lien-he/',
  '/gio-hang/',
  '/quan-tri/',
  '/api/',
  '/_next/',
  '/images/',
  '/fonts/'
];

function isValidRoute(pathname) {
  if (VALID_ROUTES.includes(pathname)) return true;
  return VALID_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function middleware(request) {
  const { nextUrl, cookies, url } = request;
  const { pathname } = nextUrl;

  // Bỏ qua static files
  if (pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|css|js|woff|woff2|ttf|eot|json|xml|txt)$/)) {
    return NextResponse.next();
  }

  // Auth guard
  const token = cookies.get(CK_TOKEN)?.value;

  if (pathname.startsWith('/quan-tri/')) {
    if (!token) {
      return NextResponse.redirect(new URL('/dang-nhap', url));
    }
    return NextResponse.next();
  }

  if (pathname === '/dang-nhap') {
    if (token) {
      return NextResponse.redirect(new URL('/quan-tri/nguyen-lieu-pha-che', url));
    }
    return NextResponse.next();
  }

  // Route validation — redirect URL không hợp lệ về trang chủ
  if (!isValidRoute(pathname)) {
    return NextResponse.redirect(new URL('/', url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
