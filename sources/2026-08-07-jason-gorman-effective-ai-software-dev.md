---
title: "SE Radio 732: Jason Gorman on The Effective Use of AI For Software Development"
url: https://se-radio.net/2026/08/se-radio-732-jason-gorman-on-the-effective-use-of-ai-for-software-development/
authors: [Jason Gorman, Giovanni Asproni]
captured: 2026-08-07
source_type: podcast
topics: [prompting, agentic-workflows, code-generation, engineering-judgment]
tags: [tdd, modularization, spec-driven-development, context-engineering, cognitive-debt, codemanship]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2026-Q4
---

## Summary

Jason Gorman (Codemanship founder) discusses effective AI use in software development with host Giovanni Asproni. Core argument: established technical practices become *more* important, not less, when using AI assistance. The episode centers on how foundational disciplines—test-driven development, modularization, continuous integration, and continuous review—directly address LLM limitations, particularly context window management.

Key framing: spec-driven development and "agentic programming" as structured approaches to AI-assisted workflows. Gorman emphasizes code readability and understandability even for AI-generated output, and addresses emerging research on cognitive downsides of over-reliance on AI.

## Core Claims

1. **TDD, modularity, CI/CD amplify with AI**: These aren't legacy practices—they become stricter requirements because they constrain context windows and force explicitness that LLMs need.

2. **Spec-driven development as AI discipline**: Specification clarity reduces hallucination and context drift; teams should treat specs as first-class artifacts.

3. **Cognitive debt accumulation**: Relying on AI for code generation without understanding incurs long-term cognitive costs; developers must maintain critical thinking and code comprehension.

4. **Agentic programming as workflow pattern**: Structured agent orchestration and tool-use improve outcomes over ad-hoc prompt-and-generate cycles.

## Takeaways

- AI effectiveness in development is bounded by code organization discipline, not by model capability alone
- Spec-driven and test-driven approaches are antidotes to both LLM hallucination and developer cognitive offloading
- Context window constraints should drive architecture decisions (smaller modules, tighter coupling of tests to specs)
- Cognitive downsides of AI over-reliance are documented; conscious practice design required to mitigate
- Agentic workflows (named tool calls, explicit state) outperform freeform prompting in production contexts

## Open Questions

- What metrics distinguish "readable AI-generated code" from unreadable, and how do they correlate with long-term maintenance cost?
- How do spec-driven and agentic patterns interact in large distributed teams?
- What proportion of cognitive debt is recoverable through refactoring vs. knowledge reconstruction?

## Related Context

Episode references CRESS principles for context engineering, Ralph Loops, spec-kit, and cognitive offloading research (Stack Overflow "Your Brain on ChatGPT"). Positioned alongside SE Radio 710 (Marc Brooker on spec-driven AI dev) and 730 (Birgitta Boeckeler on harness engineering for AI agents).
