---
title: "Review knowledge-base-wiki skill for lessons applicable to agents-kb"
status: planning
created: 2026-06-01
---

# Review knowledge-base-wiki skill for lessons applicable to agents-kb

## Goal

The `knowledge-base-wiki` skill (in `skills/knowledge-base-wiki/SKILL.md`) was built for a general personal KB. agents-kb is a specialised variant. Compare the two designs and identify anything the skill does that agents-kb currently lacks or does worse.

## Key structural differences

| Concept | knowledge-base-wiki | agents-kb |
|---|---|---|
| Raw storage | `raw/` — immutable, never modified | `sources/` — captures are edited/updated |
| Compiled layer | `wiki/` — agent has full ownership | `topics/` — distilled indexes |
| Global index | `wiki/index.md` — single file, all articles | Per-topic `index.md` files, no global |
| Operation log | `wiki/log.md` — append-only, every operation | None |
| Lint operation | Explicit, two-tier (auto-fix vs report) | None |
| Conflict handling | Explicit annotation required | Implicit, no formal convention |
| Archive concept | Query answers saved as first-class pages | No equivalent |
| Cascade updates | Formal step in ingest flow | Informal, left to agent judgement |

## Candidate lessons to investigate

### 1. Lint operation
The skill defines deterministic checks (broken links, missing index entries, orphaned pages) that auto-fix, and heuristic checks (contradictions, outdated claims, orphans) that report only. agents-kb has no equivalent. A `/lint` skill or a step in `/synthesise` could cover this.

### 2. Operation log
An append-only `log.md` recording every ingest, synthesis, and archive event. Currently this information lives only in git commit messages — useful but not browsable within the KB itself.

### 3. Conflict annotation convention
The skill requires explicit annotation when sources disagree, with attribution. agents-kb has no formal convention for this. Open threads in topic indexes serve a similar purpose but inconsistently.

### 4. Archive concept
Saving a query answer as a first-class KB artifact (distinct from synthesis files, which are agent-initiated). Could be valuable for capturing owner-derived conclusions that aren't tied to a specific source.

### 5. Cascade update formalism
The skill has a named step: after ingesting, scan for ripple effects in related articles. agents-kb leaves this to agent judgement. A checklist or explicit step in AGENTS.md could make it more consistent.

## What agents-kb does better (don't regress)

- **Triage / signal-level classification** — the skill has no equivalent; agents-kb's triage criteria are more developed
- **Two-tier capture pipeline** — automated Worker + interactive /synthesise; the skill is purely interactive
- **Frontmatter schemas** — richer metadata (signal level, tags, status) enabling automated processing

## Next steps

1. Read the skill's reference templates (`skills/knowledge-base-wiki/references/`) to understand the full format
2. For each candidate lesson, decide: adopt as-is, adapt, or reject (with reason)
3. For adopted items: determine whether the change belongs in AGENTS.md, a new skill, or the /synthesise flow
4. Capture the decision and rationale in a sources file (this is itself a KB-operations insight worth keeping)

## Status

Not started. No blocking dependencies.
