import type { MetadataRoute } from 'next';
 
const Sitemap = (): MetadataRoute.Sitemap => ([
  {
    url: 'https://algrith.com/auth/resend-verification',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 0.8
  },
  {
    url: 'https://algrith.com/auth/forgot-password',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 0.8
  },
  {
    url: 'https://algrith.com/auth/password-reset',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 0.8
  },
  {
    url: 'https://algrith.com/terms-of-service',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 1.0
  },
  {
    url: 'https://algrith.com/privacy-policy',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 1.0
  },
  {
    url: 'https://algrith.com/refund-policy',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 1.0
  },
  {
    url: 'https://algrith.com/how-it-works',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 1.0
  },
  {
    url: 'https://algrith.com/auth/sign-up',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 0.8
  },
  {
    url: 'https://algrith.com/contact-us',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 1.0
  },
  {
    url: 'https://algrith.com/auth/verify',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 1.0
  },
  {
    url: 'https://algrith.com/about-us',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 1.0
  },
  {
    url: 'https://algrith.com/pricing',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 1.0
  },
  {
    url: 'https://algrith.com/auth',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 1.0
  },
  {
    url: 'https://algrith.com',
    changeFrequency: 'monthly',
    lastModified: new Date(),
    priority: 1.0
  }
]);

export default Sitemap;