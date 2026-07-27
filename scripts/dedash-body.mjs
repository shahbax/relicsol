import { readFileSync, writeFileSync } from 'node:fs';

// Replace em dashes (—) with a spaced hyphen (" - ") in BODY copy only, per the
// brief. Headline/title fields keep their em dashes (visually essential). Runs
// line-by-line so it can protect specific fields by name.

// Lines whose trimmed content starts with one of these keep their em dashes.
const PROTECTED = [
  'headline:',
  'headlineAccent:',
  'metaTitle:',
  'heroTitle:',
  'heroAccent:',
  'heroLabel:',
  'title:'
];

function dedashLine(line) {
  const trimmed = line.trimStart();
  if (PROTECTED.some((p) => trimmed.startsWith(p))) return line;
  let out = line;
  // Drop a leading em dash in quote attributions ("— NAME" → "NAME").
  out = out.replace(/(attribution:\s*`)\s*—\s*/g, '$1');
  // General: collapse whitespace around an em dash to a single spaced hyphen.
  out = out.replace(/\s*—\s*/g, ' - ');
  return out;
}

let total = 0;
for (const path of process.argv.slice(2)) {
  const before = readFileSync(path, 'utf8');
  const after = before
    .split('\n')
    .map(dedashLine)
    .join('\n');
  const removed = (before.match(/—/g) || []).length - (after.match(/—/g) || []).length;
  writeFileSync(path, after, 'utf8');
  console.log(`  ${path}: removed ${removed} em dash(es) from body copy`);
  total += removed;
}
console.log(`total: ${total}`);
