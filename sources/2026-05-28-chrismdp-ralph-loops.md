---
title: "Ralph Loops: AIE Europe Talk Notes"
url: https://www.chrismdp.com/ralph-loops-aie-europe/
authors: [Chris McDonagh]
captured: 2026-05-28
source_type: blog
topics: [harnesses, ralph-loops]
tags: [ralph-loop, iteration, orchestration, autonomous-agents, loop]
status: summarized
confidence: high
freshness_until: evergreen
---

# Ralph Loops: AIE Europe Talk Notes

Chris McDonagh's writeup of a talk at AI Engineer Europe. Captures the Ralph loop pattern as articulated by Jeffrey Huntley, who coined it around June 2025.

## Summary

The Ralph loop is an iterative agentic execution pattern named after Ralph Wiggum from The Simpsons — the implication being that a loop that keeps asking "can I try again?" is structurally simple but surprisingly effective.

The core mechanism: after an AI completes a task, **point it at the same task again**. The agent reviews its prior work before making further improvements. Repeat until a completion signal or iteration ceiling is reached.

The advanced variant: instead of building a dependency graph upfront (which the article argues AI handles poorly), instruct the agent to autonomously select the next highest-priority ticket by reading the completed work and determining dependencies on-the-fly. This exploits the fact that a model reading a completed task set can reason about what to do next more reliably than it can construct a correct dependency graph in advance.

Implementation options:
- Shell script: `while true; claude; done`
- Claude Code built-in: `/loop` command

The article frames the pattern against the backdrop of AI raising throughput while human review becomes the new bottleneck — the loop partially addresses this by allowing the agent to self-correct before the human needs to look at it.

## Key quotes

> "after an AI finishes a task, point it at the task again"

> "skip the dependency graph...tell the AI to pick the next most important ticket"

> "What AI handles poorly is managing dependencies in parallel"

## Takeaways

- **Don't over-engineer orchestration.** A simple iterative loop that re-reads completed work outperforms pre-planned parallel dependency graphs for most agentic tasks.
- **Exploit the model's reading ability.** Rather than constructing orchestration logic that specifies ordering, delegate ordering decisions to the model's in-context reasoning over completed state.
- **The `/loop` command is the built-in implementation.** Claude Code already ships this; no additional tooling needed for the basic pattern.
- **Human review is the bottleneck to design around.** Loops that self-correct before human inspection are valuable not because they reduce errors to zero but because they reduce the volume of trivial errors that consume human attention.
- **Completion promises matter.** The loop needs a defined exit condition (a string the model outputs to signal done, or an iteration ceiling); otherwise it runs indefinitely.

## Open questions

- What tasks does the Ralph loop *not* improve? The article argues parallel dependency management is the failure mode, but doesn't characterize which task structures benefit most vs. least.
- How does self-selection of next ticket interact with tasks that have true hard dependencies (e.g., write schema before migrating data)? The "trust the model to figure it out" approach may fail on strict ordering requirements.
- Relationship to multi-agent orchestration patterns (separate orchestrator + executor)? Ralph loop is single-agent iterative; unclear when to step up to multi-agent.

## Related

- `sources/2026-05-28-claude-ralph-loop-plugin.md` — official Anthropic implementation
- `topics/ralph-loops/index.md`
