---
title: "The Spec Is the Code Now"
url: https://www.linkedin.com/pulse/spec-code-now-peter-frey-6d4ef
authors: [Peter Frey]
captured: 2026-06-04
source_type: thread
topics: [spec-driven-development, ai-agents, architecture, code-generation]
tags: [sdd, spec-first, agent-guardrails, api-contracts, collaboration]
signal_level: medium
status: summarized
confidence: medium
freshness_until: 2027-Q2
---

## Summary

Peter Frey argues that engineering teams are moving toward spec-driven development (SDD) as a response to AI agent limitations. The core insight: AI agents expose the cost of tribal knowledge and vague specifications. When architectural decisions are scattered across Confluence, Jira, and Slack, human engineers can infer intent; agents cannot. They'll ship code that compiles and passes tests while violating undocumented architectural patterns.

Frey frames this as climbing the abstraction ladder—binary→assembly→C→higher-level languages. Now: code-first→spec-first. The spec becomes the source of truth; code becomes a build artifact. This mirrors how C programmers stopped writing assembly by hand.

## Core claims

**The half-measures failed:**
- Waterfall: stale specs after six months
- Agile: tribal knowledge fragmented across media
- TDD: only specifies testable behavior
- BDD: "living documentation" drifted into fiction
- API-first: only covered service boundaries

**The Ferrari Effect:** agent capability is bottlenecked by system clarity, not raw LLM power. Tangled architectures, scattered docs, and outdated READMEs are the "dirt roads." A clean spec (machine-readable, versioned, standardized) is the "racetrack."

**Practical payoffs:**
- Agents stop drowning in legacy code; spec gives precise boundaries
- Guesswork disappears (contract clarity on inputs, types, error codes)
- Parallel work unlocks (frontend/backend agents bind to shared contract)

**Reshapes product-engineering seam:** spec becomes the shared artifact across product, design, engineering, legal, security. The 20-year-old "translation problem" (PRD→ticket→restated version→shipped thing) compresses. Decision velocity becomes the bottleneck once the spec is precise and build is cheap.

## Verbatim quotes

> "An agent can't. Or rather, it will - it will happily ship something that compiles, passes its own tests, and violates three architectural decisions that nobody ever wrote down."

> "The vibe-coding shortcut works at prototype scale and falls apart somewhere around feature five."

> "When the spec is vague, the agent ends up making the architectural calls the team should be making—and the team only sees them once they're in the codebase."

> "We stopped writing assembly by hand. We may stop writing most implementation by hand too."

> "Decision velocity becomes the real bottleneck, because once the spec is precise, the build is cheap."

## Takeaways

- **Agent behavior under ambiguity is forcing clarity**: vagueness is no longer tolerable at scale; agents expose the hidden cost of tribal knowledge
- **Spec-first is an infrastructure play, not a methodology**: it's infrastructure for agent work, analogous to how C became build infrastructure for assembly
- **The spec-code relationship inverts**: from "code is truth, spec is aspirational" to "spec is truth, code is build output"
- **Cross-functional convergence on a single artifact**: specs stop being product-documents or engineering-documents; they become shared source material
- **Risk: specs can drift too**: the piece flagged: "Specs drift too. The spec file and the running code can fall out of sync." Frey acknowledges this tension but argues the direction is correct

## Open questions

- How are teams enforcing spec→code consistency at runtime? (drift detection, contract testing, mutation)
- What does versioning a spec look like when product and engineering edit it simultaneously?
- How much of code generation from spec is deterministic vs. requiring agent creativity?
- Does spec-first work well for exploratory/research features or only for well-specified features?
- What governance prevents specs from becoming a new layer of technical debt if teams don't maintain them as rigorously as code?
