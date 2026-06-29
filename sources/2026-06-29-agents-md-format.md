---
title: "AGENTS.md: A simple, open format for guiding coding agents"
url: http://AGENTS.md
authors: []
captured: 2026-06-29
source_type: docs
topics: [agent-architecture, tool-use, agentic-workflows]
tags: [coding-agents, format-spec, monorepo, claude, cursor, openai-codex]
signal_level: medium
status: raw
confidence: medium
freshness_until: evergreen
---

## Summary

AGENTS.md is an open-source, format-agnostic specification for providing context and operational instructions to AI coding agents within a repository. It complements README.md by concentrating agent-specific guidance—build steps, test commands, code style rules, conventions—into a dedicated, parseable location.

The format has achieved ecosystem adoption across 60k+ open-source projects and is supported by a growing roster of coding agents (OpenAI Codex, Claude, Cursor, Aider, Google Jules, Devin, GitHub Copilot, Windsurf, and ~20 others). It is stewarded as an open format by the Agentic AI Foundation under the Linux Foundation.

### Key design principles

- **Separate from README**: Keeps human-facing documentation concise; agent instructions don't clutter contribution guidelines.
- **Predictable location**: Agents scan from the file being edited upward to find the nearest AGENTS.md, enabling nested scoping in monorepos (OpenAI's main repo uses 88 nested instances).
- **Plain Markdown**: No required fields, no proprietary schema—any agent can parse and act on the text.
- **Living documentation**: Intended to evolve alongside the codebase, like any other living doc.

### Recommended sections (from examples)

- Setup / dev environment commands
- Build and test commands (with specific flags and patterns)
- Code style guidelines (TypeScript strict mode, import conventions, etc.)
- Testing instructions (CI plan location, test runners, filtering patterns)
- PR title format and pre-commit checks
- Security considerations, deployment steps, large-dataset handling

### Integration examples

The docs show working integration with Aider (`.aider.conf.yml` read directive) and Gemini CLI (`.gemini/settings.json` context fileName), indicating agents are already acting on AGENTS.md as a first-class input.

## Verbatim quotes

> "Rather than introducing another proprietary file, we chose a name and format that could work for anyone."

> "Agents automatically read the nearest file in the directory tree, so the closest one takes precedence and every subproject can ship tailored instructions."

> "Yes—if you list them. The agent will attempt to execute relevant programmatic checks and fix failures before finishing the task." (on automatic test execution)

## Takeaways

- **Standard, language-agnostic format** emerging as de facto convention for agent-ready repos; no vendor lock-in.
- **Monorepo-aware scoping**: nearest AGENTS.md wins, reducing maintenance burden for large projects with heterogeneous sub-packages.
- **Agents are already parsing this**: integration patterns with Aider, Gemini CLI, and Cursor suggest active tool support, not just a proposal.
- **Bridges README/docs gap**: solves the practical problem of concentrating executable, precise guidance away from human onboarding docs.
- **Living spec**: endorsed by major tool vendors (OpenAI, Google, Cognition, JetBrains, GitHub) but no formal versioning or breaking-change policy yet documented.

## Open questions

- How do agents resolve conflicting or circular instructions across nested AGENTS.md files and explicit chat prompts? (FAQ hints precedence but doesn't detail evaluation order.)
- Will this scale to structured metadata (e.g., dependency versions, performance budgets, forbidden patterns)? Current format is prose-only.
- What governance model or change proposal process exists for the spec under LF stewardship?
- How do agents handle AGENTS.md files that are themselves generated or templated (e.g., from CI config)?
