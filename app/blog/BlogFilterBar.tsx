'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Category = { label: string; slug: string; count: number };

/**
 * Client island for the blog filter. The post grid itself is rendered on the
 * server and passed in as `children`, so every post is a real crawlable
 * <a href> in the initial HTML. This component only renders the tab bar and,
 * after hydration, hides/shows the server-rendered cards by their data-cat
 * attribute. It reads ?category from window.location rather than
 * useSearchParams() so it never triggers a static-render bailout.
 */
export function BlogFilterBar({
  categories,
  total,
  children
}: {
  categories: Category[];
  total: number;
  children: ReactNode;
}) {
  const [active, setActive] = useState('all');
  const gridWrap = useRef<HTMLDivElement | null>(null);

  // Honour a ?category= deep link after mount (no useSearchParams bailout).
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get('category');
    if (c) setActive(c);
  }, []);

  // Filter by toggling display on the server-rendered cards.
  useEffect(() => {
    const wrap = gridWrap.current;
    if (!wrap) return;
    wrap.querySelectorAll<HTMLElement>('[data-cat]').forEach((el) => {
      el.style.display = active === 'all' || el.dataset.cat === active ? '' : 'none';
    });
  }, [active]);

  const select = (slug: string) => {
    setActive(slug);
    const url = new URL(window.location.href);
    if (slug === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', slug);
    window.history.replaceState(null, '', url.pathname + url.search);
  };

  const tabs: Category[] = [{ label: 'All Articles', slug: 'all', count: total }, ...categories];

  return (
    <>
      <section style={{ padding: '20px 32px 60px' }}>
        <div
          style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}
          role="tablist"
          aria-label="Filter articles by category"
        >
          {tabs.map((t) => {
            const isActive = active === t.slug;
            return (
              <button
                key={t.slug}
                onClick={() => select(t.slug)}
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
                {t.label}
                <span style={{ fontSize: 10, color: isActive ? '#fff' : '#52525b' }}>
                  {String(t.count).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section style={{ padding: '0 32px 120px' }}>
        <div ref={gridWrap} style={{ maxWidth: 1400, margin: '0 auto' }}>
          {children}
        </div>
      </section>
    </>
  );
}
