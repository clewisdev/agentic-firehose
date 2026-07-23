---
title: "Harness Handbook: Making Evolving Agent Harnesses Readable, Navigable, and Editable"
url: https://arxiv.org/abs/2607.13285
authors: [Ruhan Wang, Yucheng Shi, Zongxia Li, Zhongzhi Li, Yue Yu, Junyao Yang, Kishan Panaganti, Haitao Mi, Dongruo Zhou, Leoweiliang]
captured: 2026-07-23
source_type: paper
topics: [harnesses, agent-architecture, system-design, engineering-judgment]
tags: [behavior-localization, code-navigation, static-analysis, progressive-disclosure, agent-evolution]
signal_level: high
status: raw
confidence: high
freshness_until: unknown
---

## Summary

This paper addresses a fundamental bottleneck in agentic system evolution: **behavior localization** — the problem of mapping high-level modification requests to scattered code locations in large, tightly coupled harnesses.

Production agent harnesses manage prompts, state, tool invocation, and execution coordination across multiple modules. When models, APIs, or requirements change, developers or coding agents must first identify *all* code locations that implement the target behavior before making edits. This is difficult because:

- Harnesses are large and behaviorally distributed
- Modification requests describe desired behavior; repositories are organized by files
- Behavior implementation is often scattered across modules and rarely-executed paths
- Even with code search and long-context LLMs, behavior-to-code mapping must be recovered manually

The paper introduces two contributions:

1. **Harness Handbook**: A behavior-centric representation synthesized automatically from harness code via static analysis and LLM-assisted structuring. Each behavior is explicitly linked to its implementation locations.

2. **Behavior-Guided Progressive Disclosure (BGPD)**: A navigation strategy that guides agents from high-level behaviors → implementation details → concrete code locations, with verification against current source.

Evaluation on modification requests from two open-source harnesses shows:
- Improved behavior localization accuracy
- Better edit-plan quality
- Fewer planner tokens consumed
- Largest gains on scattered sites, cross-module interactions, and rarely-executed paths

## Key Insight

> "Evolving complex agentic systems depends not only on generating edits, but also on determining where those edits should be made."

This reframes harness modification as a *search* problem, not just a generation problem. The Handbook is a static artifact that makes this search tractable without hand-written documentation.

## Takeaways

- **Harness structure is a first-class problem**: Production agent systems require explicit tooling for behavior-to-code mapping, not just better code generation
- **Static analysis + LLM structuring is tractable**: Automatically synthesizing behavior-centric indexes from code is feasible and effective at scale
- **Progressive disclosure works for agent planning**: Guiding agents through hierarchical behavior → implementation detail chains improves both correctness and token efficiency
- **Scattered and cross-module behaviors are the failure mode**: Standard code search fails when behavior is distributed; the Handbook's approach explicitly targets this case
- **Verification against source is critical**: BGPD's verification step prevents agents from hallucinating outdated or incorrect implementation locations

## Open Questions

- How does the Handbook scale to harnesses with hundreds of thousands of lines or dozens of modules?
- Can the synthesis process be made incremental, so the Handbook stays current as the harness evolves?
- How generalizable is BGPD to non-harness codebases, or is this pattern specific to agentic systems?
- What's the overhead of maintaining the Handbook (synthesis time, storage) vs. the savings in planner tokens?
- How does this approach interact with symbolic execution or formal verification of harness behavior?
