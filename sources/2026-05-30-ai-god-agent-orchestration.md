---
title: "I Don't Want an AI God"
url: https://www.chrismdp.com/i-dont-want-an-ai-god/
authors: [Chris Parsons]
captured: 2026-05-30
source_type: blog
topics: [agent-orchestration, agentic-workflows, tool-use]
tags: [gtd, ralph, claude, n8n, memory, reversibility, reflection]
signal_level: high
status: summarized
confidence: high
freshness_until: unknown
---

## Summary

Chris Parsons describes his experience running a 24/7 personal agent orchestration system (Ralph loops + custom infrastructure) built around David Allen's Getting Things Done (GTD) framework. He has delegated approximately everything—writing, calendars, client work, code—to an AI worker, with human override for irreversible decisions.

The key innovation is a YAML-based project tracking system with an `assignee` field (chris | worker | unassigned) that gates which tasks go to the agent. Capture happens via a unified Inbox.md (with Telegram bot, Siri, Gmail, feed watcher, transcripts). Clarify uses an automated triage skill. The worker loop runs every 30 minutes, picking one `status: todo` task, advancing it, and exiting without cross-project context. Human reflection happens via a Kanban board filtered by available energy.

Parsons reports two critical findings after running this long enough to "break the model":

1. **Omniscient AI makes us lazy.** Having full read access to your life (projects, emails, half-thoughts) makes it too easy to ask the system for decisions you should be making yourself—positioning, strategy, priorities. The seduction is that the AI can do it, not that it should.

2. **The system amplifies existing bad habits.** If you have poor judgment about what matters, delegation at scale amplifies that. If you procrastinate on reflection, the agent keeps going and you drift.

He pivots to a more austere model: agents only see what they need for the immediate task (intent, scope, tone, approach), not the full context vault. Critical decisions (strategy, positioning, prioritization) remain human-owned. The goal shifts from "doing everything faster" to "doing the right things well."

## Verbatim quotes

> "Stress comes from open loops: commitments your mind is still tracking because nothing else is. The cure is a trusted system that holds those commitments for you, so your attention is free for the actual work."

> "The whole stack is commands to call claude or pi from a script, cron for timers, the Kanban board service, and a bunch of vault conventions."

> "Just because the AI can do something, should I be asking it to?"

> "If you have poor judgment about what matters, delegation at scale amplifies that."

> "The seductive part is that the AI has access to everything. This was incredibly useful at the AI step, and I would give it more and more to do. It's so easy to ask a system like this for things we should not."

## Takeaways

- **GTD + agent delegation pattern is viable but requires disciplined scope-setting.** The `assignee` field acts as a decision boundary; without it, humans offload thinking they shouldn't.
  
- **Information asymmetry cuts both ways.** Full-context agents are more capable but seduce you into delegating judgment calls. Task-scoped agents (intent + scope only) preserve human agency.

- **Reversibility is a necessary but insufficient filter.** Automation of reversible tasks is still lazy if it's busywork you should have eliminated entirely.

- **Reflection + review discipline is load-bearing.** If you don't review what the system is doing, delegation at scale becomes invisible drift. The Kanban board and energy-filtered todo list are mechanisms to stay in the loop.

- **Agent orchestration is tooling for clarity, not for abdication.** The win is freeing attention from *open loops* so humans can think better, not replacing human judgment on what matters.

## Open questions

- How does Parsons decide which decisions are actually irreversible vs. reversible-but-consequential? The reversibility heuristic doesn't catch strategy/positioning.
- What does the "overnight batch pass" include, and how does he audit it?
- How often does the agent ask him a clarifying question vs. proceeding autonomously, and does that ratio matter?
- Does the lack of cross-project context ever cause the agent to miss a connection that would've been obvious to a human?
- How does this scale if the number of projects grows 5x or 10x?
