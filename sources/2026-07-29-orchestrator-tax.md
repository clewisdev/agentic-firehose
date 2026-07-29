---
title: "The Orchestrator's Tax"
url: https://martinfowler.com/articles/orchestrator-tax.html
authors: [Rahul Garg]
captured: 2026-07-29
source_type: blog
topics: [agent-architecture, memory, agent-orchestration]
tags: [multi-agent, context-management, delegation, working-memory, orchestration-patterns]
signal_level: medium
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

Rahul Garg (Principal Engineer, Thoughtworks) argues that the real cost of multi-agent systems is not parallelism or token consumption, but **orchestrator working memory pollution**. The piece is grounded in a concrete incident: during a Claude Code session on a .NET refactor, four subagents were delegated in parallel. Garg initially suspected parallelism was the problem, but discovered the actual damage came from status-polling behavior that imported tens of thousands of tokens of raw subagent transcripts into the main thread—context that then accumulated across every subsequent turn.

Key insight: **tokens are spent once, but context shapes every decision that follows.** A larger context window doesn't solve the problem; it just allows noise to accumulate invisibly. The scarce resource is the orchestrator's attention and reasoning quality, not token count.

Garg identifies three distinct cost categories that shouldn't be conflated:
1. **Duplication tax**: subagents independently reconstructing context and understanding the same task
2. **Coordination hazard**: unsafe git operations when multiple writers modify the same repo
3. **Context pollution**: status checks and transcript dumps that persist across turns

The framing shifts from "how many subagents can I run in parallel" to "what should I actively *prevent* the orchestrator from holding onto." Garg proposes explicit ground rules for delegation and "standing rules" (persistent session contexts) instead of ad-hoc delegation decisions. The article ends with open questions about governance, cognitive locality, and how to build orchestrators that preserve their own working memory.

## Verbatim quotes

> "Every token in the orchestrator's context is competing for its attention, and the real value of a subagent is what it keeps out of that context, not how fast it runs."

> "Tokens are spent once. Context shapes every decision that follows."

> "A bigger context window doesn't fix that. It just gives the noise more room to pile up before anyone notices."

> "The most interesting question is not whether subagents can speed up work. It is whether they can be used to protect the orchestrator's working memory, and if so, what design patterns make that protection real."

## Takeaways

- **Context pollution is a hidden cost**: status checks and transcript dumps that linger in the orchestrator's context harm reasoning quality on all subsequent turns, not just the immediate call.
- **Duplication doesn't justify fine-grained delegation**: when two subagents work in the same codebase area, they independently pay high orientation costs; better to split along true domain boundaries.
- **Coordination risk increases with concurrency**: repository-wide operations (git stash, etc.) become dangerous once multiple writers are active; safe concurrency requires explicit constraints.
- **Delegate for cognitive locality, not speed**: the primary benefit of subagents should be *removing reasoning responsibility* from the orchestrator, not parallelizing work.
- **Working memory quality > token count**: long-run reasoning fidelity depends on signal-to-noise ratio in context, not window size.

## Open questions

- How should orchestrators be instrumented to measure which costs dominate in practice?
- What explicit ground rules or governance patterns prevent toxic delegation patterns (over-polling, unsafe concurrency)?
- Can "standing rules" (persistent session context) be used to separate orchestration policy from task execution?
- How do we design orchestrators that actively resist accumulating unnecessary context?
- Does cognitive locality change what "parallelism" is supposed to solve in agentic workflows?
