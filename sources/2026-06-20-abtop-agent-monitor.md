---
title: "abtop: Like htop, but for AI coding agents"
url: https://github.com/graykode/abtop
authors: [graykode]
captured: 2026-06-20
source_type: repo
topics: [agent-orchestration, harnesses, monitoring]
tags: [claude-code, codex-cli, opencode, rust, tui, rate-limits, token-tracking]
signal_level: high
status: raw
confidence: high
freshness_until: unknown
---

## Summary

abtop is a production-grade terminal UI tool for real-time monitoring of AI coding agent sessions (Claude Code, Codex CLI, OpenCode). Written in Rust, it reads local process and file state to surface token usage, context window capacity, rate limits, orphan ports, and child processes across multiple concurrent agents—without requiring API keys or authentication.

**Key practitioner value**: enables operators running multiple agents to detect quota exhaustion, orphan processes, and resource contention at a glance. Solves a concrete operational problem that emerges at scale.

## Core Features & Implementation

**Session discovery**: reads Claude Code config from `~/.claude` and `~/.claude-*` profile roots; detects active sessions from local process/file state rather than API polling. OpenCode support requires local SQLite database access (`~/.local/share/opencode/opencode.db`).

**Metrics exposed per session**:
- Token count (all agents)
- Context window % utilization (Claude Code, Codex CLI)
- Rate limit quota (Claude Code, Codex CLI)
- Task/status detection (Claude Code, Codex CLI)
- Child process and listening port enumeration
- Subagent tracking (Claude Code only)
- Memory status (Claude Code only)

**UX affordances**:
- TUI with 12 built-in themes (including 4 colorblind-friendly options)
- tmux integration: press Enter to jump to the pane running a selected agent
- JSON output mode (`--json`) for consumption by scripts/dashboards
- Library crate export (`abtop::app::App`) for in-process data collection without subprocess spawning or quota consumption
- Configuration file at `~/.config/abtop/config.toml` for agent filtering, profile discovery, UI language

**Platform support**: macOS, Linux, Windows (native; uses `sysinfo` for process info, `netstat -ano` for ports).

## Verbatim Quotes

> "Like btop, but for your AI coding agents. See every Claude Code, Codex CLI, and OpenCode session at a glance — token usage, context window %, rate limits, child processes, open ports, and more."

> "Running 3+ agents across projects? See them all in one screen. Hitting rate limits? Watch your quota in real-time. Agent spawned a server and forgot to kill it? Orphan port detection."

> "App is not Send (it owns the collectors), so keep it on one thread and pass the serialized [Snapshot] across boundaries."

## Takeaways

- **Operational necessity**: abtop directly addresses a friction point that only emerges at >1 concurrent agent—monitoring and orchestration become manual/fragile without tooling.
- **Low-friction instrumentation**: read-only access to local file/process state eliminates auth friction and quota consumption during monitoring.
- **Library-first design**: dual-mode architecture (CLI + library crate) enables integration into larger observability/orchestration frameworks without reimplementing collectors.
- **Multi-profile support**: explicit handling of Claude Code's `~/.claude-*` variants and custom profile roots reflects real team deployment patterns (personal, work, shared).
- **Accessibility-aware**: inclusion of 4 colorblind-friendly color schemes signals attention to operator diversity in long-running monitoring tasks.
- **Orphan process detection**: explicit "kill orphaned ports" feature addresses a known failure mode (agents spawn servers that outlive sessions).

## Open Questions

- Does rate limit quota refresh behavior sync correctly when Claude Code updates quota in-session, or is the snapshot point-in-time only?
- How does context window % calculation handle variable context window sizes (Claude 3.5 Sonnet vs. Opus)?
- Does the tmux integration handle disconnected/renamed panes gracefully, or does Enter jump fail silently?
- Library crate: is `App::tick_no_summaries()` guaranteed non-blocking on slow filesystems (NFS, network mounts)?
- Does orphan port detection distinguish between intentional persistent agents (background services) vs. truly orphaned processes?
