---
name: synthesise
description: Complete the interactive half of the two-tier capture pipeline. Finds all status:raw source files, cross-links them to topic indexes, checks synthesis files for updates, and marks them status:summarized. Owner-triggered. Run with full KB context.
---

# Synthesise

The Worker wrote raw source files (summary, quotes, takeaways already present). This skill does the KB integration work the Worker explicitly skipped: cross-linking, index updates, synthesis checks.

## Trigger

- `/synthesise` — process all `status: raw` captures
- `/synthesise <topic>` — process only captures tagged with that topic (e.g. `/synthesise prompting`)

## Steps

### 1. Find raw captures

Grep `sources/*.md` (not `sources/skipped/`) for `status: raw` in frontmatter. List them with signal level and topics before doing anything else.

If no raw captures found: say so and stop.

### 2. Confirm with owner

Show the count and file list. If >5 files, flag the batch size and ask whether to proceed in full or filter by topic first. Wait for confirmation before processing.

For large backlogs (>~15 raw files), offer **fixed batches of N** (default 10) processed in priority order (high-signal + newest first). State of done-ness lives in the source frontmatter (`status: summarized`), so batches are resumable: after a batch, stop and report `N/M done`; a fresh `/synthesise` re-greps `status: raw` and continues. This lets the owner `/handoff` to a clean context between batches. Within a large batch, do **not** rewrite synthesis bodies inline (step 3c) — collect synthesis-update candidates and surface them for confirmation at the end of the batch, alongside the open-thread scan.

Use `node worker/scripts/append-source-link.mjs <topic> <source-basename> "<hook>"` to append a `## Sources` bullet to a topic index (LF-safe, idempotent — skips if the source is already linked). This avoids re-reading large indexes for every cross-link; you still author the one-line hook.

### 3. Process each source (one at a time — finish each before starting the next)

**a. Read the full source file.** Do not work from memory.

**b. Cross-link to topic indexes.**
For each topic in the source's `topics:` frontmatter:
- Read `topics/<topic>/index.md`. If it doesn't exist, create it with a minimal header.
- Add a one-line entry under `## Sources` (or the most specific matching section if the index has one, e.g. `## Synthesis` for synthesis pointers). Format: `- [Title](../../sources/YYYY-MM-DD-slug.md) — one-line hook`
- For low-signal sources, append ` [low-signal]` to the entry and do not add to open threads.

**c. Check synthesis files.**
Scan `synthesis/` for any file whose `topics:` frontmatter overlaps with this source. If found:
- Read it and assess whether the new source changes it — new term, new evidence, new failure mode, new framing.
- If yes: update the synthesis body, add the source to its `sources:` frontmatter list, update `updated:` to today.
- If no: leave it untouched.

**d. Mark as processed.**
Edit the source file's frontmatter: `status: raw` → `status: summarized`.

### 4. After all sources — cross-link new indexes

If this run created any new topic indexes, scan them for conceptual overlap with each other. For any pair that clearly covers adjacent or overlapping ground, add a `## See also` section to each with a one-line pointer to the other.

Example pairs that warrant cross-links: `agent-orchestration` ↔ `agent-architecture`, `agentic-workflows` ↔ `workflow-automation`, `memory-systems` ↔ `memory`.

Only add cross-links where the overlap is concrete and navigable — not every adjacent topic. Skip if the batch created fewer than 3 new indexes.

### 5. After all sources — open thread scan

Check the **Open threads** sections in every topic index touched during this run. If any thread now has ≥3 supporting sources or shows a clearly resolvable disagreement across ≥2 sources, surface it briefly:

> "Open thread in `topics/<topic>/index.md`: [thread name] now has N sources — worth writing the synthesis?"

Do not write synthesis unprompted. Ask first.

## Constraints

- Read every file — never recall content from memory.
- Do not re-summarize content already in the source file. The Worker wrote the summary, quotes, and takeaways.
- Do not write synthesis unprompted. Flag and ask.
- Low-signal sources still get indexed but with a `[low-signal]` marker; do not use them to open new threads or promote new tags.
- Finish one source completely (steps a–d) before moving to the next.
- If context budget is getting tight mid-batch, stop after the current source and report progress: "processed N/M, stopped to avoid context overflow — run `/synthesise` again to continue."
