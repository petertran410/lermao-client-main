import { headers } from 'next/headers';

export default function sitemap() {
  const host = headers().get('host');
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  const domain = `${protocol}://${host}`;

  return [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${domain}/gioi-thieu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${domain}/cong-thuc`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${domain}/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/nguyen-lieu-pha-che`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/lien-he`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    }
  ];
}
