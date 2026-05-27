---
title: "Claude Cowork — Anthropic's desktop agentic surface"
written: 2026-05-20
updated: 2026-05-20
topics: [harnesses]
tags: [cowork, claude-desktop, anthropic, agentic, mcp, scheduled-tasks, plugin-marketplace]
sources: []
status: stable
---

# Claude Cowork

**What it is.** A "coworker" tab inside Claude Desktop (macOS + Windows) that runs the same agentic architecture as Claude Code — file-system access to folders you grant, multi-step task execution, scheduled runs, MCP connectors, and a plugin marketplace — without needing a terminal.

**Positioning.** It is Claude Code's engine repackaged for knowledge workers rather than developers. The target user is "researchers, analysts, operations, legal, finance — people who'd rather spend time on the judgement calls than the assembly." For an engineer already using Claude Code, Cowork is essentially "Claude Code with a GUI and project surface, for files outside a git repo."

## Timeline

- **Jan 2026** — macOS public beta, ~15% of Claude Pro users got the toggle
- **Feb 10 2026** — Windows beta
- **Mar 2026** — desktop control / computer use added; Claude Code gets Auto Mode in parallel
- **Apr 9 2026** — GA, included on every paid plan (Pro $20/mo → Enterprise)
- **May 2026** — vertical bundles begin shipping (Legal 2026-05-12, Small Business 2026-05-13, Marketing Ops 2026-05-18)

## Why it matters for this KB

- **Two of our sources already assume Cowork as their delivery surface** ([Hassid](../../sources/2026-05-20-its-not-x-its-y.md) for loading anti-style files; [POHA](../../sources/2026-05-20-poha.md) as the runtime for scheduled overnight tasks). Expect this to be the default deployment target for non-developer agent recipes going forward.
- **Same architecture as Claude Code** — patterns learned in one (hooks, MCP tool design, system-prompt files, scheduled tasks) port to the other. Don't treat them as separate ecosystems.
- **Project files + folder mounting + scheduled execution** is the combination that enables ambient/scheduled agents like POHA. Before Cowork GA, doing this required wiring cron to Claude Code or building custom harnesses.

## What I still don't know

- **Hook surface parity with Claude Code.** Does Cowork expose the same lifecycle hooks (SessionStart, PostToolUse, etc.) that claude-mem instruments? Worth checking before assuming Claude Code patterns transfer wholesale.
- **Scheduled-task primitives.** Native cron, or do you wire it from outside (OS launchd / Task Scheduler) and just have Cowork "be ready"?
- **Plugin marketplace governance.** Who reviews plugins? What permissions can a plugin assume by default?
- **Pricing at scale.** "Free on paid plans" is the headline; actual token costs for an always-on agent are not.

## Sources

- [Anthropic product page](https://www.anthropic.com/product/claude-cowork) — canonical
- [claude.com/product/cowork](https://claude.com/product/cowork) — positioning
- [Get started with Claude Cowork (Help Center)](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork) — operational docs
- [The New Stack — GA into the enterprise](https://thenewstack.io/anthropic-takes-claude-cowork-out-of-preview-and-straight-into-the-enterprise/) — GA date + enterprise framing
- [Winbuzzer — Cowork/Claude Code architecture relationship](https://winbuzzer.com/2026/03/25/anthropic-claude-code-cowork-auto-mode-computer-use-xcxwbn/)
