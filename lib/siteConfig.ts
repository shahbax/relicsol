export const siteConfig = {
  name: 'Relicsol',
  // Registered company name — update to the exact UK Ltd name once incorporated
  // (e.g. 'Relicsol Ltd'). Used in legal/schema contexts.
  legalName: 'Relicsol' as string,
  tagline: 'We Build Digital Systems That Convert.',
  description:
    'Premium web design, custom software, AI automation and SEO for ambitious businesses in the USA, UK and Europe.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.relicsol.com',
  founded: 2018,
  trustBar: 'EST. 2018 · USA · UK · EUROPE',

  // --------------------------------------------------------------------------
  // CREDIBILITY NUMBERS — shown across the whole site from here.
  // Keep every value TRUE and defensible. A prospect (or a competitor) can ask
  // you to back these up, and inflated figures are both a trust risk and, for
  // ratings, a Google / UK CMA / US FTC compliance risk. Change the number here
  // once and it updates everywhere it appears.
  // --------------------------------------------------------------------------
  proof: {
    // Set to the real figure you can stand behind if asked.
    projectsDelivered: 200,
    // PUBLIC STAR RATING: leave count at 0 until you have REAL collected reviews
    // (Google Business Profile / Clutch / Trustpilot). Then set reviewCount and
    // reviewValue from the actual totals, and the star badges switch back on.
    reviewCount: 0 as number,
    reviewValue: 0 as number
  },

  contact: {
    primaryEmail: 'info@relicsol.com',
    founderEmail: 'shahbaz@relicsol.com',
    // UK Google Business Profile number. Shows in the footer, on the contact page,
    // and in LocalBusiness schema — must match GBP exactly (NAP consistency).
    phone: '+44 7405 963217' as string,
    responsePromise: 'We respond within 1 hour.'
  },

  // Service-area business: street + postcode kept PRIVATE (not shown publicly),
  // matching the hidden address on the Google Business Profile. Only town/region
  // surface, for NAP consistency without exposing a home address.
  address: {
    markets: ['USA', 'UK', 'Europe'],
    streetAddress: '' as string, // intentionally private
    addressLocality: 'Burnley' as string,
    addressRegion: 'Lancashire' as string,
    postalCode: '' as string, // intentionally private
    addressCountry: 'GB' as string
  },

  social: {
    linkedin: 'https://www.linkedin.com/company/relicsol',
    facebook: 'https://www.facebook.com/relicsol'
  }
} as const;

export function yearsInBusiness(now: Date = new Date()): number {
  return now.getFullYear() - siteConfig.founded;
}

/** True once a registered postal address has been filled into siteConfig.address. */
/** True once at least a town + country are set (street/postcode may stay private). */
export function hasPostalAddress(): boolean {
  const a = siteConfig.address;
  return Boolean(a.addressLocality && a.addressCountry);
}
