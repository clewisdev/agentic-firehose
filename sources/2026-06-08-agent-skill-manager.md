---
title: "agent-skill-manager (asm): Universal skill manager for AI coding agents"
url: https://github.com/luongnv89/asm
authors: [luongnv89]
captured: 2026-06-08
source_type: repo
topics: [tool-use, harnesses]
tags: [claude, codex, cursor, windsurf, cline, skill-registry, cli, tui]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

asm is a CLI/TUI for managing AI coding agent skills across 19+ providers (Claude Code, Codex, Cursor, Windsurf, Cline, Continue, GitHub Copilot, Aider, etc.). Addresses the scattered-skills problem: each agent maintains its own directory convention, leading to duplicates, visibility gaps, and manual installation friction.

Core capabilities:
- **Unified inventory**: List, search, filter skills across all installed agents from one dashboard
- **Installation**: `asm install github:user/repo` handles cloning, validation, and placement across providers
- **Security scanning**: Flags dangerous patterns (shell execution, network access, credential exposure, obfuscation) before install
- **Duplicate audit**: Detects and removes redundant skills across providers
- **Skill development**: `asm init`, `asm link` (symlink for live reload), `asm audit`, publish to ASM Registry
- **Dual interface**: Interactive TUI (keyboard navigation, search, detail views) + JSON-output CLI for scripting
- **Multi-provider support**: 19 built-in providers; custom providers configurable via config file

## Key details

- **Language**: TypeScript/Node.js (npm install or curl)
- **Provider coverage**: Claude Code, Codex, OpenClaw, Cursor, Windsurf, Cline, Roo Code, Continue, GitHub Copilot, Aider, OpenCode, Zed, Augment, Amp, Gemini CLI, Google Antigravity, Pi, Hermes, generic Agents
- **Workflow**: scaffold → develop (symlinked) → audit → publish
- **Skill format**: SKILL.md with YAML frontmatter (provider, visibility, description, versions)
- **Registry**: 2,800+ skills browsable online at ASM Catalog; no signup, no tracking
- **Repository stats**: 450 stars, 31 forks, 28 open issues, actively maintained (CHANGELOG, CONTRIBUTING, SECURITY docs present)

## Quotes

"Your AI agent skills are a mess — you use Claude Code at work, Codex for side projects, and OpenClaw for experiments. Each tool keeps skills in its own hidden directory with its own conventions."

"Skills scattered everywhere — ~/.claude/skills/, ~/.codex/skills/, ~/.openclaw/skills/, project-level .claude/skills/ ... you have the same skill installed three times and can't remember which version is where."

"asm brings order to the chaos — agent-skill-manager is a single command that manages skills across every AI coding agent you use."

## Takeaways

- **Pain-point clarity**: Articulates a real problem for practitioners juggling multiple AI coding agents — fragmented skill ecosystems create duplication, visibility gaps, and security risk
- **Infrastructure maturity**: Comprehensive tooling (TUI, CLI, security scanning, symlink development, registry) suggests this has been thought through beyond MVP
- **Provider breadth**: 19 built-in agents + extensibility indicates awareness of the fragmented agent tooling landscape
- **Community signal**: 450 stars and 2,800+ indexed skills suggests active adoption, though no user testimonials in the README
- **Practical workflow**: The scaffold → link → audit → publish flow is pragmatic for practitioners creating and sharing skills

## Open questions

- How is the 2,800-skill registry curated / validated? What prevents malicious skill uploads?
- What's the actual adoption curve across the 19 providers? Are some providers significantly more active than others?
- How does skill versioning and compatibility work across different agent major versions (e.g., Claude Code v2 → v3)?
- What's the security scanning rule coverage? Specific CVE/pattern database?
- Is there telemetry on which providers / skill categories are most used?
