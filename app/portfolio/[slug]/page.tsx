import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';
import { caseStudies, caseStudyBySlug } from '@/lib/caseStudies';
import { siteConfig } from '@/lib/siteConfig';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const c = caseStudyBySlug[params.slug];
  if (!c) return { title: 'Case study not found' };
  const title = `${c.name} — ${c.overview.industry} Case Study`;
  const description = c.heroDescription;
  return {
    title: title.length > 60 ? `${c.name} Case Study` : title,
    description,
    alternates: { canonical: `/portfolio/${c.slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/portfolio/${c.slug}`,
      images: [{ url: c.image, width: 1600, height: 900, alt: c.name }]
    }
  };
}

export default function CaseStudyPage({ params }: { params: Params }) {
  const c = caseStudyBySlug[params.slug];
  if (!c) notFound();

  const next = caseStudyBySlug[c.nextSlug];

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.name,
    description: c.heroDescription,
    image: `${siteConfig.siteUrl}${c.image}`,
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.siteUrl}/images/logo.png` }
    },
    datePublished: `${c.overview.year}-01-01`,
    dateModified: `${c.overview.year}-01-01`,
    mainEntityOfPage: `${siteConfig.siteUrl}/portfolio/${c.slug}`,
    about: c.overview.industry
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${siteConfig.siteUrl}/portfolio` },
      { '@type': 'ListItem', position: 3, name: c.name, item: `${siteConfig.siteUrl}/portfolio/${c.slug}` }
    ]
  };

  return (
    <main>
      <JsonLd data={articleLd} id={`ld-cs-${c.slug}`} />
      <JsonLd data={breadcrumbLd} id={`ld-bc-${c.slug}`} />

      {/* Breadcrumb */}
      <div style={{ padding: '120px 32px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#52525b', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link href="/portfolio" style={{ color: '#71717a', textDecoration: 'none' }}>
              PORTFOLIO
            </Link>
            <span style={{ color: '#3f3f46' }}>/</span>
            <span style={{ color: '#F97316' }}>
              {c.displayId} · {c.breadcrumbName}
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: '60px 32px 80px', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: -200,
            width: 700,
            height: 500,
            background: 'radial-gradient(circle, rgba(249,115,22,0.15), transparent 60%)',
            pointerEvents: 'none'
          }}
          aria-hidden
        />
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
          <Reveal>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
              {c.heroTags.map((tag, i) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 10,
                    color: i === 0 ? '#F97316' : '#A1A1AA',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    padding: '6px 12px',
                    border: `1px solid ${i === 0 ? 'rgba(249,115,22,0.4)' : '#262626'}`,
                    borderRadius: 999,
                    background: i === 0 ? 'rgba(249,115,22,0.08)' : 'transparent'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(40px,6vw,84px)', lineHeight: 0.98, letterSpacing: '-0.045em', margin: '0 0 32px', maxWidth: 1100 }}>
              {c.headline.endsWith(c.headlineAccent) ? (
                <>
                  {c.headline.slice(0, c.headline.length - c.headlineAccent.length)}
                  <span style={{ background: 'linear-gradient(120deg,#F97316,#FFAD5C)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {c.headlineAccent}
                  </span>
                </>
              ) : (
                c.headline
              )}
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: '#A1A1AA', maxWidth: 720, margin: 0 }}>{c.heroDescription}</p>
          </Reveal>
        </div>
      </section>

      {/* Hero image */}
      <section style={{ padding: '0 32px 80px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ aspectRatio: '16 / 9', borderRadius: 4, overflow: 'hidden', background: c.bgGradient, position: 'relative', border: '1px solid #262626' }}>
            <Image
              src={c.image}
              alt={`${c.name} — ${c.overview.industry}`}
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section style={{ padding: '60px 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, borderTop: '1px solid #262626', borderBottom: '1px solid #262626' }}>
            {[
              { label: 'Client', value: c.overview.client },
              { label: 'Industry', value: c.overview.industry },
              { label: 'Location', value: c.overview.location },
              { label: 'Year', value: c.overview.year },
              { label: 'Services', value: c.overview.services }
            ].map((row, i) => (
              <div key={row.label} style={{ padding: '32px 24px', borderRight: i < 4 ? '1px solid #262626' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>
                  {row.label}
                </div>
                <div style={{ color: '#ffffff', fontSize: 15, fontWeight: 500 }}>{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '80px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Challenge */}
          <Reveal style={{ marginBottom: 80 }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {c.challenge.label}
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.025em', margin: '0 0 24px' }}>
              {c.challenge.heading}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {c.challenge.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: 17, lineHeight: 1.75, color: '#A1A1AA', margin: 0 }}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Approach */}
          <Reveal style={{ marginBottom: 80 }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {c.approach.label}
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.025em', margin: '0 0 24px' }}>
              {c.approach.heading}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {c.approach.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: 17, lineHeight: 1.75, color: '#A1A1AA', margin: 0 }}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Quote */}
          <Reveal>
            <blockquote style={{ margin: '80px -32px', padding: '64px 32px', background: '#0f0f0f', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
              <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <svg width="36" height="28" viewBox="0 0 256 256" fill="#F97316" style={{ marginBottom: 24, opacity: 0.6 }} aria-hidden>
                  <path d="M116,72v88a48.05,48.05,0,0,1-48,48,8,8,0,0,1,0-16,32,32,0,0,0,32-32V128H64A24,24,0,0,1,40,104V72A24,24,0,0,1,64,48H92A24,24,0,0,1,116,72Zm100-24H188a24,24,0,0,0-24,24v32a24,24,0,0,0,24,24h24v16a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A24,24,0,0,0,216,48Z" />
                </svg>
                <p style={{ fontFamily: 'var(--font-jakarta), sans-serif', color: '#ffffff', fontSize: 28, lineHeight: 1.4, letterSpacing: '-0.02em', fontWeight: 400, margin: '0 0 24px' }}>
                  “{c.quote.text}”
                </p>
                <cite style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: '#71717a', letterSpacing: '0.1em', fontStyle: 'normal' }}>
                  {c.quote.attribution}
                </cite>
              </div>
            </blockquote>
          </Reveal>

          {/* Result */}
          <Reveal style={{ marginBottom: 80 }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {c.result.label}
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 32, lineHeight: 1.15, letterSpacing: '-0.025em', margin: '0 0 40px' }}>
              {c.result.heading}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {c.result.stats.map((stat, i) => (
                <div key={i} style={{ background: '#0f0f0f', border: '1px solid #262626', borderRadius: 4, padding: 32 }}>
                  <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 48, fontWeight: 700, color: '#F97316', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 12 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 13, color: '#A1A1AA', lineHeight: 1.5 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Tech */}
          <Reveal>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              04 / Tech Used
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {c.techTags.map((t) => (
                <div key={t} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: '#ffffff', padding: '8px 14px', border: '1px solid #262626', borderRadius: 999, background: '#0f0f0f' }}>
                  {t}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next project */}
      {next ? (
        <section style={{ padding: '80px 32px 0' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <Link
              href={`/portfolio/${next.slug}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                background: '#0f0f0f',
                border: '1px solid #262626',
                borderRadius: 4,
                padding: 48,
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color .3s ease, transform .3s ease'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 16 }}>
                    Next Case Study →
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 36, lineHeight: 1.1, letterSpacing: '-0.025em', margin: '0 0 8px' }}>
                    {next.name}
                  </h3>
                  <p style={{ fontSize: 15, color: '#A1A1AA', margin: 0 }}>{next.overview.industry}</p>
                </div>
                <div style={{ width: 200, aspectRatio: '1 / 1', borderRadius: 4, overflow: 'hidden', background: next.bgGradient, position: 'relative' }}>
                  <Image src={next.image} alt={next.name} fill sizes="200px" style={{ objectFit: 'cover', opacity: 0.85 }} />
                </div>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section style={{ padding: '140px 32px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(40px,6vw,72px)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: '0 0 24px' }}>
            Start a similar project.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: '#A1A1AA', margin: '0 0 40px' }}>
            Tell us what you are building. We respond within 1 hour.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <MagneticButton
              href="/contact"
              className="rl-btn-primary"
              style={{ background: '#F97316', color: '#fff', textDecoration: 'none', padding: '16px 28px', borderRadius: 999, fontSize: 14, fontWeight: 600 }}
            >
              Start Your Project →
            </MagneticButton>
            <Link href="/portfolio" style={{ background: 'transparent', color: '#ffffff', textDecoration: 'none', padding: '16px 28px', borderRadius: 999, fontSize: 14, fontWeight: 500, border: '1px solid #262626' }}>
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
