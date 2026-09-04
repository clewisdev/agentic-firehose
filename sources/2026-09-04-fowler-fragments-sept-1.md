---
title: "Fragments: September 1"
url: https://martinfowler.com/fragments/2026-09-01.html
authors: [Martin Fowler]
captured: 2026-09-04
source_type: blog
topics: [harnesses, agent-architecture, system-design, engineering-judgment]
tags: [autonomous-agents, long-horizon-tasks, memory, supervision, persistent-state, ci-cd, deployment-pipelines]
signal_level: medium
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

Martin Fowler's monthly fragments post covers several agentic engineering topics alongside reflections on LLM-generated text detection and AI risk.

The most substantive piece for agentic engineering is a pointer to NVIDIA's research on **AVO (Architecture for long-horizon autonomous agents)**, which achieved notable results on two classes of long-duration tasks: GPU kernel optimization (7-day runtime) and ARC-AGI-3 reasoning benchmarks. The system pairs Claude Opus 5 with a specialized harness designed to preserve progress across model contexts.

Key mechanisms in AVO:
- **Persistent memory**: carries forward prior implementations, evaluation results, compiler/profiler outputs, and reasoning artifacts
- **Supervision**: monitors trajectory for stagnation or repeated unproductive cycles; redirects agent toward alternative strategies when search plateaus

During the 7-day kernel optimization task, the main agent decided what to inspect, change, test, and evaluate, while the supervisor maintained forward progress when search stalled. The team reported success across two distinct task domains, suggesting general-purpose applicability.

Fowler also critiques Paul Stack's piece on "AI Broke CI Assumptions," using it as a foil to revisit foundational Continuous Integration principles. Stack argues that agent-driven CI fails because verification happens post-PR rather than pre-push; Fowler counters that CI has *always* relied on local pre-commit verification by practitioners, and that the real insight is automating this discipline at agent scale. The deeper point: CI is a *practice* about maintaining a healthy mainline, not just server orchestration.

On LLM detection: Fowler notes human ability to distinguish LLM text from human is statistically no better than chance (2025 studies cited), yet he remains subjectively repelled by "LLM voice." This mirrors his earlier caution about mistaking generational tics for genuine deterioration.

## Verbatim quotes

"Persistent memory carries forward prior implementations, evaluation results, compiler and profiler outputs, and accumulated reasoning, allowing the agent to resume from the current state rather than repeatedly reconstructing the search."

"The supervisor monitors the broader trajectory for stagnation or repeated unproductive cycles and can redirect the main agent toward alternative strategies when needed."

"Verification is a necessary part of merging if we want to retain a healthy mainline."

"Continuous Integration is a practice, not just the CI server."

## Takeaways

- **Stateful harnesses for long-horizon tasks**: AVO demonstrates that explicit persistent memory + supervisory feedback loops enable agents to maintain forward progress on multi-day optimization tasks without reconstructing state.
- **General-purpose agent architectures**: success on both kernel optimization and reasoning benchmarks suggests the pattern (persistent state + supervision) may generalize beyond domain-specific solvers.
- **Agent discipline in deployment pipelines**: Fowler's defense of pre-commit verification suggests the real opportunity isn't faster CI servers but pushing verification responsibility *into* agent decision-making before PR creation.
- **Human detection of LLM text remains poor**: despite subjective discomfort with "LLM voice," measurement studies show human discrimination is at chance. Vocabulary/tic-spotting may be pattern-matching noise.
- **Cargo-cult adoption of CI principles breaks with agents**: conflating the CI server (executor) with CI the practice (discipline around mainline health) becomes dangerous when agents can push repeatedly. Requires principled rethinking of pipeline stages.

## Open questions

- How does AVO's supervision signal scale to agents working on less-well-instrumented domains (e.g., product requirements, design, business logic)?
- Does the 7-day kernel optimization task represent genuine open-ended search or a constrained combinatorial problem? How does generalization work?
- What proportion of agent PRs would fail CI under Stack's current setup, and how sensitive is iteration time to the verification-stage placement?
- Can supervision be learned/emergent rather than hand-designed for each task class?
