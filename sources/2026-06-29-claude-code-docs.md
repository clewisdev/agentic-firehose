---
title: "Claude Code Docs - Overview & Getting Started"
url: http://CLAUDE.md
authors: [Anthropic]
captured: 2026-06-29
source_type: docs
topics: [agent-architecture, tool-use, agentic-workflows, code-generation]
tags: [claude-code, cli, vs-code, desktop-app, mcp, agent-teams, git-integration]
signal_level: high
status: raw
confidence: high
freshness_until: unknown
---

## Summary

Official Anthropic documentation for Claude Code, an agentic coding tool that reads codebases, edits files, runs commands, and integrates with development tools. Available as CLI (terminal), VS Code extension, desktop app, web interface, and JetBrains plugins.

### Core capabilities documented:

- **File and command execution**: Reads codebase, edits multiple files, runs shell commands
- **Multi-session coordination**: "Agent teams" with lead agent coordinating subtasks across parallel sessions
- **Git integration**: Direct git operations (stage, commit, branch creation, PR generation)
- **Tool integration via MCP**: Model Context Protocol connects to external data (Google Drive, Jira, Slack, custom tools)
- **Session memory and customization**: Auto-memory across sessions; CLAUDE.md (project root config file) for coding standards, architecture decisions, review checklists; skill definition for repeatable workflows; hooks for pre/post-action automation
- **Multi-platform deployment**: Terminal, VS Code, standalone desktop, browser (claude.ai/code), JetBrains IDEs; CI/CD integration via GitHub Actions / GitLab CI

### Installation & setup details:

- **CLI**: Native install (macOS/Linux/WSL), Homebrew (two channels: stable vs. latest), WinGet, apt/dnf/apk. Auto-updates on native; manual updates required for package managers.
- **VS Code**: Extension search or direct install link; @-mentions, inline diffs, plan review, conversation history.
- **Desktop app**: Macros Intel/Apple Silicon/Windows; visual diff review, multi-session side-by-side, recurring task scheduling, cloud sessions.
- **Web**: No local setup; long-running task support, parallel execution, repo access without local clone.
- **JetBrains**: Requires separate CLI installation; interactive diff viewing.

### Workflow examples cited:

- Automating test writing, lint fixes, merge conflict resolution, dependency updates, release notes
- Feature building and bug fixing from plain-language description
- Commit and PR creation with descriptive messages
- Code review and issue triage in CI/CD pipelines

### CLAUDE.md & extensibility:

Project-level configuration file (markdown) read at session start. Supports:
- Coding standards, architecture decisions, library preferences, review checklists
- Auto-memory (build commands, debugging insights) persisted across sessions
- Skills: shareable repeatable workflows (e.g., `/review-pr`, `/deploy-staging`)
- Hooks: pre/post-action shell execution (e.g., auto-format, lint checks)

### Agent architecture:

Multiple Claude Code agents can spawn and coordinate on subtasks; lead agent assigns work and merges results. Background agents enable parallel session execution visible from single dashboard.

## Verbatim quotes

> "Claude Code is an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools. Available in your terminal, IDE, desktop app, and browser."

> "With MCP, Claude Code can read your design docs in Google Drive, update tickets in Jira, pull data from Slack, or use your own custom tooling."

> "CLAUDE.md is a markdown file you add to your project root that Claude Code reads at the start of every session. Use it to set coding standards, architecture decisions, preferred libraries, and review checklists."

> "Spawn multiple Claude Code agents that work on different parts of a task simultaneously. A lead agent coordinates the work, assigns subtasks, and merges results."

## Takeaways

- **Concrete agentic architecture**: Multi-agent coordination with lead orchestrator is explicitly named and documented as a shipped capability, not concept.
- **Persistence via config + auto-memory**: CLAUDE.md provides human-authored codification; auto-memory captures emergent learnings (build steps, debugging) without explicit capture.
- **MCP as integration standard**: Model Context Protocol positioned as the extensibility mechanism for external data and custom tools; reduces friction for tool-use integration.
- **Multi-surface deployment**: Same core agent available across CLI, IDE, desktop, web, and CI/CD—different UX surfaces but unified underlying capability.
- **Git as first-class agentic substrate**: Direct branching, commits, and PR creation indicate git operations are built into the agent loop, not wrapper scripts.

## Open questions

- How does the lead agent in multi-agent scenarios route work to subordinates? Is this learned in context, or specified in CLAUDE.md / hooks?
- What is the scope of auto-memory? Persisted per-project or per-user? Indexed for retrieval or summarized?
- Does MCP support bidirectional sync (read + write) for all tool types (Jira, Slack, Drive) or write-only for some?
- In CI/CD mode, how are long-running tasks scheduled or polled? Is there a webhook callback or explicit polling loop?
