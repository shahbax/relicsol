// Generates app/icon.png (512) and app/apple-icon.png (180) from the brand R tile.
// Next.js file conventions emit <link rel="icon"> and <link rel="apple-touch-icon"> automatically.

import sharp from 'sharp';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'app');

// The "R" is drawn as vector strokes (no font dependency): stem + bowl + leg.
const svg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F97316"/>
      <stop offset="1" stop-color="#C2410C"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#g)"/>
  <g fill="none" stroke="#ffffff" stroke-width="44" stroke-linecap="round" stroke-linejoin="round">
    <path d="M186 388 V136 h84 a62 62 0 0 1 0 124 h-84"/>
    <path d="M266 260 L340 388"/>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).resize(512, 512).png().toFile(join(appDir, 'icon.png'));
await sharp(Buffer.from(svg)).resize(180, 180).png().toFile(join(appDir, 'apple-icon.png'));
console.log('✓ app/icon.png (512) and app/apple-icon.png (180) written');
