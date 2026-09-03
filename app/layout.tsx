import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { siteConfig, hasPostalAddress } from '@/lib/siteConfig';
import { servedAreas } from '@/lib/locations';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { JsonLd } from '@/components/JsonLd';
import { Preloader } from '@/components/Preloader';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-syne'
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-jakarta'
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: 'Relicsol — Web Design, Software, AI Automation & SEO Agency',
    template: '%s | Relicsol'
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: 'en_US',
    url: siteConfig.siteUrl,
    title: 'Relicsol — Digital systems that convert.',
    description: siteConfig.description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Relicsol — Digital systems that convert.',
    description: siteConfig.description,
    images: ['/opengraph-image']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
  },
  // Search Console + Bing Webmaster ownership. Paste the tokens into Vercel env
  // (GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION) and redeploy; each meta
  // tag only renders once its token exists, so nothing empty ships before then.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } }
      : {})
  }
};

// Google Analytics 4 — only loads when a measurement ID is present in the env,
// so the site stays script-free (and cookie-banner-free) until you opt in.
const gaId = process.env.NEXT_PUBLIC_GA_ID;

// Stable @id so per-page schema (Service provider, Article publisher, etc.)
// can reference this single Organization node rather than redefining it.
const orgId = `${siteConfig.siteUrl}/#organization`;

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': orgId,
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteConfig.siteUrl}/images/logo.png`,
    width: 512,
    height: 512
  },
  description: siteConfig.description,
  // Founding year as shown on the site (EST. 2018). Exact date unknown — TODO.
  foundingDate: String(siteConfig.founded),
  email: siteConfig.contact.primaryEmail,
  // Countries + cities we serve as a remote/service-area business.
  areaServed: servedAreas,
  knowsAbout: [
    'Web design',
    'Web development',
    'Custom software development',
    'AI automation',
    'Search engine optimization',
    'E-commerce development',
    'WordPress development',
    'Next.js development'
  ],
  sameAs: [siteConfig.social.linkedin, siteConfig.social.facebook],
  contactPoint: {
    '@type': 'ContactPoint',
    email: siteConfig.contact.primaryEmail,
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
    contactType: 'customer service',
    availableLanguage: ['English']
  },
  // Postal address + phone appear only after they are filled into siteConfig —
  // no placeholder location is ever published.
  ...(hasPostalAddress()
    ? {
        address: {
          '@type': 'PostalAddress',
          ...(siteConfig.address.streetAddress
            ? { streetAddress: siteConfig.address.streetAddress }
            : {}),
          addressLocality: siteConfig.address.addressLocality,
          ...(siteConfig.address.addressRegion
            ? { addressRegion: siteConfig.address.addressRegion }
            : {}),
          ...(siteConfig.address.postalCode
            ? { postalCode: siteConfig.address.postalCode }
            : {}),
          addressCountry: siteConfig.address.addressCountry
        }
      }
    : {}),
  ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {})
};

// No SearchAction: the site has no on-site search endpoint, so advertising
// one would be inaccurate markup.
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.siteUrl}/#website`,
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  publisher: { '@id': orgId }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        {gaId ? <link rel="preconnect" href="https://www.googletagmanager.com" /> : null}
        {/* Runs before paint: repeat views in this session skip the preloader */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('rl-preloader-seen'))document.documentElement.setAttribute('data-skip-preloader','1')}catch(e){}`
          }}
        />
        <noscript>
          <style>{`#rl-preloader{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <Preloader />
        <JsonLd data={orgSchema} id="ld-org" />
        <JsonLd data={websiteSchema} id="ld-site" />
        <ScrollProgress />
        <Nav />
        {children}
        <Footer />
        <Script id="rl-noscript" strategy="afterInteractive">
          {`document.documentElement.dataset.jsReady = 'true';`}
        </Script>
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
