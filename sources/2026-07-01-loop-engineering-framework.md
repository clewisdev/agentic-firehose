---
title: "Loop Engineering: Three Patterns for Agentic Software Development"
url: https://www.linkedin.com/posts/andrewyng_loop-engineering-is-a-hot-buzzphrase-after-activity-7477753883768029185
authors: [Andrew Ng]
captured: 2026-07-01
source_type: post
topics: [agent-architecture, agentic-workflows, engineering-judgment]
tags: [loop-engineering, coding-agents, evals, iteration, developer-feedback, product-specification]
signal_level: medium
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

Andrew Ng articulates three interdependent loops for building 0-to-1 products with AI coding agents, framing loop engineering as a design pattern rather than mere buzzword. The framework emerged from practitioner experience and addresses a real shift in how developer effort distributes across implementation and product intent.

**The three loops:**

1. **Agentic coding loop** (minutes to hours): Agent writes code, tests against spec/evals, iterates until meeting criteria without human intervention. Ng reports ~1-hour autonomous sessions on real projects (typing practice app). Loop closure depends on evals—a dataset measuring specification compliance.

2. **Engineering loop** (minutes internally): Rapid build-test cycles. "Active area of invention" — developers are discovering novel loop engineering patterns.

3. **Developer feedback loop** (tens of minutes to hours): Human examines product, steers agent toward higher-level decisions (features, UX, user flows). Shifts developer from QA tester to product decider.

## Key Framing

> "When a developer has a clear vision for what to build, it is still a lot of work to translate that vision into a specification for a coding agent to implement."

Ng identifies a critical transition: coding agents invert the bottleneck. Developers no longer spend time finding bugs (agent self-tests); they now must spend more time clarifying *what* to build and *why*. This is organizational friction for teams accustomed to hands-on implementation.

## Signals and Tensions in Comments

The 287 comments surface legitimate engineering concerns:

- **Edgar Kussberg**: Flags that agent self-grading against author-written evals creates a closed loop. "Tests its own code until bug-free" obscures the fact that QA didn't disappear—it moved to "checking whether the agent's verdict holds." Real bugs slip through evals.

- **Arvind K N**: Static evals fail in shifting environments. Proposes supervisory agents as eval writers, but warns of cascading hallucinations. Advocates real-time intent classifiers anchored to live system state.

- **Jignesh Maheshwari**: Spec writing is the real bottleneck. "Nobody talks about how uncomfortable that transition is for engineers moving into a product role." Tool helps only if you know what to put into it.

- **Guillaume Belisle**: Clean separation: evals validate spec compliance; they don't validate that the spec is the right product bet. Human loop still holds product judgment.

## Open Questions

- How do practitioners prevent agent-written evals from becoming a second layer of garbage-in-garbage-out?
- What organizational structures support the shift from "implement features" to "clarify intent"?
- Does loop engineering favor certain problem domains (well-specified, bounded) over others (exploratory, user-discovery-driven)?
- Can the loops work without external feedback (real users, production metrics) or do they optimize toward internal coherence?

## Takeaways

- Loop engineering is a **design pattern** for decomposing agentic work into closure types (spec compliance, implementation velocity, product direction), not a tool or framework.
- The pattern makes a **real organizational shift** visible: developers become product steerers, not QA. Requires new skills and discomfort.
- **Evals are load-bearing**. Agent iteration quality is bounded by eval quality. Closed-loop self-grading risk is real and underacknowledged.
- **Spec clarity** is the upstream constraint. Loops amplify bad specs faster than humans could.
- Active practitioner experimentation is ongoing—"active area of invention"—suggesting the loop taxonomy is still settling.
