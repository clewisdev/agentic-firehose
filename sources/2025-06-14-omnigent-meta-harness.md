---
title: "Omnigent: Open-sourcing a meta-harness for AI agents"
url: https://www.linkedin.com/posts/mateizaharia_really-excited-to-open-source-a-new-project-share-7471594034885459968-eV76/
authors: [Matei Zaharia]
captured: 2025-06-14
source_type: post
topics: [agent-orchestration, enterprise-deployment, safety]
tags: [omnigent, databricks, claude, codex, policies, collaboration]
signal_level: medium
status: summarized
confidence: high
freshness_until: unknown
---

## Summary

Matei Zaharia (Databricks) announces open-source release of Omnigent, a meta-harness layer for composing and controlling multiple AI agents. The tool addresses an observed pattern at Databricks and Neon where engineering teams were manually chaining multiple agents into loops and workflows—difficult to manage above the individual harness level.

Omnigent's core capabilities:

1. **Composition**: Uniform API above heterogeneous agent harnesses (Claude Code, Codex, Pi, agent SDKs). Enables swapping harnesses and models mid-session and mid-loop.
2. **Live collaboration**: Shared UI (native, web, mobile) with real-time collaboration—eliminates copy-pasting between agents, Slack, and docs.
3. **Contextual policies**: Session-aware permission model (e.g., request git-push approval after untrusted npm install; pause after spending threshold). Includes sandbox isolation from security team.

Zaharia frames this as an emerging architectural pattern: as agent adoption widens, orchestration moves from the individual agent to the meta-harness layer. He reports using Omnigent for all his own coding and product work.

## Verbatim quotes

> "Omnigent is based on the trend we saw with AI usage at Databricks and Neon: engineers were combining multiple agents into loops and workflows, and this was difficult above the harness layer. We add a uniform API above any harness that enables rich features on top."

> "For composition, it lets you create multi-agent teams with different harnesses or swap harness and model mid-session and mid-loop."

> "Omnigent introduces a *contextual* policy model that can track session state (e.g. ask for permission to git push if an agent downloaded an untrusted npm package, or ask you after every $100 of spend)."

## Takeaways

- **Practical pain point**: Multi-agent loops and composition are difficult to manage at the application layer; harness abstraction is needed.
- **Contextual governance model**: Policies tied to runtime session state (not just static role-based access) are more expressive for cost and security control in agent systems.
- **API-neutral approach**: Betting that the meta-harness layer will become commoditized; Omnigent intentionally sits above any harness, not tied to a specific one.
- **Collaboration as first-class feature**: Real-time shared UI for multi-agent teams reduces friction in human-in-the-loop workflows.
- **Author credibility**: Zaharia's background (distributed systems, Spark, MLflow) and current work at Databricks lend weight to his architectural claims.

## Open questions

- How does contextual policy evaluation avoid becoming a bottleneck in high-frequency agent loops?
- What is the threat model for the sandbox—what does it protect against, and what does it not?
- How does session-state tracking scale to long-running multi-agent systems with hundreds of policy checkpoints?
- Is there observability / tracing built in to debug agent composition failures across heterogeneous harnesses?
- How does the license (Apache 2.0 mentioned in comments) affect enterprise adoption?
