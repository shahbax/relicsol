import type { Metadata } from 'next';
import { Suspense } from 'react';
import { JsonLd } from '@/components/JsonLd';
import { PortfolioClient } from './PortfolioClient';
import { caseStudies } from '@/lib/caseStudies';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Portfolio — 18 Case Studies · Relicsol',
  description:
    'Explore 18 Relicsol case studies across e-commerce, SaaS, software, health tech and premium consumer brands for clients in the USA, UK and Europe.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    type: 'website',
    title: 'Portfolio — 18 Case Studies · Relicsol',
    description: 'Web design, software and AI automation projects for USA, UK and European businesses.',
    url: '/portfolio',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }]
  }
};

const collectionLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Relicsol Portfolio',
  url: `${siteConfig.siteUrl}/portfolio`,
  description: 'Case studies from Relicsol projects across the USA, UK and Europe.',
  hasPart: caseStudies.map((c) => ({
    '@type': 'Article',
    headline: c.name,
    url: `${siteConfig.siteUrl}/portfolio/${c.slug}`,
    image: `${siteConfig.siteUrl}${c.image}`
  }))
};
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${siteConfig.siteUrl}/portfolio` }
  ]
};

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={collectionLd} id="ld-portfolio" />
      <JsonLd data={breadcrumbLd} id="ld-bc-portfolio" />
      <Suspense fallback={<div style={{ minHeight: '80vh' }} />}>
        <PortfolioClient />
      </Suspense>
    </>
  );
}
