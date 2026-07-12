import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { siteConfig } from '@/lib/siteConfig';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { JsonLd } from '@/components/JsonLd';
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
  keywords: [
    'web design agency',
    'custom software development',
    'AI automation',
    'SEO agency',
    'Next.js development',
    'Shopify development',
    'WordPress development',
    'USA UK Europe agency'
  ],
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
  icons: {
    icon: '/favicon.ico'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
  }
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  logo: `${siteConfig.siteUrl}/images/logo.png`,
  foundingDate: `${siteConfig.founded}-01-01`,
  email: siteConfig.contact.primaryEmail,
  telephone: siteConfig.contact.phone,
  areaServed: siteConfig.address.markets,
  sameAs: [siteConfig.social.linkedin, siteConfig.social.facebook],
  contactPoint: {
    '@type': 'ContactPoint',
    email: siteConfig.contact.primaryEmail,
    telephone: siteConfig.contact.phone,
    contactType: 'customer service',
    availableLanguage: ['English']
  }
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.siteUrl}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      </head>
      <body>
        <JsonLd data={orgSchema} id="ld-org" />
        <JsonLd data={websiteSchema} id="ld-site" />
        <ScrollProgress />
        <Nav />
        {children}
        <Footer />
        <Script id="rl-noscript" strategy="afterInteractive">
          {`document.documentElement.dataset.jsReady = 'true';`}
        </Script>
      </body>
    </html>
  );
}
