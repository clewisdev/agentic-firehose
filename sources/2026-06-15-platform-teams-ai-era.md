---
title: "What Happens to Platform Teams?"
url: https://curlewis.co.nz/posts/what-happens-to-platform-teams/
authors: [David Curlewis]
captured: 2026-06-15
source_type: blog
topics: [agent-architecture, enterprise-deployment, team-dynamics, system-design]
tags: [platform-engineering, ai-velocity, inner-sourcing, shadow-it, api-design]
signal_level: medium
status: raw
confidence: high
freshness_until: 2026-Q3
---

## Summary

David Curlewis, an engineering leader with 20+ years in platform engineering, reflects on how AI-assisted development is reshaping the role and necessity of internal platform teams. The core thesis: as development velocity increases via AI tooling, the traditional "build-once-centrally" justification for platform teams erodes, but the cognitive-load argument strengthens.

Curlewis reframes the platform function through analogy: if teams previously had machetes (manual workarounds) when they rejected platform solutions, they now have "AI-bulldozers"—capable of quickly building bespoke implementations. This shifts platform strategy from polished end-to-end products toward lower-level APIs and building blocks that teams can compose into custom solutions.

Key shifts observed:

1. **The 80:20 rule is weakening**: The cost of building software is falling fast enough that waiting for platform features becomes less attractive than building them in-house, especially when AI can prototype solutions in days.

2. **Cognitive load becomes the stronger justification**: As more systems proliferate, the burden of maintenance, version upgrades, and operational responsibility becomes harder to distribute. Platform teams must own this burden at scale.

3. **Signal loss from demo-first culture**: Eliminating design docs and proposal gates means platform teams lose visibility into what teams are building. This requires higher-touch 1-on-1 engagement and continuous alignment—a scaling challenge.

4. **APIs over products**: Platform teams should shift from building feature-rich, fully-polished products to exposing lower-level APIs and abstractions. This lets teams build bespoke solutions while platform ensures compliance, observability, security, and reliability at the foundation.

5. **Inner sourcing revival**: AI velocity means teams can contribute upstream faster. Platforms need to optimize for high-volume PR review, comprehensive machine-readable documentation (READMEs, AGENTS specs, CONTRIBUTION guides), and clear contribution pathways. Current industry tooling for review efficiency is immature.

6. **Shadow IT risk**: Without structured engagement and contribution mechanisms, rapid team self-sufficiency can fragment into undocumented, unsupported parallel implementations.

## Key Quotes

> "The cost of developing software systems is falling, so the argument for having a team to centralise any common software required is losing ground... why should a team need to wait for us to add some functionality to a common inference runtime library when, thanks to the power of modern models and parallel agent execution, they can probably build their own library from scratch in a day?!"

> "Cheap building only erodes the first reason for a platform team. The second one, sparing people the cognitive load, gets stronger the more that gets built; more surface area and more moving parts to keep in your head."

> "We just need to figure out how to do so sustainably, and in a way that doesn't turn into Shadow IT. Right now this is requiring a lot more high-touch engagement... and I'm not sure yet whether it's scalable."

> "Humans kinda suck at RTFM, but say what you will about AI, at least they (mostly) read the docs if they're shoved under their virtual-noses."

## Takeaways

- **Platform economics are shifting**: The unit cost of custom build is dropping. Centralization must justify itself on cognitive load and operational risk, not development cost alone.
- **Visibility and governance become critical**: Demo-first culture requires new mechanisms to track, validate, and potentially adopt downstream solutions. 1-on-1 engagement doesn't scale; structured contribution paths do.
- **API abstraction > polished product**: Platforms should provide composable primitives with non-negotiable guarantees (security, observability, compliance) rather than opinionated end-to-end solutions.
- **Documentation is for machines now**: Inner sourcing at AI velocity demands machine-readable specs, clear contribution guidelines, and automated review workflows. Current tooling is immature.
- **Cognitive load is the endgame**: As systems multiply, operational responsibility becomes the scarce resource. Platforms that can absorb and centralize that burden remain valuable.

## Open Questions

- How do platform teams detect and adopt high-quality contributions from teams moving at AI velocity without bottlenecking review?
- What governance / tagging / observability patterns prevent Shadow IT while preserving team autonomy?
- Can inner sourcing processes scale without dedicated platform-side review capacity? What tooling helps?
- How should platform teams measure success if feature velocity is no longer the limiting factor?
