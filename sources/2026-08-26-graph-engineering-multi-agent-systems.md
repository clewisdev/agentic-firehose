---
title: "Graph Engineering for Multi-Agent Systems: Agents Can Forget, Systems Should Not"
url: https://www.linkedin.com/posts/sanjeevsharma2702_agenticai-aiagents-multiagentsystems-share-7495686616712302592-3LQZ/
authors: [Sanjeev Sharma]
captured: 2026-08-26
source_type: post
topics: [agent-architecture, memory, agentic-workflows]
tags: [knowledge-graph, multi-agent, persistent-memory, evaluation, institutional-memory]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2026-Q4
---

## Summary

Sanjeev Sharma articulates a framework for evolving multi-agent systems through persistent knowledge graphs, drawing on concepts attributed to Andrej Karpathy's "Graph Engineering." The core thesis: individual agents are stateless and ephemeral, but systems can accumulate institutional memory through structured knowledge graphs that preserve learned facts, decisions, and experimental outcomes.

Sharma proposes a six-step evolution:

1. **Build the loop**: Generate → Critique → Revise with a single agent, running aggressive experiments to identify what works and what fails.
2. **Parallelize work**: Run multiple agents independently across separate branches and worktrees within the same codebase.
3. **Introduce a knowledge graph**: Extract entities, resolve aliases, build typed relationships connecting decisions, experiments, outcomes, and facts.
4. **Ground the evaluator**: Shift from subjective "looks right" validation to evidence-based claims checking against the knowledge graph.
5. **Make the graph shared memory**: Workers (agents) write learned facts; evaluators query them; future agents inherit accumulated knowledge.
6. **Distinguish system memory from context windows**: Models have finite context; systems should have persistent memory.

The framing separates concerns clearly: "The model is the intelligence. The graph becomes the institutional memory. The architecture turns both into a system."

## Verbatim quotes

> "Agents can forget. The system should not."

> "The interesting part for me is that the next leap in agentic AI may not necessarily come from a dramatically better model. It may come from better architecture around the model."

> "One agent with a powerful model is useful. Hundreds of agents that can coordinate, experiment independently and learn from the same persistent memory? That becomes a very different system."

## Takeaways

- **Architecture as differentiator**: Performance gains may come from systems design (multi-agent coordination + shared memory) rather than model scaling alone.
- **Knowledge graph as institutional memory**: Moving beyond stateless agentic loops to persistent, queryable facts enables compounding learning across experiments.
- **Grounded evaluation is critical**: Evaluators must validate claims against evidence and known facts in the graph, not aesthetic heuristics.
- **Context vs. memory distinction matters**: Systems need persistent storage independent of model context windows to break the reset-on-context-loss pattern.
- **Shared memory enables asynchronous learning**: Yesterday's experiments can inform tomorrow's decisions when workers and evaluators share a common knowledge layer.

## Open questions

- How should provenance, confidence scores, and invalidation paths be encoded in a knowledge graph to prevent stale or incorrect facts from becoming authoritative?
- What is the right balance between rigid graph schemas and flexible, emergent structure in a system where autonomous agents write to shared memory?
- How does this architecture scale to cross-domain validation, especially in enterprise settings with heterogeneous data sources?
- What consolidation mechanisms prevent raw data from being stored ad-hoc, and how do agents autonomously derive stable operational boundaries from derived invariants?

## Notes on reception

Comments surface implementation concerns: the need for append-only experiment logs with derived graphs (enabling challenge/revision of belief state), the importance of metadata (provenance, confidence, freshness, ownership, access policy), and skepticism about attribution—one commenter flagged that the source material may not be from Karpathy directly, suggesting the "Graph Engineering" framing may be community extrapolation rather than original research.
