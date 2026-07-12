// Confirm every /images/*.svg reference in the data files has a matching file on disk.
// Non-zero exit if any are missing.

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const files = [
  'lib/caseStudies.ts',
  'lib/blogPosts.ts',
  'lib/aboutData.ts',
  'lib/homeData.ts',
  'lib/services.ts'
];

const refs = new Set();
for (const f of files) {
  const src = readFileSync(join(root, f), 'utf8');
  for (const m of src.matchAll(/\/images\/[a-zA-Z0-9_-]+\.(svg|webp|png|jpg|jpeg|avif)/g)) {
    refs.add(m[0]);
  }
}

const missing = [];
for (const r of refs) {
  const disk = join(root, 'public', r);
  if (!existsSync(disk)) missing.push(r);
}

console.log(`Referenced: ${refs.size}, missing: ${missing.length}`);
if (missing.length) {
  console.log('Missing files:');
  for (const m of missing) console.log('  ' + m);
  process.exit(1);
}
