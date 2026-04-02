export default function robots() {
  // const host = headers().get('host');
  // const protocol = host.startsWith('localhost') ? 'http' : 'https';
  // const domain = `${protocol}://${host}`;

  const sitemapUrl = 'https://www.lermao.com/sitemap.xml';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // User-specific pages
          '/gio-hang/',
          '/thanh-toan/',
          '/dang-ky/',
          '/dang-nhap/',
          '/profile/',

          // Search pages
          '/tim-kiem',
          '/search',

          // Query parameters - search
          '/*?s=',
          '/*?q=',
          '/*?keyword=',

          // Query parameters - filters/sorting
          '/*?filter=',
          '/*?sort=',
          '/*?orderby=',
          '/*?add-to-cart=',

          // Tracking parameters
          '/*?fbclid=',
          '/*?gclid=',
          '/*utm_*',
          '/*?ref=',
          '/*?track=',
          '/*?go=',

          // Comment reply parameters
          '/*?replytocom'
        ]
      }
    ],
    sitemap: sitemapUrl
  };
}
