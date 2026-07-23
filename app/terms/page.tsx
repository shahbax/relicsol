import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { twitterCard } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

const termsDesc =
  'The terms and conditions under which Relicsol provides web design, software, AI automation and SEO services.';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: termsDesc,
  alternates: { canonical: '/terms' },
  openGraph: { title: 'Terms of Service | Relicsol', description: termsDesc, url: '/terms', type: 'article',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
  twitter: twitterCard({ title: 'Terms of Service | Relicsol', description: termsDesc })
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: `${siteConfig.siteUrl}/terms` }
  ]
};

export default function TermsPage() {
  return (
    <main style={{ padding: '160px 32px 100px' }}>
      <JsonLd data={breadcrumbLd} id="ld-bc-terms" />
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h1
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontWeight: 700,
            color: '#ffffff',
            fontSize: 'clamp(40px, 6vw, 72px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.98,
            margin: '0 0 24px'
          }}
        >
          Terms of Service
        </h1>
        <p style={{ color: '#71717a', fontSize: 14, marginBottom: 48, fontFamily: 'var(--font-mono), monospace' }}>
          Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, color: '#A1A1AA', fontSize: 16, lineHeight: 1.75 }}>
          <section>
            <h2 style={{ color: '#ffffff', fontFamily: 'var(--font-syne), sans-serif', fontSize: 24, marginBottom: 12 }}>Scope</h2>
            <p>
              These terms cover the use of this website. Client engagements are governed by a separate proposal and services agreement signed before work begins.
            </p>
          </section>
          <section>
            <h2 style={{ color: '#ffffff', fontFamily: 'var(--font-syne), sans-serif', fontSize: 24, marginBottom: 12 }}>Use of the site</h2>
            <p>
              You may browse this site and its content for your own information. Trying to scrape at industrial scale, disrupt the service, or attempt to access anything you do not own is not allowed.
            </p>
          </section>
          <section>
            <h2 style={{ color: '#ffffff', fontFamily: 'var(--font-syne), sans-serif', fontSize: 24, marginBottom: 12 }}>Intellectual property</h2>
            <p>
              The Relicsol name, design system, and case-study content on this site belong to Relicsol or the respective client featured. You may cite short passages with attribution; do not republish full case studies without permission.
            </p>
          </section>
          <section>
            <h2 style={{ color: '#ffffff', fontFamily: 'var(--font-syne), sans-serif', fontSize: 24, marginBottom: 12 }}>Warranties and liability</h2>
            <p>
              The site is provided as-is. We take care with everything we publish, but we are not liable for indirect losses arising from your use of the site. Nothing in these terms excludes liability that cannot legally be excluded.
            </p>
          </section>
          <section>
            <h2 style={{ color: '#ffffff', fontFamily: 'var(--font-syne), sans-serif', fontSize: 24, marginBottom: 12 }}>Contact</h2>
            <p>
              Anything unclear? Email {siteConfig.contact.primaryEmail} and we will help.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
