---
title: "Loop engineering: replacing yourself as the person who prompts the agent"
url: https://www.linkedin.com/posts/addyosmani_ai-softwareengineering-programming-share-7469961887271776256-9_65
authors: [Addy Osmani]
captured: 2025-06-09
source_type: post
topics: [agent-architecture, agentic-workflows, code-generation, memory]
tags: [loops, agentic-engineering, coding-agents, multi-agent, verification]
signal_level: medium
status: summarized
confidence: medium
freshness_until: 2025-Q3
---

## Summary

Addy Osmani frames a shift in how practitioners interact with coding agents: from serial prompting ("write prompt → read response → next prompt") to **loop engineering** — designing systems that run autonomously with minimal human intervention per cycle.

The post distills loop anatomy into five components:

1. **Automations** — scheduled discovery runs eliminating manual polling
2. **Worktrees** — isolated branches so parallel agents don't collide on file modifications
3. **Skills** — project conventions written down once, reusable across runs
4. **Plugins/connectors** — MCP integrations to real systems (open PRs, update tickets) instead of reporting only
5. **Sub-agents** — separation of writer and verifier (avoid agent grading its own work)

Plus **external memory** (markdown, board) persisting state between runs, addressing agent context loss.

Osmani credits Peter Steinberger (OpenClaw) and Boris Cherny (Claude Code) as practitioners already operating at this level, noting both products now ship the five components natively.

## Key tension: loops don't delete you, they change your job

Three sharper problems emerge:

- **Verification debt** — unattended loops make unattended mistakes; you're still liable for correctness
- **Comprehension debt** — speed of code generation creates growing gap between what exists and what you understand; passive acceptance without reading code widens knowledge rot
- **Cognitive surrender** — temptation to stop having opinions when the loop "just works"

The cure: **design the loop with intent to stay an engineer**, not just the person pressing go.

## Verbatim quotes

> "You shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents." — Peter Steinberger

> "I don't prompt Claude anymore. I have loops running that prompt Claude." — Boris Cherny

> "The loop changes the work, it does not delete you from it."

> "A loop running unattended is also a loop making mistakes unattended."

> "The comfortable posture is the dangerous one."

## Takeaways

- **Shift in primitives**: coding agent workflow is evolving from turn-taking interaction to system design (tooling, memory, verification loops)
- **Token cost as constraint**: one commenter (Ali Demi) highlights that practical loop design requires solving for token efficiency simultaneously — loops are "very token hungry" and optimization is tied to feasibility
- **Verification remains human responsibility**: automation scales generation faster than human ability to audit; comprehension debt is real and intentional reading of loop output is required
- **Sub-agent verification pattern**: using separate agents for writing and checking work is emergent pattern addressing quality assurance
- **External memory as architectural necessity**: agent context loss between runs is solved by persistent markdown/board state, not conversation history

## Open questions

- How do teams operationalize "comprehension debt" tracking? What signals indicate when a loop's output has diverged from understood system design?
- Token cost optimization for loops: are there published benchmarks for typical loop run costs (discovery + generation + verification cycles)?
- How do sub-agent verification patterns compare in cost and latency to human review? At what code-change volume does sub-agent checking become economical?
- What does skills authoring look like at scale? How are conventions extracted and encoded so agents don't re-derive them?
