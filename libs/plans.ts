import { Addon, Plan } from '@/types';

export const addons: Array<Addon> = [
  {
    text: 'Logo & brand identity design',
    billing_cycle: 'one-time',
    id: 'branding',
    price: 150
  },
  {
    text: 'Extra revision round',
    billing_cycle: 'one-time',
    id: 'revision',
    price: 75
  },
  {
    text: 'Monthly maintenance & updates',
    billing_cycle: 'monthly',
    id: 'maintenance',
    price: 99,
  },
  // {
  //   text: 'SEO monthly management',
  //   billing_cycle: 'monthly',
  // id: 'seo',
  //   price: 199
  // },
  {
    text: 'Content writing (per page)',
    billing_cycle: 'one-time',
    id: 'content',
    price: 50
  },
  // {
  //   text: 'E-commerce setup (up to 50 products)',
  //   billing_cycle: 'one-time',
  //   id: 'ecommerce',
  //   price: 399
  // },
  {
    text: 'Domain & hosting setup',
    billing_cycle: 'one-time',
    id: 'hosting_setup',
    price: 49
  }
];

export const plans: Array<Plan> = [
  {
    description: 'Freelancers, small businesses & personal brands needing a clean online presence.',
    one_time_payment: true,
    action: 'Get Started',
    most_popular: false,
    name: 'Starter',
    price: 499,
    features: [
      'Up to 5 pages (Home, About, Services, Contact, Blog)',
      'Mobile responsive design',
      'Basic SEO setup (meta tags, sitemap)',
      'Contact form integration',
      'Social media links',
      '1 round of revisions',
      'Delivery in 7–10 business days'
    ]
  },
  {
    description: 'Growing businesses that need a powerful, conversion-focused website.',
    one_time_payment: true,
    action: 'Get Started',
    most_popular: true,
    name: 'Business',
    price: 1199,
    features: [
      'Includes everything in Started, plus:',
      'Up to 10 pages',
      'Custom UI/UX design',
      'CMS integration (blog/news management)',
      'Newsletter signup integration',
      'Google Analytics setup',
      'Basic performance optimization',
      '3 rounds of revisions',
      'Delivery in 14–18 business days'
    ]
  },
  {
    description: 'Established businesses needing a full-featured, high-performance web presence.',
    one_time_payment: true,
    action: 'Get Started',
    name: 'Professional',
    most_popular: false,
    price: 2499,
    features: [
      'Includes everything in Business, plus:',
      'Up to 20 pages',
      'Advanced custom UI/UX design',
      'Web app features (portals, dashboards, booking systems)',
      'Payment integration (Paystack, Flutterwave, Stripe)',
      'Advanced SEO optimization',
      'Speed & performance optimization',
      '2 months post-launch support',
      'Unlimited revisions during development',
      'Delivery in 21–28 business days'
    ]
  },
  {
    description: 'Large organizations, SaaS products, and complex platforms requiring scalable',
    action: 'Book a Session',
    one_time_payment: false,
    most_popular: false,
    name: 'Enterprise',
    price: 0,
    features: [
      'Includes everything in Professional, plus:',
      'Unlimited pages',
      'Full custom web application development',
      'AI/automation integrations',
      'Role-based access & user authentication',
      'Data dashboards & analytics',
      'API development & third-party integrations',
      'Dedicated project manager',
      '6 months post-launch support',
      'Priority delivery timeline'
    ]
  }
];