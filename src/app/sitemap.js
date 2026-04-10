import { headers } from 'next/headers';

export default function sitemap() {
  const host = headers().get('host');
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  const domain = `${protocol}://${host}`;

  return [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: `${domain}/nguyen-lieu-pha-che`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${domain}/nguyen-lieu-pha-che/mut-pha-che-lermao`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/nguyen-lieu-pha-che/cac-loai-topping-tra-sua`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${domain}/nguyen-lieu-pha-che/cac-loai-topping-tra-sua/tran-chau-nau-nhanh`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${domain}/nguyen-lieu-pha-che/cac-loai-topping-tra-sua/thach-no-hat-no`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${domain}/nguyen-lieu-pha-che/bot-pha-che-lermao`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${domain}/nguyen-lieu-pha-che/siro-pha-che-lermao`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${domain}/cong-thuc-pha-che`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6
    },
    {
      url: `${domain}/workshop-pha-che`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6
    },
    {
      url: `${domain}/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6
    },
    {
      url: `${domain}/gioi-thieu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${domain}/lien-he`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    }
  ];
}
