import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { twitterCard } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

const privacyDesc =
  'How Relicsol handles your data when you use our website, submit our contact form, or engage us for services.';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: privacyDesc,
  alternates: { canonical: '/privacy' },
  openGraph: { title: 'Privacy Policy | Relicsol', description: privacyDesc, url: '/privacy', type: 'article',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
  twitter: twitterCard({ title: 'Privacy Policy | Relicsol', description: privacyDesc })
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${siteConfig.siteUrl}/privacy` }
  ]
};

export default function PrivacyPage() {
  return (
    <main style={{ padding: '160px 32px 100px' }}>
      <JsonLd data={breadcrumbLd} id="ld-bc-privacy" />
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
          Privacy Policy
        </h1>
        <p style={{ color: '#71717a', fontSize: 14, marginBottom: 48, fontFamily: 'var(--font-mono), monospace' }}>
          Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, color: '#A1A1AA', fontSize: 16, lineHeight: 1.75 }}>
          <section>
            <h2 style={{ color: '#ffffff', fontFamily: 'var(--font-syne), sans-serif', fontSize: 24, marginBottom: 12 }}>What we collect</h2>
            <p>
              When you submit our contact form we collect the details you send us: name, email address, company name, phone number, budget, service interest, and message. We do not use analytics scripts, cookies, or trackers on this site beyond what is strictly required to serve the page.
            </p>
          </section>
          <section>
            <h2 style={{ color: '#ffffff', fontFamily: 'var(--font-syne), sans-serif', fontSize: 24, marginBottom: 12 }}>How we use it</h2>
            <p>
              Your enquiry is delivered to our team inbox at {siteConfig.contact.primaryEmail} so we can reply within one hour during business hours. We do not sell, share, or use your data for advertising. If you opt in to our newsletter, we send you a short, non-promotional email every couple of weeks and nothing else.
            </p>
          </section>
          <section>
            <h2 style={{ color: '#ffffff', fontFamily: 'var(--font-syne), sans-serif', fontSize: 24, marginBottom: 12 }}>How long we keep it</h2>
            <p>
              We retain enquiry emails for as long as the conversation stays useful. If you would like your data removed, email {siteConfig.contact.primaryEmail} and we will delete it within 30 days.
            </p>
          </section>
          <section>
            <h2 style={{ color: '#ffffff', fontFamily: 'var(--font-syne), sans-serif', fontSize: 24, marginBottom: 12 }}>Third parties</h2>
            <p>
              This site is hosted on Vercel and the contact form is delivered via Resend. Both providers process form submissions on our behalf under their standard data processing terms.
            </p>
          </section>
          <section>
            <h2 style={{ color: '#ffffff', fontFamily: 'var(--font-syne), sans-serif', fontSize: 24, marginBottom: 12 }}>Contact</h2>
            <p>
              Any privacy questions? Email {siteConfig.contact.primaryEmail} or call {siteConfig.contact.phone}.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
