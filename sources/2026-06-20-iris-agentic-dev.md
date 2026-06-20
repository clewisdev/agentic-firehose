---
title: "Supercharge Claude Code and GitHub Copilot with InterSystems IRIS Knowledge via MCP"
url: https://www.linkedin.com/posts/stefanwittmann_supercharge-claude-code-github-copilot-share-7473037106072920064-RorJ/
authors: [Stefan Wittmann, Thomas D.]
captured: 2026-06-20
source_type: post
topics: [tool-use, agent-architecture, code-generation]
tags: [mcp, claude-code, github-copilot, iris, objectscript, sql]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

Stefan Wittmann announces `iris-agentic-dev`, an MCP (Model Context Protocol) server that extends Claude Code, GitHub Copilot, and other AI coding assistants with deep InterSystems IRIS domain knowledge. The repo provides 20+ tools and 10+ specialized IRIS skills that integrate directly into coding workflows.

**Core capabilities added:**
- Live documentation lookup for IRIS APIs
- Codebase introspection and navigation
- Compilation, testing, and debugging automation
- SQL and ObjectScript expertise patterns
- Interoperability and production management
- Automated test generation and repair

Wittmann highlights the "skills" component as particularly valuable — concise instruction files that teach AI assistants IRIS-specific patterns, common mistakes, and best practices. These work independently of the MCP server and reportedly improve code quality immediately.

Setup is documented for both Copilot and Claude Code; the project is actively maintained and growing.

## Verbatim quotes

> "The skills part is what I find most valuable: concise instruction files that teach your AI assistant InterSystems IRIS-specific patterns and common mistakes. They work even without the MCP server, and they make a real difference in code quality right away."

> "20+ tools, 10+ specialized IRIS skills... The MCP server integrates directly into your coding workflow."

## Takeaways

- **MCP as domain knowledge layer**: Demonstrates practical use of MCP servers to inject specialized domain expertise (IRIS internals, patterns, error modes) into general-purpose AI coding assistants.
- **Skills as portable instruction**: Separating "skills" (instruction + rationale) from tools (MCP implementations) makes domain knowledge reusable even in contexts that don't support the MCP protocol.
- **Workflow integration**: Direct integration into Copilot and Claude Code indicates mature understanding of how to fit agentic coding tools into existing developer IDE habits.
- **Open-source momentum**: Framing as community contribution with active co-author (Thomas D.) suggests legitimacy and ongoing maintenance rather than one-off project.
- **Concrete tooling**: Mentions specific capabilities (test generation, production management, SQL/ObjectScript introspection) rather than generic "better coding".

## Open questions

- How do the "skills" (instruction files) differ from standard few-shot prompting or system prompts? What makes them more effective for IRIS-specific patterns?
- What is the failure mode when the MCP server is unavailable but skills are still used? Are there safety guardrails for hallucinated IRIS APIs?
- How does the toolset handle IRIS-specific runtime constraints (memory management, transaction scoping) that general code assistants might not be aware of?
- What is the performance / context-window trade-off when using 20+ tools in a single session?

## Signal notes

Medium signal: concrete implementation details (MCP server, tool count, specific capabilities), credible author position, working artifact, but limited quantitative validation. Post is not a case study with before/after metrics or failure analysis. No claim verification possible from post alone, though the linked repo can be evaluated separately.
