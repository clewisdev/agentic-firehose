---
title: "Agent Harness Engineering vs. Loop Engineering vs. Graph Engineering"
url: https://www.linkedin.com/posts/gallevin_aiagents-agenticai-aiengineering-ugcPost-7487242597636141057-7xBI/
authors: [Gal Levinshtein]
captured: 2026-01-29
source_type: post
topics: [agent-architecture, agentic-workflows, system-design]
tags: [harness, loops, graphs, state-management, workflow-engines]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

Gal Levinshtein's LinkedIn post articulates a three-layer mental model for agentic systems: **harness**, **loops**, and **graphs**. The core framing separates architectural concerns that practitioners often conflate:

- **Harness**: the foundational environment + feedback mechanism
- **Loops**: retry policies, reconciliation logic, state-flow control (feedback → action cycles)
- **Graphs**: nodes, edges, routing, checkpoints—the topology and state machine layer

The main thesis: "Diagnose the failure first, then pull the right lever." This rejects premature optimization toward graph-based solutions before foundational harness and loop engineering are solid. The post emphasizes this as a shift from "prompt tweaking" to systems engineering.

The comment thread (Ian Johnson, Jeno Laszlo, Selvaraj Y) surfaces important pushback:

1. **Complementary, not vs.**: These are layers within harness engineering, not competing paradigms.
2. **Pre-agent concepts**: Loops and graphs predate agentic frameworks—they're reconciliation patterns, workflow engines, and state machines borrowed from distributed systems.
3. **Cost and state complexity**: Graph-based state management carries higher complexity and runtime overhead than prompt or loop engineering; choice should be problem-driven, not architectural default.

## Key Quotes

> "Diagnose the failure first, then pull the right lever. Don't jump to fancy graphs before your harness and loops are solid."

> "This shift from 'prompt tweaking' to actual systems engineering is what separates pilots that die quietly from agents that deliver real value."

> "A loop is a trigger, state, evidence, a stopping rule, that's a retry policy or a reconciliation loop, no model required. A graph is nodes, edges, routing, checkpoints, that's a state machine or a workflow engine, same idea distributed systems have used for decades."

> "Agents earn their place when the path can't be modelled economically, not as a precondition for the rest of the vocabulary to make sense."

## Takeaways

- **Layered diagnosis**: Harness (environment) → Loops (feedback cycles) → Graphs (topology). Failure root-cause determines which lever to pull.
- **Systems > prompts**: The mental shift from prompt tweaking to architecture engineering is the practical separator between pilot failures and production value.
- **Reframe the comparison**: Loops and graphs are not alternatives to harness; they are nested design patterns within it.
- **Inherit from non-agentic systems**: Reconciliation loops, state machines, and workflow routing predate agentic frameworks; don't re-invent—apply proven abstractions.
- **Cost-awareness**: Graph-based state management trades complexity for expressiveness; justified only when the decision path cannot be modeled economically in advance.

## Open Questions

- How do practitioners in production actually diagnose which layer is the bottleneck? Are there operational signals (latency, error rate, token cost by failure mode)?
- Where is the boundary between a "solid" harness/loop layer and premature graph complexity? 
- How do these three layers interact with context windowing, in-context learning capacity, and multi-turn coherence in practice?
- Are there tools or frameworks that explicitly separate these layers, or do most practitioners mix them within a single framework (e.g., LangGraph, Anthropic SDK)?
