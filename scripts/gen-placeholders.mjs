// Generates SVG placeholder images for case studies and blog posts.
// Real product photography and blog covers should replace these in public/images/.

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images');
mkdirSync(outDir, { recursive: true });

const caseStudies = [
  { slug: 'sakiproducts', name: 'Saki Products', colors: ['#064e3b', '#022c22'] },
  { slug: 'pushdigital', name: 'Push Digital Group', colors: ['#1e293b', '#0f172a'] },
  { slug: 'loiseau', name: "L'Oiseau De", colors: ['#7c2d12', '#431407'] },
  { slug: 'nextsense', name: 'NextSense', colors: ['#1e3a8a', '#0c1e3e'] },
  { slug: 'forerunnersgroup', name: 'Forerunners Group', colors: ['#374151', '#111827'] },
  { slug: 'housewine', name: 'House Wine', colors: ['#3f2418', '#1c0f08'] },
  { slug: 'firmate', name: 'Firmate', colors: ['#4c1d95', '#1e1b4b'] },
  { slug: 'farmminerals', name: 'Farm Minerals', colors: ['#365314', '#1a2e05'] },
  { slug: 'evanlite', name: 'Evanlite', colors: ['#27272a', '#09090b'] },
  { slug: 'coreatelierpilates', name: 'Core Atelier', colors: ['#78350f', '#3a1d05'] },
  { slug: 'drinkpouch', name: 'Drink Pouch', colors: ['#0c4a6e', '#082f49'] },
  { slug: 'wpcustomthemes', name: 'Sophia Pro', colors: ['#1e1b4b', '#0a0a1f'] },
  { slug: 'yucca', name: 'Yucca Packaging', colors: ['#475569', '#1e293b'] },
  { slug: 'silberthal', name: 'Silberthal', colors: ['#292524', '#0c0a09'] },
  { slug: 'strategicgears', name: 'Strategic Gears', colors: ['#0f172a', '#020617'] },
  { slug: 'thetrendchartist', name: 'The Trend Chartist', colors: ['#164e63', '#083344'] },
  { slug: 'theunleashedheart', name: 'The Unleashed Heart', colors: ['#831843', '#500724'] },
  { slug: 'watchhouse', name: 'WatchHouse', colors: ['#44403c', '#0c0a09'] }
];

const blog = [
  { slug: 'b1-img-1', name: 'Relicsol Blog', colors: ['#4c1d95', '#1e1b4b'] },
  { slug: 'b1-img-2', name: 'Relicsol Blog', colors: ['#0c4a6e', '#082f49'] }
];

const logo = {
  slug: 'logo',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F97316"/><stop offset="1" stop-color="#c2410c"/></linearGradient></defs><rect width="256" height="256" rx="40" fill="url(#g)"/><text x="128" y="176" fill="#fff" font-family="JetBrains Mono, monospace" font-size="160" font-weight="700" text-anchor="middle">R</text></svg>`
};
writeFileSync(join(outDir, 'logo.svg'), logo.svg);

function svgFor({ slug, name, colors }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g_${slug.replace(/[^a-z0-9]/gi, '')}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${colors[0]}"/><stop offset="1" stop-color="${colors[1]}"/></linearGradient></defs><rect width="1600" height="900" fill="url(#g_${slug.replace(/[^a-z0-9]/gi, '')})"/><g opacity="0.28"><circle cx="200" cy="800" r="220" fill="#F97316"/><circle cx="1400" cy="120" r="180" fill="#FFAD5C"/></g><g fill="rgba(255,255,255,0.85)" font-family="Syne, Inter, sans-serif" text-anchor="middle" font-weight="700"><text x="800" y="470" font-size="88" letter-spacing="-3">${name}</text><text x="800" y="540" font-size="24" fill="rgba(255,255,255,0.5)" font-weight="400" letter-spacing="8">RELICSOL · CASE STUDY</text></g></svg>`;
}

for (const c of caseStudies) {
  writeFileSync(join(outDir, `${c.slug}.webp.svg`), svgFor(c));
  // Also emit under expected .webp name — Next/Image will refuse a mislabelled binary, so we ship the SVG under the exact filename the data references (with the .webp extension) as SVG bytes. Next will treat it as unknown format; safer route: emit under .svg AND rewrite the data. Handled by the accompanying rewrite step in package.json.
}

// Emit SVGs at the exact filenames the data references, keeping them valid SVG bytes.
for (const c of caseStudies) {
  writeFileSync(join(outDir, `${c.slug}.svg`), svgFor(c));
}
for (const b of blog) {
  writeFileSync(join(outDir, `${b.slug}.svg`), svgFor(b));
}

console.log(`✓ Wrote ${caseStudies.length + blog.length + 1} placeholder SVGs to ${outDir}`);
