---
title: "Andrej Karpathy Skills — CLAUDE.md Principles"
url: https://github.com/forrestchang/andrej-karpathy-skills
authors: [forrestchang, based on Andrej Karpathy observations]
captured: 2026-05-28
source_type: repo
topics: [skills, harnesses, prompting]
tags: [claude-md, karpathy, principles, coding-guidelines, viral]
signal_level: medium
status: summarized
confidence: medium
freshness_until: evergreen
---

# Karpathy Skills CLAUDE.md

*Low-code surface, high-engagement signal.* 160k GitHub stars (was #1 trending globally). Single `CLAUDE.md` file encoding Karpathy's four principles for LLM-assisted coding. Also available as a Claude Code plugin. The star count reflects resonance with the developer community, not technical depth.

## Content

Four principles encoded as CLAUDE.md instructions:

1. **Think Before Coding** — surface assumptions, avoid silent wrong interpretations, ask clarifying questions before generating code
2. **Simplicity First** — eliminate overengineering and unnecessary abstractions; prefer the simplest thing that works
3. **Surgical Changes** — only modify what's required; don't refactor adjacent code while fixing something specific
4. **Goal-Driven Execution** — define verifiable success criteria (not imperative "do X") before starting

Can be used as a per-project `CLAUDE.md` drop-in or installed as a Claude Code plugin.

## Assessment

The principles are not new, but encoding them as a CLAUDE.md file and shipping it as an installable plugin is a useful packaging. The 160k stars signal that many developers find value in explicit behavioral constraints on their coding agents — either because the constraints are genuinely useful or because the repo is a reference for how to structure `CLAUDE.md` files.

The Karpathy connection gives it credibility it wouldn't have as an anonymous file. Treat it as a good `CLAUDE.md` template, not as research.

## Related

- `sources/2026-05-20-andre-micolon-dev-info.md` — similar small tactical harness pattern
- `topics/harnesses/index.md`
