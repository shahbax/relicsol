import type { Metadata } from 'next';
import { Suspense } from 'react';
import { JsonLd } from '@/components/JsonLd';
import { BlogClient } from './BlogClient';
import { blogPosts } from '@/lib/blogPosts';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Blog — Web design, software and AI automation insights',
  description:
    'Practical guides on web design, custom software, AI automation and SEO from the Relicsol team. Written for founders and marketing leaders in the USA, UK and Europe.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title: 'Relicsol Blog',
    description: 'Practical guides on web design, custom software, AI automation and SEO.',
    url: '/blog',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }]
  }
};

const collectionLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Relicsol Blog',
  url: `${siteConfig.siteUrl}/blog`,
  description: 'Practical guides on web design, custom software, AI automation and SEO.',
  blogPost: blogPosts.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    url: `${siteConfig.siteUrl}/blog/${p.slug}`,
    datePublished: p.isoDate,
    image: `${siteConfig.siteUrl}${p.image}`,
    author: { '@type': 'Organization', name: siteConfig.name }
  }))
};
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.siteUrl}/blog` }
  ]
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={collectionLd} id="ld-blog" />
      <JsonLd data={breadcrumbLd} id="ld-bc-blog" />
      <Suspense fallback={<div style={{ minHeight: '80vh' }} />}>
        <BlogClient />
      </Suspense>
    </>
  );
}
