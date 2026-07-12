// Reverse PS5.1 double-encoding: file contains characters that were originally
// Windows-1252 bytes of UTF-8. Encode current chars as CP1252 to recover the
// original UTF-8 bytes, then decode as UTF-8.
//
// This uses iconv-lite because Node's built-in Buffer doesn't support CP1252
// (only latin1 = ISO-8859-1, which lacks the euro-sign row that mangles em-dashes).
//
// Note: this script is idempotent — running it twice on an already-clean file
// will corrupt the second time. Only use once after a bad PS write.

import { readFileSync, writeFileSync } from 'node:fs';
import iconv from 'iconv-lite';

function fix(text) {
  const bytes = iconv.encode(text, 'win1252');
  return iconv.decode(bytes, 'utf8');
}

for (const path of process.argv.slice(2)) {
  const raw = readFileSync(path, 'utf8');
  const fixed = fix(raw);
  writeFileSync(path, fixed, 'utf8');
  console.log(`✓ Fixed ${path}`);
}
