import { readFileSync, writeFileSync } from 'node:fs';

// Featured-image assignment per post slug. Anchors on the readMinutes→image
// field sequence so `slug` mentions inside `related` arrays never match.
const map = {
  'ai-automation':       '/images/blog-ai-automation.webp',
  'local-seo':           '/images/blog-local-seo.webp',
  'seo-small-business':  '/images/blog-seo-small-business.webp',
  'website-maintenance': '/images/blog-website-maintenance.webp'
};

let s = readFileSync('lib/blogPosts.ts', 'utf8');
let hits = 0;

for (const [slug, img] of Object.entries(map)) {
  const re = new RegExp(
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
console.log(`rewrote ${hits}/${Object.keys(map).length}`);
