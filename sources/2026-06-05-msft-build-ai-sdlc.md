---
title: "MSFT Build Day 2 Dispatch: The King is Dead. Long Live the King! Or, AI SDLC"
url: https://www.linkedin.com/posts/responsibleai_msft-build-day-2-dispatch-the-king-is-dead-ugcPost-7468101612973002753-Nots/
authors: [Edward Achtner]
captured: 2026-06-05
source_type: thread
topics: [ai-sdlc, agent-architecture, testing, evaluation, production-systems]
tags: [ci-cd, clean-code, financial-services, agent-composition]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

Edward Achtner, a technology leader, reflects on Microsoft Build Day 2 sessions focused on AI SDLC (Software Development Lifecycle). The post raises a critical friction point: the industry is enabling manufacturing of "hundreds-to-thousands of Agents" simultaneously, yet lacks the rigorous engineering discipline required for production-grade systems—particularly in financial services where 10,000–30,000 high-quality releases per year with complex CI/CD pipelines are standard.

Achtner's core argument: low-code/abstracted agent-build products in enterprise contexts will likely fail without addressing evals, testing, tooling, and architectural discipline. He references Robert Martin's *Clean Code* as a conceptual anchor, and expresses concern that the industry is conflating capability scaling with production-readiness.

A secondary narrative emphasizes System 3 Thinking (evolution of Kahneman's Fast & Slow), preceptorship in engineering, and cognitive studies as foundational to sustainable engineering craft.

## Key Quotes

> "Emerging capabilities now allow for the simultaneous manufacturing of hundreds-to-thousands of Agents. Perhaps because I lack the skill, imagination (or both), I cannot reconcile that with what I know to be the rigorous requirements necessary to enable world class CI/CD pipelines that ship 10,000 - 30,000 high quality releases/year (in financial services!)."

> "low-code/abstracted build products, in most enterprise cases, will turn out to be a false prophet."

> "The companies that win with agentic AI won't be the ones that build thousands of agents - they'll be the ones that build systems where agents can compose and evolve themselves." [Jeffrey Fleischer, comment thread]

## Takeaways

- **Agent scaling ≠ production readiness**: Raw agent manufacturing capability is orthogonal to SDLC maturity, evals, testing infrastructure, and architectural discipline.
- **Financial services as forcing function**: Regulated environments with strict release gates and quality bars expose weaknesses in low-code agent platforms.
- **Self-composition as differentiator**: A commenter suggests agent *composition* and *evolution* pipelines—not raw count—will separate winners from commoditized builders.
- **Craft and cognitive load**: System 3 thinking and thoughtful engineering preceptorship are necessary counterweights to hype-driven acceleration.
- **MRM / architectural discipline**: Referenced but not elaborated—suggests familiarity with Model Risk Management and formal architectural patterns as missing from current agentic tooling.

## Open Questions

- What does production-grade agent CI/CD actually look like? (Evals? Synthetic data? Drift detection?)
- How do agent-composition systems differ from traditional service orchestration in SDLC rigor?
- What specific gaps exist in low-code platforms when deployed into financial-services environments?
- How does "System 3 Thinking" apply concretely to agent design and testing?