---
title: "knowledge-base-wiki skill"
url: "local — skills/knowledge-base-wiki/SKILL.md"
authors: [unknown]
captured: 2026-05-28
source_type: repo
topics: [skills, memory, harnesses]
tags: [skills, knowledge-base, wiki, ingest, karpathy]
signal_level: high
status: summarized
confidence: high
freshness_until: evergreen
---

# knowledge-base-wiki skill

Skill dropped into `temp/kbwiki/` 2026-05-28. Preservation copy at `skills/knowledge-base-wiki/` with reference templates. Not installed as an active Claude Code command — see below.

## Summary

A Claude Code / cursor skill for operating a personal LLM-powered knowledge base rooted at `~/knowledge-base`. Directly inspired by the Karpathy "the LLM writes and maintains the wiki; the human reads and asks questions" model.

**Architecture — three layers:**

- `~/knowledge-base/raw/` — immutable source material. Organized by topic subdirectory. The LLM reads but never modifies.
- `~/knowledge-base/wiki/` — compiled knowledge articles. LLM has full ownership. One level of topic subdirectories only. Two special files: `index.md` (global index, one row per article with link + summary + updated date) and `log.md` (append-only operation log).
- `SKILL.md` — the schema layer (this file). Templates live in `references/`.

**Four operations:**

1. **Ingest** — fetch to `raw/`, compile to `wiki/`, cascade-update related articles, update `index.md` + `log.md`.
2. **Query** — read `index.md`, read relevant articles, synthesize an answer in-conversation. Prefer wiki content over training knowledge. Only writes a file if explicitly asked (Archive sub-operation).
3. **Archive** — save a query answer as a new wiki page. Never merge into existing articles. Prefix index Summary with `[Archived]`.
4. **Lint** — deterministic auto-fixes (index consistency, broken internal links, broken raw references, missing See Also) plus heuristic report-only checks (factual contradictions, outdated claims, orphan pages, missing cross-topic refs).

**Key design choices:**

- Two-layer `raw/wiki` separation keeps source fidelity intact while allowing the compiled layer to be freely rewritten as understanding evolves.
- One-level topic directories only — no deep nesting. Enforces breadth over depth; a concept that spans topics gets a home in the most relevant directory with See Also cross-links.
- Cascade updates: after any Ingest, the skill explicitly scans for ripple effects across the same topic and across the global index. Archive pages are exempt from cascade updates (they are point-in-time snapshots).
- `~/knowledge-base` is a hardcoded home-directory path, not a project-local path. This makes the KB portable across projects.

## Key quotes

> "The LLM writes and maintains the wiki; the human reads and asks questions." — Karpathy (cited in SKILL.md)

> "The wiki is a persistent, compounding artifact." — Karpathy (cited in SKILL.md)

## Takeaways

1. **The raw/wiki split is the key structural insight.** Sources stay immutable; the compiled layer can be freely reorganized. This solves the "how do I update my understanding without losing the original context" problem.
2. **Cascade update discipline matters.** The explicit post-ingest cascade scan prevents articles from drifting out of sync as the KB grows. This KB's `topics/` update pattern is roughly equivalent but less formalized.
3. **Lint as a first-class operation** — not an afterthought. The deterministic/heuristic split is useful: auto-fix what's unambiguous, report what needs judgment. This KB has no equivalent; manual curation is the only quality check right now.
4. **This skill is not a drop-in for this KB.** It targets `~/knowledge-base`, not agentic-firehose's `sources/topics/synthesis` structure. The compilation model (query → synthesize → write wiki article) is also different from this KB's sources → topics distillation flow. Worth studying for ideas, not installing.
5. **Archive pages as explicit snapshots** — the convention of never cascade-updating archive pages is worth adopting in this KB's synthesis notes: mark them with a `last-confirmed` date rather than silently updating them.

## Open questions

- Does the cascade update step work well at scale (hundreds of articles)? Scanning all articles per ingest could be expensive.
- The `~/knowledge-base` hardcoded path is convenient for personal use but breaks in multi-project or team environments. Worth noting if this skill is ever adapted for teams.
- The heuristic lint checks ("factual contradictions across articles") imply a full-read pass over the wiki. Token cost unknown — no guidance in the skill on how to bound it.

## Why not installed as an active command

kbwiki targets a separate `~/knowledge-base` home-directory structure, not this project. Installing it under `.claude/commands/` would create a confusing overlap where two different KB systems (agentic-firehose and `~/knowledge-base`) could be addressed by slash commands in the same session. Preserved for reference; activate explicitly if a separate personal wiki is desired alongside agentic-firehose.

See also: `sources/2026-05-28-captain-hindsight-skill.md`, `topics/memory/index.md`, `topics/cost-management/index.md`
