---
title: "CONTEXT.md shared lexicon for the KB"
status: planning
drafted: 2026-06-16
owner: chris
---

# Plan: CONTEXT.md shared lexicon

## Background

The skills-ecosystem synthesis (`synthesis/skills-ecosystem.md`) flags a gap: this KB has `AGENTS.md` for procedural norms, but no shared conceptual vocabulary. Every session the agent must re-derive what terms like "agentic engineering", "harness", "synthesis vs source", or the 24 canonical topics mean from first principles. This is token-expensive and produces inconsistent naming.

Matt Pocock's `CONTEXT.md` pattern (captured in `sources/2026-05-20-pocock-skills.md`) addresses this: a single file that defines the project's domain terms, authored once via a structured interview (`/grill-with-docs`), and updated as the domain evolves. The agent loads it at session start instead of rediscovering shared language.

## What would go in CONTEXT.md

- The 24 canonical topic names and one-line definitions
- Key distinctions: source vs synthesis, raw vs summarized, triage vs capture
- KB-specific conventions: what "high signal" means in this context, what warrants a synthesis vs a topic note
- The Worker's role vs the interactive agent's role
- Named artifacts: AGENTS.md, CAPTURE_SYSTEM, the synthesise skill

## Implementation

1. Run `/grill-with-docs` (or equivalent structured interview) to draft the initial file
2. Place at `CONTEXT.md` in the repo root — picked up automatically by agents that check for it
3. Reference from `AGENTS.md` so agents know to load it at session start
4. Update when the vocabulary changes (topic additions, convention changes)

## Expected benefit

- Fewer session-start tokens re-explaining the KB structure
- More consistent naming in captures and synthesis (less "harness engineering" vs "agent harness" drift)
- Faster agent orientation in fresh sessions

## Open questions

- Should CONTEXT.md be in the root (picked up by all agents automatically) or in `.claude/` (explicit)?
- How do we prevent it from growing stale as the KB evolves? A lint check comparing CONTEXT.md topic list against the actual `topics/` folders would catch drift.
- Is `/grill-with-docs` the right authoring mechanism, or should the first version be hand-written given we know the domain well?
