'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Reveal } from '@/components/Reveal';
import { caseStudies } from '@/lib/caseStudies';
import { siteConfig } from '@/lib/siteConfig';

const filters = [
  { id: 'all', label: 'All Work' },
  { id: 'e-commerce', label: 'E-Commerce' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'saas', label: 'SaaS' },
  { id: 'software', label: 'Software' },
  { id: 'agtech', label: 'AgTech' },
  { id: 'wellness', label: 'Wellness' },
  { id: 'education', label: 'Education' }
] as const;

type FilterId = (typeof filters)[number]['id'];

export function PortfolioClient() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = (params.get('filter') as FilterId) || 'all';
  const [active, setActive] = useState<FilterId>(initial);

  useEffect(() => {
    const p = (params.get('filter') as FilterId) || 'all';
    setActive(p);
  }, [params]);

  const setFilter = useCallback(
    (id: FilterId) => {
      setActive(id);
      const url = new URL(window.location.href);
      if (id === 'all') url.searchParams.delete('filter');
      else url.searchParams.set('filter', id);
      router.replace(url.pathname + url.search, { scroll: false });
    },
    [router]
  );

  const visible = useMemo(
    () => (active === 'all' ? caseStudies : caseStudies.filter((c) => c.category === active)),
    [active]
  );

  return (
    <main>
      {/* Hero */}
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

      {/* Filters */}
      <section style={{ padding: '20px 32px 60px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap' }} role="tablist" aria-label="Filter case studies by category">
          {filters.map((f) => {
            const count = f.id === 'all' ? caseStudies.length : caseStudies.filter((c) => c.category === f.id).length;
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                role="tab"
                aria-selected={isActive}
                style={{
                  background: isActive ? '#F97316' : 'transparent',
                  color: isActive ? '#fff' : '#A1A1AA',
                  border: `1px solid ${isActive ? '#F97316' : '#262626'}`,
                  padding: '10px 18px',
                  borderRadius: 999,
                  fontSize: 13,
                  fontFamily: 'var(--font-mono), monospace',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {f.label}
                <span style={{ fontSize: 10, color: isActive ? '#fff' : '#52525b' }}>{String(count).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '0 32px 120px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {visible.map((p, idx) => (
              <Reveal key={p.slug} delayMs={(idx % 6) * 60}>
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
              </Reveal>
            ))}
          </div>
          {visible.length === 0 ? (
            <p style={{ color: '#71717a', textAlign: 'center', fontSize: 15, padding: '80px 0' }}>
              No case studies in this category yet.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
