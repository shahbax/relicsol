import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { QuoteSection } from '@/components/QuoteSection';
import { locationPages, locationBySlug } from '@/lib/locations';
import { caseStudyBySlug } from '@/lib/caseStudies';
import { siteConfig } from '@/lib/siteConfig';
import { twitterCard } from '@/lib/seo';

type Params = { location: string };

// Only these 9 slugs build; every other single-segment path 404s. Static
// routes (/about, /blog, …) take precedence over this dynamic segment.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return locationPages.map((l) => ({ location: l.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const l = locationBySlug[params.location];
  if (!l) return { title: 'Page not found' };
  return {
    title: l.metaTitle,
    description: l.metaDescription,
    alternates: { canonical: `/${l.slug}` },
    openGraph: {
      type: 'website',
      title: l.metaTitle,
      description: l.metaDescription,
      url: `/${l.slug}`,
      locale: l.lang.replace('-', '_'),
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }]
    },
    twitter: twitterCard({ title: l.metaTitle, description: l.metaDescription })
  };
}

export default function LocationPage({ params }: { params: Params }) {
  const l = locationBySlug[params.location];
  if (!l) notFound();

  const url = `${siteConfig.siteUrl}/${l.slug}`;
  const cases = l.caseStudySlugs.map((s) => caseStudyBySlug[s]).filter(Boolean);

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Web design agency ${l.inLocation}`,
    serviceType: 'Web design, software development and AI automation',
    provider: { '@id': `${siteConfig.siteUrl}/#organization` },
    description: l.metaDescription,
    areaServed: l.displayName,
    url
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: l.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
      { '@type': 'ListItem', position: 2, name: `Web design agency ${l.displayName}`, item: url }
    ]
  };

  return (
    <main>
      <JsonLd data={serviceLd} id={`ld-loc-svc-${l.slug}`} />
      <JsonLd data={faqLd} id={`ld-loc-faq-${l.slug}`} />
      <JsonLd data={breadcrumbLd} id={`ld-loc-bc-${l.slug}`} />

      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: `${l.displayName}`, href: `/${l.slug}` }
        ]}
      />

      {/* Hero */}
      <section style={{ padding: '48px 32px 80px', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: -200,
            width: 700,
            height: 600,
            background: 'radial-gradient(circle, rgba(249,115,22,0.13), transparent 60%)',
            pointerEvents: 'none'
          }}
          aria-hidden
        />
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
            {'{}'} {l.displayName} · Web · Software · AI Automation
          </div>
          <h1 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(44px, 6.5vw, 88px)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: '0 0 32px' }}>
            {l.h1Lead}{' '}
            <span style={{ background: 'linear-gradient(120deg,#F97316,#FFAD5C)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {l.h1Accent}
            </span>
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 760 }}>
            {l.intro.map((p, i) => (
              <p key={i} style={{ fontSize: 18, lineHeight: 1.65, color: '#A1A1AA', margin: 0 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Market sections */}
      <section style={{ padding: '40px 32px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 56 }}>
          {l.sections.map((sec, i) => (
            <Reveal key={i}>
              <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 28, lineHeight: 1.2, letterSpacing: '-0.025em', margin: '0 0 20px' }}>
                {sec.heading}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {sec.body.map((p, j) => (
                  <p key={j} style={{ fontSize: 17, lineHeight: 1.75, color: '#A1A1AA', margin: 0 }}>
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mapped case studies */}
      {cases.length > 0 ? (
        <section style={{ padding: '60px 32px', background: '#0f0f0f', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <Reveal>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 40 }}>
                {l.caseStudyIntro}
              </div>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {cases.map((c, i) => (
                <Reveal key={c.slug} delayMs={i * 70}>
                  <Link
                    href={`/portfolio/${c.slug}`}
                    className="rl-port-card"
                    style={{
                      position: 'relative',
                      display: 'block',
                      textDecoration: 'none',
                      aspectRatio: '4 / 5',
                      borderRadius: 4,
                      overflow: 'hidden',
                      background: c.bgGradient,
                      border: '1px solid #262626',
                      width: 'auto'
                    }}
                  >
                    <Image
                      src={c.image}
                      alt={`${c.name} — ${c.overview.industry}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="rl-port-img"
                      style={{ objectFit: 'cover', opacity: 0.75 }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,8,8,0.05) 30%, rgba(8,8,8,0.6) 100%)' }} aria-hidden />
                    <div className="rl-port-num">{c.displayId}</div>
                    <div className="rl-port-overlay">
                      <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#F97316', letterSpacing: '0.15em', marginBottom: 8, textTransform: 'uppercase' }}>
                        {c.overview.industry} · {c.overview.location}
                      </div>
                      <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                        {c.name}
                      </div>
                      <div style={{ color: '#A1A1AA', fontSize: 13, marginTop: 4 }}>{c.overview.services}</div>
                      <div className="rl-port-cta">VIEW CASE STUDY →</div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {'{}'} FAQ
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.02, letterSpacing: '-0.035em', margin: '0 0 40px' }}>
              {l.displayName} questions, answered.
            </h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {l.faqs.map((f, i) => (
              <div key={i} style={{ borderTop: '1px solid #262626', padding: '24px 0' }}>
                <h3 style={{ fontFamily: 'var(--font-jakarta), sans-serif', fontSize: 18, fontWeight: 600, color: '#ffffff', letterSpacing: '-0.015em', margin: '0 0 12px' }}>
                  {f.q}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: '#A1A1AA', margin: 0, maxWidth: 760 }}>{f.a}</p>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #262626' }} />
          </div>
        </div>
      </section>

      <QuoteSection />
    </main>
  );
}
