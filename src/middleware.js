import { NextResponse } from 'next/server';
import { CK_TOKEN } from './utils/const';

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:8084';
const SITE_CODE = 'lermao';
const CACHE_TTL_MS = 60 * 1000;

let redirectCache = { data: null, expires: 0 };

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

function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.replace(/\/+$/, '');
  }
  return pathname;
}

async function getRedirectMap() {
  const now = Date.now();
  if (redirectCache.data && now < redirectCache.expires) {
    return redirectCache.data;
  }

  try {
    const response = await fetch(`${API_DOMAIN}/api/redirect/client/map`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Site-Code': SITE_CODE
      },
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return redirectCache.data || null;
    }

    const redirects = await response.json();
    const exact = new Map();
    const prefix = [];

    if (Array.isArray(redirects)) {
      for (const redirect of redirects) {
        if (!redirect?.source_path || !redirect?.target_path) continue;

        const entry = {
          source: redirect.source_path,
          target: redirect.target_path,
          status: redirect.status_code === 302 ? 302 : 301
        };

        if (redirect.match_type === 'prefix') {
          prefix.push(entry);
        } else {
          exact.set(redirect.source_path, entry);
        }
      }
    }

    const data = { exact, prefix };
    redirectCache = { data, expires: now + CACHE_TTL_MS };
    return data;
  } catch {
    return redirectCache.data || null;
  }
}

export async function middleware(request) {
  const { nextUrl, cookies, url } = request;
  const { pathname } = nextUrl;

  // Bỏ qua static files
  if (pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|css|js|woff|woff2|ttf|eot|json|xml|txt)$/)) {
    return NextResponse.next();
  }

  // Redirect URL cũ trước route validation để không bị đưa nhầm về trang chủ.
  if (!pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
    const redirectMap = await getRedirectMap();
    const path = normalizePath(pathname);

    const exactMatch = redirectMap?.exact?.get(path);
    if (exactMatch) {
      return NextResponse.redirect(
        new URL(exactMatch.target, request.url),
        exactMatch.status
      );
    }

    for (const redirect of redirectMap?.prefix || []) {
      if (path === redirect.source || path.startsWith(`${redirect.source}/`)) {
        const suffix = path.slice(redirect.source.length);
        return NextResponse.redirect(
          new URL(`${redirect.target}${suffix}`, request.url),
          redirect.status
        );
      }
    }
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
