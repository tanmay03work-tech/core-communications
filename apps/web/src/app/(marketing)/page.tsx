import HomePage from '@/app/_views/HomePage';
import { getSiteSettings } from '@/lib/sanity/content';

export default async function MarketingHomePage() {
  const siteSettings = await getSiteSettings();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Core Communications',
    description:
      'B2B PR and communications specialising in XaaS, SMBs, Cybersecurity, Identity, Healthtech and Tech-enabled companies',
    url: 'https://www.corecommunication.biz',
    telephone: '+61452330923',
    email: 'bharatcorecommunication@gmail.com',
    areaServed: ['AU', 'IN'],
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Sydney',
        addressCountry: 'AU',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Mumbai',
        addressCountry: 'IN',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'PR and Communications Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Media Relations' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Content Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GEO Services' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Influencer Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development' } },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage siteSettings={siteSettings} />
    </>
  );
}
