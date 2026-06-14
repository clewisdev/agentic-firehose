---
title: "AI Engineering Coach – VS Code Extension for AI Session Analysis"
url: https://github.com/microsoft/AI-Engineering-Coach
authors: [Microsoft]
captured: 2025-06-14
source_type: repo
topics: [tool-use, prompting, ai-productivity]
tags: [vscode, extension, session-analysis, anti-patterns, skill-discovery]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2025-Q4
---

## Summary

Microsoft's AI Engineering Coach is a VS Code extension that analyzes local AI coding assistant session logs and generates actionable insights without sending data off-machine. It provides practice scoring, anti-pattern detection, output measurement, and skill discovery across 45 rules spanning prompt quality, session hygiene, code review, tool mastery, and context management.

### Key capabilities:

**Observe** — Dashboard with practice scores, week-over-week trends, daily activity charts, and workspace stats. Timeline view shows Gantt-style session breakdown with overlap detection. Coding Moments gallery captures and filters screenshots from AI sessions.

**Measure** — Generated code volume by language and model. Monthly AI token budget burndown with projections. Activity heatmap and work-life balance signals.

**Improve** — Five practice score cards with severity ratings and concrete actions. 45 editable markdown-based detection rules with coverage heatmap. Interactive rule editor and playground for live-testing DSL rules against local data. Data explorer for ad-hoc filtering and distribution analysis. Skill Finder identifies repeated prompt patterns and suggests community skills from open-source catalog.

**Context Health** — Agentic readiness checklist, workspace context map, and AI-powered instruction-file review.

**Level Up** — Personalized quizzes and code-comparison rounds generated from actual usage. XP-based progression (Bronze → Silver → Gold → Diamond).

### Privacy and architecture:

Read-only access to session files. All parsing and analytics run locally; no proprietary telemetry. Optional AI features (rule compiler, skill catalog) can use external LLMs but remain optional. Extension can be installed via prebuilt VSIX, dev container, or local build.

## Verbatim quotes

> "Analyze your AI coding assistant usage — any harness, one dashboard."

> "Track progress -- practice scores, weekly trends, daily activity charts. Detect anti-patterns -- 45 rules across prompt quality, session hygiene, code review, tool mastery, and context management."

> "Read-only — the extension never modifies your session files. Local analysis — all parsing and analytics run entirely on your machine. No proprietary telemetry — the extension does not phone home or collect usage data."

## Takeaways

- **Concrete anti-pattern catalogue**: 45 editable rules across five dimensions (prompt quality, session hygiene, code review, tool mastery, context) provide a practical taxonomy for reflection on AI-assisted coding workflows.
- **Local-first design**: All analysis happens on-device, which is essential for session log analysis in regulated or privacy-sensitive contexts.
- **Skill extraction from usage**: The Skill Finder bridges individual practice and community knowledge by surfacing repeated patterns and linking to open-source skill catalogs.
- **Gamified reflection**: XP-based progression and quizzes layered on top of activity data create engagement for behavioral change, though effectiveness depends on rule quality and user uptake.
- **Rule authorship by practitioners**: The markdown-based, editable rule system with live playground suggests the intent to let teams customize detection logic for their own coding patterns.

## Open questions

- How does the DSL express multi-turn prompt patterns or compositional reasoning chains vs. one-off queries?
- What is the fidelity of "repeated prompt patterns" detection across paraphrases and semantic variants?
- How are the 45 baseline rules validated against real codebases, and are there published ablation studies on their precision/recall?
- Does the extension surface root causes (e.g., unclear requirements, poor context setup) or only surface-level anti-patterns?
- How do users integrate insights from the dashboard back into their coding practices—is there tooling for rule-to-refactoring workflows?
