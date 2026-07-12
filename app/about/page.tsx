import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { CountUp } from '@/components/CountUp';
import { MagneticButton } from '@/components/MagneticButton';
import { siteConfig, yearsInBusiness } from '@/lib/siteConfig';
import { aboutStats, aboutValues, techIcons } from '@/lib/aboutData';

const yrs = yearsInBusiness();

export const metadata: Metadata = {
  title: `About Relicsol — ${yrs}+ years, 200+ projects across USA, UK & Europe`,
  description: `Founded in ${siteConfig.founded}, Relicsol is a web design, software and AI automation agency serving businesses in the USA, UK and Europe. 200+ projects, 4.9★ rating.`,
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'article',
    title: 'About Relicsol',
    description: `Founded in ${siteConfig.founded}. Web design, custom software and AI automation for the USA, UK and Europe.`,
    url: '/about',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }]
  }
};

const aboutLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Relicsol',
  url: `${siteConfig.siteUrl}/about`,
  description: `Founded in ${siteConfig.founded}. ${yrs}+ years of digital work.`,
  about: {
    '@type': 'Organization',
    name: siteConfig.name,
    foundingDate: `${siteConfig.founded}-01-01`,
    url: siteConfig.siteUrl
  }
};

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={aboutLd} id="ld-about" />

      {/* Hero */}
      <section style={{ padding: '160px 32px 100px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
            {'{}'} About Relicsol
          </div>
          <h1 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(48px, 8vw, 112px)', lineHeight: 0.95, letterSpacing: '-0.045em', margin: '0 0 40px', maxWidth: 1100 }}>
            A quiet agency for<br />
            <span style={{ color: '#52525b' }}>ambitious businesses.</span>
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <p style={{ fontSize: 19, lineHeight: 1.65, color: '#A1A1AA', margin: 0 }}>
              Relicsol is a web design and software development agency working with founders, marketers and operators across the USA, UK and Europe. We combine strategy, design, engineering and automation to ship digital systems that measurably move business outcomes, not just look good in a portfolio.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#A1A1AA', margin: 0 }}>
              Since {siteConfig.founded} we have delivered 200+ projects — from bespoke Next.js platforms and custom WordPress builds to AI automation workflows and long-term SEO programmes. Every engagement is scoped, quoted and delivered on the terms we agree upfront.
            </p>
          </div>
        </div>
      </section>

      {/* Stats grid */}
      <section style={{ padding: '80px 32px', background: '#0f0f0f', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {aboutStats.map((s, i) => (
              <Reveal key={i} delayMs={i * 60}>
                <div style={{ background: '#080808', border: '1px solid #262626', borderRadius: 4, padding: 40 }}>
                  <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 56, fontWeight: 700, color: '#F97316', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 16 }}>
                    {/^\d+\+?$/.test(s.value) ? (
                      <>
                        <CountUp target={parseInt(s.value, 10)} />
                        {s.value.endsWith('+') ? '+' : ''}
                      </>
                    ) : (
                      s.value
                    )}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '120px 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Reveal style={{ marginBottom: 64, maxWidth: 760 }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {'{}'} Our Values
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: 0 }}>
              How we work.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {aboutValues.map((v, i) => (
              <Reveal key={v.num} delayMs={i * 80}>
                <div style={{ background: '#0f0f0f', border: '1px solid #262626', borderRadius: 4, padding: 40, minHeight: 260 }}>
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: '#F97316', letterSpacing: '0.15em', marginBottom: 32 }}>
                    {v.num}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 14px' }}>
                    {v.title}
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: '#A1A1AA', margin: 0 }}>{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section style={{ padding: '120px 32px', background: '#0f0f0f', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <Reveal style={{ marginBottom: 48, maxWidth: 760 }}>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {'{}'} Tech We Use
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: 0 }}>
              A pragmatic stack.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: '#262626', border: '1px solid #262626', borderRadius: 4, overflow: 'hidden' }}>
            {techIcons.map((t) => (
              <div
                key={t.name}
                style={{
                  background: '#080808',
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 14,
                  minHeight: 140
                }}
              >
                {t.svg ? (
                  <span dangerouslySetInnerHTML={{ __html: t.svg }} aria-hidden />
                ) : (
                  <div style={{ height: 28, width: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono), monospace', fontSize: 14, color: '#fff', fontWeight: 600 }} aria-hidden>
                    {t.name.charAt(0)}
                  </div>
                )}
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#71717a', letterSpacing: '0.05em' }}>
                  {t.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '140px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: '0 0 24px' }}>
            Let's build something<br />
            <span style={{ color: '#52525b' }}>that lasts.</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: '#A1A1AA', margin: '0 0 40px' }}>
            We respond within one hour during working hours in the USA, UK and Europe.
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
              View Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
