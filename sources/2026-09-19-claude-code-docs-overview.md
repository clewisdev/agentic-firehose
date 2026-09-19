---
title: "Claude Code Documentation – Overview"
url: "http://CLAUDE.md"
authors: [Anthropic]
captured: 2026-09-19
source_type: docs
topics: [agent-architecture, tool-use, agentic-workflows, code-generation]
tags: [claude-code, mcp, agent-sdk, terminal-cli, vscode, desktop-app]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2026-Q4
---

## Summary

Official Anthropic documentation for Claude Code, an agentic AI coding assistant that operates across multiple surfaces (terminal CLI, IDE extensions, desktop app, web browser). The tool reads codebases, edits files, runs commands, and integrates with development workflows through MCP (Model Context Protocol) connections.

### Key capabilities documented:

- **Multi-surface operation**: Terminal CLI (macOS, Linux, WSL, Windows), VS Code extension, JetBrains IDE plugin, standalone desktop app, web interface at claude.ai/code
- **Agent tasks**: Automate tests, fix linting errors, resolve merge conflicts, update dependencies, write release notes, build features from plain-language descriptions, create commits/PRs with git integration
- **Extensibility**: CLAUDE.md (project-root markdown file) for storing coding standards, architecture decisions, preferred libraries, review checklists; MCP integration for connecting external tools (Google Drive, Jira, Slack, custom tooling)
- **Installation**: Native installers (curl/PowerShell/cmd on Windows, brew/apt/dnf/apk on Linux), WinGet support; automatic updates on native installs
- **Session management**: Session storage, prompt caching, context window management, memory persistence

### Architecture notes:

- Runs on Claude API (requires subscription or Anthropic Console account; some surfaces support third-party providers)
- Desktop app and browser versions enable parallel session coordination for large projects
- CLI auto-updates in background; package manager installs require manual updates
- .claude directory exploration and configuration reference documented but truncated in fetch

## Verbatim quotes

> "Claude Code is an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools. Available in your terminal, IDE, desktop app, and browser."

> "CLAUDE.md is a markdown file you add to your project root that Claude Code reads at the start of every session. Use it to set coding standards, architecture decisions, preferred libraries, and review checklists."

> "The Model Context Protocol (MCP) is an open standard for connecting AI tools to external data sources. With MCP, Claude Code can read your design docs in Google Drive, update tickets in Jira, pull data from Slack, or use your own custom tooling."

## Takeaways

- **Agent as persistent development partner**: CLAUDE.md + session memory pattern mirrors human team onboarding; architectural decisions and preferences persist across sessions
- **MCP is the extension mechanism**: Not just Claude-specific; open protocol for tool composition suggests ecosystem-level abstraction (comparable to GitHub Actions, LSP)
- **Multi-surface-first design**: CLI → IDE → app/web progression indicates tooling maturity; auto-update on native installs reduces friction vs. package manager chasing
- **Plain-language task specification with verification**: "describe what you want, plans approach, writes code, verifies it works" is the implicit agent loop (plan → act → check)
- **CI/CD integration hinted but incomplete**: Documentation mentions GitHub Actions and GitLab CI/CD for code review automation but details are truncated

## Open questions

- How does Claude Code handle merge conflicts or concurrent edits when multiple sessions are coordinated in parallel?
- What is the fallback behavior if MCP connections drop during a long-running task?
- Are there documented failure modes or guardrails (e.g., max file size, directory traversal limits, command execution restrictions)?
- How does cost scale with session count and codebase size (context window consumption)?
- Does CLAUDE.md support version control or branching strategies (e.g., different instructions per branch)?
