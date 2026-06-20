# Plan: KB activity dashboard (data-quality + PII gated)

**Created:** 2026-06-14
**Status:** shipped — all phases complete as of 2026-06-16
**Goal:** an at-a-glance dashboard (recent captures, topics, synthesis status, top authors, signal/source-type distributions) hosted with no new infra, accessible on the go.

## Outcome

All three phases shipped:
- **Phase 1** (data quality): source_type normalisation, signal_level backfill, topic taxonomy consolidation (182→24 canonical topics), CRLF fix, Worker guards added.
- **Phase 2** (PII gate): gitleaks clean, emails removed from wrangler.toml and git history, employer references anonymised, handoff.md gitignored.
- **Phase 3** (dashboard): `docs/` static dashboard live at https://clewisdev.github.io/agentic-firehose/. GitHub Actions rebuilds on every push. Panels: topics, recent activity, synthesis, trending repos, status/signal/source-type distributions, top authors.

Repo made public 2026-06-16.

## Hosting decision (deferred)

Repo is **private** (`clewisdev/agentic-firehose`). Free GitHub Pages does **not** serve private repos.

- Owner is willing to make the repo **public**, but not yet — wants data-quality cleanup + PII scan first.
- Therefore hosting is decided in Phase 3: if public by then → free **GitHub Pages**; otherwise → **Cloudflare Pages** (free, builds from a private repo, same ecosystem as the existing Worker). Static output is identical, so this choice does not block the build.

## Root cause of data sprawl (grounded in `worker/src/claude.ts`)

The Worker's `CAPTURE_SYSTEM` defines the frontmatter schema; `processCapture`/validation lives in the same file.

- `signal_level` — validated in code (`validSignals.includes`, ~line 183, throws on unknown). **Closed loop → clean.**
- `source_type` — enum shown in prompt (~line 49) but **not validated in code** → drift (`analysis`, `report`, `podcast` not even in the prompt enum; trailing spaces).
- `topics` — only an *example* in the prompt (~line 50), no controlled vocabulary, no code validation → **182 distinct values across 96 sources** vs 44 `topics/` dirs.

**Principle:** any field we want stable must be constrained at the **write boundary in the Worker** — prompt (so Haiku picks from a list) *and* code validation/normalisation before commit (belt-and-braces, mirroring `signal_level`). Per `.claude/rules/cloudflare-workers.md`, controlled vocab belongs in `AGENTS.md` and must be mirrored into `CAPTURE_SYSTEM`.

## Data-quality findings (audit 2026-06-14, 96 sources)

| Issue | Scale | Fix phase |
|---|---|---|
| `topics` taxonomy sprawl (182 → ~44) | all sources | 1c (largest) |
| `signal_level` missing | 36 / 96 | 1b |
| `source_type` trailing-space / off-enum values | 5 + (`analysis`/`report`/`podcast`) | 1a |
| `status` trailing-space variants | 5 | 1a |
| filename-year vs captured-year mismatch | none found | — |

## Phase 1 — Data quality

### 1a. Mechanical normalisation — DONE 2026-06-14
Corrected finding: the audit's "trailing-space variants" were `grep [[:space:]]` matching
`\r` — the real issue was **5 whole-file CRLF** files (local Windows/Obsidian edits), not
trailing spaces. Two distinct root causes, two fixes:

- **Data fix** — `worker/scripts/normalise-frontmatter.mjs --write` rewrote 41 files:
  38 `thread → post`, 1 `analysis → blog`, 5 CRLF → LF.
- **source_type canonical set** (confirmed): `blog, post, repo, docs, paper, talk, video,
  podcast, report, user_derived`. `thread` renamed to `post` (owner preference);
  `analysis → blog`. `paper`/`video`/`user_derived` kept as intentional future buckets.
- **Prevention (Haiku drift):** `normaliseSourceType()` guard + alias map in
  `worker/src/claude.ts`, mirroring `signal_level`; prompt enum + `AGENTS.md` synced to emit
  `post`. Normalises in place (does not throw — source_type is organisational, not routing).
- **Prevention (CRLF):** `.gitattributes` now `*.md text eol=lf`.

### 1b. Backfill `signal_level` — DONE 2026-06-14
- Scored all 36 pre-date-field captures against `AGENTS.md` signal defs and inserted
  `signal_level` (schema position: after `tags`, before `status`). After owner review,
  `andre-micolon-dev-info` and `cag-vs-vanilla-prompting` moved high→medium. Result: 24 high,
  10 medium, 2 low. Also added the `low-signal` tag to `claude-code-harness-linkedin`.
- Full corpus now: high 39, medium 53, low 4 (0 missing).
- No prevention needed: `signal_level` is already guarded in the Worker (`validSignals` throws).

### 1c. Topic taxonomy consolidation (the big one)
- Canonical topic set anchored to the existing 44 `topics/` dirs (they have curated `index.md`).
- Build alias map collapsing 182 → ~44 (e.g. `agentic-coding`/`agentic-development` → `agentic-workflows`; `agent-engineering` → `harness-engineering`).
- Rewrite every source's `topics:` to canonical values only.
- **Prevention (load-bearing):** controlled topic vocabulary into `AGENTS.md` + `CAPTURE_SYSTEM`, AND a code-level validation/normalise step in the Worker commit path. Without this, Haiku re-sprawls within weeks.
- **Owner decision:** canonical = exactly the 44 dirs, or add a few that earned a bucket?

## Phase 2 — PII scan (gate to public)
- Run `pii-check` skill: gitleaks + working tree + full git history.
- Manual pass on what the scanner misses: `sources/debug/*.html` (raw scraped pages — may embed session data, third-party names/emails), `handoff.md`, `temp/`.
- Output = literal go/no-go for making the repo public.

## Phase 3 — Dashboard
- **Build step:** parse clean frontmatter → single `data.json`. Static HTML+JS reads it (instant load, no client-side markdown parsing).
- **Panels:** recent activity (by `captured`); topics (now meaningful counts → link to `topics/<x>/index.md`); synthesis status (raw vs summarized, backlog count); top authors (from `authors`); signal & source-type distributions.
- **Refresh:** CI rebuilds + redeploys on every push to `main` (where the Worker commits land).
- **Hosting:** GH Pages (if public) or Cloudflare Pages.

## Sequencing
1a (quick) → 1c (largest, unlocks topics panel) → 1b (backfill) → **Phase 2 PII gate** → Phase 3.

Phase 1 pays off twice: makes the dashboard worth looking at, and is required before publishing anyway.

## Open decisions for owner
- ~~Canonical `source_type` enum~~ — RESOLVED (see 1a).
- Canonical topic list: 44 dirs as-is, or extend (1c).
- Validation guard location: Worker commit path (chosen for source_type; reuse for topics in 1c) vs local pre-commit hook.
