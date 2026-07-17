---
title: "The Archaeologist's Copilot: Restoring a 20-year-old Java Big Ball of Mud using AI and Docker"
url: https://martinfowler.com/articles/archaeologist-copilot.html
authors: [Nik Malykhin]
captured: 2026-07-17
source_type: blog
topics: [code-generation, agent-architecture, agentic-workflows, engineering-judgment]
tags: [legacy-systems, refactoring, llm-grounding, brownfield, java, docker, testcontainers, prompt-engineering]
signal_level: high
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

Nik Malykhin documents a practical case study of modernizing a Java 1.5 codebase using LLMs as grounded analysis tools rather than code generators. The project moves through four phases: analysis, containment strategy, gradual lift, and refactoring—with AI constrained by evidence, Docker-based validation, and test harnesses.

The core insight: **LLM hallucination is fatal in brownfield work**. Initial "Tourist Prompt" ("How do I run this?") produced plausible but structurally false artifacts—wrong dependency versions, invented Maven layouts, hidden rot glossed over. The shift came when adopting an "Archaeologist Prompt"—explicitly asking the AI to critique rather than summarize, grounding assessment in forensic code audit against actual codebase evidence.

Key artifacts in the workflow:

1. **Phase I (Analysis)**: Forensic code audit persona; carbon-dating via syntax/imports; identification of God Classes and "stringly-typed" data flow; explicit structural flaws (thread-safety, swallowed exceptions, fake unit tests).

2. **Phase II (Wrap)**: Docker as "time capsule"—containerizing original dependencies to establish a stable baseline; validates "wet" tests (actual compilation and runtime) before refactoring.

3. **Phase III (Lift)**: Mapping legacy structure; hardening baseline with TestContainers; establishing AI-compiler feedback loop—letting compilation failures guide prompt refinement, not the reverse.

4. **Phase IV (Refactor)**: Protected refactoring with stress testing; concurrency validation; final environment cleanup.

## Key Quotes

> "AI defaults to optimism. When I ask 'How do I run this?', it assumes I can run it. In a restoration mission, optimism is fatal."

> "To truly restore a brownfield project, I need to stop acting like Tourists and start acting like Archaeologists."

> "The AI-Compiler Feedback Loop" — using actual build failures as grounding signal to refine prompts, rather than trusting generated build configurations blindly.

> "The core implementation SimpleBlobStoreImpl wasn't even thread-safe, the error-handling code routinely swallowed exceptions, and the so-called 'Unit Tests' were actually integration tests that required a live MySQL database to run."

## Takeaways

- **LLM grounding via evidence**: AI is most useful when constrained by concrete compilation failures, test results, and forensic code inspection—not by summarization or confident assumptions.
- **Persona and forbidding heuristics**: Explicit "Senior Legacy Systems Architect" prompt with directive to avoid README summarization and perform forensic audit, not tour-guide synthesis.
- **Docker as validation harness**: Containerizing original build environment (Ant, Java 1.5 dependencies, MySQL) creates stable baseline; "wet" tests validate refactoring safety before committing changes.
- **AI as analysis, not generation**: AI excels at identifying structural flaws, architectural gaps, and hidden behaviors; code generation in brownfield work is harmful without grounding.
- **Incremental lift with feedback**: Each phase (Analysis → Wrap → Lift → Refactor) produces concrete artifacts (forensic audit, Docker baseline, test suite, refactored module) that inform the next; failures are signals, not surprises.

## Open Questions

- How does the "AI-Compiler Feedback Loop" scale when the codebase has no existing test suite or compiler errors are cryptic?
- What is the cost boundary (tokens, time, iterations) at which Docker-based grounding becomes less efficient than manual code inspection?
- How does this pattern transfer to non-JVM languages (e.g., Python 2, legacy Node, C++) with weaker type systems or build-time validation?
- Can the forensic audit prompt be templated or automated across multiple legacy systems to reduce prompt engineering effort?
