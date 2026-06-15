---
title: "Claude Code Docs – Overview"
url: http://CLAUDE.md
authors: [Anthropic]
captured: 2026-06-15
source_type: docs
topics: [tool-use, agent-architecture, agentic-workflows, code-generation]
tags: [claude-code, cli, vscode, ide-integration, mcp, git, agents]
signal_level: medium
status: summarized
confidence: high
freshness_until: 2026-Q4
---

## Summary

Official Anthropic documentation for Claude Code, an agentic coding tool that reads codebases, edits files, runs commands, and integrates with development tools across terminal, IDE, desktop, and web environments.

The tool is designed to automate coding workflows: writing tests, fixing lint errors, resolving merge conflicts, building features, fixing bugs, and creating commits/PRs. It reads project context from a `CLAUDE.md` file at the root, supports the Model Context Protocol (MCP) for external tool integration (Google Drive, Jira, Slack, custom tools), and can spawn multiple agent teams working in parallel with coordination.

## Key capabilities

- **Multimodal environments**: Terminal CLI (macOS, Linux, Windows via WSL or PowerShell), VS Code extension, JetBrains IDEs, standalone desktop app (macOS/Windows), web interface (claude.ai/code), and Chrome extension.
- **Code operations**: file edits with inline diffs, command execution, git operations (staging, commits, branch creation, PRs).
- **Context and memory**: reads entire codebase; auto-builds session memory for build commands and debugging insights; `CLAUDE.md` for coding standards, architecture decisions, library preferences, review checklists.
- **Extensibility**: MCP integration for external data sources; custom "skills" (repeatable workflows like `/review-pr`, `/deploy-staging`); hooks for pre/post-action automation (auto-format, lint checks).
- **Multi-agent orchestration**: lead agent coordinates subtasks across parallel sessions; Agent SDK for fully custom agent workflows with control over tool access and permissions.
- **CI/CD integration**: GitHub Actions / GitLab CI for automated code review and issue triage.

## Installation methods

- Native install (auto-updates): `curl -fsSL https://claude.ai/install.sh | bash` (macOS/Linux/WSL) or PowerShell/CMD installers for Windows.
- Homebrew: `brew install --cask claude-code` (manual updates required).
- WinGet: `winget install Anthropic.ClaudeCode` (manual updates required).
- Package managers: apt, dnf, apk for Debian, Fedora, RHEL, Alpine.

## Deployment requirements

Most surfaces require Claude subscription or Anthropic Console account; terminal CLI and VS Code also support third-party providers. Desktop app requires paid subscription.

## Quotes

> "Claude Code is an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools. Available in your terminal, IDE, desktop app, and browser."

> "For bugs, paste an error message or describe the symptom. Claude Code traces the issue through your codebase, identifies the root cause, and implements a fix."

> "CLAUDE.md is a markdown file you add to your project root that Claude Code reads at the start of every session. Use it to set coding standards, architecture decisions, preferred libraries, and review checklists."

## Takeaways

- Claude Code is a production tool with multi-platform availability and active auto-update infrastructure; suggests mature tooling for agentic code operations.
- `CLAUDE.md` + auto-memory pattern addresses context persistence across sessions without manual intervention—practical for sustained agent workflows.
- MCP as first-class extension point enables team-specific tool binding (Jira, Slack, custom APIs) without core tool modification.
- Multi-agent orchestration with a lead agent and parallel workers reflects a scaling pattern for larger tasks; Agent SDK indicates support for custom orchestration logic.
- Git-native (commits, PRs, branches) suggests integration into existing developer workflows rather than isolated agent sandbox.

## Open questions

- What are failure modes or correctness issues when Claude Code operates across very large codebases (>500k LOC)?
- How does `CLAUDE.md` versioning and merge conflict resolution work in team settings?
- What guarantees exist for determinism / reproducibility in multi-agent sessions?
- How does the lead agent decide task subdivision and assign work to parallel agents?
- Are there published cost estimates or token-usage metrics for typical workflows?
