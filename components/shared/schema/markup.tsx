'use client';

const SchemaMarkup = () => {
  const jsonLd = {
    description: 'Turning ideas into impactful digital products, designs, and experiences.',
    image: 'https://algrith.com/images/logo/algrith-logo.png',
    logo: 'https://algrith.com/images/logo/algrith-logo.png',
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    email: 'algrithllc@gmail.com',
    url: 'https://algrith.com',
    areaServed: 'Worldwide',
    name: 'Algrith',
    founder: {
      name: 'Algrith LLC',
      '@type': 'Person'
    },
    sameAs: [
      'https://www.linkedin.com/company/algrith',
      'https://web.facebook.com/algrithllc'
    ]
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
    }}/>
  );
};

export default SchemaMarkup;