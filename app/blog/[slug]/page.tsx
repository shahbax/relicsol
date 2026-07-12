import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { MagneticButton } from '@/components/MagneticButton';
import { blogPosts, blogPostBySlug } from '@/lib/blogPosts';
import { siteConfig } from '@/lib/siteConfig';
import type { BlogSection } from '@/lib/blogPosts';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const p = blogPostBySlug[params.slug];
  if (!p) return { title: 'Article not found' };
  return {
    title: p.title.length > 60 ? p.title.slice(0, 57) + '…' : p.title,
    description: p.excerpt,
    keywords: [p.category, 'Relicsol', 'web design', 'AI automation'],
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      type: 'article',
      title: p.title,
      description: p.excerpt,
      url: `/blog/${p.slug}`,
      publishedTime: p.isoDate,
      authors: [p.author],
      images: [{ url: p.image, width: 1600, height: 900, alt: p.title }]
    }
  };
}

function BodyRenderer({ sections }: { sections: BlogSection[] }) {
  return (
    <>
      {sections.map((s, i) => {
        switch (s.type) {
          case 'p':
          case 'strong-p':
            return (
              <p key={i} style={{ fontSize: 17, lineHeight: 1.8, color: '#A1A1AA', margin: '0 0 24px' }}>
                {s.text}
              </p>
            );
          case 'h2':
            return (
              <h2
                key={i}
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontWeight: 700,
                  color: '#ffffff',
                  fontSize: 28,
                  lineHeight: 1.2,
                  letterSpacing: '-0.025em',
                  margin: '56px 0 24px'
                }}
              >
                {s.text}
              </h2>
            );
          case 'h3':
            return (
              <h3
                key={i}
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontWeight: 700,
                  color: '#ffffff',
                  fontSize: 22,
                  lineHeight: 1.3,
                  letterSpacing: '-0.015em',
                  margin: '40px 0 16px'
                }}
              >
                {s.text}
              </h3>
            );
          case 'ul':
            return (
              <ul key={i} style={{ margin: '0 0 24px', paddingLeft: 24 }}>
                {s.items.map((it, j) => (
                  <li key={j} style={{ fontSize: 17, lineHeight: 1.8, color: '#A1A1AA', marginBottom: 8 }}>
                    {it}
                  </li>
                ))}
              </ul>
            );
          case 'callout':
            return (
              <aside
                key={i}
                style={{
                  background: '#111111',
                  borderLeft: '3px solid #F97316',
                  borderRadius: 4,
                  padding: '32px 36px',
                  margin: '48px 0'
                }}
              >
                <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 18, marginBottom: 20 }}>
                  {s.title}
                </div>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {s.items.map((it, j) => (
                    <li key={j} style={{ fontSize: 15, lineHeight: 1.7, color: '#A1A1AA', marginBottom: 10 }}>
                      {it}
                    </li>
                  ))}
                </ul>
              </aside>
            );
          case 'beforeAfter':
            return (
              <div key={i} style={{ margin: '0 0 24px' }}>
                <p style={{ fontSize: 17, lineHeight: 1.8, color: '#A1A1AA', margin: '0 0 8px' }}>
                  <strong style={{ color: '#ffffff' }}>Before:</strong> {s.before}
                </p>
                <p style={{ fontSize: 17, lineHeight: 1.8, color: '#A1A1AA', margin: '0 0 8px' }}>
                  <strong style={{ color: '#ffffff' }}>After:</strong> {s.after}
                </p>
                <p style={{ fontSize: 17, lineHeight: 1.8, color: '#F97316', margin: 0 }}>
                  <strong>Time saved: {s.savings}</strong>
                </p>
              </div>
            );
          case 'code':
            return (
              <pre
                key={i}
                style={{
                  background: '#0f0f0f',
                  border: '1px solid #262626',
                  borderRadius: 4,
                  padding: 20,
                  margin: '0 0 24px',
                  overflow: 'auto',
                  fontSize: 13,
                  color: '#e5e5e5'
                }}
              >
                <code>{s.code}</code>
              </pre>
            );
          default:
            return null;
        }
      })}
    </>
  );
}

export default function BlogPostPage({ params }: { params: Params }) {
  const p = blogPostBySlug[params.slug];
  if (!p) notFound();

  const posting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.excerpt,
    datePublished: p.isoDate,
    dateModified: p.isoDate,
    image: `${siteConfig.siteUrl}${p.image}`,
    author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.siteUrl },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.siteUrl}/images/logo.png` }
    },
    mainEntityOfPage: `${siteConfig.siteUrl}/blog/${p.slug}`,
    articleSection: p.category
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: p.title, item: `${siteConfig.siteUrl}/blog/${p.slug}` }
    ]
  };

  return (
    <main>
      <JsonLd data={posting} id={`ld-post-${p.slug}`} />
      <JsonLd data={breadcrumb} id={`ld-bc-${p.slug}`} />

      {/* Hero */}
      <section style={{ padding: '160px 32px 48px', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: -200,
            top: 60,
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(249,115,22,0.1), transparent 65%)',
            pointerEvents: 'none'
          }}
          aria-hidden
        />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <Link
            href="/blog"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#71717a', textDecoration: 'none', fontSize: 13, marginBottom: 32 }}
          >
            <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
            Back to Blog
          </Link>
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 11,
              color: '#F97316',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: 20
            }}
          >
            {p.category}
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontWeight: 800,
              color: '#ffffff',
              fontSize: 'clamp(36px,5vw,56px)',
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              margin: '0 0 28px'
            }}
          >
            {p.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14, color: '#A1A1AA' }}>{p.author}</span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#52525b' }} aria-hidden />
            <time dateTime={p.isoDate} style={{ fontSize: 14, color: '#71717a' }}>
              {p.date}
            </time>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#52525b' }} aria-hidden />
            <span style={{ fontSize: 14, color: '#71717a' }}>{p.readMinutes} min read</span>
          </div>
        </div>
      </section>

      {/* Featured image */}
      <section style={{ padding: '0 32px 56px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: 4, overflow: 'hidden', background: '#111' }}>
            <Image src={p.image} alt={p.title} fill sizes="(max-width: 960px) 100vw, 960px" priority style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Body */}
      <article style={{ padding: '0 32px 80px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <BodyRenderer sections={p.body} />

          {/* Author box */}
          <div
            style={{
              display: 'flex',
              gap: 20,
              alignItems: 'flex-start',
              padding: 32,
              background: '#0f0f0f',
              border: '1px solid #262626',
              borderRadius: 4,
              marginTop: 48
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 4,
                background: 'linear-gradient(135deg,#F97316,#c2410c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono), monospace',
                fontWeight: 700,
                color: '#fff',
                fontSize: 22,
                flexShrink: 0
              }}
              aria-hidden
            >
              R
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 16, marginBottom: 8 }}>
                Written by the {p.author}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: '#A1A1AA', margin: '0 0 12px' }}>{p.authorBio}</p>
              <Link href="/about" style={{ color: '#F97316', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                Learn more about us →
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {p.related.length > 0 ? (
        <section style={{ padding: '0 32px 80px' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 32 }}>
              Related Articles
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {p.related.map((r) => {
                const rp = blogPostBySlug[r.slug];
                return (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    style={{ display: 'block', textDecoration: 'none', background: '#0f0f0f', border: '1px solid #262626', borderRadius: 4, overflow: 'hidden' }}
                  >
                    <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', background: '#111' }}>
                      {rp ? (
                        <Image src={rp.image} alt={r.title} fill sizes="320px" style={{ objectFit: 'cover', opacity: 0.7 }} />
                      ) : null}
                    </div>
                    <div style={{ padding: 20 }}>
                      <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 10, color: '#71717a', marginBottom: 8 }}>
                        {r.date} · {r.readMinutes} min read
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 15, lineHeight: 1.3, margin: 0 }}>
                        {r.title}
                      </h4>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section style={{ padding: '100px 32px', background: '#0f0f0f', borderTop: '1px solid #1a1a1a', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 20 }}>
            Let's Work Together
          </div>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1.05, letterSpacing: '-0.035em', margin: '0 0 16px' }}>
            Ready to apply these strategies?
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: '#A1A1AA', margin: '0 0 36px' }}>
            Talk to the Relicsol team about your project.
          </p>
          <MagneticButton
            href="/contact"
            className="rl-btn-primary"
            style={{ display: 'inline-block', background: '#F97316', color: '#fff', textDecoration: 'none', padding: '14px 32px', borderRadius: 999, fontSize: 15, fontWeight: 600 }}
          >
            Start Your Project →
          </MagneticButton>
        </div>
      </section>
    </main>
  );
}
