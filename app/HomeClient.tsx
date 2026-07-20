'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { CountUp } from '@/components/CountUp';
import { MagneticButton } from '@/components/MagneticButton';
import { QuoteSection } from '@/components/QuoteSection';
import { siteConfig, yearsInBusiness } from '@/lib/siteConfig';
import {
  homeStats,
  homeServices,
  differentiators,
  homeProcessSteps,
  testimonials,
  videoTestimonials,
  pricingPlans,
  marqueeLogos
} from '@/lib/homeData';
import { caseStudies } from '@/lib/caseStudies';
import { blogPosts } from '@/lib/blogPosts';

const Hero3D = dynamic(() => import('@/components/Hero3D').then((m) => m.Hero3D), {
  ssr: false,
  loading: () => null
});

const heroWords = [
  { text: 'We Build', delay: 400 },
  { text: 'Digital Systems', delay: 550 },
  { text: 'That', delay: 700, accentSpan: 'Convert.', accentDelay: 750 }
];

const wordStyle: React.CSSProperties = {
  fontFamily: 'var(--font-syne), sans-serif',
  fontWeight: 700,
  color: '#ffffff',
  fontSize: 'clamp(48px, 8vw, 112px)',
  lineHeight: 0.95,
  letterSpacing: '-0.045em',
  overflow: 'hidden'
};

function HeroSection() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const timers: number[] = [];
    const set = (k: string, d: number) => {
      timers.push(window.setTimeout(() => setRevealed((r) => ({ ...r, [k]: true })), d));
    };
    set('label', 300);
    heroWords.forEach((w, i) => set(`w${i}`, w.delay));
    set('desc', 900);
    set('cta', 1100);
    set('proof', 1250);
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);
  const isIn = (k: string) => (revealed[k] ? 'in' : '');

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#080808'
      }}
    >
      <Hero3D />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, #080808 0%, rgba(8,8,8,0.92) 25%, rgba(8,8,8,0.4) 50%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
        aria-hidden
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          height: 140,
          background: 'linear-gradient(180deg, transparent, #080808)',
          pointerEvents: 'none',
          zIndex: 1
        }}
        aria-hidden
      />
      <div
        style={{
          position: 'absolute',
          left: '-10%',
          top: '30%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(249,115,22,0.18), transparent 60%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
        aria-hidden
      />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1400, margin: '0 auto', padding: '140px 32px 80px', width: '100%' }}>
        <div style={{ maxWidth: 680 }}>
          <div
            data-reveal={isIn('label')}
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 11,
              letterSpacing: '0.25em',
              color: '#71717a',
              textTransform: 'uppercase',
              marginBottom: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 16
            }}
          >
            <span style={{ width: 32, height: 1, background: '#F97316', display: 'inline-block' }} />
            {siteConfig.trustBar}
          </div>
          <h1 style={{ margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {heroWords.map((w, i) => (
              <span key={i} data-reveal={isIn(`w${i}`)} style={wordStyle}>
                {w.accentSpan ? (
                  <>
                    <span>{w.text} </span>
                    <span
                      style={{
                        background: 'linear-gradient(120deg,#F97316,#FFAD5C)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {w.accentSpan}
                    </span>
                  </>
                ) : (
                  <>{w.text} </>
                )}
              </span>
            ))}
          </h1>
          <p
            data-reveal={isIn('desc')}
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: '#A1A1AA',
              maxWidth: 520,
              margin: '0 0 40px',
              fontWeight: 400
            }}
          >
            Web design, custom software and AI automation for businesses in the USA, UK and Europe. 200+ projects since 2018, every one on a fixed quote.
          </p>
          <div data-reveal={isIn('cta')} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
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
              Start Your Project
              <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
              </svg>
            </MagneticButton>
            <Link
              href="/portfolio"
              className="rl-btn-secondary"
              style={{
                background: 'transparent',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '16px 28px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 500,
                border: '1px solid #262626'
              }}
            >
              View Our Work
            </Link>
          </div>

          <div data-reveal={isIn('proof')} style={{ marginTop: 80, display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', gap: 2 }} aria-label="4.9 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 256 256" fill="#F97316" aria-hidden>
                    <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Z" />
                  </svg>
                ))}
              </div>
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: '#A1A1AA' }}>
                4.9 / 5 · 200+ projects
              </span>
            </div>
            <div style={{ width: 1, height: 16, background: '#262626' }} />
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: '#71717a' }}>
              <span style={{ color: '#F97316' }}>●</span>  Accepting projects · Q3 2026
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10
        }}
        aria-hidden
      >
        <div
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 10,
            letterSpacing: '0.3em',
            color: '#52525b',
            textTransform: 'uppercase'
          }}
        >
          Scroll
        </div>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(180deg, #F97316, transparent)', animation: 'rl-pulse 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}

function MarqueeSection() {
  const items = [...marqueeLogos, ...marqueeLogos];
  return (
    <section
      style={{
        background: '#0f0f0f',
        borderTop: '1px solid #262626',
        borderBottom: '1px solid #262626',
        padding: '32px 0',
        overflow: 'hidden',
        position: 'relative'
      }}
      aria-label="Technology stack"
    >
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(90deg,#0f0f0f, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(270deg,#0f0f0f, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div className="rl-marquee-row" style={{ display: 'flex', gap: 64, width: 'max-content', alignItems: 'center' }}>
        {items.map((logo, i) => (
          <div key={i} aria-hidden={i >= marqueeLogos.length || undefined} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.55, color: '#ffffff', transition: 'opacity .3s ease' }}>
            {logo.svg ? <span dangerouslySetInnerHTML={{ __html: logo.svg }} /> : null}
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: '#a1a1aa', letterSpacing: '0.05em' }}>
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutStatsSection() {
  return (
    <section id="about" style={{ padding: '140px 32px', background: '#080808' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'start' }}>
        <Reveal>
          {homeStats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: '28px 0',
                borderBottom: '1px solid #1a1a1a',
                display: 'flex',
                alignItems: 'baseline',
                gap: 32
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-jakarta), sans-serif',
                  fontSize: 'clamp(44px, 11vw, 72px)',
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '-0.045em',
                  lineHeight: 1,
                  minWidth: 'min(180px, 42vw)'
                }}
              >
                {stat.target !== undefined ? (
                  <CountUp target={stat.target} suffix={stat.suffix || ''} decimals={stat.target < 10 && stat.target !== Math.floor(stat.target) ? 1 : 0} />
                ) : (
                  stat.value
                )}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 11,
                  color: '#52525b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  paddingBottom: 8
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal delayMs={80} style={{ paddingTop: 24 }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
            {'{}'} About Us
          </div>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.02, letterSpacing: '-0.035em', margin: '0 0 32px 0' }}>
            You talk to the people<br />
            <span style={{ color: '#52525b' }}>who actually build.</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#A1A1AA', margin: '0 0 20px' }}>
            Relicsol is a small senior team, not an agency with account managers between you and the work. Since 2018 we have shipped 200+ projects for founders and marketing leads across the USA, UK and Europe: marketing sites, e-commerce stores, custom software and AI automation that carries real revenue.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#A1A1AA', margin: '0 0 36px' }}>
            Every project starts with understanding your business goals, your audience and the outcomes you need. Then we build digital systems that convert visitors into enquiries, and enquiries into revenue.
          </p>
          <Link
            href="/about"
            style={{
              color: '#F97316',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              borderBottom: '1px solid #c2410c',
              paddingBottom: 6
            }}
          >
            Learn More About Us
            <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" style={{ padding: '140px 32px', background: '#0f0f0f' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Reveal style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 80, alignItems: 'end' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {'{}'} Services
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: 0 }}>
              Digital Services<br />
              <span style={{ color: '#52525b' }}>Designed for Growth.</span>
            </h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#A1A1AA', margin: 0, paddingBottom: 12 }}>
            Four services, one goal: a website and systems that pay for themselves. Take one or combine them, every engagement is scoped and priced in writing before we start.
          </p>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {homeServices.map((s, i) => (
            <Reveal key={s.slug} delayMs={i * 90}>
              <Link
                href={`/services/${s.slug}`}
                className="rl-svc-card"
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  background: '#161616',
                  border: '1px solid #262626',
                  borderRadius: 4,
                  padding: 40,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 4,
                      background: '#080808',
                      border: '1px solid #262626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#F97316'
                    }}
                    dangerouslySetInnerHTML={{ __html: s.icon }}
                    aria-hidden
                  />
                  <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: '#52525b' }}>{s.num}</div>
                </div>
                <h3 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 28, lineHeight: 1.15, letterSpacing: '-0.025em', margin: '0 0 16px' }}>
                  {s.title}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 10,
                        color: '#71717a',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        padding: '5px 10px',
                        border: '1px solid #262626',
                        borderRadius: 999
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: '#A1A1AA', margin: '0 0 28px' }}>{s.body}</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#F97316', fontSize: 13, fontWeight: 500 }}>
                  Explore Service
                  <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
                    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
                  </svg>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioMarqueeSection() {
  const row1 = caseStudies.slice(0, 9);
  const row2 = caseStudies.slice(9, 18);
  const renderCards = (rows: typeof row1, prefix: string) => {
    const doubled = [...rows, ...rows];
    // Second half exists only for the seamless marquee loop — hide the
    // duplicate copy from crawlers and keyboard/screen-reader users.
    return doubled.map((p, i) => (
      <Link
        key={`${prefix}-${i}`}
        href={`/portfolio/${p.slug}`}
        className="rl-port-card"
        style={{ background: p.bgGradient }}
        aria-hidden={i >= rows.length || undefined}
        tabIndex={i >= rows.length ? -1 : undefined}
      >
        <Image
          src={p.image}
          alt={`${p.name} — ${p.overview.industry}`}
          fill
          sizes="380px"
          className="rl-port-img"
          style={{ objectFit: 'cover', opacity: 0.7 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,8,8,0.05) 30%, rgba(8,8,8,0.55) 100%)' }} aria-hidden />
        <div className="rl-port-num">{p.displayId}</div>
        <div className="rl-port-overlay">
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 10,
              color: '#F97316',
              letterSpacing: '0.15em',
              marginBottom: 8,
              textTransform: 'uppercase'
            }}
          >
            {p.overview.industry}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontWeight: 700,
              color: '#ffffff',
              fontSize: 22,
              letterSpacing: '-0.02em',
              lineHeight: 1.15
            }}
          >
            {p.name}
          </div>
          <div style={{ color: '#A1A1AA', fontSize: 13, marginTop: 4 }}>{p.overview.services}</div>
          <div className="rl-port-desc">
            <p style={{ color: '#A1A1AA', fontSize: 13, lineHeight: 1.55, margin: 0 }}>
              {p.heroDescription}
            </p>
          </div>
          <div className="rl-port-cta">VIEW CASE STUDY →</div>
        </div>
      </Link>
    ));
  };

  return (
    <section id="portfolio" style={{ padding: '140px 32px', background: '#080808' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', marginBottom: 64 }}>
        <Reveal style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {'{}'} Portfolio
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: 0 }}>
              Projects That<br />
              <span style={{ color: '#52525b' }}>Deliver Results.</span>
              <span style={{ color: '#F97316' }}>*</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 12 }}>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#A1A1AA', margin: 0 }}>
              <span style={{ color: '#F97316', fontFamily: 'var(--font-mono), monospace', fontSize: 13 }}>*</span>
              {' '}18 case studies across e-commerce, SaaS, software, health tech and premium consumer brands. USA · UK · Europe.
            </p>
            <Link
              href="/portfolio"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10
              }}
            >
              View All Projects
              <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
      <div className="rl-port-rail" style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 160, background: 'linear-gradient(90deg,#080808, transparent)', zIndex: 3, pointerEvents: 'none' }} aria-hidden />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 160, background: 'linear-gradient(270deg,#080808, transparent)', zIndex: 3, pointerEvents: 'none' }} aria-hidden />
        <div className="rl-port-row" style={{ display: 'flex', gap: 20, width: 'max-content', animationName: 'rl-marquee', animationDuration: '60s' }}>
          {renderCards(row1, 'row1')}
        </div>
        <div className="rl-port-row" style={{ display: 'flex', gap: 20, width: 'max-content', animationName: 'rl-marquee-r', animationDuration: '70s' }}>
          {renderCards(row2, 'row2')}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section style={{ padding: '140px 32px', background: '#0f0f0f' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 96, alignItems: 'start' }}>
        <Reveal>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
            {'{}'} Why Choose Us
          </div>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.02, letterSpacing: '-0.035em', margin: '0 0 32px 0' }}>
            Three promises, <span style={{ color: '#52525b' }}>in writing.</span>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#A1A1AA' }}>
            These are working terms on every Relicsol proposal, not slogans. They are also the reason most of our work comes from repeat clients and referrals.
          </p>
        </Reveal>
        <div>
          {differentiators.map((d, i) => (
            <Reveal key={d.num} delayMs={i * 90}>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 56px', gap: 24, alignItems: 'start', padding: '36px 0', borderTop: '1px solid #262626' }}>
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: '#F97316', letterSpacing: '0.1em' }}>{d.num}</div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 24, lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 12px' }}>
                    {d.title}
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: '#A1A1AA', margin: 0 }}>{d.body}</p>
                </div>
                <div style={{ color: '#F97316', display: 'flex', justifyContent: 'flex-end', paddingTop: 4 }} aria-hidden>
                  <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
                  </svg>
                </div>
              </div>
            </Reveal>
          ))}
          <div style={{ borderTop: '1px solid #262626' }} />
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section style={{ padding: '140px 32px', background: '#080808' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Reveal style={{ marginBottom: 80, maxWidth: 720 }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
            {'{}'} Process
          </div>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: 0 }}>
            How We Work.
          </h2>
        </Reveal>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 48, left: 48, right: 48, height: 1, background: '#262626' }} aria-hidden />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, position: 'relative' }}>
            {homeProcessSteps.map((p, i) => (
              <Reveal key={p.num} delayMs={i * 100}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
                    <div
                      style={{
                        width: 96,
                        height: 96,
                        borderRadius: '50%',
                        background: '#080808',
                        border: '1px solid #F97316',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#F97316',
                        boxShadow: '0 0 40px rgba(249,115,22,0.25)'
                      }}
                      aria-hidden
                    >
                      <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
                        <path d={p.iconPath} />
                      </svg>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 48, color: '#262626', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1 }}>
                      {p.num}
                    </div>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 26, lineHeight: 1.15, letterSpacing: '-0.025em', margin: '0 0 16px' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: '#A1A1AA', margin: 0 }}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoTestimonialCard({ video }: { video: (typeof videoTestimonials)[number] }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  // idle → nothing; preview → muted hover preview; sound → full playback with audio
  const [mode, setMode] = useState<'idle' | 'preview' | 'sound'>('idle');
  const playing = mode !== 'idle';

  const startPreview = () => {
    const el = ref.current;
    if (!el || mode === 'sound') return;
    el.muted = true;
    el.play().then(() => setMode('preview')).catch(() => setMode('idle'));
  };
  const stopPreview = () => {
    const el = ref.current;
    if (!el || mode === 'sound') return; // sound playback survives mouse leave
    el.pause();
    el.currentTime = 0;
    setMode('idle');
  };
  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (mode === 'sound') {
      el.pause();
      el.currentTime = 0;
      el.muted = true;
      setMode('idle');
    } else {
      // Click is a user gesture — unmuted playback is allowed
      el.muted = false;
      el.currentTime = 0;
      el.play().then(() => setMode('sound')).catch(() => setMode('idle'));
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '16 / 10',
        borderRadius: 4,
        overflow: 'hidden',
        background: '#080808',
        border: '1px solid #262626',
        cursor: 'pointer'
      }}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${mode === 'sound' ? 'Stop' : 'Play with sound'}: ${video.title}`}
    >
      <video
        ref={ref}
        src={video.src}
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: playing ? 1 : 0.55,
          transition: 'opacity .3s ease'
        }}
      />
      {/* Dark gradient — softer when playing */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: playing
            ? 'linear-gradient(180deg, transparent 55%, rgba(10,10,10,0.85) 100%)'
            : 'linear-gradient(180deg, transparent 30%, rgba(10,10,10,0.9) 100%)',
          transition: 'background .3s ease',
          pointerEvents: 'none'
        }}
        aria-hidden
      />
      {/* Play / Pause overlay */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${playing ? 0.85 : 1})`,
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'rgba(249,115,22,0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(8px)',
          opacity: playing ? 0 : 1,
          transition: 'opacity .35s ease, transform .35s ease',
          pointerEvents: 'none'
        }}
        aria-hidden
      >
        <svg width="22" height="22" viewBox="0 0 256 256" fill="#fff">
          <path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27Z" />
        </svg>
      </div>
      {/* Sound state chip */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(8,8,8,0.75)',
          border: `1px solid ${mode === 'sound' ? '#F97316' : '#262626'}`,
          borderRadius: 999,
          padding: '6px 12px',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 10,
          letterSpacing: '0.1em',
          color: mode === 'sound' ? '#F97316' : '#A1A1AA',
          backdropFilter: 'blur(8px)',
          opacity: mode === 'idle' ? 0 : 1,
          transition: 'opacity .3s ease',
          pointerEvents: 'none',
          textTransform: 'uppercase'
        }}
        aria-hidden
      >
        {mode === 'sound' ? (
          <>
            <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor">
              <path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55Zm54-106.08a40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,0,1,12-10.58ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z" />
            </svg>
            Sound on · click to stop
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor">
              <path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55Zm70.14-40.2a8,8,0,0,1-11.31,0L184,148.66l-18.83,18.78a8,8,0,0,1-11.3-11.32L172.66,137.4l-18.79-18.83a8,8,0,0,1,11.32-11.3L184,126.09l18.83-18.82a8,8,0,1,1,11.3,11.32L195.34,137.4l18.8,18.84A8,8,0,0,1,214.14,167.44Z" />
            </svg>
            Click for sound
          </>
        )}
      </div>
      {/* Caption */}
      <div style={{ position: 'absolute', left: 24, bottom: 24, right: 24, textAlign: 'left', pointerEvents: 'none' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 10,
            color: '#F97316',
            letterSpacing: '0.15em',
            marginBottom: 6
          }}
        >
          {video.tag}
        </div>
        <div style={{ color: '#ffffff', fontSize: 16, fontWeight: 500 }}>{video.title}</div>
      </div>
    </div>
  );
}

function Stars({ size = 16 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', gap: 3 }} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 256 256" fill="#F97316" aria-hidden>
          <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section style={{ padding: '140px 32px', background: '#0f0f0f' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
            {'{}'} Client Reviews
          </div>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: '0 0 32px 0' }}>
            Rated 4.9 out of 5<br />
            <span style={{ color: '#52525b' }}>by the people who pay us.</span>
          </h2>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, background: '#161616', border: '1px solid #262626', borderRadius: 999, padding: '12px 24px', marginBottom: 72 }}>
            <span style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 800, fontSize: 28, color: '#ffffff', lineHeight: 1 }}>4.9</span>
            <Stars size={18} />
            <span style={{ fontSize: 13, color: '#71717a' }}>average across 200+ delivered projects</span>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delayMs={i * 80}>
              <div
                style={{
                  background: '#0a0a0a',
                  border: '1px solid #262626',
                  borderRadius: 4,
                  padding: 32,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18,
                  textAlign: 'left'
                }}
              >
                <Stars />
                <blockquote style={{ margin: 0, flex: 1 }}>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: '#e4e4e7', margin: 0 }}>
                    “{t.quote}”
                  </p>
                </blockquote>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 18, borderTop: '1px solid #1a1a1a' }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg,#F97316,#c2410c)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-syne), sans-serif',
                      fontWeight: 700,
                      color: '#fff',
                      fontSize: 15,
                      flexShrink: 0
                    }}
                    aria-hidden
                  >
                    {t.initials}
                  </div>
                  <cite style={{ fontStyle: 'normal' }}>
                    <div style={{ color: '#ffffff', fontSize: 15, fontWeight: 600 }}>{t.name}</div>
                    <div style={{ color: '#71717a', fontSize: 13 }}>{t.role}</div>
                  </cite>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 72 }}>
          {videoTestimonials.map((v, i) => (
            <Reveal key={i} delayMs={i * 100}>
              <VideoTestimonialCard video={v} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section style={{ padding: '140px 32px', background: '#080808' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 80px' }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
            {'{}'} Pricing
          </div>
          <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: '0 0 24px' }}>
            Flexible Plans for<br />
            <span style={{ color: '#52525b' }}>Every Growth Stage.</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#A1A1AA', margin: 0 }}>
            Choose a starting point based on your needs, then scale. All projects are scoped and quoted before any work begins.
          </p>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, alignItems: 'start' }}>
          {pricingPlans.map((p, i) => (
            <Reveal key={p.title} delayMs={i * 100}>
              <div
                className="rl-price-card"
                style={{
                  background: p.featured ? '#1a0d05' : '#0f0f0f',
                  border: `1px solid ${p.featured ? '#F97316' : '#262626'}`,
                  borderRadius: 4,
                  padding: '40px 32px',
                  position: 'relative',
                  boxShadow: p.featured
                    ? '0 40px 100px -30px rgba(249,115,22,0.4), inset 0 1px 0 rgba(255,173,92,0.15)'
                    : 'none'
                }}
              >
                {p.featured ? (
                  <div
                    style={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#F97316',
                      color: '#fff',
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 10,
                      padding: '6px 12px',
                      borderRadius: 999,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase'
                    }}
                  >
                    Most Popular
                  </div>
                ) : null}
                <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 12 }}>
                  {p.label}
                </div>
                <h3 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 24, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                  {p.title}
                </h3>
                <div style={{ fontSize: 13, color: '#71717a', marginBottom: 28 }}>{p.best}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingBottom: 28, borderBottom: '1px solid #262626', marginBottom: 28 }}>
                  <div style={{ fontFamily: 'var(--font-jakarta), sans-serif', fontSize: 48, fontWeight: 600, color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1 }}>
                    {p.price}
                  </div>
                  <div style={{ fontSize: 13, color: '#71717a' }}>USD</div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', fontSize: 14, color: '#A1A1AA' }}>
                      <svg width="14" height="14" viewBox="0 0 256 256" fill="#F97316" style={{ marginTop: 3, flexShrink: 0 }} aria-hidden>
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    background: p.featured ? '#F97316' : 'transparent',
                    color: p.featured ? '#fff' : '#ffffff',
                    textDecoration: 'none',
                    padding: '14px 24px',
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 500,
                    border: `1px solid ${p.featured ? '#F97316' : '#262626'}`
                  }}
                >
                  Get Started
                  <svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
                    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPreviewSection() {
  const previews = blogPosts.slice(0, 2);
  return (
    <section style={{ padding: '140px 32px', background: '#0f0f0f' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 64, gap: 32 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
              {'{}'} Blog
            </div>
            <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 0.98, letterSpacing: '-0.04em', margin: 0 }}>
              Insights on design,<br />
              <span style={{ color: '#52525b' }}>software and growth.</span>
            </h2>
          </div>
          <Link href="/blog" style={{ color: '#ffffff', textDecoration: 'none', fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 10, paddingBottom: 12 }}>
            All Articles
            <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
            </svg>
          </Link>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {previews.map((post, i) => (
            <Reveal key={post.slug} delayMs={i * 100}>
              <Link
                href={`/blog/${post.slug}`}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  background: '#161616',
                  border: '1px solid #262626',
                  borderRadius: 4,
                  overflow: 'hidden',
                  transition: 'border-color .3s ease, transform .3s ease'
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', background: '#111' }}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: 20, left: 20, background: 'rgba(10,10,10,0.85)', color: '#F97316', padding: '6px 12px', borderRadius: 999, fontFamily: 'var(--font-mono), monospace', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', backdropFilter: 'blur(8px)' }}>
                    {post.category}
                  </div>
                </div>
                <div style={{ padding: 32 }}>
                  <h3 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 22, lineHeight: 1.25, letterSpacing: '-0.02em', margin: '0 0 14px' }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: '#A1A1AA', margin: '0 0 20px' }}>{post.excerpt}</p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#F97316', fontSize: 13, fontWeight: 500 }}>
                    Read Article →
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeClient() {
  void yearsInBusiness;
  return (
    <main>
      <HeroSection />
      <MarqueeSection />
      <AboutStatsSection />
      <ServicesSection />
      <PortfolioMarqueeSection />
      <WhySection />
      <ProcessSection />
      <TestimonialsSection />
      <PricingSection />
      <QuoteSection />
      <BlogPreviewSection />
    </main>
  );
}
