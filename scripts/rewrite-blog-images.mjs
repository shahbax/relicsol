import { readFileSync, writeFileSync } from 'node:fs';

// Each top-level BlogPost has this shape at 4-space indentation:
//   slug: `xxx`,
//   category: ...,
//   title: ...,
//   excerpt: ...,
//   date: ...,
//   isoDate: ...,
//   readMinutes: N,
//   image: `/images/...`,
// We anchor on the `readMinutes` → `image` sequence to avoid matching `slug`s inside
// the `related` arrays (which are indented deeper).

const map = {
  'ai-automation':          '/images/AI-automation-services.webp',
  'n8n-vs-make':            '/images/AI-automation-workflow.webp',
  'local-seo':              '/images/SEO-services-small-business.webp',
  'seo-small-business':     '/images/SEO-services-small-business.webp',
  'ecommerce-cro':          '/images/s1-card-img-1.webp',
  'shopify-vs-woocommerce': '/images/s1-card-img-2.webp',
  'web-design-trends':      '/images/s1-card-img-3.webp',
  'website-cost':           '/images/s1-card-img-4.webp',
  'website-maintenance':    '/images/s1-card-img-1.webp',
  'wordpress-vs-nextjs':    '/images/s1-card-img-2.webp'
};

let s = readFileSync('lib/blogPosts.ts', 'utf8');
let hits = 0;

for (const [slug, img] of Object.entries(map)) {
  // Match:  slug: `X`, at start of a top-level post (4-space indent) → then any content up to
  // the same object's readMinutes: N,\n    image: `Y`,
  const re = new RegExp(
    // Anchor: 4-space-indented `slug: \`SLUG\`,`
    '(\\n    slug:\\s*`' + slug + '`,[\\s\\S]*?readMinutes:\\s*\\d+,\\s*\\n    image:\\s*)`[^`]+`',
    ''
  );
  const before = s;
  s = s.replace(re, `$1\`${img}\``);
  if (s !== before) {
    hits++;
    console.log(`  ✓ ${slug} → ${img}`);
  } else {
    console.log(`  ✗ MISS ${slug}`);
  }
}
writeFileSync('lib/blogPosts.ts', s, 'utf8');
console.log(`rewrote ${hits}/10 blog images`);
