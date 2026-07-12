import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { ContactForm } from './ContactForm';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Contact Relicsol — Start Your Project · Response in 1 Hour',
  description:
    'Tell us about your web design, software, AI automation or SEO project. We respond within one hour during working hours in the USA, UK and Europe.',
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    title: 'Contact Relicsol',
    description: 'Response within one hour. USA, UK and Europe.',
    url: '/contact'
  }
};

const contactLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Relicsol',
  url: `${siteConfig.siteUrl}/contact`,
  description: 'Contact the Relicsol team about web design, software, AI automation and SEO projects.'
};
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteConfig.siteUrl}/contact` }
  ]
};

export default function ContactPage() {
  return (
    <main>
      <JsonLd data={contactLd} id="ld-contact" />
      <JsonLd data={breadcrumbLd} id="ld-bc-contact" />

      <section style={{ padding: '160px 32px 40px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>
            {'{}'} Contact
          </div>
          <h1 style={{ fontFamily: 'var(--font-syne), sans-serif', fontWeight: 700, color: '#ffffff', fontSize: 'clamp(48px, 8vw, 112px)', lineHeight: 0.95, letterSpacing: '-0.045em', margin: '0 0 32px', maxWidth: 1100 }}>
            Tell us what<br />
            <span style={{ color: '#52525b' }}>you're building.</span>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: '#A1A1AA', maxWidth: 720, margin: 0 }}>
            {siteConfig.contact.responsePromise} Send us the shape of the project and we will come back with a real answer, not a "contact us for a quote" form.
          </p>
        </div>
      </section>

      <section style={{ padding: '40px 32px 120px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'start' }}>
          <ContactForm />

          {/* Sidebar */}
          <aside>
            <div style={{ background: '#0f0f0f', border: '1px solid #262626', borderRadius: 4, padding: 32, marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 20 }}>
                Direct
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <a href={`mailto:${siteConfig.contact.primaryEmail}`} style={{ color: '#ffffff', textDecoration: 'none', fontSize: 15 }}>
                  {siteConfig.contact.primaryEmail}
                </a>
                <a href={`mailto:${siteConfig.contact.founderEmail}`} style={{ color: '#A1A1AA', textDecoration: 'none', fontSize: 14 }}>
                  {siteConfig.contact.founderEmail}
                </a>
                <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} style={{ color: '#A1A1AA', textDecoration: 'none', fontSize: 14, fontFamily: 'var(--font-mono), monospace' }}>
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
            <div style={{ background: '#0f0f0f', border: '1px solid #262626', borderRadius: 4, padding: 32, marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 20 }}>
                Markets
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, color: '#A1A1AA', fontSize: 14 }}>
                <div>🇺🇸 United States — remote engagements</div>
                <div>🇬🇧 United Kingdom — remote engagements</div>
                <div>🇪🇺 Europe — remote engagements</div>
              </div>
            </div>
            <div style={{ background: '#0f0f0f', border: '1px solid #262626', borderRadius: 4, padding: 32 }}>
              <div style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 20 }}>
                What happens next
              </div>
              <ol style={{ margin: 0, paddingLeft: 20, color: '#A1A1AA', fontSize: 14, lineHeight: 1.75 }}>
                <li>You submit this form.</li>
                <li>We reply within one hour with a couple of clarifying questions.</li>
                <li>We book a 30-minute discovery call.</li>
                <li>You get a written proposal with fixed pricing within 48 hours.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
