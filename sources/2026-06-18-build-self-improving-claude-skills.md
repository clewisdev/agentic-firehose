---
title: "Full Tutorial: Build Self-Improving Claude Skills in 20 Min (Eval + Memory)"
url: https://creatoreconomy.so/p/full-tutorial-build-self-improving-claude-skills-in-20-min?trk=public_post_comment-text
authors: [Peter Yang]
captured: 2026-06-18
source_type: post
topics: [agent-architecture, memory, evals]
tags: [claude-skills, skill-editor, eval-loop, memory-files, self-improvement]
signal_level: high
status: raw
confidence: high
freshness_until: 2026-Q4
---

## Summary

Peter Yang presents a concrete 5-step methodology for building Claude Skills that self-evaluate and improve over time. The post combines high-level framing ("skills are just folders with instructions AI can trigger") with specific, actionable implementation details.

### The 5-step framework:

1. **Seed with personal context & examples**: Create separate markdown files with best-in-class outputs (e.g., tutorial, personal essay, product piece). Keep examples separate from skill.md so AI can load context selectively and for privacy. Prompt AI to ask clarifying questions.

2. **Write explicit trigger conditions**: Include "Use when…" descriptions so AI decides when to load the skill automatically. Default behavior only reads name + description; full skill loads on explicit trigger.

3. **Build an evals.md loop**: After manual testing iterations, generate 10 pass/fail checks (not scores) organized by category (intro hook, voice/slop, substance, CTA). Crucially: instruct AI to spin up a *separate agent* with clean context to grade the first agent's work, then iterate both until all evals pass. Yang reports 5 rounds were needed on a real draft.

4. **Add memory.md for continuous improvement**: Log reverse-chronological lessons from past chats—feedback that doesn't fit binary pass/fail checks (e.g., "make voice more authentic"). Complement to evals, not replacement.

5. **Meta-skill building**: Create /skill-editor and /no-ai-slop skills to maintain other skills. These catch em dashes, "X, not Y" phrasing, redundancy—preventing skill drift.

## Key technical details

- **Folder structure** provided: skill.md (what + when), example-*.md (context), evals.md (checks), memory.md (log).
- **Eval design**: Pass/fail strongly preferred over scoring ("AI can't reliably tell 3/5 from 4/5").
- **Agent isolation**: Grading agent must have clean context window to avoid bias from editing agent's output.
- **Real-world result**: The /edit-post skill caught removed em dashes and X-not-Y phrasing automatically.

## Verbatim quotes

> "A skill is just a folder with instructions that AI can trigger for a given task."

> "The most important thing here is to give AI as much personal context and examples of good output as you can."

> "When you run the evals, spin up a separate agent with a clean context window. If any eval fails, send it back to iterate until all evals pass."

> "I've found [memory.md] useful for feedback that doesn't fit a clean pass/fail check, like 'make the voice more authentic.'"

## Takeaways

- Evals + memory create a feedback loop: evals improve *output* quality, memory improves the *skill itself* over time.
- Explicit trigger conditions ("Use when…") are load-bearing; without them, skills won't activate automatically.
- Agent isolation in eval loops prevents confirmation bias; grader must see output fresh.
- Pass/fail evals are more reliable than scored rubrics for LLM self-grading.
- Meta-skilling (skill-editor, no-ai-slop) prevents skill degradation from repeated AI rewrites; hygiene matters at scale.

## Open questions

- How does skill.md grow when memory.md accumulates lessons? Does it get patched in, or kept separate for context efficiency?
- What happens to memory.md across skill versions or model upgrades? Is versioning needed?
- How often should skills be audited with /skill-editor? Is there a drift threshold?
- Does the evals loop slow down with real-time workflows, or is the coffee-break model the intended use case?
