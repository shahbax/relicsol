import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { PortfolioFilterBar } from './PortfolioFilterBar';
import { caseStudies } from '@/lib/caseStudies';
import { siteConfig } from '@/lib/siteConfig';
import { twitterCard } from '@/lib/seo';

const ogTitle = 'Portfolio — 18 Case Studies · Relicsol';
const ogDesc = 'Web design, software and AI automation projects for USA, UK and European businesses.';

export const metadata: Metadata = {
  title: ogTitle,
  description:
    'Explore 18 Relicsol case studies across e-commerce, SaaS, software, health tech and premium consumer brands for clients in the USA, UK and Europe.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    type: 'website',
    title: ogTitle,
    description: ogDesc,
    url: '/portfolio',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }]
  },
  twitter: twitterCard({ title: ogTitle, description: ogDesc })
};

const filterDefs = [
  { id: 'all', label: 'All Work' },
  { id: 'e-commerce', label: 'E-Commerce' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'saas', label: 'SaaS' },
  { id: 'software', label: 'Software' },
  { id: 'agtech', label: 'AgTech' },
  { id: 'wellness', label: 'Wellness' },
  { id: 'education', label: 'Education' }
];

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
  const filters = filterDefs.map((f) => ({
    ...f,
    count: f.id === 'all' ? caseStudies.length : caseStudies.filter((c) => c.category === f.id).length
  }));

  return (
    <>
      <JsonLd data={collectionLd} id="ld-portfolio" />
      <JsonLd data={breadcrumbLd} id="ld-bc-portfolio" />
      <main>
        {/* Hero — server-rendered */}
        <section style={{ padding: '160px 32px 60px', position: 'relative' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {'{}'} Portfolio
            </div>
            <h1 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(48px, 8vw, 112px)', lineHeight: 0.95, letterSpacing: '-0.045em', margin: '0 0 32px' }}>
              Selected work,<br />
              <span style={{ color: '#52525b' }}>18 case studies.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: '#A1A1AA', maxWidth: 720, margin: '0 0 40px' }}>
              <span style={{ color: '#F97316', fontFamily: 'var(--font-mono), monospace', fontSize: 14 }}>*</span>{' '}
              Since {siteConfig.founded}, Relicsol has delivered 200+ digital projects for businesses across the USA, UK and Europe. Browse by category or scroll through all 18.
            </p>
          </div>
        </section>

        {/* Filter tabs (client island) wrap the server-rendered case-study grid */}
        <PortfolioFilterBar filters={filters}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {caseStudies.map((p) => (
              <div key={p.slug} data-cat={p.category}>
                <Link
                  href={`/portfolio/${p.slug}`}
                  className="rl-port-card"
                  style={{
                    position: 'relative',
                    display: 'block',
                    textDecoration: 'none',
                    aspectRatio: '4 / 5',
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: p.bgGradient,
                    border: '1px solid #262626',
                    width: 'auto'
                  }}
                >
                  <Image
                    src={p.image}
                    alt={`${p.name} — ${p.overview.industry}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="rl-port-img"
                    style={{ objectFit: 'cover', opacity: 0.75 }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,8,8,0.05) 30%, rgba(8,8,8,0.6) 100%)' }} aria-hidden />
                  <div className="rl-port-num">{p.displayId}</div>
                  <div className="rl-port-overlay">
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#F97316', letterSpacing: '0.15em', marginBottom: 8, textTransform: 'uppercase' }}>
                      {p.overview.industry}
                    </div>
                    <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                      {p.name}
                    </div>
                    <div style={{ color: '#A1A1AA', fontSize: 13, marginTop: 4 }}>{p.overview.services}</div>
                    <div className="rl-port-desc">
                      <p style={{ color: '#A1A1AA', fontSize: 13, lineHeight: 1.55, margin: 0 }}>{p.heroDescription}</p>
                    </div>
                    <div className="rl-port-cta">VIEW CASE STUDY →</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <p data-empty style={{ display: 'none', color: '#71717a', textAlign: 'center', fontSize: 15, padding: '80px 0' }}>
            No case studies in this category yet.
          </p>
        </PortfolioFilterBar>
      </main>
    </>
  );
}
