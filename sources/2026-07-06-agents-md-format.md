---
title: "AGENTS.md: Open format for guiding coding agents"
url: https://agents.md
authors: []
captured: 2026-07-06
source_type: docs
topics: [agent-architecture, tool-use, agentic-workflows]
tags: [standardization, repository-structure, multi-agent-compatibility]
signal_level: medium
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

AGENTS.md is an emerging open format and community standard for structuring project metadata and instructions specifically for AI coding agents. Stewarded by the Agentic AI Foundation under the Linux Foundation, it functions as agent-focused counterpart to README.md—a predictable, dedicated location for build steps, test commands, code conventions, and project-specific context that helps coding agents work effectively on a codebase.

The format is already adopted across 60k+ open-source projects and supported by a broad ecosystem of agent tools: OpenAI Codex, Google's Jules, Cursor, Factory, Aider, Cognition's Devin, GitHub Copilot, and others. It emerged from collaborative efforts across OpenAI, Amp, Cursor, Jules, and Factory.

## Key mechanics

**Separation of concerns**: README.md is human-focused (quick starts, contribution guidelines); AGENTS.md is agent-focused (detailed build steps, test execution, conventions). This avoids cluttering READMEs with verbose agent guidance.

**No required schema**: AGENTS.md is plain Markdown with optional sections. Common sections include:
- Setup/dev environment commands
- Code style and conventions  
- Testing instructions
- PR/commit guidelines
- Security considerations
- Deployment steps

**Hierarchy in monorepos**: Projects can place nested AGENTS.md files at package/subproject roots. Agents automatically read the nearest file in the directory tree; explicit chat prompts from users override all instructions. OpenAI's main repo reportedly has 88 AGENTS.md files.

**Agent-readable execution**: Agents parse test commands from AGENTS.md and attempt to execute and fix failures before finalizing tasks.

## Rationale and positioning

The design intentionally chose a familiar, community-adoptable name and format (standard Markdown) over a proprietary spec. The framing is practical: agent onboarding and context provision require different, more detailed information than human contributor onboarding. Keeping them separate clarifies intent and prevents documentation sprawl.

## Takeaways

- Standardized, human-readable format for agent-project contracts emerging from real multi-agent ecosystem demand
- Backward-compatible with existing docs; can be adopted incrementally or used alongside other agent-guidance systems
- Supports configuration in agent-specific tooling (.aider.conf.yml, .gemini/settings.json)
- Respects hierarchy and user intent; no automatic execution without explicit instruction
- Likely to become default expectation for agentic-compatible repos as adoption grows

## Open questions

- How will conflict resolution scale as agents grow more autonomous—e.g., when nearest AGENTS.md gives contradictory guidance vs. user intent vs. multi-agent coordination?
- What governance process will manage the schema as agent capabilities expand (e.g., deployment automation, security scanning, cost guardrails)?
- How effectively do different agent tools actually parse and use AGENTS.md instructions today, vs. fallback behavior?
