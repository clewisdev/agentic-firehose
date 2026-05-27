# Memory

External observation logs, retrieval layers, and cross-session context for agents. Distinct from in-context auto-compaction.

## Sources

- [claude-mem](../../sources/2026-05-20-claude-mem.md) — hook-based observation capture + 3-layer retrieval (search → timeline → full body). Vector + relational hybrid. Stale README; current stack is heavier than advertised.
- [POHA](../../sources/2026-05-20-poha.md) — files-as-memory: seven hand-edited markdown files, no vector DB, no RAG. Deliberate counter-position to heavyweight memory systems. 2-day-old repo, treat aspirationally.

## Synthesis

- [Files-as-config for agents: when, why, and how](../../synthesis/files-as-config-for-agents.md) (2026-05-20, draft) — addresses the claude-mem vs POHA boundary directly: files-as-config wins until the corpus exceeds what index-guided reads can serve, or updates need transactional / multi-writer semantics. The heavier system should complement curated files, not replace them.

## Open threads

- The claude-mem vs POHA disagreement is now framed (see synthesis), but not closed. A third source on agent memory architecture — particularly one that *tried files-as-config and migrated away from it* — would sharpen the boundary considerably.
