import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';
import { serviceBySlug, services } from '@/lib/services';
import { siteConfig } from '@/lib/siteConfig';
import { twitterCard } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ServiceFAQClient } from './ServiceFAQClient';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const s = serviceBySlug[params.slug];
  if (!s) return { title: 'Service not found' };
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      type: 'article',
      title: s.metaTitle,
      description: s.metaDescription,
      url: `/services/${s.slug}`,
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }]
    },
    twitter: twitterCard({ title: s.metaTitle, description: s.metaDescription })
  };
}

export default function ServicePage({ params }: { params: Params }) {
  const s = serviceBySlug[params.slug];
  if (!s) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.name,
    provider: { '@id': `${siteConfig.siteUrl}/#organization` },
    description: s.metaDescription,
    areaServed: siteConfig.address.markets,
    url: `${siteConfig.siteUrl}/services/${s.slug}`,
    // Sub-services drawn from the visible "What We Build" cards on the page.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${s.name} — what we build`,
      itemListElement: s.whatWeBuild.map((w) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: w.title, description: w.body }
      }))
    }
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteConfig.siteUrl}/#services` },
      { '@type': 'ListItem', position: 3, name: s.name, item: `${siteConfig.siteUrl}/services/${s.slug}` }
    ]
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };

  return (
    <main>
      <JsonLd data={jsonLd} id={`ld-service-${s.slug}`} />
      <JsonLd data={breadcrumb} id={`ld-bc-${s.slug}`} />
      <JsonLd data={faqLd} id={`ld-faq-${s.slug}`} />

      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/#services' },
          { name: s.navLabel, href: `/services/${s.slug}` }
        ]}
      />

      {/* Service filter pills */}
      <div style={{ padding: '32px 32px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {services.map((svc) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              style={{
                background: svc.slug === s.slug ? '#F97316' : 'transparent',
                color: svc.slug === s.slug ? '#fff' : '#A1A1AA',
                textDecoration: 'none',
                padding: '7px 14px',
                borderRadius: 999,
                fontSize: 12,
                fontFamily: 'var(--font-mono), monospace',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
                border: svc.slug === s.slug ? '1px solid #F97316' : '1px solid #262626'
              }}
            >
              {svc.serviceNumber} / {svc.navLabel}
            </Link>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: '80px 32px 100px', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: 120,
            right: -200,
            width: 700,
            height: 700,
            background: 'radial-gradient(circle, rgba(249,115,22,0.15), transparent 60%)',
            pointerEvents: 'none'
          }}
          aria-hidden
        />
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
          <div style={{ maxWidth: 1000 }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {s.heroLabel}
            </div>
            <h1 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(48px, 7.5vw, 104px)', lineHeight: 0.95, letterSpacing: '-0.045em', margin: '0 0 40px' }}>
              {s.heroTitle.endsWith(s.heroAccent) ? (
                <>
                  {s.heroTitle.slice(0, s.heroTitle.length - s.heroAccent.length)}
                  <span style={{ background: 'linear-gradient(120deg,#F97316,#FFAD5C)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {s.heroAccent}
                  </span>
                </>
              ) : (
                s.heroTitle
              )}
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: '#A1A1AA', maxWidth: 680, margin: '0 0 40px' }}>
              {s.heroDescription}
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <MagneticButton
                href="/contact"
                className="rl-btn-primary"
                style={{
                  background: '#F97316',
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '16px 28px',
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10
                }}
              >
                Start Your Project →
              </MagneticButton>
              <Link href="/portfolio" className="rl-btn-secondary" style={{ background: 'transparent', color: '#ffffff', textDecoration: 'none', padding: '16px 28px', borderRadius: 999, fontSize: 14, fontWeight: 500, border: '1px solid #262626' }}>
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section style={{ padding: '120px 32px', background: '#0f0f0f', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Reveal style={{ marginBottom: 64, maxWidth: 760 }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {'{}'} What We Build
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: 0 }}>
              Every {s.serviceNumber === '01' ? 'site' : s.serviceNumber === '02' ? 'system' : s.serviceNumber === '03' ? 'workflow' : 'campaign'} serves<br />
              <span style={{ color: '#52525b' }}>a business goal.</span>
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {s.whatWeBuild.map((w, i) => (
              <Reveal key={w.num} delayMs={i * 70}>
                <div className="rl-svc-card" style={{ background: '#080808', border: '1px solid #262626', borderRadius: 4, padding: 36 }}>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', letterSpacing: '0.1em', marginBottom: 24 }}>
                    {w.num}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 22, letterSpacing: '-0.02em', margin: '0 0 14px' }}>
                    {w.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: '#A1A1AA', margin: '0 0 16px' }}>{w.body}</p>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: 16, borderTop: '1px solid #1a1a1a' }}>
                    Ideal for: <span style={{ color: '#71717a' }}>{w.idealFor}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '120px 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Reveal style={{ marginBottom: 64, maxWidth: 760 }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {'{}'} Our Process
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: 0 }}>
              From discovery<br />
              <span style={{ color: '#52525b' }}>to launch.</span>
            </h2>
          </Reveal>
          <div>
            {s.processSteps.map((step, i) => (
              <Reveal key={step.num} delayMs={i * 60}>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 200px', gap: 32, padding: '32px 0', borderTop: '1px solid #262626', alignItems: 'start' }}>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: '#F97316' }}>{step.num}</div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 22, letterSpacing: '-0.02em', margin: '0 0 12px' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: 15, lineHeight: 1.65, color: '#A1A1AA', margin: 0, maxWidth: 640 }}>{step.body}</p>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>
                    {step.duration}
                  </div>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: '1px solid #262626' }} />
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section style={{ padding: '120px 32px', background: '#0f0f0f', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Reveal style={{ marginBottom: 48, maxWidth: 760 }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {'{}'} Tech Stack
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: 0 }}>
              The tools we use.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {s.techStack.map((t, i) => (
              <Reveal key={t.cat} delayMs={i * 60}>
                <div style={{ display: 'flex', gap: 24, padding: '20px 0', borderBottom: '1px solid #1a1a1a' }}>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.15em', minWidth: 110, paddingTop: 2 }}>
                    {t.cat}
                  </div>
                  <div style={{ fontSize: 15, color: '#ffffff' }}>{t.tools}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section style={{ padding: '120px 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Reveal style={{ marginBottom: 64, maxWidth: 760 }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {'{}'} Why Choose Relicsol
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: 0 }}>
              Three things that<br />
              <span style={{ color: '#52525b' }}>set us apart.</span>
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {s.whyUs.map((w, i) => (
              <Reveal key={w.num} delayMs={i * 80}>
                <div style={{ background: '#0f0f0f', border: '1px solid #262626', borderRadius: 4, padding: 40, minHeight: 280, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: 'var(--font-jakarta), sans-serif', fontSize: 48, fontWeight: 600, color: '#F97316', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 32 }}>
                    {w.num}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 20, letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 14px' }}>
                      {w.title}
                    </h3>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: '#A1A1AA', margin: 0 }}>{w.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '120px 32px', background: '#0f0f0f', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {'{}'} FAQ
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: '0 0 24px' }}>
              Common questions.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#A1A1AA', margin: 0 }}>
              Have something else on your mind?{' '}
              <Link href="/contact" style={{ color: '#F97316', textDecoration: 'none' }}>
                Ask us directly →
              </Link>
            </p>
          </div>
          <ServiceFAQClient faqs={s.faqs} />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '140px 32px', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            width: 900,
            height: 600,
            background: 'radial-gradient(ellipse, rgba(249,115,22,0.18), transparent 60%)',
            pointerEvents: 'none'
          }}
          aria-hidden
        />
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 0.95, letterSpacing: '-0.045em', margin: '0 0 24px' }}>
            Ready to work<br />
            <span style={{ color: '#52525b' }}>with us?</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: '#A1A1AA', margin: '0 0 40px' }}>
            Tell us about your project. We respond within 1 hour.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <MagneticButton
              href="/contact"
              className="rl-btn-primary"
              style={{ background: '#F97316', color: '#fff', textDecoration: 'none', padding: '18px 32px', borderRadius: 999, fontSize: 14, fontWeight: 500 }}
            >
              Start Your Project →
            </MagneticButton>
            <Link href="/contact" style={{ background: 'transparent', color: '#ffffff', textDecoration: 'none', padding: '18px 32px', borderRadius: 999, fontSize: 14, fontWeight: 500, border: '1px solid #262626' }}>
              Book a Free Call
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
