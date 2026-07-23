import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { BlogFilterBar } from './BlogFilterBar';
import { blogPosts, blogCategories } from '@/lib/blogPosts';
import { siteConfig } from '@/lib/siteConfig';
import { twitterCard } from '@/lib/seo';

const ogTitle = 'Relicsol Blog';
const ogDesc = 'Practical guides on web design, custom software, AI automation and SEO.';

export const metadata: Metadata = {
  title: 'Blog — Web design, software and AI automation insights',
  description:
    'Practical guides on web design, custom software, AI automation and SEO from the Relicsol team. Written for founders and marketing leaders in the USA, UK and Europe.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title: ogTitle,
    description: ogDesc,
    url: '/blog',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }]
  },
  twitter: twitterCard({ title: ogTitle, description: ogDesc })
};

const catSlug = (c: string) => c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

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
  const categories = blogCategories.map((label) => ({
    label,
    slug: catSlug(label),
    count: blogPosts.filter((p) => p.category === label).length
  }));

  return (
    <>
      <JsonLd data={collectionLd} id="ld-blog" />
      <JsonLd data={breadcrumbLd} id="ld-bc-blog" />
      <main>
        {/* Hero — server-rendered */}
        <section style={{ padding: '160px 32px 60px' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {'{}'} Blog
            </div>
            <h1 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(48px, 8vw, 112px)', lineHeight: 0.95, letterSpacing: '-0.045em', margin: '0 0 32px' }}>
              Insights on design,<br />
              <span style={{ color: '#52525b' }}>software and growth.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: '#A1A1AA', maxWidth: 720, margin: 0 }}>
              Practical guides on web design, custom software, AI automation and SEO. Written for founders and marketing leaders who ship.
            </p>
          </div>
        </section>

        {/* Filter tabs (client island) wrap the server-rendered post grid */}
        <BlogFilterBar categories={categories} total={blogPosts.length}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {blogPosts.map((p) => (
              <article key={p.slug} data-cat={catSlug(p.category)}>
                <Link
                  href={`/blog/${p.slug}`}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    background: '#161616',
                    border: '1px solid #262626',
                    borderRadius: 4,
                    overflow: 'hidden',
                    height: '100%'
                  }}
                >
                  <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', background: '#111' }}>
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(10,10,10,0.85)', color: '#F97316', padding: '6px 12px', borderRadius: 999, fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', backdropFilter: 'blur(8px)' }}>
                      {p.category}
                    </div>
                  </div>
                  <div style={{ padding: 24 }}>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#71717a', marginBottom: 12 }}>
                      {p.date} · {p.readMinutes} min read
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 20, lineHeight: 1.25, letterSpacing: '-0.02em', margin: '0 0 12px' }}>
                      {p.title}
                    </h2>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: '#A1A1AA', margin: '0 0 16px' }}>{p.excerpt}</p>
                    <div style={{ color: '#F97316', fontSize: 13, fontWeight: 500 }}>Read Article →</div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </BlogFilterBar>
      </main>
    </>
  );
}
