---
title: "Context as Code: Build-time Governance in the Era of Infinite Syntax"
url: https://www.oreilly.com/radar/context-as-code/
authors: [Artur Huk]
captured: 2026-06-13
source_type: blog
topics: [enterprise-deployment, code-generation, agentic-workflows, context-engineering, technical-debt]
tags: [llm, agents, context-windows, build-time, comprehension-debt]
signal_level: medium
status: summarized
confidence: medium
freshness_until: 2026-Q3
---

## Summary

Artur Huk's O'Reilly Radar piece reframes the core constraint in agentic code generation: syntax is now cheap, but architectural *control* is scarce. The article introduces the metaphor of "Frankenstein factories" to describe the compounding "comprehension debt" (Addy Osmani's term) that emerges when agents generate code faster than teams can verify intent, constraints, and threat models.

The central argument: **governance must move upstream to build-time, before generation.** Rather than better prompting or output filtering, effective systems encode constraints *into the agent's working context*—preventing structurally invalid code from being generated in the first place. This shifts the locus of control from post-hoc filtering to pre-generative boundary-setting.

Key framing: as token costs drop and models improve, the bottleneck shifts from "can the model generate code?" to "can we verify what it generated is safe, correct, and maintainable?" The answer, Huk suggests, lies in context-as-code patterns: making governance rules, architecture patterns, and threat models machine-readable inputs to the generation pipeline.

## Takeaways

- **Comprehension debt compounds silently**: Velocity and code coverage can mask structural risks in generated codebases; this deserves explicit measurement and governance.
- **Constraints belong in context, not in prompts**: Build-time architectural boundaries (API contracts, allowed patterns, threat models) should be encoded as structured context the agent operates within.
- **Syntax abundance inverts the scarcity curve**: As generation becomes trivial, the rare resource is *assurance*—provable correctness, auditability, and alignment with design intent.
- **Context-as-code is infrastructure**: Governance patterns should be versioned, tested, and diff-tracked like code; configuration drift in constraints is as dangerous as drift in architecture.
- **Frankenstein factories are a structural problem**: Individual prompt-tuning or output filters cannot scale; systemic solutions require rethinking how agents integrate with build, verification, and deployment pipelines.

## Open questions

- How do you measure and surface comprehension debt before it becomes architectural risk?
- What does a context-as-code schema look like for multi-agent systems or long-horizon tasks?
- Can threat models and architectural constraints be expressed in a way that's both machine-readable and human-auditable?
- How do you version context (e.g., API contracts, allowed patterns) separately from prompts?

---

*Note: Full content appears truncated in fetch; this summary is based on the opening framing and the author's thesis as stated. Republish risk: medium—this is a live O'Reilly Radar post and may be paywalled or revised.*