---
title: "OpenAI's Agentic Software Factory: Architecture and Perf Factory"
url: https://www.linkedin.com/posts/gergelyorosz_heres-what-openais-agentic-software-factory-share-7505711322685411330
authors: [Gergely Orosz]
captured: 2026-09-17
source_type: post
topics: [agentic-workflows, agent-architecture, system-design, evals]
tags: [openai, perf-factory, hitl, human-in-the-loop, production-deployment]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2026-Q4
---

## Summary

Gergely Orosz shared OpenAI's internal agentic software factory architecture, detailing how agents are used to automate feature development, code generation, and testing workflows. The post highlights a diamond-shaped decision gate for "Low risk change?" that triggers human-in-the-loop (HITL) review, and calls particular attention to "Perf Factory" — a subsystem designed to validate performance regressions when agents ship code at scale.

The architecture appears to map traditional PM → agile dev → CI/CD workflows onto agentic agents, with senior engineers occupying human oversight roles. However, the post sparked substantial skepticism in comments about:

1. **Risk of HITL circumvention**: Using LLM-as-a-judge for the risk-gate decision could allow agents to work around human review.
2. **Missing architectural layers**: The diagram shows feature/code generation but not how infrastructure, design, and system-level architecture decisions are made by agents.
3. **Performance and security validation**: Perf Factory's actual mechanisms for preventing agents from optimizing metrics (e.g., benchmarks) while regressing real-world performance (p99 latency) remain unclear.
4. **Compliance and audit**: Tension between single-developer agent deploys and SOC2/SOX requirements for change control.

## Key quotes

> "Perf Factory looks especially interesting to me."

> "Perf Factory is the interesting one because performance work is where agents usually cheat – optimize the benchmark, regress the p99. Did they say how they keep the agents honest on what 'faster' means?" — Vladislav Ramazaev

> "The architecture is persuasive because it makes the control points visible, not just the generation step. The real test is whether outcome definition, review thresholds, and production ownership stay explicit as the factory scales." — Dr. Josh Simmons

## Takeaways

- **Perf Factory addresses a real gap**: Once agents can write and deploy code at volume, performance regression detection and validation becomes a bottleneck, not code generation.
- **HITL gates are theoretically sound but implementation-critical**: Diamond-gate review rules are only safe if the decision logic cannot be gamed; LLM-as-a-judge patterns require careful auditing.
- **Missing layers matter for adoption**: The diagram omits how agents handle architectural decisions, design reviews, and infrastructure changes — areas where human judgment remains expensive and difficult to automate.
- **Skepticism is warranted**: The claim that this is truly how OpenAI ships to millions of users is disputed by credible practitioners; the diagram may be a simplified or aspirational model.
- **Compliance friction is real**: High-volume agentic deploys create tension with governance frameworks (SOC2, SOX) that expect explicit human sign-off and audit trails.

## Open questions

- What is the actual false-negative rate on the "Low risk change?" gate? How often do agents successfully bypass it?
- How does Perf Factory prevent metric-gaming (e.g., agents optimizing latency on a synthetic benchmark while regressing real-world p99)?
- Who owns the final veto on a Perf Factory rejection, and what is the escalation workflow?
- How does this architecture handle architectural or design-level changes that span multiple subsystems?
- Is this the actual production workflow at OpenAI, or a sanitized/forward-looking proposal for external communication?
