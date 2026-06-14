---
title: "Packaging GitHub Copilot Agents and Skills with Agent Package Manager"
url: http://thomasthornton.cloud/packaging-github-copilot-agents-and-skills-with-agent-package-manager/
authors: [Thomas Thornton]
captured: 2026-06-13
source_type: blog
topics: [tool-use, harnesses, system-design]
tags: [github-copilot, apm, agents, skills, mcp, versioning]
signal_level: high
status: raw
confidence: high
freshness_until: 2026-Q3
---

## Summary

Thomas Thornton describes the real-world friction of distributing GitHub Copilot agents and skills across multiple repositories, and how Agent Package Manager (APM) solves the operational problem of keeping shared tooling synchronized and versioned.

The core problem is concrete: early-stage Copilot adoption works fine in a single repo ("just copy these files into `.github/agents` and `.github/skills`"), but breaks down at scale. Multiple repos diverge on versions, local tweaks accumulate, and nobody remembers which version is authoritative.

APM reframes this as a **packaging and distribution problem**, not a Copilot problem. The key design decision: keep agents and skills in `.github/` as the single source of truth, and let packages *reference* subsets of that content rather than duplicating it. This avoids the sync problems that come from maintaining the same skill in multiple places.

Tornton's structure uses a thin root package with three scenario packages:
- `architect` — for architecture reviews
- `terraform` — for provider upgrades  
- `diagramming` — for diagram generation via Draw.io and Excalidraw MCPs

Each scenario installs focused context without dragging in unrelated tooling. The install model is clear:
```
apm install thomast1906/github-copilot-agent-skills/packages/diagramming --runtime vscode
```

The diagramming example is concrete: value isn't "AI can draw diagrams," but "engineers can turn architecture thinking into reproducible diagrams inside the workflow instead of producing stale artifacts."

APM output shows validation and installation happening—not just file copying—which signals that packaging is doing real work (resolving dependencies, managing versions).

## Key quotes

> "This is not really a GitHub Copilot problem. It is a packaging and distribution problem."

> "The thin-package model avoids that. You build and test against the same .github content that eventually gets distributed. There is no second copy to maintain, no packaging mirror to keep aligned."

> "Too much context is not neutral. It makes the setup feel less focused, and over time it increases the likelihood that people either ignore parts of it or start editing it locally."

> "A package boundary is not just a technical convenience. It is a way of deciding what should travel together and what should not."

## Takeaways

- **Reframe the problem**: Copilot distribution is a packaging/versioning problem, not a tool problem. APM moves from "copy files manually" to "declare, install, version, compose."
- **Single source of truth in `.github/`**: Packages reference content, don't duplicate it. Avoids sync drift at platform scale.
- **Scenario packages over monolithic bundles**: Split shared context by workflow (architect, terraform, diagramming) so teams only pull what they use. Reduces local edits and cognitive load.
- **Package boundaries as design decisions**: Where you draw package lines signals what should travel together—a platform engineering judgment, not just a technical convenience.
- **MCP integration matters**: Diagramming example shows APM's value increases when MCPs are also packaged and versioned alongside agents/skills.

## Open questions

- How does APM handle version conflicts across nested scenario packages? (If two scenarios depend on different versions of a shared MCP.)
- What's the governance model for the root package—who merges changes to `.github/agents` and `.github/skills`?
- Does APM support semantic versioning and changelog management, or just git refs?
- How do teams test compatibility of scenario packages in isolation before a shared install?
