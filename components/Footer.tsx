import Link from 'next/link';
import { siteConfig, yearsInBusiness } from '@/lib/siteConfig';
import { locationPages } from '@/lib/locations';

const columns = [
  {
    title: 'Services',
    links: [
      { href: '/services/web-design-development', label: 'Web Design & Development' },
      { href: '/services/software-development', label: 'Software Development' },
      { href: '/services/ai-automation', label: 'AI Automation' },
      { href: '/services/seo-services', label: 'SEO & Digital Marketing' }
    ]
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/portfolio', label: 'Portfolio' },
      { href: '/blog', label: 'Blog' },
      { href: '/contact', label: 'Contact' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' }
    ]
  }
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid #262626' }}>
      {/* Top: 4-column grid */}
      <div style={{ padding: '80px 32px 40px' }}>
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
            gap: 48
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
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
                  color: '#ffffff'
                }}
              >
                Relicsol
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#A1A1AA', margin: '0 0 20px', maxWidth: 340 }}>
              Web design, custom software, AI automation and SEO for businesses in the USA, UK and Europe. Since {siteConfig.founded}.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <a
                href={`mailto:${siteConfig.contact.primaryEmail}`}
                style={{ color: '#71717a', textDecoration: 'none', fontFamily: 'var(--font-mono), monospace', fontSize: 13 }}
              >
                {siteConfig.contact.primaryEmail}
              </a>
              {siteConfig.contact.phone ? (
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                  style={{ color: '#71717a', textDecoration: 'none', fontFamily: 'var(--font-mono), monospace', fontSize: 13 }}
                >
                  {siteConfig.contact.phone}
                </a>
              ) : null}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 11,
                  color: '#F97316',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginBottom: 20
                }}
              >
                {col.title}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="rl-foot-link"
                      style={{ color: '#A1A1AA', textDecoration: 'none', fontSize: 14 }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Where we work */}
      <div style={{ borderTop: '1px solid #1a1a1a', padding: '32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 11,
              color: '#F97316',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: 20
            }}
          >
            Where we work
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px' }}>
            {locationPages.map((l) => (
              <Link
                key={l.slug}
                href={`/${l.slug}`}
                className="rl-foot-link"
                style={{ color: '#A1A1AA', textDecoration: 'none', fontSize: 14 }}
              >
                Web Design {l.displayName}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter strip */}
      <div style={{ borderTop: '1px solid #1a1a1a', padding: '32px' }}>
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 32,
            alignItems: 'center'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontWeight: 700,
                fontSize: 18,
                color: '#ffffff',
                marginBottom: 6
              }}
            >
              Get one useful build tip every other week.
            </div>
            <div style={{ fontSize: 13, color: '#71717a' }}>
              Short, non-promotional. Unsubscribe any time.
            </div>
          </div>
          <form
            action="/contact"
            method="get"
            style={{ display: 'flex', gap: 8 }}
            aria-label="Newsletter signup"
          >
            <input
              type="email"
              name="newsletter"
              required
              placeholder="you@company.com"
              aria-label="Email address"
              style={{
                flex: 1,
                background: '#0f0f0f',
                border: '1px solid #262626',
                color: '#ffffff',
                padding: '14px 16px',
                borderRadius: 999,
                fontSize: 14,
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="rl-btn-primary"
              style={{
                background: '#F97316',
                color: '#fff',
                border: 'none',
                padding: '14px 24px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Oversized brand wordmark */}
      <div style={{ overflow: 'hidden', padding: '0 32px', userSelect: 'none' }} aria-hidden>
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            fontFamily: 'var(--font-syne), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(72px, 15.5vw, 232px)',
            lineHeight: 0.78,
            letterSpacing: '-0.05em',
            color: '#101010',
            whiteSpace: 'nowrap',
            transform: 'translateY(0.12em)',
            textAlign: 'center'
          }}
        >
          Relicsol
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #1a1a1a', padding: '24px 32px' }}>
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#52525b' }}>
              © {year} Relicsol. All rights reserved.
            </span>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#52525b' }}>
              EST. {siteConfig.founded} · {yearsInBusiness()}+ years
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '1px solid #262626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#71717a',
                textDecoration: 'none'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
                <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24ZM96,176a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm-8-88a12,12,0,1,1,12-12A12,12,0,0,1,88,88Zm96,88a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140Z" />
              </svg>
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '1px solid #262626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#71717a',
                textDecoration: 'none'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
                <path d="M128,24A104,104,0,1,0,232,128,104.13,104.13,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
