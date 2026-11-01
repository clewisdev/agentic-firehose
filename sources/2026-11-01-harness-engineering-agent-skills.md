---
title: "Harness Engineering for Long-Running Agent Skills"
url: https://www.oreilly.com/live-events/harness-engineering-for-long-running-agent-skills/0642572464714/0642572464707/
authors: ["Nicole Koenigstein"]
captured: 2026-11-01
source_type: talk
topics: [harnesses, skills, context-engineering, evals]
tags: [skill-compilation, state-machines, targeted-repairs, judge-verifier, transcript-management]
signal_level: medium
status: raw
confidence: high
freshness_until: 2027-Q4
---

# Harness Engineering for Long-Running Agent Skills

## Summary

This syllabus outlines Nicole Koenigstein's hands-on architectural curriculum for running agent "skills" (reusable procedures, rules, and domain-specific knowledge packaged into formats like `SKILL.md`) in long-running enterprise production environments. Rather than relying on framework abstractions or raw prompting, the course focuses on engineering the surrounding harness to manage state, context compilation, evaluation, and repair.

The core architectural premise is that defining a skill is only the first step. For long-running workflows, simple pattern-matching agents degrade quickly because they continuously replay an expanding conversation transcript back to the model. This transcript bloat causes cost inflation, context degradation, and high flakiness. 

To address this, Koenigstein proposes a structured skill lifecycle:
1. **Skill compilation at runtime**: A compiler inspects the current goal, selects the relevant versioned skill, and assembles *only* the specific instructions and constraints necessary for that step, rather than dumping all skill instructions into a persistent prompt.
2. **Explicit execution-state schemas & merge rules**: Maintaining clean, typed state objects that are explicitly updated and merged across turns, replacing the naive reliance on unbounded conversational history.
3. **Deterministic checks + hybrid judge patterns**: Validating output via deterministic linting/schema checking combined with relative judging, judge-verifier pipelines, and pooled LLM judges.
4. **Targeted repair loops**: When an output violates a constraint, the harness isolates only the failing section and initiates a focused repair step using only the relevant sub-instruction, current state, and the failing chunk—rather than asking the model to regenerate the entire multi-step response from scratch.
5. **Traceability and versioning**: Recording skill version hashes, compiled instruction snapshots, model bindings, state mutations, and evaluation outputs to ensure agent runs are reproducible and debuggable.

## Key Quotes

> "Treat agent skills as versioned units of capability that move through discovery, selection, compilation, execution, evaluation, and repair."

> "Build a runtime compiler that selects the appropriate skill and assembles only the instructions required for the current task."

> "Design explicit execution-state schemas and merge rules for long-running skills without continuously replaying an expanding transcript."

> "Implement targeted repair loops that isolate a failed output section and retry it using only the relevant output, state, and skill rules."

## Takeaways

- **Skills need a runtime compiler**: Putting all skill instructions into the system prompt or replaying transcripts causes degradation. A harness compiler should dynamically select and assemble minimal instruction surfaces per step.
- **State machines over transcripts**: Long-running agents require explicit state schemas with deterministic merge rules; transcripts should be discarded or summarized to preserve context window sanity.
- **Section-level targeted repair**: Full-context regenerations upon validation failure are wasteful and introduce new hallucinations. Isolate the failing artifact/section and run repair loops over scoped context.
- **Rigorous eval architecture**: Non-deterministic skill validation requires layered judge architectures (judge-verifier separation, relative pairwise judging, judge pools) rather than simple single-prompt LLM-as-a-judge.

## Open Questions

- What specific merge conflict strategies work best when state updates from concurrent skill executions or tool calls touch overlapping schemas?
- How does the runtime compiler handle multi-skill dependencies where one skill invokes or transitions into another?
