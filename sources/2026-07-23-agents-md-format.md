---
title: "AGENTS.md: A Simple Open Format for Coding Agent Guidance"
url: http://AGENTS.md
authors: ["OpenAI Codex", "Google Jules", "Cursor", "Factory", "Amp"]
captured: 2026-07-23
source_type: docs
topics: [agent-architecture, agentic-workflows, context-engineering]
tags: [coding-agents, monorepo, devex, standardization]
signal_level: medium
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

AGENTS.md is an open, standardized markdown format for providing context and instructions to AI coding agents working on a project. Stewarded by the Agentic AI Foundation under the Linux Foundation, it has adoption across 60k+ open-source projects and works with agents from OpenAI (Codex), Google (Jules), Cursor, Cognition (Devin, Windsurf), GitHub Copilot, and many others.

The format complements README.md by segregating agent-specific guidance (build steps, test commands, code style, security considerations) into a predictable, machine-readable location. This keeps human-facing docs concise while giving agents the precise, detailed context they need.

Key design principles:
- **Predictable location**: agents look for AGENTS.md at the repository root (or nearest parent in nested repos)
- **Standard markdown**: no proprietary schema; agents parse plain text headings and prose
- **Living documentation**: treat it like any other doc; update as your project evolves
- **Monorepo-friendly**: nested AGENTS.md files take precedence for local context (e.g., OpenAI's main repo has 88 files)

Common sections include: project overview, setup/dev commands, build & test instructions, code style guidelines, commit/PR conventions, security gotchas, and deployment steps.

## Key Quotes

> "Think of AGENTS.md as a README for agents: a dedicated, predictable place to provide the context and instructions to help AI coding agents work on your project."

> "README.md files are for humans: quick starts, project descriptions, and contribution guidelines. AGENTS.md complements this by containing the extra, sometimes detailed context coding agents need."

> "One AGENTS.md works across many agents. Your agent definitions are compatible with a growing ecosystem of AI coding agents and tools."

## Takeaways

- **Low friction adoption**: agents can scaffold AGENTS.md on request; it's plain markdown with no schema lock-in
- **Ecosystem convergence**: emerged from collaborative work across OpenAI, Google, Cursor, Cognition, and others; now maintained as open standard
- **Monorepo scaling**: hierarchical file lookup means each subproject can ship tailored agent instructions without centralized coordination
- **Actionable automation**: agents will execute testing commands listed in AGENTS.md and attempt fixes before completing work
- **Clarity separation**: offloads agent-specific friction (turbo filters, ESLint/TypeScript setup, CI plan paths) from human contributor docs

## Open Questions

- How do agents prioritize conflicting instructions across nested AGENTS.md files and user chat prompts in practice?
- What guidance patterns (e.g., security constraints, large dataset handling) have proven most effective across the 60k+ projects?
- Does the format include conventions for versioning agent capabilities or breaking changes in instructions?
- How do teams measure whether AGENTS.md reduces agent failure modes or context misunderstandings?
