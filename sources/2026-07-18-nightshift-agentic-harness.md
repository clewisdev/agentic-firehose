---
title: "Building NightShift: An Agentic Harness for Code Generation"
url: https://www.linkedin.com/posts/mihirsam_in-the-last-few-weeks-ive-been-building-share-7482977161210077184-H1nS/
authors: [Mihir Sambhus]
captured: 2026-07-18
source_type: post
topics: [agent-architecture, code-generation, agentic-workflows]
tags: [harness, context-management, code-review, model-routing, verification]
signal_level: high
status: raw
confidence: high
freshness_until: 2026-Q3
---

## Summary

Mihir Sambhus reports building NightShift, an agentic harness developed to manage code generation at scale across multiple simultaneous projects (finance, fitness, endurance cycling planning, and second-brain applications). The core insight: naive prompt-and-merge workflows fail as context multiplies.

Initial workflow: prompt Claude, code review, merge. This broke down as request volume increased, resulting in:
- Context loss
- Component duplication
- Features fragmented into separate tabs instead of coherent products
- Regressions slipping through
- Developer attention becoming the bottleneck

Solution was not better prompts but **infrastructure**: persistent context, memory, planning, model routing, verification, caching, observability, and human intervention points. Over time, this evolved from "a collection of prompts and skills" into a true harness.

**Core thesis**: "An agentic harness is the engineering system that protects your products as code generation accelerates. Otherwise, you are gambling that one model family's output will add up to a trustworthy product."

This frames the distinction between code generation as a tool vs. code generation as a system design problem requiring active governance.

## Key Quotes

> "Better prompts were not the answer."

> "an agentic harness is the engineering system that protects your products as code generation accelerates. Otherwise, you are gambling that one model family's output will add up to a trustworthy product."

> "My attention became the bottleneck."

## Takeaways

- **Context management at scale**: as volume increases, implicit context (developer head) must be made explicit (persistent memory, planning).
- **Model routing and verification critical**: preventing regressions in multi-project scenarios requires routing decisions and hard verification gates, not just prompting.
- **Harness vs. tool**: the distinction between using LLMs for code acceleration (tactical) vs. designing systems architecture around agentic output (strategic).
- **Observability and human control**: caching, observability, and intervention points are required infrastructure, not optional conveniences.
- **Attention as limiting factor**: even with perfect tooling, engineering judgment remains the bottleneck; harness design should offload routine decisions, not all decisions.

## Open Questions

- What verification gates does NightShift enforce? (type checking, behavioral tests, regression detection?)
- How is model routing decided? (rule-based, learned, heuristic?)
- How does caching interact with context drift in long-lived agent workflows?
- Does the harness support multi-agent coordination or is it single-model-multiple-missions?
- What failure modes have emerged in production deployments?
