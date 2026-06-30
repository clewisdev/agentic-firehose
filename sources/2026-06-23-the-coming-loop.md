---
title: "The Coming Loop"
url: https://lucumr.pocoo.org/2026/6/23/the-coming-loop/
authors: [Armin Ronacher]
captured: 2026-06-30
source_type: blog
topics: [agent-architecture, agentic-workflows, engineering-judgment]
tags: [harness, loops, code-generation, model-behavior, abstractions]
signal_level: high
status: raw
confidence: high
freshness_until: unknown
---

## Summary

Armin Ronacher reflects on the emerging pattern of harness-level loops in agentic engineering—the outer control loop that sits above the agent's own tool-use loop, deciding whether to continue, restart, or redirect work. He draws a distinction between two nested loops: the agent loop (model → tool → incorporate → repeat) and the harness loop (queue → agent attempt → harness judgment → continue or redirect).

Ronacher is skeptical about applying loops to lasting, production code. His core concern: present-day models generate defensive, locally-reasoning code that avoids strong invariants, duplicates logic, and adds fallbacks instead of making bad states impossible. When wrapped in loops, this pattern amplifies—each iteration adds another small defense, and the system becomes less understandable while *appearing* more robust. He observes models are "mortally terrified of exceptions" and will add error handling even when the error should be impossible by design.

However, he identifies domains where loops work well: **porting code** (transforming existing code rather than writing new), **performance exploration** (benchmark, discard, keep searching), **security scanning**, and **research tasks** that don't require long-lived artifacts. These succeed because they either transform existing code, produce throwaway proofs-of-concept, or enable clearly verifiable mechanical translation.

Ronacher frames the tension as "software as deterministic machine" vs. "software as organism." He was trained in an environment where understanding code, exposing load-bearing invariants, and documenting architecture were core goals. He worries that hands-off looping normalizes slop for juniors and removes the human comprehension layer that has historically kept complex systems navigable.

## Key Quotes

> "I don't prompt Claude anymore. I have loops running that prompt Claude and figuring out what to do. My job is to write loops." — Boris Cherny

> "Present-day models tend to produce code that is too defensive, too complex, too local in its reasoning. They avoid strong invariants. They add fallbacks instead of making bad states impossible."

> "If each iteration adds another small defense, the system slowly becomes less understandable while appearing more robust."

> "The metaphor I like to reach for is one of moving from software as a deterministic machine to software as an organism."

> "On well designed systems there were always engineers that knew where the invariantes lived, which parts were load-bearing and which changes were safe."

## Takeaways

- **Nested loops are now dominant pattern**: harness-level loops are becoming the standard frame for agentic code work, but they amplify model weaknesses when applied to lasting systems.
- **Defensive code scales poorly**: models add local error handling instead of designing invariants; loops make this worse by iterating on slop.
- **Domain specificity matters**: loops excel at transformation, exploration, and research; they fail at producing maintainable, architecturally coherent systems.
- **Comprehension as a load-bearing requirement**: Ronacher's taste for understandable code reflects a design philosophy (invariants, fewer abstractions) that LLMs don't naturally produce and loops don't improve.
- **Cultural risk**: normalizing loop-driven code to junior engineers without mentoring them on invariant design risks embedding poor architectural practices as standard.

## Open Questions

- How do we design harnesses that reward invariant-based design instead of defensive patching?
- Can we use multi-agent evaluation (LLM-as-judge) to distinguish between "more code" and "better code"?
- What metrics would distinguish between "appearing robust" and "actually robust"?
- Does the human-in-the-loop cadence fundamentally change what models produce, or just slow it down?
