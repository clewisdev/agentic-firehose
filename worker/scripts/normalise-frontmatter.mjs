#!/usr/bin/env node
// One-off Phase 1a normaliser for plans/kb-dashboard.md.
// Cleans mechanical data-quality issues across existing sources:
//   - normalises CRLF/CR line endings to LF (5 Windows-edited files)
//   - trims trailing whitespace on every frontmatter line
//   - canonicalises `status` and `source_type` via the maps below
//
// Scope is deliberately narrow: this does NOT touch `topics` (that is the
// open-vocabulary problem handled in Phase 1c) or backfill `signal_level` (1b).
//
// Usage (from repo root):
//   node worker/scripts/normalise-frontmatter.mjs          # dry-run, prints diff summary
//   node worker/scripts/normalise-frontmatter.mjs --write   # apply changes in place
//
// Re-runnable and idempotent: a second --write run reports zero changes.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIRS = ['sources', 'sources/skipped'];
const WRITE = process.argv.includes('--write');

// --- Canonical vocabularies (edit these, then re-run) ------------------------
// Decision pending (plan "Open decisions"): confirm this source_type set and the
// alias mapping. Mirror the final set into AGENTS.md + worker/src/claude.ts.
const STATUS_CANONICAL = new Set(['raw', 'summarized']);

const SOURCE_TYPE_CANONICAL = new Set([
  'blog', 'post', 'repo', 'docs', 'paper',
  'talk', 'video', 'podcast', 'report', 'user_derived',
]);

// Observed/renamed values → canonical. `thread` renamed to `post`;
// `analysis` is too generic, fold to blog.
const SOURCE_TYPE_ALIASES = {
  thread: 'post',
  analysis: 'blog',
};
// ----------------------------------------------------------------------------

function listMarkdown(dir) {
  const abs = join(REPO_ROOT, dir);
  let entries;
  try {
    entries = readdirSync(abs, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .filter(e => e.isFile() && e.name.endsWith('.md'))
    .map(e => join(abs, e.name));
}

// Returns the new line, or the original if unchanged. Mutates `changes`.
function normaliseLine(line, file, changes) {
  const trimmed = line.replace(/[ \t]+$/, '');
  if (trimmed !== line) changes.push({ file, kind: 'trailing-ws', from: line, to: trimmed });

  const m = trimmed.match(/^(status|source_type):[ \t]*(.+?)[ \t]*$/);
  if (!m) return trimmed;

  const [, key, value] = m;
  let canonical = value;

  if (key === 'status' && !STATUS_CANONICAL.has(value)) {
    // Only known recoverable case today is whitespace, already handled above.
    canonical = value; // leave unknown statuses visible rather than guess
  }
  if (key === 'source_type') {
    canonical = SOURCE_TYPE_ALIASES[value] ?? value;
    if (!SOURCE_TYPE_CANONICAL.has(canonical)) {
      changes.push({ file, kind: 'unknown-source_type', from: value, to: value });
      canonical = value; // do not invent; flag for human decision
    }
  }

  const out = `${key}: ${canonical}`;
  if (out !== trimmed && canonical !== value) {
    changes.push({ file, kind: `${key}-map`, from: value, to: canonical });
  }
  return out;
}

function processFile(path, changes) {
  const original = readFileSync(path, 'utf8');
  const rel = path.slice(REPO_ROOT.length + 1);

  // Normalise line endings to LF first; CRLF lines would otherwise defeat the
  // field regexes (JS `.` does not match `\r`).
  const lf = original.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  if (lf !== original) changes.push({ file: rel, kind: 'crlf->lf', from: 'CRLF', to: 'LF' });

  const lines = lf.split('\n');

  // Frontmatter is the block between the first two `---` fences.
  if (lines[0] !== '---') return lf;
  const end = lines.indexOf('---', 1);
  if (end === -1) return lf;

  for (let i = 1; i < end; i++) {
    lines[i] = normaliseLine(lines[i], rel, changes);
  }
  return lines.join('\n');
}

const allChanges = [];
let filesTouched = 0;

for (const dir of DIRS) {
  for (const path of listMarkdown(dir)) {
    const before = readFileSync(path, 'utf8');
    const fileChanges = [];
    const after = processFile(path, fileChanges);
    allChanges.push(...fileChanges);
    if (after !== before) {
      filesTouched++;
      if (WRITE) writeFileSync(path, after);
    }
  }
}

// --- Report ------------------------------------------------------------------
const byKind = allChanges.reduce((acc, c) => {
  acc[c.kind] = (acc[c.kind] ?? 0) + 1;
  return acc;
}, {});

console.log(`${WRITE ? 'APPLIED' : 'DRY-RUN'} — ${filesTouched} file(s) would change\n`);
for (const [kind, n] of Object.entries(byKind)) {
  console.log(`  ${kind}: ${n}`);
}

const unknowns = allChanges.filter(c => c.kind === 'unknown-source_type');
if (unknowns.length) {
  console.log(`\nUnknown source_type values (decide canonical mapping, then re-run):`);
  for (const u of unknowns) console.log(`  ${u.from}  (${u.file})`);
}

const maps = allChanges.filter(c => c.kind.endsWith('-map'));
if (maps.length) {
  console.log(`\nValue remaps:`);
  for (const m of maps) console.log(`  ${m.kind}: "${m.from}" -> "${m.to}"  (${m.file})`);
}

if (!WRITE && filesTouched) console.log(`\nRe-run with --write to apply.`);
