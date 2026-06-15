#!/usr/bin/env node
// Append a `## Sources` bullet to a topic index during synthesis cross-linking.
//
// Usage:
//   node worker/scripts/append-source-link.mjs <topic> <source-basename> "<hook>" ["<link-text>"]
//
// Example:
//   node worker/scripts/append-source-link.mjs evals 2026-06-15-skillopt-executive-strategy.md \
//     "validation-driven optimization; 52-cell benchmark"
//
// Behaviour:
//   - Resolves the link text from the source's frontmatter `title:` unless a 4th arg overrides it.
//   - Inserts the bullet at the end of the `## Sources` section (creates the section, or the whole
//     index with a minimal header, if missing).
//   - LF-safe: normalises CRLF→LF and writes LF (matches the Worker / .gitattributes).
//   - Idempotent: if the source file is already linked anywhere in the index, it logs and exits 0
//     without writing (mirrors the Worker's commit-once invariant).
//
// Run from the repo root. The KB lives one level up from worker/.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function die(msg) {
  console.error("error: " + msg);
  process.exit(1);
}

const [topic, sourceBasename, hook, linkTextArg] = process.argv.slice(2);
if (!topic || !sourceBasename || !hook) {
  die('usage: append-source-link.mjs <topic> <source-basename> "<hook>" ["<link-text>"]');
}
if (!sourceBasename.endsWith(".md")) {
  die(`source basename should end in .md (got "${sourceBasename}")`);
}

const sourcePath = join(REPO, "sources", sourceBasename);
if (!existsSync(sourcePath)) die(`source not found: sources/${sourceBasename}`);

// Resolve link text from the source's frontmatter title unless overridden.
function frontmatterTitle(path) {
  const s = readFileSync(path, "utf8").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const m = s.match(/^title:\s*(.+)$/m);
  if (!m) return null;
  return m[1].trim().replace(/^["']|["']$/g, "");
}
const linkText = (linkTextArg && linkTextArg.trim()) || frontmatterTitle(sourcePath) || sourceBasename;

const indexPath = join(REPO, "topics", topic, "index.md");
const bullet = `- [${linkText}](../../sources/${sourceBasename}) — ${hook.trim()}`;

// Create the index with a minimal header if it doesn't exist yet.
if (!existsSync(indexPath)) {
  const title = topic.replace(/(^|[-_])(\w)/g, (_, s, c) => (s ? " " : "") + c.toUpperCase());
  mkdirSync(dirname(indexPath), { recursive: true });
  writeFileSync(indexPath, `# ${title}\n\n## Sources\n\n${bullet}\n`, "utf8");
  console.log(`created topics/${topic}/index.md and linked ${sourceBasename}`);
  process.exit(0);
}

let text = readFileSync(indexPath, "utf8").replace(/\r\n/g, "\n").replace(/\r/g, "\n");

// Idempotent: never double-link a source.
if (text.includes(`(../../sources/${sourceBasename})`)) {
  console.log(`already linked in topics/${topic}/index.md — no change`);
  process.exit(0);
}

const lines = text.split("\n");
const sourcesIdx = lines.findIndex((l) => /^##\s+Sources\s*$/.test(l));

if (sourcesIdx === -1) {
  // No Sources section — append one at the end.
  while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();
  lines.push("", "## Sources", "", bullet);
} else {
  // Find the end of the Sources section (next `## ` heading or EOF).
  let end = lines.length;
  for (let i = sourcesIdx + 1; i < lines.length; i++) {
    if (/^##\s/.test(lines[i])) { end = i; break; }
  }
  // Insert after the last non-blank line within the section.
  let insertAt = sourcesIdx + 1;
  for (let i = sourcesIdx + 1; i < end; i++) {
    if (lines[i].trim() !== "") insertAt = i + 1;
  }
  lines.splice(insertAt, 0, bullet);
}

writeFileSync(indexPath, lines.join("\n"), "utf8");
console.log(`linked ${sourceBasename} → topics/${topic}/index.md`);
