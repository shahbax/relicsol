// Repair the U+FFFD replacement chars that survived a bad latin-1 mojibake fix.
// Almost every survivor is an em dash "—". Two other patterns exist:
//   1. `word�"s`   → `word's`   (right single quote inside a contraction — the ' was lost)
//   2. `<digit>�<digit>` → `<digit>–<digit>` (en dash between numbers, e.g. "2–3 times")
// A stray U+FFFD at position 0 is the mangled UTF-8 BOM; strip it.
//
// This IS idempotent — running on a repaired file is a no-op.

import { readFileSync, writeFileSync } from 'node:fs';

function repair(text) {
  let out = text;
  // 1. BOM artefact at column 0
  if (out.charCodeAt(0) === 0xfffd) out = out.slice(1);
  // 2. Contraction pattern: `word�"s` → `word's`. The mangled sequence was `'"s`.
  out = out.replace(/�"s\b/g, "'s");
  out = out.replace(/�"t\b/g, "'t");
  out = out.replace(/�"re\b/g, "'re");
  out = out.replace(/�"ve\b/g, "'ve");
  out = out.replace(/�"ll\b/g, "'ll");
  out = out.replace(/�"d\b/g, "'d");
  out = out.replace(/�"m\b/g, "'m");
  // 3. En dash between digits: `2�3` → `2–3`
  out = out.replace(/(\d)�(\d)/g, '$1–$2');
  // 4. Everything else: em dash
  out = out.replace(/�/g, '—');
  return out;
}

let anyChanged = false;
for (const path of process.argv.slice(2)) {
  const raw = readFileSync(path, 'utf8');
  const fixed = repair(raw);
  if (fixed !== raw) {
    writeFileSync(path, fixed, 'utf8');
    const before = (raw.match(/�/g) || []).length;
    const after = (fixed.match(/�/g) || []).length;
    console.log(`✓ ${path}: ${before} → ${after} replacement chars`);
    anyChanged = true;
  } else {
    console.log(`  ${path}: no changes needed`);
  }
}
if (!anyChanged) console.log('(no changes)');
