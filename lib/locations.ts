// Location landing pages. Each entry is hand-written, market-specific content —
// deliberately NOT a template with the city swapped in. Currency, spelling
// (en-GB vs en-US), the market angle, the mapped case studies and the FAQs are
// all unique per location. Case studies referenced are the real ones we have
// from (or serving) that region; where we have no city-level client we say so
// honestly and reference the country-level portfolio.

export type LocationFAQ = { q: string; a: string };
export type LocationSection = { heading: string; body: string[] };

export type LocationPage = {
  slug: string;
  scope: 'country' | 'city';
  region: 'usa' | 'uk' | 'europe';
  displayName: string; // "USA", "London"
  inLocation: string; // "in the USA", "in London"
  lang: string; // BCP-47, drives <html lang> hint and copy spelling
  currency: '$' | '£' | '€';
  metaTitle: string; // 50–60 chars
  metaDescription: string; // 140–160 chars
  h1Lead: string;
  h1Accent: string;
  intro: string[];
  sections: LocationSection[];
  caseStudyIntro: string;
  caseStudySlugs: string[];
  faqs: LocationFAQ[];
  ctaHeading: string;
  ctaLine: string;
};

export const locationPages: LocationPage[] = [
  /* ------------------------------------------------------------------ USA */
  {
    slug: 'web-design-agency-usa',
    scope: 'country',
    region: 'usa',
    displayName: 'USA',
    inLocation: 'in the USA',
    lang: 'en-US',
    currency: '$',
    metaTitle: 'Web Design Agency USA — Fixed-Price Sites | Relicsol',
    metaDescription:
      'US web design, software and AI automation on fixed quotes, not hourly meters. 200+ projects for American businesses, delivered fast with full ownership.',
    h1Lead: 'A web design agency for',
    h1Accent: 'US businesses.',
    intro: [
      'Most American businesses have the same two complaints about web agencies: the quote balloons once work starts, and the timeline slips for months. Relicsol works the opposite way. You get a fixed price in writing before we begin, a clear delivery date, and code you own outright when we hand over.',
      'We have shipped 200+ projects for US clients across SaaS, direct-to-consumer retail, health tech and professional services, working remotely with founders and marketing teams from the East Coast to the West Coast.'
    ],
    sections: [
      {
        heading: 'What US businesses actually want from an agency',
        body: [
          'The US market is crowded with agencies that lead with a discovery retainer and bill by the hour, so the real cost is unknowable until the invoices arrive. We scope the entire project up front, quote a fixed dollar figure, and hold to it. If we mis-scoped, that is our cost to absorb, not a change order for you.',
          'Speed matters just as much. A standard business site ships in two to three weeks from design approval; e-commerce and custom builds run four to eight weeks. You are not waiting a quarter to launch.'
        ]
      },
      {
        heading: 'Time zones and communication',
        body: [
          'We keep working hours that overlap the US business day, with real-time availability through the morning Eastern and midday Pacific. Project communication runs on a shared board and a weekly written update, so nothing depends on catching a call at an awkward hour. Most US clients tell us the async rhythm is faster than the agency they used before.'
        ]
      },
      {
        heading: 'Contracts, payment and tax',
        body: [
          'Engagements run on a plain-English services agreement with fixed milestones. We invoice in US dollars and accept ACH, wire and card through Stripe. If your store needs US sales-tax display at checkout, we wire it up with the tax engine your platform supports. All design files, code and hosting accounts belong to you from day one.'
        ]
      },
      {
        heading: 'Industries we have shipped for in the US',
        body: [
          'Our US portfolio spans an AI SaaS launch page built to convert free trials, a national political agency rebrand, the marketing site for the world\'s first EEG earbuds, a performance-hydration DTC store, and a financial-education platform with a freemium funnel. Different sectors, the same standard: a site that earns its keep.'
        ]
      },
      {
        heading: 'Fixed pricing, in plain dollars',
        body: [
          'Our pricing is public and quoted in US dollars: a five-page business site from $999, a ten-page growth build from $1,499, and custom software or AI automation from $2,000. You get a written proposal with a real number inside 48 hours, not a range, not a "starting from", and not a discovery retainer you pay before you know the cost.',
          'That transparency is deliberate. In a US market where agency quotes routinely climb between the pitch and the final invoice, knowing the price before you commit is the difference between a project you can budget and one you cannot. If the scope changes mid-build, we quote the change before we do it.'
        ]
      }
    
    ],
    caseStudyIntro: 'Recent work for US clients:',
    caseStudySlugs: ['firmate', 'push-digital-group', 'nextsense', 'drink-pouch', 'saki-products', 'the-trend-chartist'],
    faqs: [
      {
        q: 'Do you work across US time zones?',
        a: 'Yes. Our hours overlap the US business day and we run projects asynchronously on a shared board, so progress never waits for a specific call time. We schedule live calls to suit Eastern through Pacific.'
      },
      {
        q: 'How do contracts and payments work for US clients?',
        a: 'A fixed-price services agreement with milestone billing, invoiced in USD. We accept ACH, wire and card via Stripe. No hourly meter and no surprise change orders.'
      },
      {
        q: 'Can you handle sales tax at checkout?',
        a: 'Yes. We configure automated US sales-tax calculation using the tax engine your platform supports (for example Shopify Tax or a TaxJar/Avalara integration on WooCommerce), so checkout shows the correct rate by state.'
      },
      {
        q: 'Can a remote agency really match a US agency\'s availability?',
        a: 'That is the norm now. You get a senior team, a fixed price and a faster timeline than most local shops, without paying for an office in Manhattan or San Francisco.'
      },
      {
        q: 'Who owns the website when it is finished?',
        a: 'You do — all code, design files and hosting accounts, from day one. There is no proprietary platform and no monthly licence to keep the site running.'
      },
      {
        q: 'What does a project cost?',
        a: 'A five-page business site starts at $999 and a growth build at $1,499; custom software and automation start at $2,000. Every project is scoped and quoted in writing before any work begins.'
      },
      {
        q: 'Do you offer ongoing support after launch?',
        a: 'Yes. You get a handover with training so your team can update content, plus optional monthly maintenance covering updates, backups, uptime monitoring and small changes.'
      }
    ,
      {
        q: 'Can you redesign an existing US site?',
        a: 'Yes. Redesigns are a large part of our US work — we rebuild underperforming sites for better structure, speed, SEO and conversion while keeping what already works.'
      }
    
    ],
    ctaHeading: 'Building something in the US?',
    ctaLine: 'Tell us about the project. We reply within one hour during US business hours.'
  },

  /* ------------------------------------------------------------------- UK */
  {
    slug: 'web-design-agency-uk',
    scope: 'country',
    region: 'uk',
    displayName: 'UK',
    inLocation: 'in the UK',
    lang: 'en-GB',
    currency: '£',
    metaTitle: 'Web Design Agency UK — Fixed-Price Websites | Relicsol',
    metaDescription:
      'UK web design, custom software and SEO on fixed prices with full ownership and GDPR-correct builds. No template builders, no lock-in. Delivered remotely, fast.',
    h1Lead: 'A web design agency for',
    h1Accent: 'UK businesses.',
    intro: [
      'Plenty of UK small businesses are stuck on a £70-a-month template builder that owns their site, throttles their SEO and looks like a thousand others. Relicsol builds you something custom that you own outright, for a fixed price agreed before we start.',
      'We work with founders, marketers and operators across the UK, from independent retailers to professional-services firms, and we build every site to be fast, GDPR-correct and genuinely yours.'
    ],
    sections: [
      {
        heading: 'The UK web design problem',
        body: [
          'The cheap end of the UK market locks you into a proprietary platform: cancel the subscription and the site disappears. The expensive end quotes by the day and drags the project out. We sit deliberately in between — a fixed price, a real timeline, and no dependency on any platform we would rather you kept paying for.',
          'Everything we build is optimised for Core Web Vitals and structured for search from the first commit, because in the UK\'s competitive local markets a slow, poorly-structured site simply does not rank.'
        ]
      },
      {
        heading: 'GDPR and UK data handling',
        body: [
          'UK GDPR is not optional, and most template sites get it wrong. We build contact and enquiry forms that collect only what is needed, store nothing they should not, and give you a clean basis for your privacy policy. No hidden trackers, no non-essential cookies dropped before consent.'
        ]
      },
      {
        heading: 'VAT and invoicing',
        body: [
          'We invoice in pounds and can issue VAT-appropriate paperwork for your records. Pricing is fixed and quoted up front, so there is never a question about what the project costs — a written proposal with real numbers within 48 hours, not a vague "get in touch for a quote".'
        ]
      },
      {
        heading: 'Industries we build for in the UK',
        body: [
          'Our UK work includes a split-screen editorial brand and subscription-commerce site for one of London\'s finest specialty coffee roasters, and a warm, conversion-focused site for an elevated fitness studio that turned online discovery into its strongest booking channel. Hospitality, retail, wellness and professional services are all familiar ground.'
        ]
      },
      {
        heading: 'Fixed pricing in pounds, quoted up front',
        body: [
          'British businesses are used to the "price on application" quote that turns into a negotiation. We do the opposite: a written, fixed proposal in pounds within 48 hours, with a real number and a clear scope. A five-page business site, a ten-page growth build or a custom software project is priced before a line of code is written, and the price holds.',
          'If your requirements change part-way through, we quote the change before doing it, so an invoice never surprises you at the end of the month. No day-rate meter, no scope-creep billing.'
        ]
      }
    
    ],
    caseStudyIntro: 'Recent work for UK clients:',
    caseStudySlugs: ['watchhouse', 'core-atelier-pilates'],
    faqs: [
      {
        q: 'Are your websites GDPR compliant?',
        a: 'Yes. We build forms that collect only necessary data, avoid dropping non-essential cookies before consent, and give you a clean technical basis for your privacy policy under UK GDPR.'
      },
      {
        q: 'Do you invoice in pounds and handle VAT?',
        a: 'We invoice in GBP and provide VAT-appropriate documentation for your records. Pricing is fixed and agreed in writing before work starts.'
      },
      {
        q: 'Do you work UK business hours?',
        a: 'Yes. Our hours cover the UK working day, and projects run on a shared board with a weekly written update so progress is always visible without waiting on a call.'
      },
      {
        q: 'Should I use WooCommerce or Shopify for a UK store?',
        a: 'It depends on your catalogue and how much control you want. We build on both and recommend the right one for your case — WooCommerce for full control and content depth, Shopify for speed of setup and lower maintenance.'
      },
      {
        q: 'Will I be locked into a platform?',
        a: 'No. You own all the code and files, and the site runs on standard hosting you control. There is no proprietary builder and no monthly licence holding your website hostage.'
      },
      {
        q: 'How long does a UK project take?',
        a: 'A standard business site takes two to three weeks from design approval; e-commerce and custom builds four to eight weeks depending on scope.'
      },
      {
        q: 'Do you offer maintenance after launch?',
        a: 'Yes. Optional monthly plans cover security and plugin updates, backups, uptime monitoring and small content changes, so your site stays fast and secure without you managing it.'
      }
    ,
      {
        q: 'Can you improve an existing UK website?',
        a: 'Yes. We rebuild underperforming UK sites for speed, structure, SEO and conversion, keeping the parts that work and fixing the parts that hold you back.'
      }
    
    ],
    ctaHeading: 'Building something in the UK?',
    ctaLine: 'Tell us about the project. We reply within one hour during UK working hours.'
  },

  /* --------------------------------------------------------------- EUROPE */
  {
    slug: 'web-design-agency-europe',
    scope: 'country',
    region: 'europe',
    displayName: 'Europe',
    inLocation: 'in Europe',
    lang: 'en-GB',
    currency: '€',
    metaTitle: 'Web Design Agency Europe — Multilingual Builds | Relicsol',
    metaDescription:
      'European web design, e-commerce and AI automation built multilingual, multi-currency and GDPR-first. Fixed pricing, full ownership, English-fluent remote team.',
    h1Lead: 'A web design agency for',
    h1Accent: 'European brands.',
    intro: [
      'Selling across European borders means more than translating a homepage. It means multiple languages, multiple currencies, local payment methods and GDPR done properly — all in one build that still loads fast. That is the kind of project we are built for.',
      'We work with brands across the continent, from Dutch marketplaces to German premium-product makers, in fluent English, on fixed pricing, with everything we build owned entirely by you.'
    ],
    sections: [
      {
        heading: 'Building for more than one European market',
        body: [
          'A site aimed at the Netherlands, Germany and France cannot be one language with a flag dropdown bolted on. We architect multilingual sites properly — clean URL structure per language, correct hreflang, translated metadata — so each market ranks in its own search results rather than competing with itself.',
          'Multi-currency and localised pricing are handled at the platform level, so a shopper in Berlin sees euros and a shopper in Stockholm sees kronor without a jarring redirect.'
        ]
      },
      {
        heading: 'GDPR by default, not as an afterthought',
        body: [
          'European buyers are the most privacy-aware in the world and their regulators are the strictest. We build consent-first: no non-essential cookies before opt-in, data collection limited to what a form genuinely needs, and a clean technical foundation for your privacy documentation across jurisdictions.'
        ]
      },
      {
        heading: 'Payment methods across Europe',
        body: [
          'Card-only checkout leaves money on the table in Europe. We integrate the methods each market actually uses — SEPA direct debit, iDEAL in the Netherlands, Bancontact in Belgium, Klarna and SOFORT where they convert — through Stripe or your platform\'s native gateways, invoiced to you in euros.'
        ]
      },
      {
        heading: 'Industries we build for in Europe',
        body: [
          'Our European portfolio includes a custom multi-vendor wine marketplace with Dutch design sensibility, a premium German kitchenware store rebuilt around its 100-day trial and trust signals, an editorial luxury-cosmetics commerce experience, and a dark performance-commerce site for a European carbon-cycling brand.'
        ]
      },
      {
        heading: 'One team across many markets',
        body: [
          'The alternative to a single multi-market partner is juggling a different agency in each country, each with its own standards, timelines and invoices. We build and maintain the whole thing as one system, so your German, Dutch and French storefronts share a codebase, a design language and a single point of contact.',
          'That consistency matters for brand, and it matters even more for maintenance: one update applied everywhere, rather than three agencies to coordinate. It also keeps your analytics and SEO structure coherent across every market you sell into.'
        ]
      }
    
    ],
    caseStudyIntro: 'Recent work for European clients:',
    caseStudySlugs: ['house-wine', 'silberthal', 'loiseau-2', 'evanlite'],
    faqs: [
      {
        q: 'Can you build a multilingual, multi-currency site?',
        a: 'Yes — this is core to what we do. We build proper per-language URL structures with correct hreflang and translated metadata, and handle multi-currency pricing at the platform level so each market sees its own language and currency.'
      },
      {
        q: 'How do you handle EU VAT?',
        a: 'We configure VAT-correct pricing and invoicing for your target markets, using your platform\'s tax engine, and provide euro invoicing for the project itself.'
      },
      {
        q: 'Are your builds GDPR compliant?',
        a: 'Yes, consent-first by default: no non-essential cookies before opt-in, minimal data collection, and a clean technical basis for privacy documentation across EU jurisdictions.'
      },
      {
        q: 'Which European payment methods can you integrate?',
        a: 'SEPA, iDEAL, Bancontact, Klarna, SOFORT and card, via Stripe or your platform\'s native gateways — chosen for the markets you actually sell into.'
      },
      {
        q: 'Do you work across European time zones and in English?',
        a: 'Yes. All communication is in fluent English, and our hours comfortably cover CET and neighbouring zones with an async, written project rhythm.'
      },
      {
        q: 'Who owns the finished site?',
        a: 'You do — all code, design files and hosting accounts, with no platform lock-in or ongoing licence fee.'
      },
      {
        q: 'Can you maintain the site after launch?',
        a: 'Yes. Optional maintenance covers updates, backups, monitoring and small changes across all your language versions from one place.'
      }
    ,
      {
        q: 'Do you work with European agencies as a build partner?',
        a: 'Yes. We regularly deliver white-label builds for European agencies that need reliable, fixed-price development across multiple markets and languages.'
      }
    
    ],
    ctaHeading: 'Building something in Europe?',
    ctaLine: 'Tell us about the project, in English, and we reply within one hour during CET working hours.'
  },

  /* --------------------------------------------------------------- LONDON */
  {
    slug: 'web-design-agency-london',
    scope: 'city',
    region: 'uk',
    displayName: 'London',
    inLocation: 'in London',
    lang: 'en-GB',
    currency: '£',
    metaTitle: 'Web Design Agency London — Premium Builds | Relicsol',
    metaDescription:
      'London web design and e-commerce that matches the city\'s premium brands, at better value than a London agency. Fixed pricing, full ownership, built for search.',
    h1Lead: 'A web design agency for',
    h1Accent: 'London brands.',
    intro: [
      'London brands are held to a high visual standard — hospitality, retail and fintech customers in the city expect a site to look as considered as the product. We build to that standard, without charging London-agency rates or trapping you in a retainer.',
      'One of our favourite recent builds was for a London specialty-coffee roaster, and the approach there is the approach we bring to any London brand: editorial design, fast performance and commerce that converts.'
    ],
    sections: [
      {
        heading: 'A London brand we have built for',
        body: [
          'WatchHouse is one of London\'s finest specialty-coffee roasters, and we built them a split-screen editorial brand site with subscription commerce underneath. The design had to carry the brand\'s reputation while making the subscription flow effortless — the sort of balance London hospitality brands live or die by.',
          'That project is representative of how we work with London businesses: the design does the brand justice, and the commerce quietly does the selling.'
        ]
      },
      {
        heading: 'Premium design without London-agency rates',
        body: [
          'A Shoreditch or Soho agency will quote a London day rate and take a quarter to deliver. We give you a senior team, a fixed price agreed up front, and a launch in weeks — because we run lean and remote rather than carrying the overhead of a central-London office. The output is the same premium standard; the invoice is not.'
        ]
      },
      {
        heading: 'Hospitality and retail commerce',
        body: [
          'London\'s hospitality and independent-retail scene needs sites that handle subscriptions, bookings, gift cards and click-and-collect without feeling like a spreadsheet. We build those flows on WooCommerce or Shopify with checkout tuned for conversion, so the site earns rather than just informs.'
        ]
      },
      {
        heading: 'Working with a remote team from London',
        body: [
          'You do not need us in the room to get a London-standard result. Projects run on a shared board with a weekly written update and calls booked to suit your diary. Everything is GDPR-correct, invoiced in pounds, and owned entirely by you at handover.'
        ]
      },
      {
        heading: 'London sectors we know',
        body: [
          'London is not one market but several, and the web needs differ sharply between them. Hospitality and specialty retail need subscription and booking commerce that feels effortless. Fintech and professional services need credibility and speed above all. Creative and lifestyle brands need editorial design that photographs as well as it converts.',
          'We have built across these worlds, and we tailor the approach to the sector rather than applying one template to all of them. A London coffee subscription and a London consultancy should not, and do not, get the same site from us.'
        ]
      }
    
    ],
    caseStudyIntro: 'A London project we are proud of:',
    caseStudySlugs: ['watchhouse', 'core-atelier-pilates'],
    faqs: [
      {
        q: 'Can you match a London agency\'s quality?',
        a: 'Yes — our London work, including WatchHouse, is built to the premium standard the city expects. We simply deliver it on a fixed price and a faster timeline by running remotely rather than from a central-London office.'
      },
      {
        q: 'Do you meet clients in person in London?',
        a: 'Most of our London projects run entirely remotely on a shared board with a weekly written update, which clients find faster than in-person meetings. We can arrange a call to suit your schedule whenever you need one.'
      },
      {
        q: 'Do you build hospitality and retail commerce?',
        a: 'Yes — subscriptions, bookings, gift cards and click-and-collect on WooCommerce or Shopify, with checkout tuned for conversion. WatchHouse\'s subscription commerce is a good example.'
      },
      {
        q: 'How much does a London project cost?',
        a: 'Fixed and agreed in writing before work starts. A business site starts at £999 equivalent and a growth build at £1,499 equivalent; we quote your exact project up front.'
      },
      {
        q: 'Are your London sites GDPR compliant?',
        a: 'Yes, consent-first with minimal data collection and a clean basis for your privacy policy under UK GDPR.'
      },
      {
        q: 'How quickly can you launch?',
        a: 'A standard London business site launches in two to three weeks from design approval; commerce and custom builds run four to eight weeks.'
      },
      {
        q: 'Do you offer ongoing support for London clients?',
        a: 'Yes — a handover with training plus optional monthly maintenance covering updates, backups, monitoring and small changes.'
      }
    ,
      {
        q: 'Can you rebuild an existing London website?',
        a: 'Yes. Redesigns are common in our London work; we rebuild dated or underperforming sites for speed, SEO and conversion while preserving brand equity.'
      }
    
    ],
    ctaHeading: 'Building a brand in London?',
    ctaLine: 'Tell us about the project. We reply within one hour during UK working hours.'
  },

  /* ------------------------------------------------------------- NEW YORK */
  {
    slug: 'web-design-agency-new-york',
    scope: 'city',
    region: 'usa',
    displayName: 'New York',
    inLocation: 'in New York',
    lang: 'en-US',
    currency: '$',
    metaTitle: 'Web Design Agency New York — Fast Builds | Relicsol',
    metaDescription:
      'New York web design and software for startups and growing brands: conversion-first sites shipped fast, fixed pricing, full ownership, EST-overlapping hours.',
    h1Lead: 'A web design agency for',
    h1Accent: 'New York businesses.',
    intro: [
      'New York moves fast and expects the same from its vendors. Startups need a launch site that converts before the next raise, agencies need overflow they can trust, and established brands need a rebuild that ships this quarter, not next year. Relicsol works at that pace, on a fixed price agreed before we start.',
      'We work remotely with US clients on hours that overlap the New York business day, and we are candid about our portfolio: our proof is US-wide rather than NYC-specific, and the work speaks for itself.'
    ],
    sections: [
      {
        heading: 'Built for New York\'s pace',
        body: [
          'A standard business site ships in two to three weeks from design approval; a SaaS launch page can move faster. You get a fixed dollar quote before any work begins and a firm delivery date, so a launch tied to a funding round or a campaign is not left hostage to an open-ended hourly engagement.',
          'Communication runs on a shared board with real-time availability through the New York morning and a weekly written update, which most fast-moving teams find quicker than chasing an account manager.'
        ]
      },
      {
        heading: 'US clients we have shipped for',
        body: [
          'To be straight with you: our case studies are US clients rather than specifically New York clients. They include Firmate, an AI brand-identity SaaS whose launch page lifted free-trial conversion 41%; Push Digital, a national political agency; and NextSense, presenting the world\'s first EEG earbuds to investors and consumers at once. The standard we hold for them is the standard a New York brand should expect.'
        ]
      },
      {
        heading: 'Eastern time-zone overlap',
        body: [
          'Our working hours cover the Eastern morning in real time, so New York teams get same-day responses during their peak hours, and calls are booked to suit your calendar. The async, written rhythm means momentum does not depend on a specific meeting slot.'
        ]
      },
      {
        heading: 'Contracts and payments',
        body: [
          'Engagements run on a fixed-price services agreement with milestone billing, invoiced in US dollars, paid by ACH, wire or card via Stripe. You own all code, design files and hosting accounts from day one — clean handover, no lock-in.'
        ]
      },
      {
        heading: 'Built for the New York ecosystem',
        body: [
          'New York web work clusters around a few worlds: venture-backed startups racing to a launch, agencies needing dependable overflow, and established brands in finance, media and retail that expect polish. We fit all three.',
          'For startups, a fixed price and a fast launch tied to a raise. For agencies, white-label delivery we stand behind. For established brands, a rebuild that ships this quarter rather than an open-ended hourly engagement. The common thread is speed with a fixed number attached.'
        ]
      }
    
    ],
    caseStudyIntro: 'US clients we have shipped for:',
    caseStudySlugs: ['firmate', 'push-digital-group', 'nextsense'],
    faqs: [
      {
        q: 'Do you have New York clients specifically?',
        a: 'Our documented case studies are US clients rather than specifically New York ones — including Firmate, Push Digital and NextSense. We work with US businesses nationwide and hold the same standard for New York projects.'
      },
      {
        q: 'Do your hours overlap Eastern time?',
        a: 'Yes. We are available in real time through the New York morning and run projects asynchronously with a weekly written update, so responses are same-day during your peak hours.'
      },
      {
        q: 'How fast can you launch for a startup?',
        a: 'A standard business or SaaS launch site ships in two to three weeks from design approval, on a fixed price agreed before we start — useful when a launch is tied to a raise or a campaign.'
      },
      {
        q: 'How do payments work?',
        a: 'A fixed-price agreement with milestone billing, invoiced in USD, paid by ACH, wire or card via Stripe. No hourly meter.'
      },
      {
        q: 'Who owns the code and design?',
        a: 'You do, from day one — all code, files and hosting accounts, with no proprietary platform or licence fee.'
      },
      {
        q: 'Can you work as overflow for a NYC agency?',
        a: 'Yes. We regularly build under white-label arrangements for agencies that need reliable, fixed-price delivery on a fast timeline.'
      },
      {
        q: 'Do you offer post-launch support?',
        a: 'Yes — training at handover plus optional monthly maintenance for updates, backups, monitoring and small changes.'
      }
    ,
      {
        q: 'Can you rebuild an existing site quickly?',
        a: 'Yes. Redesigns on a fixed price and a two-to-four-week timeline are a core part of our US work, useful when a launch or campaign has a hard date.'
      }
    
    ],
    ctaHeading: 'Building something in New York?',
    ctaLine: 'Tell us about the project. We reply within one hour during Eastern business hours.'
  },

  /* ----------------------------------------------------------- MANCHESTER */
  {
    slug: 'web-design-agency-manchester',
    scope: 'city',
    region: 'uk',
    displayName: 'Manchester',
    inLocation: 'in Manchester',
    lang: 'en-GB',
    currency: '£',
    metaTitle: 'Web Design Agency Manchester — Fixed Price | Relicsol',
    metaDescription:
      'Manchester web design, e-commerce and SEO on fixed pricing with full ownership. Agency-quality builds without London rates, GDPR-correct and built for search.',
    h1Lead: 'A web design agency for',
    h1Accent: 'Manchester businesses.',
    intro: [
      'Manchester\'s digital, creative and e-commerce scene has grown into one of the strongest outside London, and the businesses in it want agency-quality work without paying London day rates. That is exactly the gap Relicsol fills: custom, owned-outright sites on a fixed price.',
      'We work remotely with businesses across the North West and the wider UK. To be straight with you, our documented case studies are UK clients rather than specifically Manchester ones — and the standard we hold for them is the standard we would bring to yours.'
    ],
    sections: [
      {
        heading: 'Web design for Manchester businesses',
        body: [
          'Whether you are an independent retailer in the Northern Quarter, a professional-services firm in Spinningfields or a growing e-commerce brand shipping nationwide, the fundamentals are the same: a fast, well-structured site that ranks locally and converts the traffic it earns. We scope it, quote a fixed price, and build it to be genuinely yours.',
          'Every build ships with Core Web Vitals in the green and local-search structure in place, because Manchester\'s competitive markets do not reward slow, generic template sites.'
        ]
      },
      {
        heading: 'UK clients we have built for',
        body: [
          'Our UK portfolio includes WatchHouse, a London specialty-coffee roaster with subscription commerce, and Core Atelier, an elevated fitness studio whose site became its strongest booking channel. They are London-based rather than Manchester-based, but the craft — editorial design, fast performance, conversion-tuned commerce — travels directly to any UK city.'
        ]
      },
      {
        heading: 'GDPR, VAT and the practical details',
        body: [
          'Sites are built consent-first for UK GDPR, invoiced in pounds with VAT-appropriate paperwork, and quoted with a written fixed price within 48 hours. No proprietary builder, no lock-in, no vague day-rate estimate that grows as the project runs.'
        ]
      },
      {
        heading: 'Remote collaboration that works',
        body: [
          'Manchester clients run their projects with us on a shared board and a weekly written update, with calls booked to suit. You get a senior team and a London-standard result without the central-Manchester or central-London overhead priced into the quote.'
        ]
      },
      {
        heading: 'Fixed pricing in pounds',
        body: [
          'Manchester businesses should not have to choose between a cheap template and a London day rate. Our pricing sits deliberately between them: a written, fixed quote in pounds within 48 hours, with a real number and a clear scope. A business site, a growth build or a custom project is priced before work begins, and the price holds.',
          'If the scope changes, we quote the change first, so the final invoice matches what you agreed. There is no day-rate meter running in the background and no lock-in once the site is live.'
        ]
      }
    
    ],
    caseStudyIntro: 'UK clients we have built for:',
    caseStudySlugs: ['watchhouse', 'core-atelier-pilates'],
    faqs: [
      {
        q: 'Do you have Manchester clients specifically?',
        a: 'Our documented case studies are UK clients such as WatchHouse and Core Atelier rather than specifically Manchester ones. We work with businesses across the UK and bring the same standard to Manchester projects.'
      },
      {
        q: 'Will my Manchester site rank locally?',
        a: 'We build every site with local-search structure, correct headings, schema markup and fast Core Web Vitals in place. For ongoing ranking work we offer a separate SEO service.'
      },
      {
        q: 'Do you invoice in pounds and handle VAT?',
        a: 'Yes — GBP invoicing with VAT-appropriate documentation, on a fixed price agreed in writing before work starts.'
      },
      {
        q: 'Do you work UK business hours?',
        a: 'Yes, our hours cover the UK working day and projects run on a shared board with a weekly written update.'
      },
      {
        q: 'Will I own the site and avoid lock-in?',
        a: 'You own all code, files and hosting accounts. There is no proprietary platform and no monthly licence keeping the site alive.'
      },
      {
        q: 'How much does a Manchester project cost?',
        a: 'A business site starts at £999 equivalent and a growth build at £1,499 equivalent, with your exact project scoped and quoted up front.'
      },
      {
        q: 'Do you offer maintenance for Manchester clients?',
        a: 'Yes. Optional monthly plans cover updates, backups, monitoring and small content changes, so your site stays fast and secure.'
      }
    ,
      {
        q: 'Can you redesign an existing Manchester site?',
        a: 'Yes. We rebuild underperforming UK sites for speed, structure, SEO and conversion, keeping what works and fixing what holds you back.'
      }
    
    ],
    ctaHeading: 'Building something in Manchester?',
    ctaLine: 'Tell us about the project. We reply within one hour during UK working hours.'
  },

  /* -------------------------------------------------------- LOS ANGELES */
  {
    slug: 'web-design-agency-los-angeles',
    scope: 'city',
    region: 'usa',
    displayName: 'Los Angeles',
    inLocation: 'in Los Angeles',
    lang: 'en-US',
    currency: '$',
    metaTitle: 'Web Design Agency Los Angeles — DTC & Brand | Relicsol',
    metaDescription:
      'Los Angeles web design and Shopify for DTC, wellness and media brands: visual-led commerce that converts, fixed pricing, full ownership, PST-overlapping hours.',
    h1Lead: 'A web design agency for',
    h1Accent: 'LA brands.',
    intro: [
      'Los Angeles brands live or die on how they look. DTC products, wellness, media and lifestyle companies need a site that feels as considered as the brand and still converts cold traffic into orders. That visual-led, commerce-first build is our comfort zone.',
      'We work remotely with US clients on hours that overlap the Pacific business day. To be straight with you, our case studies are US brands rather than specifically LA brands — and several are exactly the DTC and wellness profile LA is known for.'
    ],
    sections: [
      {
        heading: 'Built for LA\'s brands',
        body: [
          'Direct-to-consumer, wellness and creator-led brands need product pages that sell on feel as much as spec, fast image-heavy pages that still hit their performance targets, and a checkout tuned to convert paid traffic. We build exactly that, most often on Shopify, with the visual polish an LA audience expects.',
          'Because the whole project is scoped and quoted up front, a launch tied to a product drop or a campaign is not left waiting on an open-ended hourly engagement.'
        ]
      },
      {
        heading: 'US DTC and wellness clients we have shipped for',
        body: [
          'Our relevant US work includes Saki Products, a premium smart-kitchen DTC brand on Shopify; Drink Pouch, a performance-hydration store built to compete with the category leaders; and The Unleashed Heart, a warm personal-brand site for a coach that lifted discovery-call bookings 74%. Different products, the same LA-friendly instinct: brand-led, conversion-first.'
        ]
      },
      {
        heading: 'Pacific time-zone overlap',
        body: [
          'Our hours overlap the Pacific business day, so LA teams get responsive communication during their working hours, with calls booked to suit. The async, written project rhythm keeps momentum without depending on a fixed meeting time.'
        ]
      },
      {
        heading: 'Payments and contracts',
        body: [
          'A fixed-price services agreement with milestone billing, invoiced in US dollars, paid by ACH, wire or card via Stripe. All code, design files and hosting accounts are yours from day one, with no lock-in.'
        ]
      },
      {
        heading: 'Built for the creator and DTC economy',
        body: [
          'Los Angeles is where brand and commerce meet hardest — creator-led labels, DTC products and media companies that live on how they look and how well they convert attention into orders. Those brands need fast, image-heavy pages that still hit performance targets, product storytelling that sells on feel, and a checkout tuned for paid-social traffic.',
          'That is exactly the build we specialize in, most often on Shopify, and it is why our DTC and wellness case studies translate directly to the LA market. The brand carries the click; the build carries the conversion.'
        ]
      }
    
    ],
    caseStudyIntro: 'US DTC and wellness clients we have shipped for:',
    caseStudySlugs: ['saki-products', 'drink-pouch', 'the-unleashed-heart'],
    faqs: [
      {
        q: 'Do you have Los Angeles clients specifically?',
        a: 'Our documented case studies are US brands rather than specifically LA ones — including Saki Products, Drink Pouch and The Unleashed Heart, which match the DTC and wellness profile LA is known for. We hold the same standard for LA projects.'
      },
      {
        q: 'Do you build DTC and Shopify stores?',
        a: 'Yes — most of our DTC work is on Shopify, with brand-led product pages, fast image-heavy layouts and a checkout tuned to convert paid traffic.'
      },
      {
        q: 'Do your hours overlap Pacific time?',
        a: 'Yes. We are available through the Pacific business day and run projects asynchronously with a weekly written update, so responses are same-day during your hours.'
      },
      {
        q: 'How do payments work?',
        a: 'A fixed-price agreement with milestone billing, invoiced in USD, paid by ACH, wire or card via Stripe. No hourly meter.'
      },
      {
        q: 'Who owns the finished store?',
        a: 'You do — all code, files and hosting accounts from day one, with no platform lock-in or licence fee.'
      },
      {
        q: 'How quickly can you launch for a product drop?',
        a: 'A standard store ships in two to three weeks from design approval, on a fixed price agreed before we start, so a drop or campaign launch stays on schedule.'
      },
      {
        q: 'Do you offer support after launch?',
        a: 'Yes — training at handover plus optional monthly maintenance for updates, backups, monitoring and small changes.'
      }
    ,
      {
        q: 'Can you migrate my store to Shopify?',
        a: 'Yes. We handle Shopify migrations and redesigns for DTC brands, preserving products, URLs and SEO while upgrading the design and checkout.'
      }
    
    ],
    ctaHeading: 'Building a brand in LA?',
    ctaLine: 'Tell us about the project. We reply within one hour during Pacific business hours.'
  },

  /* ---------------------------------------------------------- AMSTERDAM */
  {
    slug: 'web-design-agency-amsterdam',
    scope: 'city',
    region: 'europe',
    displayName: 'Amsterdam',
    inLocation: 'in Amsterdam',
    lang: 'en-GB',
    currency: '€',
    metaTitle: 'Web Design Agency Amsterdam — E-commerce | Relicsol',
    metaDescription:
      'Amsterdam web design and e-commerce with Dutch design sensibility: iDEAL checkout, multilingual NL/EN, GDPR-first, fixed pricing and full ownership.',
    h1Lead: 'A web design agency for',
    h1Accent: 'Amsterdam brands.',
    intro: [
      'Dutch audiences have a particular design sensibility — clean, confident, unfussy — and they expect a checkout that speaks their language and offers iDEAL as a matter of course. We build for that, in fluent English, on a fixed price agreed before we start.',
      'We recently built a custom multi-vendor marketplace for a Dutch client, and that project shaped how we approach any Amsterdam brand: restrained design, solid commerce, and the local payment and language details handled properly.'
    ],
    sections: [
      {
        heading: 'A Dutch brand we have built for',
        body: [
          'House Wine is an independent Dutch wine marketplace, and we built it as a custom multi-vendor WooCommerce platform with a Dutch design sensibility and AI cellar features underneath. Getting a marketplace right means the design stays calm while the logic underneath handles many sellers, many products and a smooth buyer journey — and that is what we delivered.'
        ]
      },
      {
        heading: 'Design the Dutch way',
        body: [
          'Amsterdam brands tend to want less, done better: clear typography, generous space, no ornament for its own sake. That restraint is harder than it looks, and it is exactly the aesthetic our dark, editorial style is built around. The result feels at home in the Dutch market rather than imported.'
        ]
      },
      {
        heading: 'iDEAL and European payments',
        body: [
          'A Dutch store without iDEAL is losing sales at checkout — it is the payment method most Dutch shoppers expect. We integrate iDEAL alongside SEPA, card and Klarna where it fits, through Stripe or your platform\'s native gateway, invoiced to you in euros.'
        ]
      },
      {
        heading: 'Multilingual NL/EN and GDPR',
        body: [
          'Many Amsterdam brands sell to both Dutch and international customers, so we build proper NL/EN multilingual structures with correct hreflang, and everything is GDPR-first: consent before non-essential cookies, minimal data collection, a clean basis for your privacy documentation.'
        ]
      },
      {
        heading: 'Built for the Dutch scale-up scene',
        body: [
          'Amsterdam punches far above its size in e-commerce and scale-ups, and those companies want the same thing: a site that looks unmistakably Dutch — clean and confident — and a commerce layer that scales without drama.',
          'Whether that is a marketplace with many sellers, a subscription product or a cross-border store selling into Germany and Belgium, we build the design and the logic to match. English is the working language throughout, so nothing is lost in translation and reviews move quickly.'
        ]
      },
      {
        heading: 'Selling beyond the Netherlands',
        body: [
          'Most Amsterdam brands do not stop at the Dutch border. Germany and Belgium are a short hop away, and a store that only speaks Dutch and only takes iDEAL leaves those markets on the table. We build the multilingual structure, the extra payment methods and the VAT handling so expanding into a neighbouring market is a configuration change, not a rebuild.',
          'That forward planning is cheaper done once, up front, than retrofitted later. We scope the build around where you want to sell in a year, not just where you sell today, so your first international customer does not trigger a second project.'
        ]
      }
    ],
    caseStudyIntro: 'A Dutch project we are proud of:',
    caseStudySlugs: ['house-wine'],
    faqs: [
      {
        q: 'Do you understand Dutch design expectations?',
        a: 'Yes — our editorial, restrained style suits the Dutch preference for clean, confident, unfussy design, and our House Wine marketplace was built with exactly that sensibility.'
      },
      {
        q: 'Can you integrate iDEAL?',
        a: 'Yes. We integrate iDEAL alongside SEPA, card and Klarna through Stripe or your platform\'s native gateway — essential for converting Dutch shoppers at checkout.'
      },
      {
        q: 'Can you build a Dutch/English multilingual site?',
        a: 'Yes, with proper per-language URL structure and correct hreflang so both NL and EN versions rank in their own right rather than competing.'
      },
      {
        q: 'Are your builds GDPR compliant?',
        a: 'Yes, consent-first with minimal data collection and a clean technical basis for your privacy documentation.'
      },
      {
        q: 'Do you invoice in euros?',
        a: 'Yes, EUR invoicing on a fixed price agreed in writing before work begins.'
      },
      {
        q: 'Who owns the finished site?',
        a: 'You do — all code, files and hosting accounts, with no platform lock-in or licence fee.'
      },
      {
        q: 'Do you offer maintenance after launch?',
        a: 'Yes. Optional monthly plans cover updates, backups, monitoring and small changes across your Dutch and English versions.'
      }
    ,
      {
        q: 'Can you build a marketplace or subscription store?',
        a: 'Yes. Our House Wine build is a custom multi-vendor marketplace; we build subscription and multi-seller commerce on WooCommerce and Shopify.'
      }
    
    ],
    ctaHeading: 'Building a brand in Amsterdam?',
    ctaLine: 'Tell us about the project, in English, and we reply within one hour during CET working hours.'
  },

  /* -------------------------------------------------------------- BERLIN */
  {
    slug: 'web-design-agency-berlin',
    scope: 'city',
    region: 'europe',
    displayName: 'Berlin',
    inLocation: 'in Berlin',
    lang: 'en-GB',
    currency: '€',
    metaTitle: 'Web Design Agency Berlin — Next.js Builds | Relicsol',
    metaDescription:
      'Berlin web design and performance-first Next.js for startups and premium brands: German-standard quality, strict GDPR, SEPA checkout, fixed pricing, full ownership.',
    h1Lead: 'A web design agency for',
    h1Accent: 'Berlin brands.',
    intro: [
      'Berlin runs on two engines: a relentless startup scene and a deep respect for German product quality. Both want the same thing from a website — precision, speed and no corners cut. We build performance-first sites, often on Next.js, to exactly that standard, on a fixed price agreed before we start.',
      'We recently rebuilt the site for a German premium-product brand, and that work informs how we approach any Berlin project: rigorous, fast and correct down to the details German audiences notice.'
    ],
    sections: [
      {
        heading: 'A German brand we have built for',
        body: [
          'Silberthal makes premium German kitchenware, and we rebuilt their commerce experience around the brand\'s 100-day trial and the trust signals that carry a considered purchase — photography-led, calm, and built to convert a discerning German buyer. Getting a premium German brand right means the quality of the build has to match the quality of the product, and that was the bar.'
        ]
      },
      {
        heading: 'Performance and precision',
        body: [
          'German audiences notice a slow or sloppy site, and Berlin\'s technical crowd doubly so. We build performance-first — often on Next.js with sub-second loads and full SEO control — and hold every build to Core Web Vitals in the green. Nothing ships that we would not be comfortable putting our name to.'
        ]
      },
      {
        heading: 'GDPR, taken as seriously as Germany does',
        body: [
          'Germany enforces data protection more strictly than almost anywhere, and German buyers expect it. We build consent-first: no non-essential cookies before opt-in, data collection limited to genuine need, and a clean technical foundation for your Datenschutzerklärung.'
        ]
      },
      {
        heading: 'SEPA, payments and DE/EN',
        body: [
          'We integrate SEPA direct debit alongside card and the methods German shoppers use, through Stripe or your platform\'s gateway, invoiced in euros. Where you sell to both German and international customers, we build proper DE/EN multilingual structures with correct hreflang.'
        ]
      },
      {
        heading: 'Built for Berlin\'s startups and premium makers',
        body: [
          'Berlin holds two demanding audiences at once: a fast, technical startup scene that judges a site on its performance, and premium product makers who judge it on its craft. We build for both.',
          'Startups get performance-first Next.js with sub-second loads and full SEO control; premium brands get the photography-led, precise commerce that a considered German purchase demands. Both get a fixed price, a real timeline, and a build we would put our name to.'
        ]
      },
      {
        heading: 'From MVP to scale',
        body: [
          'Berlin startups rarely need everything on day one. They need a credible, fast site that ships now and a foundation that will not have to be thrown away when the next funding round changes the plan. We build the first version lean and correct, then extend it as you grow, rather than over-engineering something you do not need yet.',
          'Because you own the codebase and it is built on standard, well-documented technology, you are never trapped. Your own developers can pick it up later, or we can keep building alongside you. Either way the site scales with the company instead of becoming the thing you have to replace.'
        ]
      }
    ],
    caseStudyIntro: 'A German project we are proud of:',
    caseStudySlugs: ['silberthal'],
    faqs: [
      {
        q: 'Can you meet German quality expectations?',
        a: 'Yes — our Silberthal rebuild was built to match a premium German product, performance-first and precise. We hold every build to Core Web Vitals in the green and a standard we would put our name to.'
      },
      {
        q: 'How strictly do you handle GDPR?',
        a: 'Consent-first by default: no non-essential cookies before opt-in, minimal data collection, and a clean technical basis for your Datenschutzerklärung — appropriate for Germany\'s strict enforcement.'
      },
      {
        q: 'Can you integrate SEPA and German payment methods?',
        a: 'Yes — SEPA direct debit alongside card and other methods German shoppers use, through Stripe or your platform\'s native gateway, invoiced in euros.'
      },
      {
        q: 'Do you build with Next.js?',
        a: 'Yes. For performance-critical and premium builds we use Next.js for sub-second loads and full SEO control — a good fit for Berlin\'s technical audience.'
      },
      {
        q: 'Can you build a German/English multilingual site?',
        a: 'Yes, with proper per-language URL structure and correct hreflang so DE and EN versions each rank on their own.'
      },
      {
        q: 'Who owns the finished site?',
        a: 'You do — all code, files and hosting accounts, with no platform lock-in or licence fee.'
      },
      {
        q: 'Do you offer support after launch?',
        a: 'Yes — training at handover plus optional monthly maintenance for updates, backups, monitoring and small changes.'
      }
    ,
      {
        q: 'Can you build a headless or Next.js store?',
        a: 'Yes. For performance-critical German builds we use Next.js with a headless CMS or Shopify backend for sub-second loads and full SEO control.'
      }
    
    ],
    ctaHeading: 'Building a brand in Berlin?',
    ctaLine: 'Tell us about the project, in English, and we reply within one hour during CET working hours.'
  }
];

export const locationBySlug: Record<string, LocationPage> = Object.fromEntries(
  locationPages.map((l) => [l.slug, l])
);
