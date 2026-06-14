---
title: "Ralph Loop — Official Claude Plugin"
url: https://claude.com/plugins/ralph-loop
authors: [Anthropic]
captured: 2026-05-28
source_type: docs
topics: [harnesses, agentic-workflows]
tags: [ralph-loop, iteration, stop-hook, claude-plugin, autonomous-agents]
signal_level: high
status: summarized
confidence: high
freshness_until: 2027-Q1
---

# Ralph Loop Plugin

Official Anthropic-verified Claude plugin implementing the Ralph loop pattern. 168,000+ installs. Verified by Anthropic.

## Summary

The plugin works by intercepting session exits via a **stop hook** — the same lifecycle event used by claude-mem for memory observation. When Claude would ordinarily end a session, the hook fires, re-feeds the original prompt to a fresh Claude invocation, and passes through all file modifications and git history from the previous iteration.

This means the loop maintains **persistent side effects** (file writes, git commits) across iterations while resetting the context window. The agent starts each iteration with a clean context but a modified working directory — which is exactly right for tasks where the world state (code, files) is the medium of communication between iterations.

### Interface

```
/ralph-loop "your prompt here" --max-iterations 10 --completion-promise "DONE"
```

- `--max-iterations` caps the loop (prevents runaway execution)
- `--completion-promise` is the string Claude outputs when it considers the task done — the hook detects this and exits cleanly

### Best-fit use cases

- Well-defined projects with clear, testable success criteria
- Greenfield development with automated verification (tests, linters)
- Iterative refinement where each pass can build on prior output
- Any task where "do it again and check your work" improves outcomes

## Key quotes

> "intercepts session exits via a stop hook and automatically re-feeds your prompt while preserving all file modifications and git history between iterations"

## Takeaways

- **The stop hook is the right integration point** for this pattern — it's already in Claude Code's lifecycle and doesn't require a custom wrapper. This is how harness extensions should be built: hook into existing lifecycle events rather than wrapping the CLI.
- **File modifications + git history persistence** is the clever design decision. The agent doesn't need memory of its prior reasoning; it needs to read the *results* of its prior reasoning (which are in the files). This is a concrete example of files-as-memory in practice.
- **168k installs suggests the pattern resonates** at scale, not just in hobbyist/demo contexts. The install count likely reflects genuine utility in daily development flows.
- **Completion promise design matters.** A poorly chosen completion promise (too generic a string, or one the model outputs mid-task) will exit early. The string should be distinctive and reserved for genuine task completion.

## Open questions

- What happens if the model outputs the completion promise in a comment or thinking block? Does the hook match on any occurrence or only final output?
- How does cost scale across iterations? Each iteration is a fresh context window + full prompt, so 10 iterations = 10x the input token cost. Is there prompt caching for the repeated system context?
- Interaction with multi-file projects: does each iteration re-read all relevant files, or does the agent intelligently scope what to read?

## Related

- `sources/2026-05-28-chrismdp-ralph-loops.md` — the pattern itself
- `sources/2026-05-20-claude-mem.md` — also uses stop hook (SessionEnd) for memory observation
- `topics/agentic-workflows/ralph-loops.md`
