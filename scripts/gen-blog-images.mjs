// Generates the four topic blog cover images as lightweight brand-themed WebP.
// Pure vector (no text) so rendering is deterministic across machines.
// Run: node scripts/gen-blog-images.mjs

import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');
mkdirSync(outDir, { recursive: true });

const W = 1600;
const H = 900;

// Phosphor icon paths (256 viewBox)
const ICONS = {
  robot:
    'M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16ZM164,140a8,8,0,1,1-8-8A8,8,0,0,1,164,140Zm-64,0a8,8,0,1,1-8-8A8,8,0,0,1,100,140Z',
  mapPin:
    'M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z',
  magnifier:
    'M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z',
  wrench:
    'M226.76,69a8,8,0,0,0-12.84-2.88l-40.3,37.19-17.23-3.7-3.7-17.23,37.19-40.3A8,8,0,0,0,187,29.24,72,72,0,0,0,88,96a72.34,72.34,0,0,0,6,28.94L33.79,185c-.15.12-.29.26-.43.39a32,32,0,0,0,45.26,45.26c.13-.13.27-.28.39-.42L139.06,170a72,72,0,0,0,87.7-101Z'
};

// Per-topic accent composition drawn behind the icon tile
const MOTIFS = {
  // Connected node graph — automation workflow
  ai: `
    <g stroke="#F97316" stroke-width="3" opacity="0.5" fill="none">
      <path d="M1050 620 L1220 480 L1390 560"/>
      <path d="M1220 480 L1260 300 L1440 250"/>
      <path d="M1050 620 L980 400 L1260 300"/>
    </g>
    <g fill="#F97316">
      <circle cx="1050" cy="620" r="14" opacity="0.9"/>
      <circle cx="1220" cy="480" r="20"/>
      <circle cx="1390" cy="560" r="12" opacity="0.7"/>
      <circle cx="1260" cy="300" r="16" opacity="0.85"/>
      <circle cx="980" cy="400" r="10" opacity="0.6"/>
      <circle cx="1440" cy="250" r="12" opacity="0.7"/>
    </g>
    <g fill="none" stroke="#FFAD5C" stroke-width="2" opacity="0.35">
      <circle cx="1220" cy="480" r="42"/>
      <circle cx="1260" cy="300" r="34"/>
    </g>`,
  // Radiating local-radius rings around a spot
  local: `
    <g fill="none" stroke="#F97316">
      <circle cx="1220" cy="460" r="90"  stroke-width="3" opacity="0.55"/>
      <circle cx="1220" cy="460" r="170" stroke-width="2.5" opacity="0.35"/>
      <circle cx="1220" cy="460" r="260" stroke-width="2" opacity="0.2"/>
      <circle cx="1220" cy="460" r="360" stroke-width="1.5" opacity="0.12"/>
    </g>
    <g fill="#F97316">
      <circle cx="1370" cy="380" r="9" opacity="0.8"/>
      <circle cx="1100" cy="580" r="7" opacity="0.6"/>
      <circle cx="1330" cy="590" r="8" opacity="0.7"/>
      <circle cx="1090" cy="360" r="6" opacity="0.5"/>
    </g>`,
  // Rising ranking bars
  seo: `
    <g fill="#F97316">
      <rect x="1030" y="560" width="70" height="120" rx="6" opacity="0.35"/>
      <rect x="1130" y="490" width="70" height="190" rx="6" opacity="0.55"/>
      <rect x="1230" y="410" width="70" height="270" rx="6" opacity="0.75"/>
      <rect x="1330" y="310" width="70" height="370" rx="6"/>
    </g>
    <path d="M1050 520 L1160 440 L1260 360 L1380 250" fill="none" stroke="#FFAD5C" stroke-width="5" stroke-linecap="round" opacity="0.9"/>
    <path d="M1380 250 l-34 4 22 26 z" fill="#FFAD5C" opacity="0.9"/>`,
  // Gear + orbiting maintenance dots
  maintenance: `
    <g fill="none" stroke="#F97316" stroke-width="3" opacity="0.5">
      <circle cx="1240" cy="450" r="150" stroke-dasharray="26 18"/>
      <circle cx="1240" cy="450" r="240" stroke-width="2" stroke-dasharray="4 22" opacity="0.6"/>
    </g>
    <g fill="#F97316">
      <circle cx="1240" cy="300" r="12"/>
      <circle cx="1390" cy="450" r="9" opacity="0.7"/>
      <circle cx="1240" cy="600" r="9" opacity="0.55"/>
      <circle cx="1090" cy="450" r="7" opacity="0.4"/>
    </g>`
};

function svgFor({ motif, icon }) {
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#111111"/>
      <stop offset="1" stop-color="#080808"/>
    </linearGradient>
    <linearGradient id="tile" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F97316"/>
      <stop offset="1" stop-color="#C2410C"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.42" r="0.6">
      <stop offset="0" stop-color="#F97316" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#F97316" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Subtle grid -->
  <g stroke="#1d1d1d" stroke-width="1">
    ${Array.from({ length: 15 }, (_, i) => `<line x1="${(i + 1) * 100}" y1="0" x2="${(i + 1) * 100}" y2="${H}"/>`).join('')}
    ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${(i + 1) * 100}" x2="${W}" y2="${(i + 1) * 100}"/>`).join('')}
  </g>

  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  ${MOTIFS[motif]}

  <!-- Brand tile with topic icon, left-center -->
  <g transform="translate(190, 330)">
    <rect width="240" height="240" rx="28" fill="url(#tile)"/>
    <g transform="translate(44, 44) scale(0.6)">
      <path d="${ICONS[icon]}" fill="#ffffff"/>
    </g>
  </g>

  <!-- Accent underline bar -->
  <rect x="190" y="630" width="120" height="6" rx="3" fill="#F97316"/>
  <rect x="322" y="630" width="36" height="6" rx="3" fill="#3f3f46"/>

  <!-- Bottom hairline -->
  <rect x="0" y="${H - 3}" width="${W}" height="3" fill="#F97316" opacity="0.7"/>
</svg>`;
}

const jobs = [
  { file: 'blog-ai-automation.webp', motif: 'ai', icon: 'robot' },
  { file: 'blog-local-seo.webp', motif: 'local', icon: 'mapPin' },
  { file: 'blog-seo-small-business.webp', motif: 'seo', icon: 'magnifier' },
  { file: 'blog-website-maintenance.webp', motif: 'maintenance', icon: 'wrench' }
];

for (const j of jobs) {
  const svg = Buffer.from(svgFor(j));
  const out = join(outDir, j.file);
  await sharp(svg, { density: 96 }).webp({ quality: 82 }).toFile(out);
  const meta = await sharp(out).metadata();
  const { size } = await import('node:fs').then((fs) => fs.statSync(out));
  console.log(`✓ ${j.file}  ${meta.width}x${meta.height}  ${(size / 1024).toFixed(1)} KB`);
}
