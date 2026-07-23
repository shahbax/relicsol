import { readFileSync, writeFileSync } from 'node:fs';

// Adds one more genuinely market-specific section (2 paragraphs) and two more
// unique FAQs to each location page, to lift the unique on-page copy over 800
// words without repetition across pages.

const esc = (s) => s.replace(/'/g, "\\'");
const sectionLit = (heading, body) =>
  `      {\n        heading: '${esc(heading)}',\n        body: [\n` +
  body.map((p) => `          '${esc(p)}'`).join(',\n') +
  `\n        ]\n      }\n    `;
const faqLit = (q, a) => `      {\n        q: '${esc(q)}',\n        a: '${esc(a)}'\n      }\n    `;

const data = {
  'web-design-agency-usa': {
    section: {
      heading: 'Fixed pricing, in plain dollars',
      body: [
        'Our pricing is public and quoted in US dollars: a five-page business site from $999, a ten-page growth build from $1,499, and custom software or AI automation from $2,000. You get a written proposal with a real number inside 48 hours, not a range, not a "starting from", and not a discovery retainer you pay before you know the cost.',
        'That transparency is deliberate. In a US market where agency quotes routinely climb between the pitch and the final invoice, knowing the price before you commit is the difference between a project you can budget and one you cannot. If the scope changes mid-build, we quote the change before we do it.'
      ]
    },
    faqs: [
      { q: 'Do you offer ongoing support after launch?', a: 'Yes. You get a handover with training so your team can update content, plus optional monthly maintenance covering updates, backups, uptime monitoring and small changes.' },
      { q: 'Can you redesign an existing US site?', a: 'Yes. Redesigns are a large part of our US work — we rebuild underperforming sites for better structure, speed, SEO and conversion while keeping what already works.' }
    ]
  },
  'web-design-agency-uk': {
    section: {
      heading: 'Fixed pricing in pounds, quoted up front',
      body: [
        'British businesses are used to the "price on application" quote that turns into a negotiation. We do the opposite: a written, fixed proposal in pounds within 48 hours, with a real number and a clear scope. A five-page business site, a ten-page growth build or a custom software project is priced before a line of code is written, and the price holds.',
        'If your requirements change part-way through, we quote the change before doing it, so an invoice never surprises you at the end of the month. No day-rate meter, no scope-creep billing.'
      ]
    },
    faqs: [
      { q: 'Do you offer maintenance after launch?', a: 'Yes. Optional monthly plans cover security and plugin updates, backups, uptime monitoring and small content changes, so your site stays fast and secure without you managing it.' },
      { q: 'Can you improve an existing UK website?', a: 'Yes. We rebuild underperforming UK sites for speed, structure, SEO and conversion, keeping the parts that work and fixing the parts that hold you back.' }
    ]
  },
  'web-design-agency-europe': {
    section: {
      heading: 'One team across many markets',
      body: [
        'The alternative to a single multi-market partner is juggling a different agency in each country, each with its own standards, timelines and invoices. We build and maintain the whole thing as one system, so your German, Dutch and French storefronts share a codebase, a design language and a single point of contact.',
        'That consistency matters for brand, and it matters even more for maintenance: one update applied everywhere, rather than three agencies to coordinate. It also keeps your analytics and SEO structure coherent across every market you sell into.'
      ]
    },
    faqs: [
      { q: 'Can you maintain the site after launch?', a: 'Yes. Optional maintenance covers updates, backups, monitoring and small changes across all your language versions from one place.' },
      { q: 'Do you work with European agencies as a build partner?', a: 'Yes. We regularly deliver white-label builds for European agencies that need reliable, fixed-price development across multiple markets and languages.' }
    ]
  },
  'web-design-agency-london': {
    section: {
      heading: 'London sectors we know',
      body: [
        'London is not one market but several, and the web needs differ sharply between them. Hospitality and specialty retail need subscription and booking commerce that feels effortless. Fintech and professional services need credibility and speed above all. Creative and lifestyle brands need editorial design that photographs as well as it converts.',
        'We have built across these worlds, and we tailor the approach to the sector rather than applying one template to all of them. A London coffee subscription and a London consultancy should not, and do not, get the same site from us.'
      ]
    },
    faqs: [
      { q: 'Do you offer ongoing support for London clients?', a: 'Yes — a handover with training plus optional monthly maintenance covering updates, backups, monitoring and small changes.' },
      { q: 'Can you rebuild an existing London website?', a: 'Yes. Redesigns are common in our London work; we rebuild dated or underperforming sites for speed, SEO and conversion while preserving brand equity.' }
    ]
  },
  'web-design-agency-new-york': {
    section: {
      heading: 'Built for the New York ecosystem',
      body: [
        'New York web work clusters around a few worlds: venture-backed startups racing to a launch, agencies needing dependable overflow, and established brands in finance, media and retail that expect polish. We fit all three.',
        'For startups, a fixed price and a fast launch tied to a raise. For agencies, white-label delivery we stand behind. For established brands, a rebuild that ships this quarter rather than an open-ended hourly engagement. The common thread is speed with a fixed number attached.'
      ]
    },
    faqs: [
      { q: 'Do you offer post-launch support?', a: 'Yes — training at handover plus optional monthly maintenance for updates, backups, monitoring and small changes.' },
      { q: 'Can you rebuild an existing site quickly?', a: 'Yes. Redesigns on a fixed price and a two-to-four-week timeline are a core part of our US work, useful when a launch or campaign has a hard date.' }
    ]
  },
  'web-design-agency-manchester': {
    section: {
      heading: 'Fixed pricing in pounds',
      body: [
        'Manchester businesses should not have to choose between a cheap template and a London day rate. Our pricing sits deliberately between them: a written, fixed quote in pounds within 48 hours, with a real number and a clear scope. A business site, a growth build or a custom project is priced before work begins, and the price holds.',
        'If the scope changes, we quote the change first, so the final invoice matches what you agreed. There is no day-rate meter running in the background and no lock-in once the site is live.'
      ]
    },
    faqs: [
      { q: 'Do you offer maintenance for Manchester clients?', a: 'Yes. Optional monthly plans cover updates, backups, monitoring and small content changes, so your site stays fast and secure.' },
      { q: 'Can you redesign an existing Manchester site?', a: 'Yes. We rebuild underperforming UK sites for speed, structure, SEO and conversion, keeping what works and fixing what holds you back.' }
    ]
  },
  'web-design-agency-los-angeles': {
    section: {
      heading: 'Built for the creator and DTC economy',
      body: [
        'Los Angeles is where brand and commerce meet hardest — creator-led labels, DTC products and media companies that live on how they look and how well they convert attention into orders. Those brands need fast, image-heavy pages that still hit performance targets, product storytelling that sells on feel, and a checkout tuned for paid-social traffic.',
        'That is exactly the build we specialize in, most often on Shopify, and it is why our DTC and wellness case studies translate directly to the LA market. The brand carries the click; the build carries the conversion.'
      ]
    },
    faqs: [
      { q: 'Do you offer support after launch?', a: 'Yes — training at handover plus optional monthly maintenance for updates, backups, monitoring and small changes.' },
      { q: 'Can you migrate my store to Shopify?', a: 'Yes. We handle Shopify migrations and redesigns for DTC brands, preserving products, URLs and SEO while upgrading the design and checkout.' }
    ]
  },
  'web-design-agency-amsterdam': {
    section: {
      heading: 'Built for the Dutch scale-up scene',
      body: [
        'Amsterdam punches far above its size in e-commerce and scale-ups, and those companies want the same thing: a site that looks unmistakably Dutch — clean and confident — and a commerce layer that scales without drama.',
        'Whether that is a marketplace with many sellers, a subscription product or a cross-border store selling into Germany and Belgium, we build the design and the logic to match. English is the working language throughout, so nothing is lost in translation and reviews move quickly.'
      ]
    },
    faqs: [
      { q: 'Do you offer maintenance after launch?', a: 'Yes. Optional monthly plans cover updates, backups, monitoring and small changes across your Dutch and English versions.' },
      { q: 'Can you build a marketplace or subscription store?', a: 'Yes. Our House Wine build is a custom multi-vendor marketplace; we build subscription and multi-seller commerce on WooCommerce and Shopify.' }
    ]
  },
  'web-design-agency-berlin': {
    section: {
      heading: "Built for Berlin's startups and premium makers",
      body: [
        'Berlin holds two demanding audiences at once: a fast, technical startup scene that judges a site on its performance, and premium product makers who judge it on its craft. We build for both.',
        'Startups get performance-first Next.js with sub-second loads and full SEO control; premium brands get the photography-led, precise commerce that a considered German purchase demands. Both get a fixed price, a real timeline, and a build we would put our name to.'
      ]
    },
    faqs: [
      { q: 'Do you offer support after launch?', a: 'Yes — training at handover plus optional monthly maintenance for updates, backups, monitoring and small changes.' },
      { q: 'Can you build a headless or Next.js store?', a: 'Yes. For performance-critical German builds we use Next.js with a headless CMS or Shopify backend for sub-second loads and full SEO control.' }
    ]
  }
};

let src = readFileSync('lib/locations.ts', 'utf8');
let ok = 0;

for (const [slug, add] of Object.entries(data)) {
  // Insert the extra section before `],\n    caseStudyIntro:` within this page.
  const secRe = new RegExp(
    "(slug: '" + slug + "'[\\s\\S]*?)(\\n    \\],\\n    caseStudyIntro:)"
  );
  const b1 = src;
  src = src.replace(secRe, (m, pre, post) => `${pre},\n${sectionLit(add.section.heading, add.section.body)}${post}`);
  // Insert the extra FAQs before `],\n    ctaHeading:` within this page.
  const faqRe = new RegExp("(slug: '" + slug + "'[\\s\\S]*?)(\\n    \\],\\n    ctaHeading:)");
  src = src.replace(faqRe, (m, pre, post) => `${pre},\n${add.faqs.map((f) => faqLit(f.q, f.a)).join(',\n')}${post}`);
  if (src !== b1) {
    ok++;
    console.log(`  ✓ ${slug}`);
  } else {
    console.log(`  ✗ MISS ${slug}`);
  }
}

writeFileSync('lib/locations.ts', src, 'utf8');
console.log(`expanded ${ok}/${Object.keys(data).length} pages`);
