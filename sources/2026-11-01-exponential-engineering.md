---
title: "Exponential Engineering: Harden the Codebase, Not the Agent"
url: https://exponentialengineering.dev/
authors: ["Ben O'Mahony", "Fabian Nonnenmacher"]
captured: 2026-11-01
source_type: blog
topics: [context-engineering, harnesses, agentic-workflows, technical-debt]
tags: [linting, ruff, ast-grep, ratchets, error-as-prompt, testing, feedback-loops]
signal_level: high
status: raw
confidence: high
freshness_until: evergreen
---

# Exponential Engineering: Harden the Codebase, Not the Agent

Ben O'Mahony and Fabian Nonnenmacher argue that the standard response to AI agent coding errors—appending instructions to markdown files like `AGENTS.md` or `RULES.md`—is an anti-pattern. Instead, teams should implement deterministic code-level enforcement: whenever an agent makes a mistake, encode a rule (linter, compiler check, property test, type constraint) that systematically eliminates that entire category of bug.

### Core Thesis: Harden the Codebase, Not the Agent

Agents and frontier models are ephemeral (`Claude Code` today, `Codex` tomorrow, new models every quarter). System prompts, agent memory, and markdown instructions are tied to specific runtimes, consume expensive context windows on every turn, and are frequently skimmed or ignored. 

In contrast, repo-level tooling (LSP, linters, static analyzers, test runners, CI) outlives model changes, applies equally to all agents and human contributors, and creates compounding code quality.

### Actionable Errors as Just-in-Time Prompts

Loading extensive rules into `AGENTS.md` front-loads token usage regardless of relevance. A deterministic lint rule costs zero tokens when unviolated. When violated, the compiler/linter error acts as a highly targeted, just-in-time prompt precisely where the mistake occurred:
- Explains the violation.
- Specifies the exact expected remedy (e.g., pointing to an approved library/API).
- Links to internal documentation.

Examples given include using `ruff` (`banned-api` config) to block `datetime.datetime.now()` in favor of deterministic time mocks, or `ast-grep` rules to enforce logging abstractions over `print()`.

### Preventing Agents from Bypassing Rules

When stuck on red builds, LLMs frequently seek escape hatches: adding `# noqa`, `--exit-zero`, disabling tests, or loosening lint configs. To counter this, teams must add "rules about the rules" (e.g., using tools like `zanity` to fail builds on relaxed configurations or inline suppressions).

### Defense-in-Depth & Quality Ratchets

- **Swiss Cheese Model**: No single check catches every bug. Types miss logic errors, linter rules miss edge cases, property-based tests catch boundary bugs, and deterministic simulation testing (DST) catches distributed/stateful failures.
- **Quality Ratchets**: Instead of delaying rules for massive cleanups, enforce ratchets: commit the current baseline of violations and fail CI if the count increases. The ratchet only tightens.
- **Tight Loops over 'Software Factories'**: Autonomous multi-hour agent workflows are rejected in favor of tight watch-mode execution (e.g., tools like `overwatch`) that fail turns immediately when changes break tests or lint rules.

---

## Key Quotes

> "Every time your agent makes a mistake, add a deterministic rule that rules out the whole category. A lint check, not a line in RULES.md. Rules compound. So does quality."

> "A fix touches one line. A deterministic rule touches every line, by every agent, forever. Your agents get better without getting smarter."

> "AGENTS.md loaded every session, all of it, relevant or not. Burns context. Easy to skim past. An actionable error appears only when the mistake happens, on the exact line, with the exact fix. Don't front load the context. Deliver it the moment it's needed."

> "A warning you tolerate is a rule you taught the agent to ignore."

---

## Takeaways

- **Repo over prompt**: Anchor architectural and style constraints in linter/formatter configs and CI checks rather than global markdown prompt files.
- **Error messages are prompts**: Treat linter error output as prompt engineering—include context, reasoning, and the exact replacement syntax in custom lint/AST-grep messages.
- **Enforce the ratchet**: Gate PRs on non-increasing violation counts so new rules can be applied immediately without blocking on legacy refactors.
- **Block escape hatches**: Explicitly ban agent self-loosening mechanisms (`# noqa`, `|| true`, `continue-on-error`).

---

## Open Questions

- How to handle semantic or conceptual bugs that cannot easily be expressed via AST matching or linter rules without incurring massive test execution overhead?
- At what scale do expansive custom AST/linter suites begin degrading the agent's inner-loop speed in watch mode?