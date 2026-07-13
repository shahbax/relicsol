'use client';

import { useEffect, useRef, useState } from 'react';

// First-visit counter preloader. Counts to 90 over ~0.9s, waits for window
// load (capped at 1.8s total), snaps to 100, then wipes upward.
// Repeat views in the same session skip it entirely via an inline script in
// the layout that sets data-skip-preloader on <html> before first paint.

export function Preloader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'exit' | 'gone'>('loading');
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (
      document.documentElement.hasAttribute('data-skip-preloader') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setPhase('gone');
      try {
        sessionStorage.setItem('rl-preloader-seen', '1');
      } catch {}
      return;
    }

    document.body.style.overflow = 'hidden';
    const t0 = performance.now();
    let raf = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      setCount(100);
      try {
        sessionStorage.setItem('rl-preloader-seen', '1');
      } catch {}
      window.setTimeout(() => setPhase('exit'), 220);
      window.setTimeout(() => {
        setPhase('gone');
        document.body.style.overflow = '';
      }, 900);
    };

    const tick = (now: number) => {
      const elapsed = now - t0;
      // Ease to 90 over 900ms, hold until load or cap
      const p = Math.min(elapsed / 900, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 90));
      if (elapsed >= 1800) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onLoad = () => {
      // Let the counter reach at least ~60 so it never flashes
      const elapsed = performance.now() - t0;
      window.setTimeout(finish, Math.max(0, 650 - elapsed));
    };
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', onLoad);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      id="rl-preloader"
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: '#080808',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(24px, 4vw, 48px)',
        transform: phase === 'exit' ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: phase === 'exit' ? 'none' : 'auto'
      }}
    >
      {/* Brand mark, top-left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 4,
            background: 'linear-gradient(135deg,#F97316,#c2410c)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono), monospace',
            fontWeight: 600,
            color: '#fff',
            fontSize: 16
          }}
        >
          R
        </div>
        <span
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontWeight: 700,
            fontSize: 18,
            color: '#ffffff',
            letterSpacing: '-0.02em'
          }}
        >
          Relicsol
        </span>
      </div>

      {/* Counter, bottom-right */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
        <div
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(96px, 18vw, 220px)',
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: '#ffffff',
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          {count}
          <span style={{ color: '#F97316' }}>%</span>
        </div>
      </div>

      {/* Progress hairline along the bottom */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: 2,
          width: '100%',
          background: '#1a1a1a'
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${count}%`,
            background: '#F97316',
            transition: 'width 0.2s ease-out'
          }}
        />
      </div>
    </div>
  );
}
