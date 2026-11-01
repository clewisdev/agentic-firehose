---
title: "Claude Code Documentation: Overview and Getting Started"
url: http://CLAUDE.md/AGENTS.md
authors: [Anthropic]
captured: 2026-11-01
source_type: docs
topics: [harnesses, tool-use, code-generation]
tags: [claude-code, cli, terminal, agent-harness, bash, ide-integration]
signal_level: medium
status: raw
confidence: high
freshness_until: 2027-Q4
---

## Summary

This document is the official overview and getting started guide for Claude Code, Anthropic's agentic coding harness designed to read repositories, edit files across multiple directories, execute shell commands, and interact with developer tooling. The documentation outlines the distribution mechanisms, runtime environments, core execution modalities, and multi-surface integrations supported by the tool.

Claude Code is delivered across five primary execution surfaces:
1. **Terminal CLI**: The primary full-featured execution environment, packaged for macOS, Linux, WSL, and native Windows. The CLI handles background self-updating for native shell installs while offering managed stable and cutting-edge release tracking via package managers (Homebrew, WinGet, APT, DNF, APK).
2. **IDE Extensions**: Deep integrations for VS Code, Cursor, and JetBrains IDEs (IntelliJ IDEA, PyCharm, WebStorm) that render inline diffs, support plan reviews, selection-sharing context, and conversation histories directly inside editor tabs.
3. **Desktop Application**: A standalone environment facilitating side-by-side multi-session execution, visual diff inspections, recurring scheduled tasks, and coordinated cloud sessions.
4. **Browser & Cloud (`claude.ai/code`)**: Cloud-hosted asynchronous execution allowing developers to spawn parallel tasks, coordinate long-running jobs without local checkouts, and manage multi-branch agent initiatives across desktop and mobile devices.
5. **CI / Headless Automation**: Automated pull request review, issue triage, and scriptable operations running within GitHub Actions, GitLab CI/CD, or self-hosted CI pipelines.

Technically, the harness operates with direct environment execution privileges. On Windows, it defaults to using Git for Windows to secure a POSIX-compliant Bash shell tool environment; in the absence of Git for Windows, it falls back to PowerShell. Authentication is routed via either Anthropic Console API keys (`ANTHROPIC_API_KEY`) or an interactive web login session with subscription tokens. Its core loop automates tasks ranging from exploratory codebase bug localization and multi-file patching to automated test generation, test execution feedback loops, and automated Git lifecycle management (branch creation, descriptive commit messaging, and pull request generation).

## Key Quotes

> "Claude Code is an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools. Available in your terminal, IDE, desktop app, and browser."

> "Git for Windows is recommended on native Windows so Claude Code can use the Bash tool. If Git for Windows is not installed, Claude Code uses PowerShell as the shell tool instead. WSL setups do not need Git for Windows."

> "For bugs, paste an error message or describe the symptom. Claude Code traces the issue through your codebase, identifies the root cause, and implements a fix."

## Takeaways

- **Harness Portability across Surfaces**: Claude Code decouples the underlying agent loop from the frontend surface, providing unified capabilities across headless CLI, visual IDE panes, standalone desktop applications, and remote web-managed cloud instances.
- **Shell Environment Dependency**: Agent execution reliability on native platforms relies heavily on POSIX shell tooling; Claude Code explicitly seeks Bash environments (via Git for Windows or WSL) before falling back to PowerShell.
- **Closed-Loop Workflow Support**: Claude Code is built not just for text suggestion, but for end-to-end task execution: reading context, writing code across multiple files, executing local tests, self-healing failures, and issuing Git commands.

## Open Questions

- How does the context compaction and prompt caching mechanism behave across long-running background sessions compared to interactive CLI sessions?
- What sandboxing or privilege-escalation guardrails are enforced when Claude Code executes arbitrary shell commands in headless CI environments?