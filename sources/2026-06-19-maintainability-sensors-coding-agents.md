---
title: "Maintainability sensors for coding agents"
url: https://martinfowler.com/articles/sensors-for-coding-agents.html
authors: [Birgitta Böckeler]
captured: 2026-06-19
source_type: blog
topics: [harnesses, agent-architecture, code-generation, evals]
tags: [static-analysis, eslint, mutation-testing, feedback-loops, typescript, nextjs, self-correction]
signal_level: high
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

Birgitta Böckeler (Distinguished Engineer, Thoughtworks) presents a practical framework for instrumenting codebases with "sensors"—automated feedback mechanisms that help coding agents maintain code quality and avoid common failure modes. Building on her prior work on harness engineering, she describes a real TypeScript/NextJS/React analytics dashboard rebuilt from scratch using AI, instrumented with multiple sensor categories.

**Core insight**: Agents fail on the same maintainability dimensions humans do—tangled codebases lead agents to duplicate code, miss existing implementations, or load excessive context. Sensors provide feedback for self-correction *before* code reaches human review.

## Sensor taxonomy

Böckeler organizes sensors across three temporal phases:

1. **During coding session** (fast feedback): type checker, ESLint, Semgrep (SAST), dependency-cruiser (structural rules), test suite with coverage, incremental mutation testing, GitLeaks
2. **After integration (CI)**: same computational sensors on clean infrastructure
3. **Repeated (slower cadence)**: security review (prompt-driven), data handling review, dependency freshness (computational + inferential), modularity/coupling analysis

## Key findings

**AI failure modes addressable by static analysis:**
- Max function arguments
- File length
- Function length  
- Cyclomatic complexity

"These weren't even active in ESLint's default preset, I had to configure maximums for them first."

**Custom ESLint formatter for agent self-correction**: Built a custom formatter to override default linting messages with contextual guidance—giving agents "good prompt injection" to fix issues. Example: instead of "arrow callback is not isolated," explain *why* that matters and suggest specific next steps.

**Dependency rules as coupling detection**: dependency-cruiser's structural rules caught cases where agents created internal-to-external API dependencies or violated layer boundaries. Agents respond well to explicit coupling constraints.

**Test suite as regression sensor**: Mutation testing revealed agents often generating tests that pass the happy path but miss edge cases. Required adding "mutant-killing rules" (e.g., "never accept untested exception paths").

**Inferential sensors**: Security and data-handling reviews run on schedule using prompts derived from internal checklists. Dependency freshness combines script output + AI analysis for upgrade recommendations.

## Practical details

- **Models used**: Cursor (most frequent), Claude Code, OpenCode; Claude Sonnet default, Opus for planning/analysis, Cursor's composer-2 for implementation
- **No explicit guides provided**: Experimented with letting sensor feedback alone shape behavior, without markdown codebases guides
- **Mutation testing cadence**: Incremental, runs during session
- **GitLeaks integration**: Pre-commit hook gives agent immediate feedback on secret-leaking attempts

## Open questions

- How should agents weight competing sensor signals (e.g., coverage vs. complexity vs. mutation kill rate)?
- Do agents improve over multiple correction cycles on the same task, or do they plateau?
- What's the cost/benefit ratio of inferential vs. computational sensors?
- Should sensor severity vary based on codebase maturity or risk profile?

## Takeaways

- **Sensors are feedback, not gates**: Frame violations as self-correction opportunities, not CI failures
- **Presets matter**: Tools need AI-specific rule profiles; default ESLint misses critical agent failure modes
- **Coupling is expensive for agents**: Explicit structural rules significantly reduce context load and duplication
- **Mutation testing catches agent blind spots**: Edge cases, exception paths, and boundary conditions require mutation-aware test guidance
- **Prompt-driven reviews scale**: AppSec/data-handling checklists work well as inferential sensors on slower cadence

---

**High-signal markers**: Concrete experimentation on production-like system, specific tool chain (named versions, composers), before/after observations, clear failure modes, reproducible sensor setup, open questions rather than claims of solved problems.
