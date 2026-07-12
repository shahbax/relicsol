'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Reveal } from '@/components/Reveal';
import { blogPosts, blogCategories } from '@/lib/blogPosts';

export function BlogClient() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get('category') || 'all';
  const [active, setActive] = useState<string>(initial);

  useEffect(() => {
    setActive(params.get('category') || 'all');
  }, [params]);

  const setFilter = useCallback(
    (id: string) => {
      setActive(id);
      const url = new URL(window.location.href);
      if (id === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', id);
      router.replace(url.pathname + url.search, { scroll: false });
    },
    [router]
  );

  const visible = useMemo(
    () => (active === 'all' ? blogPosts : blogPosts.filter((p) => p.category === active)),
    [active]
  );

  const filters = ['all', ...blogCategories];

  return (
    <main>
      {/* Hero */}
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

      {/* Filters */}
      <section style={{ padding: '20px 32px 60px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap' }} role="tablist">
          {filters.map((f) => {
            const label = f === 'all' ? 'All Articles' : f;
            const count = f === 'all' ? blogPosts.length : blogPosts.filter((p) => p.category === f).length;
            const isActive = active === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
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
                {label}
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
            {visible.map((p, i) => (
              <Reveal key={p.slug} delayMs={(i % 6) * 60}>
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
