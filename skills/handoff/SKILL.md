---
name: handoff
description: Compact the current conversation into a handoff document for a fresh agent session. Use when approaching context limits, switching tasks, or ending a long session. Generates a summary with completed work, current state, next steps, and suggested skills.
---

# Handoff

Create a transition document that lets a fresh agent session continue without losing context.

## Activation

User says: "handoff", "context handoff", "session summary", "wrap this up", /handoff.
Also: proactively offer when session is clearly approaching context limits.

## Steps

1. Summarize what was accomplished — completed tasks, key decisions, files changed.
2. State current state — what is done, in progress, blocked.
3. List next steps in priority order.
4. Reference artifacts by path/URL rather than reproducing content (plans, diffs, issues, commits).
5. Redact sensitive data: API keys, passwords, PII.
6. Add "Suggested skills" — which skills the next session should activate and why.

## Output format

Output in conversation. Do not write a file unless user asks.

```
## Handoff — [YYYY-MM-DD]

### Accomplished
- ...

### Current state
- ...

### Next steps (priority order)
1. ...

### Key files
- path/to/file — why it matters

### Suggested skills
- /skill-name — why
```

## When to trigger proactively

Offer a handoff when: the user says "that's enough for today", the session has run for several hours with many tool calls, or you notice context fill is high (>50% in a complex session). Say: "Approaching context limit — want a /handoff summary before we stop?"
