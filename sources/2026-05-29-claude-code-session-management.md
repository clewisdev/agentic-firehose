---
title: "Claude Code session management: resume vs handoff"
url: ""
authors: [observed behavior]
captured: 2026-05-29
source_type: docs
topics: [harnesses]
tags: [claude-code, session-management, context, handoff]
status: summarized
confidence: high
freshness_until: unknown
---

# Claude Code session management: resume vs handoff

Operationally derived — observed during a session and confirmed against Claude Code's actual behaviour. Not from an external URL.

## Summary

Claude Code lets you resume a previous session by ID, which reloads the conversation history into the context window. This is genuine continuity — the full prior exchange is available. The downside is that a long or heavy session reloads whatever accumulated in it: tool call outputs, file reads, intermediate reasoning — most of which is dead weight if the next task is different.

The `/handoff` skill is the alternative: run it at the end of a session, paste the output into a fresh `claude` invocation. The new session gets a curated ~500-word summary rather than the full history. The handoff output is intentionally selective — it distils decisions, state, and next steps, discarding the scaffolding.

Auto-compaction (which happens automatically when context fills mid-session) is a third mode: it summarises the conversation in place to buy more room in the same session. Less selective than a deliberate handoff.

## When to use each

| Situation | Better choice |
|---|---|
| Short session, continuing the same task | Resume — context is still lean and relevant |
| Long session, mid-flow on the same task | Resume — auto-compaction has already trimmed it |
| Long session, task complete, starting something new | `/handoff` + fresh session |
| Approaching context limit on any session | `/handoff` + fresh session regardless |

## Takeaways

- Resume reloads conversation history — the context is as bloated as the session was.
- `/handoff` + fresh session is the right pattern for task transitions or heavy sessions; it trades full fidelity for a lean, curated start.
- Auto-compaction and handoff are not the same thing: compaction preserves the session, handoff ends it cleanly.
- The two options serve different purposes and are not in competition.
