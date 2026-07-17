---
title: "AGENTS.md: An open format for guiding coding agents"
url: http://AGENTS.md
authors: []
captured: 2026-07-17
source_type: docs
topics: [tool-use, agentic-workflows, agent-architecture, context-engineering]
tags: [format, specification, monorepo, coding-agents, open-standard]
signal_level: medium
status: raw
confidence: medium
freshness_until: evergreen
---

## Summary

AGENTS.md is an open, standardized format for providing context and instructions to AI coding agents working on a project. It functions as a complement to README.md—humans read READMEs for quick starts and contribution guidelines; agents read AGENTS.md for detailed build steps, test conventions, code style, and project-specific gotchas that would clutter or confuse human documentation.

The format is intentionally minimal: plain Markdown with no required fields. Agents parse whatever structure maintainers provide. The specification supports nested AGENTS.md files in monorepos; agents read the closest file to the edited file in the directory tree, allowing per-package tailoring (OpenAI's main repo has 88 files).

Ecosystem adoption is significant: 60k+ open-source projects use it, and it's compatible with 25+ coding agents including OpenAI Codex, Google Jules, Cursor, Aider, Devin, GitHub Copilot, Codeium, and others. AGENTS.md is now stewarded by the Agentic AI Foundation under the Linux Foundation.

## Common sections

Maintainers typically include:
- **Setup commands**: dependency installation, dev server startup, test runners
- **Code style**: TypeScript mode, quote conventions, functional patterns
- **Testing instructions**: CI/workflow location, test filtering, pre-commit checks
- **PR guidelines**: commit message format, lint/test requirements
- **Dev environment tips**: monorepo navigation, package discovery, Vite scaffolding
- **Security considerations**, **deployment steps**, **large dataset handling**

## Key design decisions

1. **Separation from README**: keeps human docs focused, gives agents a predictable location for detailed but sometimes-verbose context.
2. **No schema enforcement**: agents adapt to varying structures; flexibility over rigidity.
3. **Locality precedence**: closest AGENTS.md wins in nested structures, preventing global rules from overriding local package needs.
4. **Executable instructions**: agents attempt to run programmatic checks (lint, test) listed in AGENTS.md and fix failures before submitting work.
5. **Backward compatibility**: can be layered on existing AGENT.md or similar docs via symlinks.

## Takeaways

- AGENTS.md is a lightweight, ecosystem-level signal for standardizing agent-human communication in code repositories
- Adoption is high (60k projects, 25+ tools), suggesting real practitioner demand and interoperability value
- The format's minimalism (plain Markdown, no schema) lowers friction but may allow inconsistency across projects
- Nesting and locality rules directly address monorepo complexity—a real pain point in agent-assisted codebases
- Living documentation (updateable, versioned) treats agent instructions like code rather than static guidance

## Open questions

- How do agents prioritize conflicting instructions across tools (e.g., Aider config vs. explicit chat prompt)?
- What's the actual error rate when agents execute programmatic checks found in AGENTS.md? Are they idempotent?
- How do teams manage drift between AGENTS.md and actual CI/test setup as code evolves?
- Does the specification publish validation or tooling to lint AGENTS.md files for common mistakes?
