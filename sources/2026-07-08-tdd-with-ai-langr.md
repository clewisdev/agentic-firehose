---
title: "The Next Test: TDD with AI and the Transformation Priority Premise"
url: https://www.linkedin.com/posts/jefflangr_the-next-test-share-7480364951946096640-zjcd/
authors: [Jeff Langr]
captured: 2026-07-08
source_type: post
topics: [evals, agent-architecture, team-dynamics]
tags: [tdd, testing, ai-assisted-development, human-in-the-loop, evolutionary-design]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

Jeff Langr shares a LinkedIn discussion thread around Dale Stewart's essay on applying the Transformation Priority Premise (TPP) to AI-assisted test-driven development. The thread captures a productive debate about whether classical TDD practices can scale to AI-augmented workflows, or whether they fundamentally misalign with how LLMs operate.

**Core tension**: John Borys argues AI cannot practice true TDD—it "designs the solution first, whether it gives you the test first or not" and lacks capacity for emergent or evolutionary design. Terry Trippany counters with a human-in-the-loop model: the engineer provides intent and judgment; the AI provides speed, breadth, and exhaustive case exploration. Over time this can evolve into agentic workflows. Renan Franca notes TDD's value as a personal practice ("therapy") and seeks ways to preserve that discipline while working with AI.

**Key framing**: The debate highlights a mismatch between prescriptive TDD (red-green-refactor cycles designed for human cognition) and generative AI behavior (solution-first, pattern-matching, lacking incremental design sense). The alternative proposed—interactive "call and response" between human judgment and AI speed—reframes the partnership away from forcing AI into human practices toward augmentation of human-led engineering judgment.

## Verbatim quotes

"We shouldn't force AI into development practices designed for humans... The larger opportunity is to rethink how engineers and AI work together throughout development and testing." — Terry Trippany

"AI is not currently capable of practicing TDD. It can only fake it. You have to have the human question it... AI saves me typing and helps with syntax. But it can't do emergent or evolutionary design." — John Borys

"The engineer provides intent and judgment; the AI provides speed, breadth, persistence, and the ability to explore far more cases than a human could manually." — Terry Trippany

## Takeaways

- **Emergent design gap**: LLMs design solutions forward, not via incremental test-driven refinement. Forcing TPP or classical TDD onto AI may obscure rather than improve testing rigor.
- **Human-in-the-loop as workflow primitive**: Interactive feedback loops (engineer question → AI test → engineer context) may be more productive than autonomous AI TDD, and can evolve into agentic testing workflows.
- **Judgment vs. speed trade-off**: AI excels at breadth, boundary cases, persistence, and syntax; humans own intent, context, evolutionary design decisions. Successful integration preserves the split rather than replacing either.
- **TDD as cognitive discipline**: Some practitioners value TDD for its psychological and structural benefits (Renan Franca: "therapy"), independent of tooling—a reminder that methodology choice is not purely technical.
- **Skepticism on emergence**: Borys's claim that AI "can't do emergent or evolutionary design" is stated without qualification but reflects a real observed gap between greedy completion and deliberate incremental refinement.

## Open questions

- How would Transformation Priority Premise look when applied to a human-guided AI testing workflow? Would the premise still hold?
- Can interactive call-and-response testing scale beyond domain-specific APIs to complex business logic or integration layers?
- What telemetry or metrics would distinguish "faked TDD" from genuine emergent test-driven design in a human–AI pair?
