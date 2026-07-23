import type { Metadata } from 'next';
import { HomeClient } from './HomeClient';
import { JsonLd } from '@/components/JsonLd';
import { siteConfig } from '@/lib/siteConfig';
import { services } from '@/lib/services';
import { twitterCard } from '@/lib/seo';

const ogTitle = 'Relicsol — Digital systems that convert.';
const ogDesc =
  'Premium web design, custom software, AI automation and SEO for ambitious businesses in the USA, UK and Europe.';

export const metadata: Metadata = {
  title: 'Relicsol — Web Design, Software, AI Automation & SEO Agency',
  description:
    'Premium web design, custom software, AI automation and SEO for ambitious businesses in the USA, UK and Europe. 200+ projects delivered.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: ogTitle,
    description: ogDesc,
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }]
  },
  twitter: twitterCard({ title: ogTitle, description: ogDesc })
};

// ProfessionalService describes the business itself. No aggregateRating:
// Google disallows self-serving review markup and it can trigger a manual
// action. No telephone: the phone number is being removed sitewide.
const proService = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${siteConfig.siteUrl}/#organization`,
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  image: `${siteConfig.siteUrl}/opengraph-image`,
  logo: `${siteConfig.siteUrl}/images/logo.png`,
  email: siteConfig.contact.primaryEmail,
  priceRange: '$$–$$$',
  areaServed: siteConfig.address.markets,
  sameAs: [siteConfig.social.linkedin, siteConfig.social.facebook],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital services',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.name,
        url: `${siteConfig.siteUrl}/services/${s.slug}`
      }
    }))
  }
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={proService} id="ld-home" />
      <HomeClient />
    </>
  );
}
