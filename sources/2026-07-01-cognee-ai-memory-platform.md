---
title: "Cognee: Open-Source AI Memory Platform for Agents"
url: https://github.com/topoteretes/cognee
authors: [topoteretes]
captured: 2026-07-01
source_type: repo
topics: [memory, agent-architecture, agentic-workflows]
tags: [knowledge-graph, vector-embeddings, persistent-memory, self-hosted, python, multi-modal]
signal_level: high
status: raw
confidence: high
freshness_until: unknown
---

## Summary

Cognee is a production-grade open-source AI memory platform (Apache 2.0) that provides agents with persistent long-term memory across sessions via a self-hosted knowledge graph engine. The system ingests data in multiple formats, builds a searchable knowledge graph using vector embeddings and graph reasoning, and grounds relationships in cognitive-science-informed ontology generation.

**Core capabilities:**

- **Four-operation API**: `remember` (store in graph + optimize), `recall` (query with auto-routing strategy selection), `forget` (deletion), `improve` (graph optimization)
- **Dual-layer memory**: session-layer fast cache that syncs to persistent knowledge graph in background; auto-fallthrough from session to graph on miss
- **Multi-format ingestion**: documents, structured data, multimodal content
- **Self-hosted infrastructure**: no vendor lock-in; includes Docker Compose setup, OTEL collector support, audit trails
- **Cross-agent knowledge sharing** and multi-tenant isolation with user/tenant scoping
- **Multiple client libraries**: Python (core), Rust (`cognee-rs`), TypeScript (`@cognee/cognee-ts`); plugins for OpenClaw and Claude Code

**Technical grounding:**

Built on published research (Markovic et al., 2025: "Optimizing the Interface Between Knowledge Graphs and LLMs for Complex Reasoning"). Repository shows active development (8,426+ commits, 26.3k stars, 215 open issues, 256 PRs), with structured deployment patterns, CI/CD pipelines, and evaluation frameworks.

**Quickstart shows immediate usability:**

```python
import cognee
await cognee.remember("document text")
results = await cognee.recall("query")
await cognee.forget(dataset="name")
```

Session-scoped memory example demonstrates context isolation: `await cognee.remember("User prefers X", session_id="chat_1")`.

## Verbatim quotes

> "Ingest data in any format, build a self-hosted knowledge graph, and let every agent recall, connect, and act with full context"

> "Cognee combines vector embeddings, graph reasoning, and cognitive-science-grounded ontology generation to make documents both searchable by meaning and connected by relationships that evolve as your knowledge does."

> "Knowledge infrastructure — unified ingestion, graph/vector search, runs locally, ontology grounding, multimodal"

## Takeaways

- **Persistent agent memory as solved infrastructure**: eliminates context-window friction and session-reset amnesia via asynchronous graph syncing and session-layer caching
- **Graph + vector hybrid**: ontology-grounded relationships plus semantic search reduces hallucination risk vs. pure vector-only retrieval
- **Multi-client, plugin-first design**: TypeScript/Rust/Python SDKs + MCP Registry entry + Claude Code plugin suggests strong ecosystem positioning
- **Production-ready ops**: Docker, OTEL, audit trails, tenant isolation, and research-grounded design indicate maturity beyond prototype
- **Open ecosystem**: research publication + community plugins + active issue/PR volume suggests collaborative development model rather than corporate wrapper

## Open questions

1. **Graph scaling limits**: At what knowledge-graph size do latency / storage costs become prohibitive? Any benchmarks for 10M+ node graphs?
2. **Ontology learning**: How does the system learn / refine domain-specific ontologies from data? Is it LLM-driven annotation or statistical extraction?
3. **Conflict resolution**: How does the system handle contradictory assertions when merging knowledge from multiple sources?
4. **Session → graph async sync**: What are failure modes if an agent acts on session-cached memory that hasn't yet synced to persistent graph? Consistency guarantees?
5. **Cost comparison**: For teams using managed vector DBs (Pinecone, Weaviate Cloud), what is the self-hosted ops overhead vs. managed service?