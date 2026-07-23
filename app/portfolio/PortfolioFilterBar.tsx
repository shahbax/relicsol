'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Filter = { id: string; label: string; count: number };

/**
 * Client island for the portfolio filter. The case-study grid is rendered on
 * the server and passed in as `children`, so all 18 cards are real crawlable
 * <a href> in the initial HTML. This component renders the tab bar and, after
 * hydration, hides/shows the server-rendered cards by their data-cat
 * attribute. Reads ?filter from window.location instead of useSearchParams()
 * so it never triggers a static-render bailout.
 */
export function PortfolioFilterBar({
  filters,
  children
}: {
  filters: Filter[];
  children: ReactNode;
}) {
  const [active, setActive] = useState('all');
  const gridWrap = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const f = new URLSearchParams(window.location.search).get('filter');
    if (f) setActive(f);
  }, []);

  useEffect(() => {
    const wrap = gridWrap.current;
    if (!wrap) return;
    let shown = 0;
    wrap.querySelectorAll<HTMLElement>('[data-cat]').forEach((el) => {
      const match = active === 'all' || el.dataset.cat === active;
      el.style.display = match ? '' : 'none';
      if (match) shown++;
    });
    const empty = wrap.querySelector<HTMLElement>('[data-empty]');
    if (empty) empty.style.display = shown === 0 ? '' : 'none';
  }, [active]);

  const select = (id: string) => {
    setActive(id);
    const url = new URL(window.location.href);
    if (id === 'all') url.searchParams.delete('filter');
    else url.searchParams.set('filter', id);
    window.history.replaceState(null, '', url.pathname + url.search);
  };

  return (
    <>
      <section style={{ padding: '20px 32px 60px' }}>
        <div
          style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}
          role="tablist"
          aria-label="Filter case studies by category"
        >
          {filters.map((f) => {
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                onClick={() => select(f.id)}
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
                <span style={{ fontSize: 10, color: isActive ? '#fff' : '#52525b' }}>
                  {String(f.count).padStart(2, '0')}
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
