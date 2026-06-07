---
title: "MSFT Build Day 2 Dispatch: The King is Dead. Long Live the King! Or, AI SDLC"
url: https://www.linkedin.com/posts/responsibleai_msft-build-day-2-dispatch-the-king-is-dead-ugcPost-7468101612973002753-Nots/
authors: [Edward Achtner]
captured: 2026-06-05
source_type: thread
topics: [ai-sdlc, agent-architecture, testing-evals, enterprise-deployment]
tags: [ci-cd, clean-code, tooling, governance]
signal_level: medium
status: summarized
confidence: medium
freshness_until: 2026-Q3
---

## Summary

Edward Achtner (ResponsibleAI) reflects on Microsoft Build Day 2 with focus on AI SDLC (Software Development Lifecycle) and the tension between agent proliferation and production-grade engineering discipline.

**Core tension articulated**: The industry can now manufacture "hundreds-to-thousands of agents" simultaneously, but this capability clashes fundamentally with the rigorous requirements for world-class CI/CD pipelines—particularly in financial services, where releases demand orders of magnitude higher quality (10,000–30,000 high-quality releases/year).

Achtner explicitly challenges the low-code/abstracted agent-build product narrative, calling it "a false prophet" in most enterprise cases. He cites missing foundational practices:

- Evals and testing frameworks
- Tooling for agent composition and lifecycle
- Clean architecture and ruthless architectural discipline
- Model Risk Management (MRM)

The post invokes Robert C. Martin's *Clean Code* as a moral anchor—suggesting the gap between agent-manufacturing hype and the unglamorous, incremental work required to make agents ship reliably in regulated environments.

Most inspiring conversation: Mark Russinovich + Scott Hanselman on System 3 Thinking (evolution of Kahneman's Fast & Slow), cognitive load in engineering cultures, and preceptorship for the next generation of builders.

## Verbatim Quotes

> "Emerging capabilities now allow for the simultaneous manufacturing of hundreds-to-thousands of Agents. Perhaps because I lack the skill, imagination (or both), I cannot reconcile that with what I know to be the rigorous requirements necessary to enable world class CI/CD pipelines that ship 10,000 - 30,000 high quality releases/year (in financial services!)."

> "low-code/abstracted build products, in most enterprise cases, will turn out to be a false prophet."

> "I'm wishing for a whiteboard and philosophical conversation with Pete Towns and Frank McGrath at this moment...."

(Comment from Jeffrey Fleischer, high-signal follow-up:)

> "The companies that win with agentic AI won't be the ones that build thousands of agents - they'll be the ones that build systems where agents can compose and evolve themselves."

## Takeaways

- **Agent volume is not a competitive advantage**: Raw agent manufacturing capacity without integration into robust SDLC, testing, and governance is enterprise theatre.
- **SDLC for AI agents remains immature**: Evals, tooling, MRM, and clean architecture are acknowledged gaps, not solved problems.
- **Low-code agent platforms are a category risk**: Abstraction that hides deployment complexity (testing, versioning, observability) is likely to create production debt, especially in regulated industries.
- **Architectural discipline + human preceptorship matter**: The most valuable framing from Build wasn't hype but meta-conversation about how to teach the next generation to build sustainably.
- **Financial services is the forcing function**: If 10k–30k releases/year is the bar, agents in banking will expose every immaturity in the current toolchain.

## Open Questions

- What does a production-grade CI/CD pipeline for agents *actually look like* in financial services today?
- Are there concrete examples of agent composition frameworks that satisfy MRM requirements?
- How do teams measure eval coverage and testing ROI when agent behavior is stochastic?
- What role does "System 3 Thinking" (Kahneman + Russinovich framing) play in agent system design?

