import { headers } from 'next/headers';

export default function robots() {
  const host = headers().get('host');
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  const domain = `${protocol}://${host}`;

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${domain}/sitemap.xml`
  };
}
