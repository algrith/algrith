import type { MetadataRoute } from 'next';

const Robots = (): MetadataRoute.Robots => ({
  sitemap: 'https://algrith.com/sitemap.xml',
  rules: [
    {
      userAgent: 'Googlebot',
      disallow: '/private/',
      allow: ['/']
    },
    {
      userAgent: ['Applebot', 'Bingbot'],
      disallow: ['/'],
    },
  ]
});

export default Robots;