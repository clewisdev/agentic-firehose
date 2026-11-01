---
title: "Are harnesses dying?"
url: https://www.linkedin.com/posts/seldo_another-week-another-thing-declared-dead-ugcPost-7509436176731209728-RFee/
authors: [Laurie Voss]
captured: 2026-11-01
source_type: post
topics: [harnesses, agent-architecture, system-design]
tags: [harness-decay, deterministic-controls, model-absorption, arc-agi]
signal_level: medium
status: raw
confidence: high
freshness_until: 2027-Q4
---

## Summary

Laurie Voss kicks off a discussion challenging the recurring industry narrative that "harnesses are dead" in the wake of advancing base models. Voss argues that while new research demonstrates that frontier models rapidly absorb capabilities previously handled by external agent harnesses (such as basic planning loops, verification patterns, and trajectory structuring), harnesses themselves are not obsolete. Instead, they become dynamic and brittle: each model upgrade requires rebuilding or trimming the harness to avoid redundant overhead and handle only what the latest model still cannot do autonomously.

The resulting practitioner discussion adds substantial nuance to this dynamic, dissecting what model absorption actually looks like in production and identifying which harness layers are durable versus transient:

1. **Judgment vs. Constraint Separation**: Commenters (notably Siddartha Reddy Chinthala and Vivek Viswanathan) point out that models absorb generic *judgment* and reasoning behaviors (e.g., "verify before acting", iterative decomposition, basic tool-calling hygiene). However, models cannot absorb organizational *constraints*, deterministic guardrails, identity, policy, approval hierarchies, or external compliance boundaries. A model cannot absorb rules it is strictly not permitted to decide on probabilistic terms.

2. **The Harness Half-Life**: Rather than treating an agent harness as a static framework, engineering teams must design harness components with an explicit half-life. The maintenance operational loop changes from reactive debugging when a new model drops to actively testing "turn-it-off-and-rerun-evals" to prune scaffolding that the model has internalized.

3. **Deterministic State vs. Probabilistic Drift**: Commenter Charles Austin argues that regardless of model capability gains, critical systems require deterministic state machines and environmental hardening. Removing hard gates simply because a model scores higher on general benchmarks introduces unacceptable compliance and audit risks.

4. **Performance Leverage Remains in Scaffolding**: Despite model advancements, benchmarks like ARC-AGI-3 continue to show massive performance variance (up to 3.4x score swings) on identical base models purely based on the harness implementation, demonstrating that harness engineering remains one of the largest leverage points in agent performance.

## Key Quotes

- **Laurie Voss**: *"[N]ew research has shown that models can rapidly absorb many of the best parts of harnesses, meaning you can't build your harness and leave it static: every time a new model comes along, you have to rebuild your harness to do only the things the model can't do this generation."*
- **Siddartha Reddy Chinthala**: *"That ARC-AGI-3 number is doing a lot of work. 3.4x score swing between harnesses on the same model. Hard to square with 'dying' when the harness is still the biggest lever in the stack. The absorption pattern looks real, but selective. The components that encode judgment get eaten. The ones that encode your constraints don't, because the model can't absorb what it isn't allowed to decide."*
- **Vivek Viswanathan**: *"In banking, for example, a model can learn the habit of 'verify before acting.' What it cannot magically know is your approval hierarchy, transaction limits, sanctions rules, exception paths or internal tooling unless those are still exposed at runtime. So I’d expect the harness to get thinner, but also more focused."*
- **Charles Austin**: *"Why must we leave things the model can do to probabilistic chance instead of deterministic controls, state machines, and environmental hardening, rather than trusting the model to be honest and reliable? It can propose decisions, but removing hard gates because it gains more 'intelligence' in areas isn't a hill I'd want to die on when it's audit time..."*

## Takeaways

- **Harnesses shrink in orchestration, not in governance**: Generic scaffolding (e.g., manual self-correction loops, basic planning steps) gets swallowed by base models, shifting the harness towards domain-specific governance, access controls, and deterministic state management.
- **Design harness components with planned obsolescence**: Assume custom prompt middleware and heuristic agent loops have an expiration date tied to next-generation frontier model releases; proactively run ablation evals on new model releases to prune dead scaffolding.
- **Harness leverage remains decisive on hard benchmarks**: Massive performance deltas (up to 3.4x on identical weights) show that execution environments and search harnesses still dominate pure model scale.
- **Compliance dictates deterministic architecture**: Autonomous model improvements cannot substitute for verifiable human-in-the-loop checks or hard system boundaries required by audit and security policies.

## Open Questions

- How can engineering teams implement automated ablation testing to identify which parts of an agent harness can be safely removed when switching base models?
- At what scale of agent complexity does retaining redundant harness guardrails (double-checking model decisions) cost more in latency and tokens than it saves in reliability?