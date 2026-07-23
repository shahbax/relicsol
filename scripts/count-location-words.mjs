import { readFileSync } from 'node:fs';

// Count the unique on-page copy per location (intro + section bodies + FAQ
// question/answer), excluding shared nav/footer chrome and short meta fields.
const src = readFileSync('lib/locations.ts', 'utf8');

const parts = src.split(/slug: '(web-design-agency-[a-z-]+)'/);
// parts = [pre, slug1, body1, slug2, body2, ...]
for (let i = 1; i < parts.length; i += 2) {
  const slug = parts[i];
  const body = parts[i + 1] || '';
  // Only the content between intro: and ctaHeading: (skips meta/h1/labels).
  const start = body.indexOf('intro:');
  const end = body.indexOf('ctaHeading:');
  const region = start >= 0 && end > start ? body.slice(start, end) : body;
  // Pull single-quoted JS strings (handling escaped apostrophes).
  const strings = [...region.matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]);
  const copy = strings.filter((s) => /\s/.test(s)).join(' ');
  const words = copy.trim().split(/\s+/).filter(Boolean).length;
  console.log(`  ${slug.padEnd(30)} ${String(words).padStart(4)} words ${words >= 800 ? '✓' : '⚠ under 800'}`);
}
