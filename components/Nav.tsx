'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const services = [
  { href: '/services/web-design-development', label: 'Web Design & Development' },
  { href: '/services/software-development', label: 'Software Development' },
  { href: '/services/ai-automation', label: 'AI Automation' },
  { href: '/services/seo-services', label: 'SEO & Digital Marketing' }
];

const mainLinks = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' }
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobServicesOpen, setMobServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobServicesOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobServicesOpen(false);
    document.body.style.overflow = '';
  };
  const toggleMobile = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const navStyle: React.CSSProperties = scrolled
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(8,8,8,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid #1a1a1a',
        transition: 'all .3s ease'
      }
    : {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'transparent',
        borderBottom: '1px solid transparent',
        transition: 'all .3s ease'
      };

  return (
    <>
      <nav style={navStyle} aria-label="Primary">
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '18px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
            aria-label="Relicsol home"
          >
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
              aria-hidden
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
          </Link>

          <div className="rl-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            <Link
              href="/"
              className="rl-nav-link"
              aria-current={pathname === '/' ? 'page' : undefined}
              style={{ color: pathname === '/' ? '#ffffff' : '#A1A1AA', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}
            >
              Home
            </Link>
            <div className="rl-svc-dd" style={{ position: 'relative' }}>
              <span
                style={{
                  color: pathname.startsWith('/services') ? '#ffffff' : '#A1A1AA',
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer'
                }}
              >
                Services
                <svg width="10" height="10" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
                  <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                </svg>
              </span>
              <div
                className="rl-svc-panel"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: -16,
                  paddingTop: 12,
                  opacity: 0,
                  pointerEvents: 'none',
                  transition: 'opacity .2s ease, transform .2s ease',
                  transform: 'translateY(-4px)'
                }}
              >
                <div
                  style={{
                    background: '#0f0f0f',
                    border: '1px solid #262626',
                    borderRadius: 4,
                    padding: 10,
                    minWidth: 280,
                    boxShadow: '0 20px 60px rgba(0,0,0,.5)'
                  }}
                >
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      style={{
                        display: 'block',
                        padding: '10px 14px',
                        color: '#ffffff',
                        textDecoration: 'none',
                        fontSize: 14,
                        borderRadius: 4
                      }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {[
              { href: '/portfolio', label: 'Portfolio' },
              { href: '/about', label: 'About' },
              { href: '/blog', label: 'Blog' },
              { href: '/contact', label: 'Contact' }
            ].map((l) => {
              const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rl-nav-link"
                  aria-current={active ? 'page' : undefined}
                  style={{ color: active ? '#ffffff' : '#A1A1AA', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <button
            className="rl-mobile-toggle"
            onClick={toggleMobile}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: 8,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
            </svg>
          </button>
          <Link
            href="/contact"
            className="rl-desktop-cta rl-btn-primary"
            style={{
              background: '#F97316',
              color: '#fff',
              textDecoration: 'none',
              padding: '10px 20px',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.01em'
            }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      <div className="rl-mob-overlay" data-open={mobileOpen} role="dialog" aria-modal="true" aria-hidden={!mobileOpen}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 4, background: 'linear-gradient(135deg,#F97316,#c2410c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono), monospace', fontWeight: 600, color: '#fff', fontSize: 16 }} aria-hidden>
              R
            </div>
            <span style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, fontSize: 18, color: '#ffffff' }}>Relicsol</span>
          </div>
          <button onClick={closeMobile} aria-label="Close menu" style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', padding: 8 }}>
            <svg width="28" height="28" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
            </svg>
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {mainLinks.filter((l) => l.href !== '/blog').map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeMobile}
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontFamily: 'var(--font-syne), sans-serif',
                fontWeight: 700,
                fontSize: 32,
                letterSpacing: '-0.02em',
                padding: '16px 0',
                borderBottom: '1px solid #1a1a1a'
              }}
            >
              {l.label}
            </Link>
          ))}
          <div style={{ borderBottom: '1px solid #1a1a1a' }}>
            <button
              onClick={() => setMobServicesOpen((v) => !v)}
              aria-expanded={mobServicesOpen}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                fontFamily: 'var(--font-syne), sans-serif',
                fontWeight: 700,
                fontSize: 32,
                letterSpacing: '-0.02em',
                padding: '16px 0',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              Services
              <svg
                width="20"
                height="20"
                viewBox="0 0 256 256"
                fill="currentColor"
                style={{ transition: 'transform .3s ease', transform: mobServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                aria-hidden
              >
                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
              </svg>
            </button>
            {mobServicesOpen ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 0 16px 24px' }}>
                {services.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={closeMobile}
                    style={{ color: '#A1A1AA', textDecoration: 'none', fontSize: 18, padding: '10px 0' }}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <Link href="/blog" onClick={closeMobile} style={{ color: '#ffffff', textDecoration: 'none', fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, fontSize: 32, letterSpacing: '-0.02em', padding: '16px 0', borderBottom: '1px solid #1a1a1a' }}>
            Blog
          </Link>
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 40 }}>
          <Link
            href="/contact"
            onClick={closeMobile}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              background: '#F97316',
              color: '#fff',
              textDecoration: 'none',
              padding: '18px 32px',
              borderRadius: 999,
              fontSize: 16,
              fontWeight: 500,
              width: '100%'
            }}
          >
            Start Your Project
            <svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
              <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
            </svg>
          </Link>
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <a href="mailto:info@relicsol.com" style={{ color: '#71717a', textDecoration: 'none', fontFamily: 'var(--font-mono), monospace', fontSize: 13 }}>
              info@relicsol.com
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .rl-svc-dd:hover .rl-svc-panel {
          opacity: 1 !important;
          pointer-events: auto !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </>
  );
}
