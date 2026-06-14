---
title: "Loop Engineering: The Coding-Agent Pattern in Codex and Claude Code"
url: https://www.linkedin.com/posts/alindnbrg_agentharness-codingagents-aiinfra-share-7470106122071289856-RW9t/
authors: [André Lindenberg, Addy Osmani]
captured: 2026-06-09
source_type: post
topics: [agentic-workflows, agent-architecture, agent-orchestration]
tags: [loop-engineering, worktrees, skill-chaining, state-management, verification]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2026-Q3
---

## Summary

André Lindenberg shares Addy Osmani's framing of "Loop Engineering"—a structural pattern emerging in coding agents like Codex and Claude Code. The post articulates a feedback-loop model where agents orchestrate multiple specialized sub-processes:

- **Cadence**: Automations establish rhythm and re-entry points
- **Isolation**: Worktrees keep parallel edits separate and composable
- **Intent**: Skills carry project context and constraints
- **Integration**: Plugins/connectors bridge to external tools and APIs
- **Splitting**: Sub-agents separate the maker (implementer) from the checker (verifier)

The mechanism compounds when combined with external state management—enabling agents to triage tasks, implement solutions, verify results, and resume from known states. Lindenberg also flags a debt side-effect: halting code review (not reading diffs) increases comprehension debt.

## Key Quotes

> "automations create cadence, worktrees isolate parallel edits, skills carry project intent, plugins/connectors reach real tools, sub-agents split maker from checker. Add external state and the loop can triage, implement, verify, resume."

> "The same mechanism compounds comprehension debt when you stop reading the diff."

## Takeaways

- **Loop as primitive**: The post frames agent orchestration around explicit feedback loops—cadence, isolation, intent, integration, splitting—rather than monolithic model calls.
- **Stateful resume**: External state enables agents to pause, verify, and restart rather than run-to-completion; critical for handling failures and human interventions.
- **Maker/checker split**: Separating implementation from verification (via sub-agents) aligns with formal methods and code-review practices, reducing hallucination collapse.
- **Comprehension debt**: Automation-driven skipping of code review introduces technical debt that isn't immediately visible; suggests human-in-the-loop review remains necessary.
- **Tool/skill layering**: The distinction between skills (context + constraints) and plugins (external integrations) suggests two layers of abstraction for agent capability.

## Open Questions

- How are "worktrees" implemented in practice (Git branches, isolated namespaces, transaction logs)?
- What state primitives enable reliable resume after verification failure or human feedback?
- How does the maker/checker split prevent both agents from converging on the same hallucination?
- Does "comprehension debt" manifest in production failures, or is it primarily a maintenance/maintainability cost?
- How does this pattern scale to multi-agent workflows with dependencies?

## Context

Thread includes comments linking to:
- Gene Kim / Steve Yegge's "Three Developer Loops" framing (on IT modernization + AI-assisted coding)
- GitHub hensu-project (workflow DSL for declarative loop definitions)
- References to Loop Engineering blog/research from Addy Osmani
