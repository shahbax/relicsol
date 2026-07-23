export const siteConfig = {
  name: 'Relicsol',
  tagline: 'We Build Digital Systems That Convert.',
  description:
    'Premium web design, custom software, AI automation and SEO for ambitious businesses in the USA, UK and Europe.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.relicsol.com',
  founded: 2018,
  trustBar: 'EST. 2018 · USA · UK · EUROPE',
  contact: {
    primaryEmail: 'info@relicsol.com',
    founderEmail: 'shahbaz@relicsol.com',
    // No public phone number. Set a US or UK number here (e.g. '+1 555 123 4567')
    // to re-enable it in the footer and on the contact page automatically.
    // Typed as string (not the '' literal) so the conditional renders type-check.
    phone: '' as string,
    responsePromise: 'We respond within 1 hour.'
  },
  address: {
    country: 'PK',
    markets: ['USA', 'UK', 'Europe']
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/relicsol',
    facebook: 'https://www.facebook.com/relicsol'
  }
} as const;

export function yearsInBusiness(now: Date = new Date()): number {
  return now.getFullYear() - siteConfig.founded;
}
