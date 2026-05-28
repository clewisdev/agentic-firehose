---
title: "Graphify: Turn Any Folder Into a Queryable Knowledge Graph"
url: https://github.com/safishamsi/graphify
authors: [Safi Shamsi]
captured: 2026-05-28
source_type: repo
topics: [memory, tool-use]
tags: [knowledge-graph, rag, vector-db, tree-sitter, claude-code-skill, mcp]
status: summarized
confidence: high
freshness_until: 2026-Q4
---

# Graphify

A Claude Code skill (and multi-platform agent skill) that transforms a codebase or document folder into a queryable knowledge graph. Y Combinator S26 company. 55.2k GitHub stars, 117 releases, 564 commits — production-grade.

## Summary

Running `/graphify .` in a supported AI coding assistant processes the current directory through three stages:

1. **Extraction** — Local AST parsing via tree-sitter for 33 programming languages; LLM-assisted processing for documents, PDFs, images, and videos. No remote code analysis.
2. **Semantic analysis** — Identifies entity relationships, flags "god nodes" (highly connected concepts), and assigns confidence levels (EXTRACTED, INFERRED, AMBIGUOUS) to each relationship.
3. **Clustering** — Community detection via Leiden algorithm groups related entities into named clusters.

Output is three artefacts:
- `graph.html` — interactive visual browser
- `GRAPH_REPORT.md` — highlights, dependency hotspots, suggested questions for the agent
- `graph.json` — queryable data, committed to the repo

The committed `graph.json` means the knowledge graph is a **team artefact**: everyone who pulls the repo starts with the same codebase map. Git hooks auto-rebuild the graph on commits; a merge driver prevents conflicts when multiple contributors update it simultaneously.

Supported by 16+ AI coding platforms: Claude Code, Codex, OpenCode, Cursor, Gemini CLI, GitHub Copilot CLI, Aider, Devin CLI, and others.

## Key quotes

> "Turn any folder of code, SQL schemas, R scripts, shell scripts, docs, papers, images, or videos into a queryable knowledge graph"

> "god nodes" — highly connected entities that are implicitly critical to understanding the codebase

## Takeaways

- **This is the practical answer to "how do I give an agent memory of a large codebase."** Rather than stuffing everything into context, graphify builds a structured map the agent queries on demand.
- **Committed JSON makes the graph a team primitive**, not a per-developer setup. This is a meaningful evolution from individual RAG setups — the knowledge graph ships with the code.
- **Confidence levels (EXTRACTED/INFERRED/AMBIGUOUS) are a good design pattern** for any memory system: they allow the agent to know which relationships to trust and which to verify.
- **The Leiden clustering approach** is a worthwhile pattern for any system that needs to segment a large graph — it's used in network analysis and brings community-detection semantics to code understanding.
- **Multi-platform compatibility via a single skill file** (SKILL.md) demonstrates how the skills pattern generalizes. The same `graph.json` works as context for any platform that can read files.

## Open questions

- How does the graph age? Does re-running `/graphify` on a modified codebase produce a stable diff, or does it regenerate from scratch (losing any manual annotations)?
- The Leiden algorithm clusters may not align with human-readable bounded contexts. Is there a way to guide clustering with domain annotations?
- Performance on very large repos (1M+ LOC)? The 50k-star engagement suggests it works for most repos, but the ceiling isn't documented.
- LLM-assisted processing for docs/PDFs/images: which model, at what cost? This isn't transparent in the README.

## Related

- `topics/memory/index.md` — memory architecture thread
- `sources/2026-05-20-claude-mem.md` — alternative memory approach (hook-based, vector+relational)
- `sources/2026-05-20-poha.md` — files-as-memory counter-position
