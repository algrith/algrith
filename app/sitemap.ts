import type { MetadataRoute } from 'next';
 
const Sitemap = (): MetadataRoute.Sitemap => ([
  {
    url: 'https://algrith.com',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 1
  },
  {
    url: 'https://algrith.com/terms-of-service',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 0.8
  },
  {
    url: 'https://algrith.com/privacy-policy',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 0.8
  },
  {
    url: 'https://algrith.com/refund-policy',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 0.8
  },
  {
    url: 'https://algrith.com/how-it-works',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 0.8
  },
  {
    url: 'https://algrith.com/contact-us',
    changeFrequency: 'weekly',
    lastModified: new Date(),
    priority: 0.5
  },
  {
    url: 'https://algrith.com/about-us',
    changeFrequency: 'weekly',
    lastModified: new Date(),
    priority: 0.5
  }
]);

export default Sitemap;