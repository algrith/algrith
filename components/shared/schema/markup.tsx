'use client';

const SchemaMarkup = () => {
  const jsonLd = {
    description: 'Turning ideas into impactful digital products, designs, and experiences.',
    image: 'https://algrith.com/images/logo/algrith-logo.png',
    logo: 'https://algrith.com/images/logo/algrith-logo.png',
    operatingSystem: 'Windows, MacOS, Android, iOS, Linux',
    applicationCategory: 'SocialNetworkingApplication',
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    email: 'algrithllc@gmail.com',
    url: 'https://algrith.com',
    areaServed: 'Worldwide',
    name: 'Algrith',
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: 4.6,
    //   ratingCount: 8864
    // },
    serviceType: [
      'Artificial Intelligence',
      'Business Optimization',
      'Digital Strategy',
      'Web Development',
      'Data Analytics'
    ],
    founder: {
      name: 'Algrith LLC',
      '@type': 'Person'
    },
    sameAs: [
      'https://www.linkedin.com/company/algrith',
      'https://web.facebook.com/algrithllc'

    ],
    // offers: {
    //   priceCurrency: 'USD',
    //   '@type': 'Offer',
    //   price: 1.00
    // }
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
    }}/>
  );
};

export default SchemaMarkup;