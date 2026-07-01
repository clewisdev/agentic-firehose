---
title: "Omnigraph: Lakehouse native graph engine with git-style workflows"
url: https://github.com/ModernRelay/omnigraph
authors: [ModernRelay]
captured: 2026-07-01
source_type: repo
topics: [agent-orchestration, memory, agentic-workflows, system-design]
tags: [graph-database, branching, multi-agent, context-assembly, cedar-policy, lance, s3-native]
signal_level: high
status: raw
confidence: high
freshness_until: unknown
---

## Summary

Omnigraph is a **lakehouse-native graph database** designed as the operational state and coordination layer for agent fleets. It combines git-style branching workflows with multimodal retrieval (graph traversal + vector ANN + full-text search) to enable safe, parallel agent enrichment of shared knowledge graphs.

Key architectural decisions:

- **Declarative infrastructure as code** (cluster.yaml): graphs, schemas, stored queries, embedding providers, and Cedar policies declared once and applied via `cluster plan` / `cluster apply` (Terraform-style).
- **Agent-native branching**: hundreds of agents operate on isolated parallel branches; changes are reviewed and merged safely across the whole graph, preventing mutation conflicts.
- **Multimodal retrieval runtime**: single query combines graph traversal + vector ANN + full-text search + Reciprocal Rank Fusion for context assembly.
- **Security as code**: Cedar policy enforced server-side on every mutation; per-graph and server-wide policies; bearer auth and audit tracking.
- **Object-storage native**: runs on any S3-compatible store (on-prem MinIO, AWS S3, R2, GCS); data never leaves your infrastructure. Uses Lance columnar format (branchable, time-travelable, blob-as-data support).

## Concrete use cases (from repo)

1. **Company brain**: unified org knowledge graph that every agent can query.
2. **Agentic memory**: durable, versioned memory with one branch per agent or task, merged on review.
3. **Context graph**: decision traces and codified tribal knowledge for retrieval.
4. **Dev graph**: issues & dependency model that coding agents read/write.
5. **R&D / ML data layer**: experiments and trials written into branches, versioned for training/eval.

## Integration with agents

- Ships an **omnigraph agent skill** covering cluster mode, schema evolution, query linting, data writes, branches, Cedar policy.
- Designed to be set up and operated by AI agents (Claude Code, Codex, or any agent that reads URLs and runs shell commands).
- Includes ready-to-run seed graphs and cookbooks (company brain, VC operating system, pharma intel).

## Technical footprint

- **Language**: Rust (614 commits; active development).
- **Deployment model**: runs as omnigraph-server; every graph online at `/graphs/{id}/…`; each behind its own policy.
- **Schema definition**: `.pg` files; stored queries declared in `.gq` files.
- **Policy**: Cedar policy bundles; applies per-graph and server-wide.
- **Install**: homebrew or curl script; published release binaries.

## Verbatim from README

> "Omnigraph is the operational state and coordination layer for fleets of agents. Run it as a server, declared as code; hundreds of agents operate and enrich the graph on parallel isolated branches, and every change is reviewed and merged safely."

> "Multimodal retrieval: Graph traversal + vector ANN + full-text + Reciprocal Rank Fusion in one query runtime, for context assembly."

> "Cedar policy enforced server-side on every mutation, per-graph and server-wide; bearer auth; actor/audit tracking."

## Takeaways

1. **Git-style workflows for agent coordination**: branching + review + merge is a concrete pattern for safe parallel agent work on shared state (not just version control).
2. **Declarative ops for graph infrastructure**: cluster.yaml + Terraform-style apply mirrors modern DevOps but for agentic graph topology and policy.
3. **Multimodal retrieval in a single runtime**: combines vector similarity, graph traversal, and FTS without requiring separate systems or post-hoc fusion logic.
4. **Security and audit as first-class**: Cedar policies declared upfront; every mutation tracked and policy-enforced server-side—critical for multi-agent systems.
5. **Object-storage as the source of truth**: Lance's branching semantics make versioning and time-travel natural; avoids vendor lock-in.

## Open questions

- How does Cedar policy performance scale with agent mutation throughput at hundreds of agents?
- What are the merge semantics when two agents modify the same graph node on different branches?
- How does vector ANN reindexing happen on branches / during merges?
- What observability tooling exists for tracing multi-agent branching workflows in production?
- How does this compare to/integrate with existing graph databases (Neo4j, DynamoDB) in hybrid setups?
