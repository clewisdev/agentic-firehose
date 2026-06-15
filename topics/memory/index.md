# Memory

External observation logs, retrieval layers, and cross-session context for agents. Distinct from in-context auto-compaction. Retrieval (RAG, embeddings, document indexing) was consolidated into this topic — see the topic notes below.

## Topic notes

- [Retrieval](retrieval.md) — finding relevant information to inject into context: vector similarity, tree/structural, hybrid, and the failure modes of each.
- [RAG](rag.md) — retrieval-augmented generation architectures; vector vs. hybrid vs. structural, when each wins.
- [Document indexing](document-indexing.md) — chunking, tree-based structure indexing, knowledge graphs; how document type drives the approach.

## Sources

- [claude-mem](../../sources/2026-05-20-claude-mem.md) — hook-based observation capture + 3-layer retrieval (search → timeline → full body). Vector + relational hybrid. Stale README; current stack is heavier than advertised.
- [POHA](../../sources/2026-05-20-poha.md) — files-as-memory: seven hand-edited markdown files, no vector DB, no RAG. Deliberate counter-position to heavyweight memory systems. 2-day-old repo, treat aspirationally.
- [Graphify](../../sources/2026-05-28-safishamsi-graphify.md) — converts any codebase/folder to a queryable knowledge graph committed as `graph.json`. Team-shared artefact (git hooks auto-rebuild). Intermediate position: more structured than files-as-memory, lighter than full vector DB. 55.2k stars, Y Combinator S26, production-grade.
- [knowledge-base-wiki skill](../../sources/2026-05-28-kbwiki-skill.md) — Karpathy-inspired two-layer KB skill (raw/ + wiki/). Four operations: Ingest, Query, Archive, Lint. Targets `~/knowledge-base`, not agentic-firehose. Preserved in `skills/knowledge-base-wiki/` for reference; not installed as active command. Key idea: raw/wiki split keeps sources immutable while compiled layer evolves freely.
- [Pydantic AI Harness — Production](../../sources/2026-05-31-pydantic-ai-harness-production.md) — memory as a composable harness module (session persistence); one of six capability matrix dimensions required for production agents.
- [Harness Engineering Eras](../../sources/2026-06-05-harness-engineering-eras.md) — memory as one of five core harness components; "memory, context, and actions compound over time" for businesses that build workflows rather than one-off tool use.
- [I plugged my second brain into AI and ended up doing more work](../../sources/2026-06-11-second-brain-ai-workflow.md) — a decade of tagged, linked Obsidian concept notes (Maps of Content) gives AI 'a version of my taste to draw on' — structured externalization is what enables AI leverage; unstructured notes limit it. Three layers: what I know / how I act / where I am.
- [Obsidian-Second-Brain: Agentic Memory via Vault Mutation](../../sources/2026-06-09-obsidian-second-brain-agent-memory.md) — Obsidian vault as writable agent memory: mutation over append, bi-temporal tracking, scheduled reconciliation agents — pairs with second-brain-ai-workflow on PKM-as-agent-memory

## Synthesis

- [The memory architecture spectrum: files, graphs, and vectors](../../synthesis/memory-architecture-spectrum.md) (2026-05-30, draft) — decision framework across all four positions: files-as-memory (POHA), knowledge graph (Graphify), hook-based capture (claude-mem), production RAG (Fowler). When each wins, where each breaks, and the TTL/staleness principle.
- [Files-as-config for agents: when, why, and how](../../synthesis/files-as-config-for-agents.md) (2026-05-20, draft) — addresses the claude-mem vs POHA boundary directly: files-as-config wins until the corpus exceeds what index-guided reads can serve, or updates need transactional / multi-writer semantics. The heavier system should complement curated files, not replace them.

- [UpHill Workshop — Index](../../sources/2026-05-28-uphill-workshop-pdfs.md) — workshop index; memory content is in the agentic ladder capture below.
- [UpHill — Agentic ladder](../../sources/2026-05-28-uphill-agentic-ladder.md) — three-layer memory model: working (in-prompt, per-task), episodic (vector DB, retrieved on demand), profile (durable facts, files). Memory governance: explicit read/write calls, provenance, TTLs, user inspection. "TTL time-bound facts — stale memory confidently cited is a new hallucination class."

- [Fowler/Subramaniam — Emerging Patterns in Building GenAI Products](../../sources/2026-05-30-fowler-genai-patterns.md) — RAG as the default for extending LLM knowledge; embeddings explained (lossy compression, cosine similarity, scope boundary: unstructured/semantic only). Production case: 17k-document life sciences RAG, all four enhancement patterns (Hybrid Retriever, Query Rewriting, Reranker, Guardrails) needed together. "Lost in the Middle" effect: >30% accuracy drop for mid-context material — reranking before injection is the mitigation.

## Open threads

- The claude-mem vs POHA disagreement is now framed (see synthesis), but not closed. Graphify adds a third position (structured graph, committed to repo) — it occupies the middle ground between files-as-memory and full vector DB. This is now ≥3 sources with distinct positions; a synthesis on the memory architecture spectrum is warranted. See synthesis prompt: "When does the knowledge graph layer beat file-based approaches, and where does each fail?"
