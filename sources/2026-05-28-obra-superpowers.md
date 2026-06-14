---
title: "Superpowers: Structured Agentic Development Methodology"
url: https://github.com/obra/superpowers
authors: [obra (Jesse Vincent)]
captured: 2026-05-28
source_type: repo
topics: [harnesses]
tags: [methodology, subagent, tdd, human-in-the-loop, workflow, claude-plugin]
signal_level: high
status: summarized
confidence: medium
freshness_until: 2026-Q4
---

# Superpowers

Skills library and development methodology for coding agents. Platform-agnostic (Claude Code, GitHub Copilot CLI, Cursor, Gemini). Available via Anthropic's official plugin marketplace.

## Summary

Superpowers addresses what the repo calls the critical gap in agentic coding: agents jumping straight into code generation without adequate problem understanding. The methodology enforces a staged workflow:

1. **Requirements refinement** through conversation (agent asks clarifying questions before touching any code)
2. **Human validation** of the proposed design before execution
3. **Detailed implementation plan** (written, reviewable before coding starts)
4. **Execution via subagents** with peer review built in
5. **Test-driven development** throughout — true red/green TDD, YAGNI, DRY

The term used is "subagent-driven-development" (SDD): specialized subagents handle discrete tasks under systematic review, creating accountability within agentic workflows. The overall agent orchestrates; subagents execute and are reviewed before output is accepted.

The framework is presented as a counter to "autonomous agent" patterns that reduce human oversight — here, the human validation steps are explicit requirements, not optional.

## Takeaways

- **Staged human checkpoints are a design decision, not just a safety measure.** Requiring a design review before execution isn't paternalistic — it's the difference between an agent that builds the wrong thing correctly and one that builds the right thing. The cost of a checkpoint is lower than the cost of a wrong implementation.
- **SDD (subagent-driven-development) as a named pattern** is useful vocabulary. Having a name makes it easier to specify in AGENTS.md what the workflow should be.
- **Platform-agnostic is the right posture for methodology.** Superpowers abstracts over Claude / Copilot / Cursor because the *workflow* is what matters, not the model. This makes it more durable than framework-specific approaches.
- **Anthropic plugin marketplace availability** confirms this is a production-grade artefact, not a demo. 168k ralph-loop installs and this being plugin-marketplace-listed suggest a viable ecosystem is forming around Claude Code extensions.

## Open questions

- How well does SDD work for exploratory or research tasks where requirements genuinely can't be specified upfront? The methodology seems best-fit for implementation tasks with known domains.
- The peer-review step for subagents — what is reviewing what? Is this another model instance reviewing the subagent's output, or a human checkpoint?
- How does this compare to Pocock's skills approach? Pocock advocates composable minimal skills; Superpowers is a comprehensive methodology. These seem complementary but the boundary isn't obvious.

## Related

- `sources/2026-05-20-pocock-skills.md` — composable skills as an alternative/complement
- `topics/harnesses/index.md`
