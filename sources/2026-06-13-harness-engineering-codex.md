---
title: "Harness engineering: leveraging Codex in an agent-first world"
url: https://openai.com/index/harness-engineering/
authors: [Ryan Lopopolo]
captured: 2026-06-13
source_type: blog
topics: [agent-architecture, code-generation, tool-use, system-design, prompting]
tags: [codex, gpt-5, automation, ci-cd, observability, context-management]
signal_level: high
status: raw
confidence: high
freshness_until: 2026-Q4
---

## Summary

OpenAI's internal team shipped a production software product with **zero manually-written code** in five months using Codex (GPT-5). The product contains ~1M lines across application logic, tests, CI, docs, and tooling—all agent-generated. Three engineers achieved 3.5 PRs/day per engineer with 1,500+ merged PRs; throughput *increased* as the team scaled to seven engineers.

The core insight: **humans steer, agents execute**. The engineering role fundamentally shifted from writing code to designing environments, specifying intent, and building feedback loops. Key lessons:

### Architecture & Intent Specification
- Repository knowledge became the system of record; monolithic AGENTS.md failed (context-crowding, pattern-matching over intentional navigation, instant rot)
- Distributed, queryable constraints work better: discrete skills, local tests, mechanical verification
- Repository shape was determined entirely by agent capability—no human-written anchor code

### Application & Observability Legibility
- Made UI directly legible to Codex: per-worktree app instances, Chrome DevTools Protocol integration, DOM snapshots, screenshots
- Wired observability stack (ephemeral logs, metrics, traces) into agent runtime; Codex queries LogQL and PromQL directly
- Agents reproduce bugs autonomously, validate fixes, and reason about UI behavior without human copying/pasting context
- Single Codex runs on a task sustained 6+ hours with full isolation

### Code Review & Quality
- Humans may review PRs but aren't required; nearly all review pushed to agent-to-agent
- Codex self-reviews locally, requests specific agent reviews, responds to feedback, iterates until agent reviewers satisfied ("Ralph Wiggum Loop")
- Bottleneck shifted from code generation to human QA capacity—solved by making app behavior legible to agent

### Operational Patterns
- Depth-first task decomposition: break goals into building blocks (design, code, review, test), prompt agent to construct, unlock complex tasks
- When failures occur, ask "what capability is missing" not "try harder"
- Context is the scarce resource; focus on making constraints legible and enforceable, not comprehensive
- No pre-existing manual guardrails; guardrails emerged from agent errors and human refinement of intent specification

### Merge Philosophy & Entropy
- High throughput (1,500 PRs / 5 months) changed merge strategy: manual review bottleneck replaced with agent-to-agent validation
- Entropy management critical at scale; repository entropy grows faster than human capacity to manage it
- Garbage collection and architectural coherence enforced via agent-legible rules, not human code review

## Verbatim Quotes

> "Humans steer. Agents execute."

> "The primary job of our engineering team became enabling the agents to do useful work... what capability is missing, and how do we make it both legible and enforceable for the agent?"

> "give Codex a map, not a 1,000-page instruction manual... Context is a scarce resource. A giant instruction file crowds out the task, the code, and the relevant docs."

> "We did the same for observability tooling. Logs, metrics, and traces are exposed to Codex via a local observability stack that's ephemeral for any given worktree."

> "What 'agent-generated' actually means: Increasing levels of autonomy... Entropy and garbage collection... What we're still learning."

## Takeaways

- **Intent specification scales faster than code review**: shifting from manually writing code to designing legible constraints and feedback loops can achieve 10x velocity on complex projects
- **Context is the bottleneck, not capability**: GPT-5 + Codex can sustain autonomous work for 6+ hours; the limiting factor is making the application state (UI, logs, metrics, architecture rules) queryable by the agent
- **Repository shape matters**: architecture and taste must be enforceable by agents without monolithic instruction files; distributed, mechanical verification of constraints replaces human-centric code review
- **Agent-to-agent review can replace human review**: human time freed up for intent specification, feedback loop design, and capability expansion rather than PR reading
- **Entropy management is unsolved**: as throughput scales, garbage collection and architectural coherence require new tools; human-written rules don't decay at agent-generation speeds

## Open Questions

- How does this scale beyond a single tightly-scoped product? What happens when multiple teams with divergent architectural tastes merge code?
- What is the actual human attention cost per 1M lines of agent-generated code? (3 → 7 engineers suggests sublinear scaling, but the baseline is unclear)
- How are long-term maintenance and dependency updates handled when no human understands the codebase?
- What guardrails prevent architectural drift when Codex has freedom to refactor?
- How does observability stack approach (ephemeral per-worktree) handle debugging production issues?
