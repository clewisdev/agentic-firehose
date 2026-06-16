---
title: "The memory architecture spectrum: files, graphs, and vectors"
written: 2026-05-30
updated: 2026-06-16 (added second-brain-ai-workflow: friction taxonomy for PKM automation decisions)
topics: [memory, harnesses]
tags: [files-as-memory, knowledge-graph, rag, vector-db, working-memory, episodic-memory, profile-memory, ttl, retrieval-patterns]
sources:
  - sources/2026-05-20-poha.md
  - sources/2026-05-20-claude-mem.md
  - sources/2026-05-28-safishamsi-graphify.md
  - sources/2026-05-28-uphill-agentic-ladder.md
  - sources/2026-05-30-fowler-genai-patterns.md
  - sources/2026-05-31-codex-maxxing.md
  - sources/2026-06-05-vectorless-rag-pageindex.md
  - sources/2026-06-09-obsidian-second-brain-agent-memory.md
  - sources/2026-06-11-second-brain-ai-workflow.md
status: draft
---

# The memory architecture spectrum: files, graphs, and vectors

## Memory is not one thing

Before choosing a memory architecture, name what kind of memory you need. The UpHill workshop offers the clearest taxonomy:

- **Working memory**: in-prompt, per-task. The contents of the current context window. Managed by context design, not a memory system.
- **Episodic memory**: vector DB or log, retrieved on demand. "What happened before in similar situations."
- **Profile memory**: durable facts about the user, project, or environment. Changes slowly; should survive indefinitely.

These three answer different questions and have different durability, retrieval cost, and maintenance burden. A system that conflates them will be over-engineered for the simple cases and under-equipped for the complex ones.

## The spectrum of approaches

Four sources in this KB each represent a distinct position on the memory architecture spectrum.

### Position 1: Files-as-memory (POHA)

**Philosophy**: No vector DB. No RAG. No fine-tuning. Just files.

Seven hand-curated markdown files (`people`, `commitments`, `life`, `insights`, `finances`, `health`, `private carry-on`). Human-editable, grep-able, version-controlled. The agent reads them directly; no retrieval layer.

**When it wins**: bounded corpus, single user, content that benefits from human curation and inspection. POHA's files are not auto-captured — they are deliberately maintained. The curation cost is the point: it keeps the corpus lean and auditable. Five minutes per week.

**Where it breaks**: when the corpus grows beyond what index-guided reads can serve. If you need to answer "what did I do three months ago on project X" from an auto-captured observation log, grep is not your retrieval mechanism.

This KB uses the same shape — `sources/` and `topics/` as curated markdown. The argument for this design is identical.

**Codex-maxxing corroborates at scale** (Liu 2026): a vault organized as `people/`, `projects/`, `agent/`, `notes/` acts as a shared notebook across multiple pinned threads. "Files force the agent to compress experience into a form that can survive the thread." Diff review of vault writes (accept/reject what the agent chose to remember) is a lightweight audit mechanism. This extends the audibility argument: files-as-memory wins not just on simplicity but on reviewability — you can inspect the agent's memory at rest.

### Position 2: Hook-based capture + hybrid retrieval (claude-mem)

**Philosophy**: instrument the harness to capture everything; retrieve semantically on demand.

Five lifecycle hooks (SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd) feed observations into a background worker. Storage is hybrid: Postgres for structured observations, Chroma for vector embeddings. Retrieval is exposed as MCP tools structured in three layers designed to minimise token cost: compact index → chronological context → full body on demand.

**When it wins**: high-volume automatic capture, cross-session recall, teams with multiple agents hitting the same memory store.

**Where it breaks**: operationally heavy. The architecture escalation from SQLite (v6) to Postgres + Redis + BullMQ + auth (v13) reflects what "production memory" actually requires at scale. Not viable as a local single-user tool anymore. Also: the 3-layer retrieval pattern adds latency; hook overhead fires on every tool call.

**Design pattern worth keeping regardless of the tool**: the three-layer retrieval shape (compact index → context → full body) is reusable anywhere you have a large result set. Pay token cost only for what the agent actually needs to read.

### Position 3: Knowledge graph (Graphify)

**Philosophy**: structured intermediate representation, committed to the repo as a team artefact.

`/graphify .` processes a codebase through AST extraction (tree-sitter, 33 languages), LLM-assisted semantic analysis, and Leiden clustering. Output is `graph.json` — committed to the repo, auto-rebuilt on commits via git hooks.

**When it wins**: large codebases where files-as-memory can't fit and full vector RAG is over-engineered. The graph is structured (not a bag of embeddings), portable (any platform can query it), and team-shared (not per-developer). Confidence levels (EXTRACTED/INFERRED/AMBIGUOUS) tell the agent which relationships to trust.

**Where it breaks**: the graph ages with the codebase; the cost of regenerating it, and whether diffs are stable, is unclear. Leiden clusters may not align with human domain boundaries. Best suited to codebases with stable structure; less suited to highly dynamic content.

**Key distinction from vector RAG**: the graph answers "what depends on what" and "what are the high-connectivity hubs" — structural questions. Vector RAG answers "what content is semantically similar to this query." Different queries, different tools.

### Position 4: Production RAG (Fowler/Subramaniam)

**Philosophy**: extend LLM knowledge beyond training data at production scale with augmented retrieval.

The Fowler/Subramaniam pattern catalogue covers the full production RAG stack: embeddings → vector DB → query rewriting → hybrid retrieval (dense + sparse/BM25) → reranking → context injection with explicit gap-acknowledgment instructions.

**When it wins**: large, volatile, unstructured document corpora where semantic similarity is the right retrieval primitive. The production case study (17,000 life-sciences research reports, days-to-weeks queries reduced to minutes) is the clearest signal of where this justifies its cost.

**Where it breaks**: basic RAG almost never ships to production as-is. The life sciences case required all four enhancement patterns: Hybrid Retriever, Query Rewriting, Reranker, Guardrails. Each adds engineering cost and a new failure mode to eval. The "Lost in the Middle" effect (>30% accuracy drop for mid-context material) means you can't just retrieve more — reranking before injection is the mitigation.

**Important scope constraint**: embeddings are for *semantic* similarity on unstructured data. For exact matches, relational queries, or numerical comparisons, use SQL or traditional DBs. Don't stretch embeddings into structured-data problems.

**Vectorless RAG refines this constraint** (Kubicka/PageIndex, 2026): for professional documents with stable hierarchical structure (financial reports, legal filings, technical specs), vector similarity fails because "similarity is not the same as relevance." Tree-based indexing — generating a table-of-contents structure and reasoning through it — outperforms vector similarity on FinanceBench (98.7% claimed, methodology not detailed). The auditable output (page + section references) also satisfies governance requirements that "vibe retrieval" does not. Caveat: structural assumptions are a liability; PDFs with broken hierarchies or OCR errors undermine the approach. "No chunking" is a reframing, not an elimination — structural chunking just moves layers. This approach sits between knowledge graph and production RAG on the spectrum.

## The decision framework

### Position 5: Active reconciliation / vault mutation (obsidian-second-brain)

**Philosophy**: capture stays append-only; a scheduled reconciliation agent mutates existing
pages rather than creating new ones for every new source.

The obsidian-second-brain pattern (`sources/2026-06-09-obsidian-second-brain-agent-memory.md`)
inverts the append-only model used in Position 1 (files-as-memory) and in most RAG pipelines.
Ingesting a new URL or PDF triggers an agent that updates 5–15 *existing* pages rather than
adding a 16th summary. Contradiction detection (`/obsidian-reconcile`) sweeps for logical
conflicts and resolves them. A `/obsidian-challenge` command retrieves your own prior positions
and argues against the decision you're about to make.

**Key mechanism: bi-temporal tracking.** The system records both *when a fact was true* and
*when the vault learned it* — making mutations auditable. Without this, a bad reconcile pass is
unrecoverable. The comments surfaced the precise failure mode: "one bad reconcile away from
losing a note you needed." Bi-temporal tracking is the load-bearing assumption of the whole model.

**When it wins**: personal knowledge accumulation over time, where the goal is a consistent
synthesised view of the world rather than a retrievable archive of everything said. The
accumulation model (append-only capture) creates "graveyards" — 1.6k GitHub stars in one week
suggests this is widely felt. Mutation-with-reconciliation trades retrieval breadth for knowledge
coherence.

**Where it breaks**: the approval-gate question is open. If the agent can overwrite without a
review step, one mistaken reconciliation corrupts the vault. Also: the capture layer must stay
strictly append-only (too much friction to decide *in real time* which five pages to rewrite);
the mutation layer runs async. This means there is a window where the vault contains both old
and new claims — correctness is eventually consistent, not immediate.

**Relation to other positions**: this is not a replacement for files-as-memory (Position 1) but
a *maintenance layer* that acts on top of it. The Codex-maxxing corroboration in Position 1
(diff review of vault writes) is the lightweight version of the same instinct — review what the
agent chose to remember. Obsidian-second-brain makes this the primary operator, not an afterthought.

## The friction taxonomy: what to automate vs. what to protect

Jones (`sources/2026-06-11-second-brain-ai-workflow.md`) adds a decision criterion that none
of the implementation-focused sources name: **the distinction between vicious and virtuous friction**.

- **Vicious friction** — busywork that consumes time without producing learning. Parsing
  handwritten notes, routing tasks to the right file, assembling status reports. Automate it.
- **Virtuous friction** — the struggle that generates understanding. Making sense of a half-formed
  idea, deciding how two concepts relate, choosing what matters. Protect it.

> "Outsourcing vicious friction frees capacity, but outsourcing virtuous friction means losing
> the struggle that makes you better."

This reframes the whole memory architecture question. It is not "which system is most capable
of capturing and retrieving knowledge?" It is "which system preserves human judgment where it
matters and removes overhead where it doesn't?"

The practical implication for architecture choice:

- Files-as-memory (POHA, Position 1) forces some virtuous friction: curation decisions,
  link choices, what to write vs. what to discard. This is a feature, not a limitation.
- Active reconciliation (obsidian-second-brain, Position 5) automates the consistency
  maintenance that is purely vicious friction — but must not automate the *thinking* that
  produced the notes in the first place.
- Hook-based capture (claude-mem, Position 2) automates observation logging — vicious
  friction — but puts the burden of retrieval quality on the embedding layer. If the
  agent starts making synthesis decisions from auto-captured observations, virtuous friction
  is being outsourced silently.

Jones also structures the AI-augmented PKM in three layers that map cleanly to the spectrum:
1. **What you know** — the curated knowledge base (Position 1 / files-as-memory)
2. **How you act** — skills encoding work processes (separate from memory architecture)
3. **Where you are** — state aggregation from health/output/focus signals to close the OODA loop

The third layer is the one no memory architecture addresses directly: knowing whether the
system as a whole is working requires external signals beyond the KB itself.

| Situation | Architecture |
|-----------|-------------|
| Bounded corpus, curated, human-editable, single user | Files-as-memory |
| Known static context that fits in the window | CAG / direct load (not memory at all) |
| Large codebase, structural/dependency questions | Knowledge graph (Graphify) |
| High-volume auto-capture, cross-session recall, multi-user | Hook-based + hybrid retrieval (claude-mem pattern) |
| Structured professional docs (finance, legal, technical) with stable hierarchy | Vectorless RAG / tree-based indexing (PageIndex) |
| Large volatile unstructured document corpus | Production RAG (with Hybrid Retriever + Reranker) |
| Personal KB requiring long-term consistency over completeness | Active reconciliation / vault mutation (obsidian-second-brain) |

These are not mutually exclusive. The KB uses files-as-memory for the curated layer and would use RAG if the corpus grew to thousands of sources. Graphify is for codebase structure, not document knowledge. Claude-mem is for automatic observation capture, not deliberate knowledge curation.

## What UpHill adds: stale memory is a new hallucination class

The UpHill workshop surfaces a principle that none of the implementation-focused sources name explicitly:

> "TTL time-bound facts — stale memory confidently cited is a new hallucination class."

A memory system without explicit expiry or provenance is a liability as it ages. A working recommendation: any memory entry that encodes a state of the world (a person's role, a project's status, a tool's capability) should carry a `freshness_until` date. This KB already does this in source frontmatter. For a hook-based system capturing observations, building decay or review mechanisms in is necessary, not optional.

## Frank summary

Files win at small, curated, human-maintained. Vector RAG wins at large, volatile, unstructured. Knowledge graphs fill the structural middle ground for codebases. Hook-based capture wins at automatic observation logs. Active reconciliation (obsidian-second-brain) is the maintenance answer for personal vaults that have grown beyond what append-only can keep coherent — but it requires bi-temporal tracking to be safe.

The failure mode to watch: escalating to RAG because it feels more "production-grade" before the corpus justifies it. POHA is right that for a personal agent with bounded knowledge, curated files are genuinely competitive with embedding pipelines on signal-per-effort — and dramatically easier to audit, debug, and version. The complexity of claude-mem's v13 architecture is not evidence of superior design; it reflects what scale forces. Similarly, the reconciliation approach is not inherently better than POHA — it is the right evolution *if and only if* the vault has grown large enough that curators can't manually maintain consistency.
