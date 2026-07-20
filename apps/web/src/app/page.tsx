import HomePage from '@/app/_views/HomePage';
import { getClientLogos, getSiteSettings } from '@/lib/sanity/content';

export default async function MarketingHomePage() {
  const [siteSettings, clientLogos] = await Promise.all([
    getSiteSettings(),
    getClientLogos(),
  ]);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Core Communications',
    description:
      'B2B PR and communications specialising in XaaS, SMBs, Cybersecurity, Identity, Healthtech and Tech-enabled companies',
    url: 'https://www.corecommunication.biz',
    telephone: ['+61452330923', '+919035190371', '+919811859775'],
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
      {
        '@type': 'PostalAddress',
        addressLocality: 'New Delhi',
        addressCountry: 'IN',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'PR and Communications Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Strategy & Reputation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Media & Influence' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Content & Creative' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Visibility' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web & Digital Experiences' } },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage siteSettings={siteSettings} clientLogos={clientLogos} />
    </>
  );
}
