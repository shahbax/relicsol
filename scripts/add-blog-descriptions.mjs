import { readFileSync, writeFileSync } from 'node:fs';

// Written meta descriptions (140–155 chars), one per post. Each states the
// article's value and gives a reason to click.
const descriptions = {
  'website-maintenance':
    'What website maintenance actually involves in 2026: which tasks are essential, which can wait, and whether to handle it in-house or hire it out.',
  'local-seo':
    'A practical local SEO playbook for service businesses: Google Business Profile, citations, reviews and the ranking factors that win the map pack.',
  'shopify-vs-woocommerce':
    'Shopify or WooCommerce for your store in 2026? An honest comparison of cost, control, scalability and ownership to help you choose the right one.',
  'n8n-vs-make':
    'n8n vs Make.com compared for real businesses: pricing, flexibility, ease of use and which automation platform actually fits your team and stack.',
  'ecommerce-cro':
    'Twelve conversion changes that measurably lift e-commerce revenue, from product pages to checkout, ranked by real impact versus effort to ship.',
  'web-design-trends':
    'The 2026 web design trends worth adopting and the ones to skip, judged on real impact to conversions, performance and brand credibility.',
  'wordpress-vs-nextjs':
    'WordPress or Next.js for your business website in 2026? Compare speed, SEO, cost and maintenance to pick the right foundation for growth.',
  'seo-small-business':
    'What actually moves search rankings for small businesses in 2026, which tactics waste your budget, and a realistic SEO plan to start this month.',
  'website-cost':
    'Real business website pricing for the USA and UK in 2026: what each budget tier gets you, where the money goes, and how to avoid overpaying.',
  'ai-automation':
    'How AI automation reclaims 20+ hours a week for your team: the highest-impact workflows to automate, the tools that do it, and the ROI to expect.'
};

let s = readFileSync('lib/blogPosts.ts', 'utf8');
let inserted = 0;
const report = [];

for (const [slug, desc] of Object.entries(descriptions)) {
  // Anchor on the top-level post block: slug -> ... -> excerpt line,
  // then insert the description field right after excerpt.
  const re = new RegExp(
    '(\\n    slug: `' + slug + '`,[\\s\\S]*?\\n    excerpt: `[^`]*`,\\n)'
  );
  const before = s;
  s = s.replace(re, `$1    description: \`${desc}\`,\n`);
  if (s !== before) {
    inserted++;
    report.push(`  ✓ ${slug}  (${desc.length} chars)`);
  } else {
    report.push(`  ✗ MISS ${slug}`);
  }
}

writeFileSync('lib/blogPosts.ts', s, 'utf8');
console.log(report.join('\n'));
console.log(`inserted ${inserted}/${Object.keys(descriptions).length}`);
