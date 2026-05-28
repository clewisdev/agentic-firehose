---
title: "Files-as-config for agents: when, why, and how"
written: 2026-05-20
updated: 2026-05-20
topics: [prompting, harnesses, memory]
tags: [files-as-config, markdown, claude-md, agents-md, information-architecture, ddd, skills, context-engineering, governance]
sources:
  - sources/2026-05-20-its-not-x-its-y.md
  - sources/2026-05-20-poha.md
  - sources/2026-05-20-pocock-skills.md
  - sources/2026-05-20-andre-micolon-dev-info.md
  - sources/2026-05-20-rosenthal-company-os.md
  - sources/2026-05-20-claude-mem.md
  - sources/2026-05-20-berkin-harness-engineering.md
  - sources/2026-05-28-safishamsi-graphify.md
status: draft
updated: 2026-05-28
---

# Files-as-config for agents: when, why, and how

## The question

Across the captures collected so far, a single architectural pattern keeps recurring — sometimes named, often implicit: **store the things the agent needs to know in a stable filesystem of human-readable markdown files, and tell the agent where to find them in `CLAUDE.md` / `AGENTS.md`.** No vector store. No embeddings. No DB.

The question this note tries to answer:

- Why does this shape keep winning, across very different scales (personal → 20-person team) and very different content types (writing style → runtime env → memory → organisational knowledge)?
- Where are the seams — where does it stop working, and what's the right next step when it does?
- What's the minimal sensible version of it to apply to any new agent project?

## What the sources say

### Where they agree

All five "files-as-config" sources converge on the same underlying architecture:

| Source | Scale | Content type | Concrete artefacts |
| --- | --- | --- | --- |
| [Hassid](../sources/2026-05-20-its-not-x-its-y.md) | personal | writing style / voice | `anti-ai-writing-style.md` loaded into Cowork/Projects |
| [POHA](../sources/2026-05-20-poha.md) | personal | memory + behaviour | templated `CLAUDE.md` + 7 domain MD files (people, commitments, life, insights, finances, health, private) |
| [Pocock](../sources/2026-05-20-pocock-skills.md) | personal/eng | domain lexicon + skills | `CONTEXT.md` + flat `.claude/commands/*.md` skills |
| [André-Micolon](../sources/2026-05-20-andre-micolon-dev-info.md) | personal/eng | runtime self-discovery | `dev:info` script documented in `AGENTS.md` |
| [Rosenthal](../sources/2026-05-20-rosenthal-company-os.md) | 20-person team | full organisational OS | `.claude/{skills,agents,commands,hooks,rules}` + `CLAUDE.md`, `INDEX.md`, `wiki/`, `clients/`, `raw-context/`, `archive/` |

The common shape:

1. **Stable, human-readable markdown files** living in the filesystem alongside the work.
2. **A discoverable entry point** (`CLAUDE.md` / `AGENTS.md`) that tells the agent the other files exist and when to read them.
3. **Loaded on demand**, not preloaded — the agent reads what it needs, not everything. (Rosenthal makes this explicit via `INDEX.md`.)
4. **Edited by humans, used by agents.** Same file serves both audiences.

### Where they disagree

The honest disagreements are along two axes:

**1. Scale at which the pattern hits its ceiling.**

Three positions now, not two:

[POHA](../sources/2026-05-20-poha.md) is the explicit minimum: *"No vector DB. No RAG. No fine-tuning. Just files."* Hand-edited markdown, bounded to dozens of files, single user.

[Graphify](../sources/2026-05-28-safishamsi-graphify.md) (captured 2026-05-28) occupies the middle ground: it converts the filesystem into a queryable knowledge graph committed as `graph.json`, rebuilt via git hooks on each commit. More structured than raw files (tree-sitter AST, Leiden community clustering, confidence-labelled relationships), but lighter than a full vector store — no external service, no RAG pipeline. Critically, it's a **team artefact**: everyone who pulls the repo starts with the same map. This is a meaningful step beyond POHA's single-user posture without taking the full claude-mem infrastructure step.

[claude-mem](../sources/2026-05-20-claude-mem.md) is the full stack counter-position: Postgres + Chroma + Redis + BullMQ for automated cross-session observation capture. claude-mem's v6→v13 trajectory (SQLite → full queue infrastructure) is itself evidence that file-as-config doesn't scale forever for *automated* capture.

The disagreement is about where the ceiling is and what workload triggers the step-up:
- POHA: curated single-user memory, dozens of files → files win
- Graphify: structured codebase/corpus understanding shared across a team, no real-time updates → committed graph wins
- claude-mem: automated observation capture, many sessions, append-only, hybrid search → DB stack wins

**2. How much governance lives in the files.**

Rosenthal puts `.claude/hooks/` for role-based tiered approvals *in the same repo* as the knowledge — governance is a file. [Berkin](../sources/2026-05-20-berkin-harness-engineering.md) treats governance as a separate harness concern (identity, permissions, approval points) without claiming it must be filesystem-mediated. The Rosenthal collapse-it-into-files approach works at 20 people; whether it works at 200 is unproven.

### Where they're silent

- **Maintenance / staleness.** Lorenzo Di Cataldo's comment on the Rosenthal post is the only voice raising the hard problem: *"Getting tacit knowledge from senior practitioners into markdown files is the harder problem; structure alone won't prevent wiki staleness."* No source describes a mechanism for keeping the files current as code/process/people change.
- **Conflict resolution.** When two MD files give contradictory guidance, what should the agent do? None of the sources address this. The Rosenthal `rules/` folder ("behavioural instructions based on file context") implies precedence by location but doesn't formalise it.
- **Eval.** Nobody measures whether files-as-config actually outperforms vanilla prompting. The strongest data points are qualitative ("agents that know the environment from line one drift a lot less" — Pedro Fernandes Thomaz commenting on André-Micolon) and a wildly unverified "95% token reduction" claim (Shukla commenting on Rosenthal).
- **Privacy posture beyond gitignore.** POHA gitignores its memory and gates a "private carry-on" file from auto-read. No source addresses what to do when even that's insufficient.

## My take

### Why this pattern wins

Three forces stack:

1. **Vendors made the filesystem a first-class agent surface.** Claude Code, Cowork, Codex Desktop all treat folders as the agent's working environment. This was less viable for chat-only LLMs where every turn re-pays the context cost. Now files are how agents persist and how humans collaborate with them.
2. **Markdown is the universal substrate.** Models are exceptionally good at parsing it; humans edit it in any tool; git versions it; grep finds it. The signal-to-effort ratio of any other format is worse.
3. **TCO, not token cost.** Per [Berkin](../sources/2026-05-20-berkin-harness-engineering.md), the cheap model that needs three retries is not the cheap system. Same logic applies here: stable files mean prompts stop carrying scaffolding ("here's the URL, here's the SQL"). [André-Micolon's](../sources/2026-05-20-andre-micolon-dev-info.md) before/after — from a paragraph of context to "fix it" — is the most concrete demonstration.

### The taxonomy worth naming

The sources combined give a clean factoring of *kinds of content* worth storing as files-for-the-agent. I've not seen this enumerated explicitly anywhere — it's an emergent observation across the captures:

1. **Style / voice** — how the agent communicates. *Hassid's `anti-ai-writing-style.md`.*
2. **Domain lexicon** — what words mean in this project. *Pocock's `CONTEXT.md`. DDD applied to agent context.*
3. **Runtime self-discovery** — what's running where, how to inspect it. *André-Micolon's `dev:info`.*
4. **Memory / state** — what the agent should remember across sessions. *POHA's 7 tier files.*
5. **Behavioural instructions / skills** — what the agent should do, given a trigger. *Pocock's skill MDs; Rosenthal's `.claude/{skills,agents,commands}`.*
6. **Organisational knowledge** — what the team knows. *Rosenthal's `wiki/`, `clients/`, `archive/`.*
7. **Governance / permissions** — what's allowed, by whom. *Rosenthal's `.claude/hooks/`.*

Most agent projects need 2–4 of these. The mistake is collapsing all of them into one giant `CLAUDE.md` and paying for it in load cost, update friction, and conflicts between concerns.

### When the pattern breaks down

Files-as-config works until at least one of:

- The corpus exceeds what an index-guided read can usefully serve (probably 100s–1000s of files for current models, but depends on how often the agent traverses it).
- Updates need to be transactional / multi-writer / append-only across many sessions. Filesystems are poor at this; you want a queue + DB. *This is the claude-mem boundary.*
- Latency budget forbids on-demand file reads at every turn. Pre-indexed retrieval is faster.
- Content is too sensitive for plaintext. Gitignored markdown gives you privacy-by-exclusion, not privacy-by-encryption.
- Search needs cross-document semantic similarity, not lexical. (Though `grep` plus a decent INDEX.md is more competitive here than people assume.)

When you hit one of these, the right move is **add the heavier system as a complement, not a replacement**. Keep the curated files; add the next layer up only for the workload that broke them.

The upgrade path now has an intermediate step: **graphify before the full DB stack**. If the corpus is getting large but updates are commit-based (not streaming), and you need structured relationship queries rather than free-text search, graphify occupies the right slot — committed to git, no external service, team-shareable. Only step up to Postgres + vector store when you need real-time append-only observation capture across many sessions.

### Operational recommendations

For any new agent project — including this KB:

1. **Default to files-as-config.** The cost of adding it later is low; the cost of building DB-backed memory on day one when you didn't need it is high.
2. **Minimum viable setup**: a `CLAUDE.md` / `AGENTS.md` (behaviour + pointers) plus one other file matching your primary content type from the taxonomy above. Don't pre-build the other six.
3. **Factor by type, not chronology.** Don't have a `notes/` folder; have folders for distinct kinds of knowledge (this KB's `topics/`, `sources/`, `synthesis/`, `templates/` is an example).
4. **Add `INDEX.md` only when the agent starts wasting tokens scanning.** Premature indexing is overhead.
5. **Keep governance separate from content.** Rosenthal's `.claude/hooks/` cleanly separates from `wiki/`. Mixing them rots both.
6. **Treat staleness as a first-class concern from the start.** Decide who owns each file's freshness. Without ownership, every file rots silently.
7. **Migrate to a DB-backed store only when you hit a measured constraint, not preemptively.**

### Frank framing

The right mental model for files-as-config is **literate programming and DDD, transplanted onto the agent surface** — not RAG, not vector search, not ML infrastructure. The agent is treated as a junior employee who can read your operating manual; the files are the manual.

This is also why the pattern travels well across domains. It works for software engineering (Pocock, André-Micolon), for personal life management (POHA), for marketing/GTM ops (Rosenthal), for writing style (Hassid) — because the operating-manual abstraction is general. Where it breaks down (claude-mem) is where the manual abstraction breaks down: you can't read your way through a million observations.

## Implications for the owner's work

- **This KB itself is an instance.** The pattern we're applying — `AGENTS.md` for behaviour, `topics/` + `sources/` + `synthesis/` for different content types, frontmatter for tags — *is* files-as-config. The same principles apply: factor by type, add an `INDEX.md` when needed, decide who owns staleness.
- **When advising on a new agent project, default to recommending files-as-config first.** Make the case for a DB-backed memory layer only when there's a measured reason the file approach won't work.
- **When reading new sources in this space, weight them by where they sit on the taxonomy.** A piece that only adds to one category (e.g. another "style guide for LLMs" post) is lower marginal value than one that introduces a new category (e.g. governance-as-files via hooks).
- **Don't bake "files-as-config is right" into the KB uncritically.** The boundary cases (claude-mem, scale > 200 people, sensitive data) are real. Hold this synthesis as the current best read, not as doctrine.

## What would change my mind

- **A serious eval** showing that vanilla prompting + small CLAUDE.md outperforms a well-factored files-as-config setup at similar token budget. None exists in the captured sources.
- **Convincing evidence that vendor-built memory layers** (Cowork's project memory, Claude Code's auto-compaction, OS-level features I'm not aware of yet) are subsuming the manual files-as-config approach for most users. If Anthropic/OpenAI ship enough automated context management, the manual approach loses its edge.
- **A staleness mechanism** that actually works at team scale — i.e. someone solving Lorenzo's tacit-knowledge-into-markdown problem in a generalisable way. If this remains unsolved, the pattern will keep producing rotten files at scale and someone will design an alternative that handles staleness intrinsically.
- **A new failure mode** I haven't seen. The captured sources are all current proponents; an experienced detractor with a specific failure story would update me.
