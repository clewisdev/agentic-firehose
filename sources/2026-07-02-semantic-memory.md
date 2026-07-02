---
title: "semantic-memory: Durable AI Knowledge Base on Akka + Fluree"
url: https://github.com/TylerJewell/semantic-memory
authors: [Tyler Jewell]
captured: 2026-07-02
source_type: repo
topics: [memory, agent-architecture, system-design]
tags: [akka-sdk, fluree, java, knowledge-graph, rag, hotpotqa, cryptographic-provenance]
signal_level: high
status: raw
confidence: high
freshness_until: unknown
---

## Summary

A production-grade, open-source durable knowledge base for shared AI agent memory. Built in 1,066 lines of Java on Akka SDK 3.6 (control plane) and Fluree (unified graph + vector + provenance store). No external SaaS dependencies — runs locally in ~550 MB RAM across 2 processes.

Core flow: ingest text → extract entities/relationships via LLM → embed chunks (768-dim Gemini) → commit graph + vector to Fluree in single cryptographic transaction. Recall: five retrieval strategies (CHUNKS, RAG, GRAPH, HYBRID, FEELING_LUCKY) executable in parallel with built-in compare-all mode.

**Key claims (measured)**:
- HotpotQA HYBRID strategy: F1 = 0.88, exact match = 0.70 on 10-item eval split
- Cold start ~5s; resident footprint 526 MB (Akka) + 24 MB (Fluree)
- Durable ingest: RememberWorkflow resumes at failed step on crash (state journaled, not best-effort)
- Cryptographic provenance: every /api/remember returns Fluree commit hash; time-travel queries reconstruct prior state
- No external vector DB, queue, or serverless dependency

**Evaluation methodology**: 10 HotpotQA distractor items, 99 paragraphs ingested (gold + distractors), official HotpotQA token-level F1 + exact match scoring via `scripts/eval_adapter.py`.

## Key Quotes

> "Every /api/remember returns a Fluree commit hash. Fluree's time-travel queries reconstruct any prior state."

> "The RememberWorkflow is an Akka SDK Workflow — a crashed step resumes at the failed step across a process restart. State is journaled, not 'best-effort.'"

> "Native structured output. The graph extractor uses responseConformsTo(KnowledgeGraph.class) — schema generation and validation are the Akka agent's job, not an external library."

## Architecture

**Ingest path**: RememberWorkflow → GraphExtractorAgent (LLM typed extraction) → GeminiEmbeddings (768-dim) → FlureeClient (single JSON-LD transaction with cryptographic hash).

**Recall path**: HTTP endpoint dispatches to one of five retrievers (or FeelingLuckyRetriever classifier selects), each returns Answer with cosine-scored evidence. QaAgent constrained to terse output (HotpotQA answers are entities or yes/no).

**Runtime**: Akka JVM service + Fluree binary. Two processes, ~550 MB resident.

## Benchmarks (10-item HotpotQA eval)

| Strategy | Exact Match | Token F1 | Mean Latency |
|----------|-------------|----------|---------------|
| CHUNKS   | 0.00        | 0.01     | 2.3 s         |
| RAG      | 0.60        | 0.74     | 4.5 s         |
| GRAPH    | 0.70        | 0.84     | 4.4 s         |
| HYBRID   | 0.70        | 0.88     | 4.6 s         |
| FEELING_LUCKY | 0.70   | 0.84     | 6.8 s         |

## Technical Takeaways

- **Durability is achievable without SaaS**: Akka Workflows + Fluree ledger-as-state provide crash-safe semantics and cryptographic audit trail for agent memory systems.
- **Multi-strategy retrieval in a single system**: Compare-all mode runs CHUNKS, RAG, GRAPH, HYBRID, and classifier-driven strategies in parallel; HYBRID achieves F1=0.88 on multi-hop QA.
- **Schema as agent responsibility**: Using `responseConformsTo(KnowledgeGraph.class)` shifts validation from runtime library to LLM agent prompt; eliminates external schema registry dependency.
- **Provenance via cryptographic commit**: Fluree's time-travel queries make agent memory transparent and auditable; every ingest produces a commit hash.
- **Lightweight footprint feasible**: 550 MB for durable, queryable, multi-strategy memory suggests high-efficiency baseline for local agentic systems.

## Open Questions

- How does HYBRID strategy combine CHUNKS, RAG, GRAPH results? Voting? Re-ranking?
- Does GraphExtractor handle conflicting relationships extracted across multiple ingest calls? Deduplication strategy?
- What is the cost/latency curve for larger corpora (measured at 99 paragraphs)?
- How does FeelingLuckyRetriever classifier decide which strategy to use? Trained or heuristic?
- Licensing implications: BSL 1.1 (Akka) + EPL 2.0 (Fluree) — what are commercial deployment barriers?

