---
title: "Fabro: Workflow Graphs for AI Agent Orchestration"
url: https://fabro.sh
authors: [Qlty Software Inc.]
captured: 2026-06-12
source_type: docs
topics: [agent-orchestration, agentic-workflows, harnesses, code-generation]
tags: [claude, verification, git-checkpointing, multi-model-routing, sandbox]
signal_level: medium
status: summarized
confidence: high
freshness_until: unknown
---

## Summary

Fabro is an open-source (MIT) workflow orchestration engine designed to address the middle ground between fully autonomous AI agents and manual code review bottlenecks. Rather than "babysitting every step or reviewing a 50-file diff you don't trust," Fabro uses version-controlled, graph-based workflow definitions to coordinate AI agents, shell commands, and human decision gates.

The core abstraction is a DAG expressed in Graphviz DOT notation, where nodes represent stages: agent invocations, shell commands, human approval gates (hexagons), conditionals, and parallelism. Each run commits code changes and execution metadata to Git branches, enabling deterministic replay, revert, and audit trails.

**Key technical features:**
- **Multi-model routing** via CSS-like stylesheets (selector specificity: ID > class > shape > wildcard); supports Anthropic, OpenAI, Gemini with automatic fallback chains
- **Human-in-the-loop gates** that pause execution for approval, revision, or steering mid-turn
- **Cloud sandboxes** with snapshot-based VM setup, network controls, and SSH access
- **Automatic retrospectives** analyzing cost, duration, files touched, and generating LLM-written narratives
- **Single-binary distribution** (Rust, zero runtime dependencies)
- **Full traceability**: every model call, tool invocation, and decision point queryable via SQL

The example workflow (Plan → Approve → Implement / Revise → Simplify) demonstrates conditional branching and approval gates. Verification (builds, tests, CI gates) is "first-class," not an afterthought; failures trigger automatic fix loops.

## Verbatim quotes

> "Define your process as a graph, let agents execute it, and intervene only where it matters."

> "You either babysit every step or review a 50-file diff you don't trust. Fabro gives you a middle path: version-controlled workflow graphs that orchestrate AI agents, shell commands, and human decisions into repeatable, long-horizon coding processes."

> "Verification is a first-class concept. Fabro doesn't just produce output — it validates it. Builds and tests are gates, not suggestions."

> "Workflows that compound. Output you can trust." (vs. "Reviewable changes [not] massive diffs"; "Verification gates [not] vibes"; "Git checkpoints + audit trails [not] opaque agents"; "Repeatable workflows [not] one-off prompts")

## Takeaways

- **Workflow-as-code pattern** positions graph-based orchestration as the semantic layer above prompts and below monolithic agents — addresses a real pain point (trust, auditability, long-horizon tasks)
- **Multi-model routing via CSS selectors** is a clean cost/quality optimization pattern; suggests thinking about agent workflows as ensembles, not single-model pipelines
- **Git as the artifact and audit log** (not just storage); every stage commits; enables deterministic replay and forensics
- **Sandboxed execution + SSH introspection** lowers risk of autonomous agent misadventure (though no detail on resource limits, failure modes, or real-world incident reports)
- **Automatic retrospectives** signals maturity around observability; retrospectives-as-optimization-loop is underexplored in agent literature

## Open questions

- How does Fabro handle partial failures? If implement fails after plan approval, does it resume from checkpoint or revert?
- What are fallback chains? How does it decide when to escalate from haiku → sonnet → frontier model?
- Are there real production examples or case studies showing cost/time improvements or failure mode handling?
- How does the "CSS stylesheet" model routing differ from existing prompt-routing or tool-calling strategies in single agents?
- What is the on-ramp for non-expert users? The docs assume graphviz fluency.

