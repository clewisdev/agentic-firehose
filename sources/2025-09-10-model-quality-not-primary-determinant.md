---
title: "Model quality is not the primary determinant of an agent's performance"
url: https://www.linkedin.com/posts/tohidi-setare_model-quality-is-not-the-primary-determinant-share-7503511542093496320-kj1x/
authors: [Setare Tohidi]
captured: 2025-09-10
source_type: post
topics: [agent-architecture, harnesses, system-design]
tags: [observability, governance, verification, adaptation, orchestration]
signal_level: medium
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

Setare Tohidi argues that model capability is insufficient to determine agent performance; the *harness* — the system architecture around a model — determines what can be observed, acted upon, and corrected. Drawing on the O'Reilly book *Harness Engineering*, she frames this as a six-layer stack:

1. **Identity & Behavior**: skills, instructions, compiled context, behavioral boundaries
2. **Runtime**: execution environment, tools, state, orchestration
3. **Observability**: traces, costs, latency, failure signals
4. **Verification**: validation of evidence, outputs, outcomes
5. **Adaptation**: learning from previous runs, reusing successful results
6. **Governance & Security**: permissions, policies, auditability, guardrails

The core insight: engineers control *inputs* (prompt, context, RAG, tools, memory) but system reliability depends on the harness layers. A brilliant model without good structure is like a brilliant engineer without repositories, documentation, deployment policies, or code review.

## Key Quotes

> "The structures determine what can be observed, what actions can be taken, and how mistakes are detected and corrected."

> "The model provides the intelligence. The harness provides the system."

> "The underlying model can remain unchanged while the overall system becomes significantly more capable and reliable."

## Takeaways

- Agent performance bottlenecks often lie in architecture, not model weights
- Input control (prompt engineering, RAG, tools) is necessary but not sufficient
- Observability and verification layers are as critical as the model itself
- The six-layer harness model provides a vocabulary for reasoning about agent system design
- Governance and security are structural concerns, not afterthoughts

## Open Questions

- How does this harness framework apply to multi-agent orchestration?
- Which layer typically fails first in production agent deployments?
- Does the six-layer model require different tooling stacks, or can it be implemented within a single framework?
