---
title: "Agent Skills Overview – standardized format for agent capabilities"
url: http://SKILL.md
authors: [Anthropic]
captured: 2026-06-27
source_type: docs
topics: [tool-use, agent-architecture, agentic-workflows]
tags: [skills, capability-extension, format-standard, portable-knowledge]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

Agent Skills is an open, lightweight format for extending AI agent capabilities with specialized knowledge and workflows. Developed by Anthropic and released as an open standard, it provides a standardized way to package procedural knowledge, domain expertise, and company- or team-specific context into portable, version-controlled folders that agents load on demand.

A skill is fundamentally a folder containing a required `SKILL.md` metadata file plus optional subdirectories for executable scripts, reference materials, templates, and other resources. The format addresses a core limitation of modern agents: while they are increasingly capable, they often lack the contextual knowledge needed to perform real work reliably.

### How it works

Agent Skills use **progressive disclosure** — a three-stage loading mechanism:

1. **Discovery**: Agents load only skill name and description at startup, enabling them to know when a skill might be relevant without consuming context.
2. **Activation**: When a task matches a skill's description, the agent reads the full SKILL.md instructions into context.
3. **Execution**: The agent follows instructions, optionally executing bundled code or loading referenced files.

This design allows agents to maintain many skills on hand with minimal context overhead.

### Key value propositions

- **Domain expertise capture**: Encode specialized knowledge (legal review, data pipelines, formatting rules) as reusable instructions and resources
- **Repeatable workflows**: Convert multi-step tasks into consistent, auditable procedures
- **Cross-product reuse**: Build once, deploy across any skills-compatible agent platform

The format is already supported by "a large number of AI tools and agentic clients" and is open to ecosystem contributions. Development happens on GitHub and Discord.

## Key quotes

> "Skills solve this by packaging procedural knowledge and company-, team-, and user-specific context into portable, version-controlled folders that agents load on demand."

> "Agents load skills through progressive disclosure, in three stages: Discovery, Activation, Execution."

## Takeaways

- Skills address the context-scarcity problem by lazy-loading procedural knowledge only when needed
- The standardized format enables portability across agent platforms and reduces re-implementation overhead
- Progressive disclosure is a practical trade-off between agent capability and context efficiency
- Adoption by multiple vendors suggests the format is gaining traction as a de facto standard
- Framing skills as "domain expertise capture" emphasizes knowledge engineering, not just API wrapping

## Open questions

- How does skill versioning and dependency management work across multiple agents?
- What is the actual overhead of skill discovery at startup, and how does it scale with portfolio size?
- Are there patterns for skill composition or skill-to-skill invocation?
- How do organizations structure skill repositories for teams vs. enterprise-wide sharing?
