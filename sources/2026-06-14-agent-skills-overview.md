---
title: "Agent Skills Overview - Standardized Format for AI Agent Capabilities"
url: http://SKILL.md
authors: [Anthropic]
captured: 2026-06-14
source_type: docs
topics: [skills, tool-use, agent-architecture]
tags: [skills, standardization, open-format, progressive-disclosure]
signal_level: medium
status: summarized
confidence: medium
freshness_until: 2026-Q3
---

## Summary

Agent Skills is a lightweight, open standard format for extending AI agent capabilities with specialized knowledge and workflows. Developed by Anthropic and released as an open standard, it provides a structured way to package procedural knowledge, domain expertise, and context into portable, version-controlled folders that agents can load on demand.

At its core, a skill is a folder containing a required `SKILL.md` metadata file plus optional bundled resources: scripts, reference materials, templates, and assets. The format enables cross-product reuse across multiple AI tools and agentic clients.

**Key architectural concept: progressive disclosure.** Agents load skills in three stages:
1. **Discovery** — agents load only skill name and description at startup (minimal context footprint)
2. **Activation** — when a task matches a skill's description, the agent reads full `SKILL.md` instructions
3. **Execution** — agent follows instructions, optionally executing bundled code or loading referenced files

This three-stage loading keeps context usage low while maintaining access to many skills.

## Verbatim quotes

> "Skills solve this by packaging procedural knowledge and company-, team-, and user-specific context into portable, version-controlled folders that agents load on demand."

> "Full instructions load only when a task calls for them, so agents can keep many skills on hand with only a small context footprint."

> "The Agent Skills format was originally developed by Anthropic, released as an open standard, and has been adopted by a growing number of agent products."

## Structure example

```
my-skill/
├── SKILL.md              # Required: metadata + instructions
├── scripts/              # Optional: executable code
├── references/           # Optional: documentation
├── assets/               # Optional: templates, resources
└── ...                   # Any additional files or directories
```

## Takeaways

- **Progressive disclosure pattern reduces context burden**: agents start with only skill name/description; full instructions load only on task match.
- **Designed for portability and reuse**: single skill definition can be used across multiple agent products and client implementations.
- **Bridges capability gap pragmatically**: packages domain expertise, workflows, and context alongside executable code and references.
- **Open ecosystem model**: released by Anthropic as open standard; adoption across growing number of agent products; community contributions welcomed.
- **Solves a real agent deployment problem**: agents have capability but lack context for reliable task execution; skills package both.

## Open questions

- How do agents disambiguate between multiple skills with similar descriptions during discovery?
- What mechanisms exist for skill versioning and dependency management across different agent platforms?
- How does the progressive disclosure pattern perform in practice when agents have hundreds of skills available?
- Are there security/isolation guarantees for scripts bundled within skills, or is that delegated to the host agent?
- How does context usage scale with skill complexity and embedded reference materials?
