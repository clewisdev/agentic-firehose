# Memory

External observation logs, retrieval layers, and cross-session context for agents. Distinct from in-context auto-compaction.

## Sources

- [claude-mem](../../sources/2026-05-20-claude-mem.md) — hook-based observation capture + 3-layer retrieval (search → timeline → full body). Vector + relational hybrid. Stale README; current stack is heavier than advertised.
- [POHA](../../sources/2026-05-20-poha.md) — files-as-memory: seven hand-edited markdown files, no vector DB, no RAG. Deliberate counter-position to heavyweight memory systems. 2-day-old repo, treat aspirationally.
- [Graphify](../../sources/2026-05-28-safishamsi-graphify.md) — converts any codebase/folder to a queryable knowledge graph committed as `graph.json`. Team-shared artefact (git hooks auto-rebuild). Intermediate position: more structured than files-as-memory, lighter than full vector DB. 55.2k stars, Y Combinator S26, production-grade.
- [knowledge-base-wiki skill](../../sources/2026-05-28-kbwiki-skill.md) — Karpathy-inspired two-layer KB skill (raw/ + wiki/). Four operations: Ingest, Query, Archive, Lint. Targets `~/knowledge-base`, not agents-kb. Preserved in `skills/knowledge-base-wiki/` for reference; not installed as active command. Key idea: raw/wiki split keeps sources immutable while compiled layer evolves freely.

## Synthesis

- [Files-as-config for agents: when, why, and how](../../synthesis/files-as-config-for-agents.md) (2026-05-20, draft) — addresses the claude-mem vs POHA boundary directly: files-as-config wins until the corpus exceeds what index-guided reads can serve, or updates need transactional / multi-writer semantics. The heavier system should complement curated files, not replace them.

- [UpHill — Agentic ladder](../../sources/2026-05-28-uphill-agentic-ladder.md) — three-layer memory model: working (in-prompt, per-task), episodic (vector DB, retrieved on demand), profile (durable facts, files). Memory governance: explicit read/write calls, provenance, TTLs, user inspection. "TTL time-bound facts — stale memory confidently cited is a new hallucination class."

## Open threads

- The claude-mem vs POHA disagreement is now framed (see synthesis), but not closed. Graphify adds a third position (structured graph, committed to repo) — it occupies the middle ground between files-as-memory and full vector DB. This is now ≥3 sources with distinct positions; a synthesis on the memory architecture spectrum is warranted. See synthesis prompt: "When does the knowledge graph layer beat file-based approaches, and where does each fail?"
