---
title: "Agentic AI Is the Next Big Step in Generative AI (Software Architecture Summit Berlin Keynote)"
url: https://www.entropy-data.com/learn/agentic-ai-keynote-berlin-2026
authors: [Dr. Simon Harrer]
captured: 2026-11-01
source_type: talk
topics: [agentic-workflows, code-review, skills, agent-architecture]
tags: [claude-code, mcp, loop-architecture, feedback-loops, playwright-mcp, dash0-mcp, metr]
signal_level: high
status: raw
confidence: high
freshness_until: 2027-Q4
---

# Agentic AI Is the Next Big Step in Generative AI

## Summary

In this keynote delivered at the Software Architecture Summit in Berlin (October 2026), Dr. Simon Harrer (Co-Founder and CEO of Entropy Data, co-author of *Java by Comparison*) traces his evolution from hands-on software engineer to delegating virtually all development, operational, and administrative work to autonomous coding agents over an eleven-month period following Anthropic's Claude Opus 4.5 release.

Harrer frames the inflection point around task-duration thresholds tracked by benchmarks like METR: where early 2025 agent tooling handled short, discrete script-generation tasks, frontier models (Opus 4.5 and 4.6) reliably sustain autonomously executed tasks spanning 5 to 12 human-equivalent hours. This scaling shifts the practitioner bottleneck from prompting to designing the operational loops in which agents execute.

The core architectural arguments center on four key paradigm shifts:

1. **Feedback Loops as the Agent Engine**: An agent's autonomy is strictly bounded by the density and quality of its automated feedback mechanisms. Beyond standard compilers and unit test suites, effective setups integrate architectural guardrails, automated security linters, and runtime integration hooks (e.g., UI verification via Playwright MCP, infrastructure management via Terraform, performance profiling via Dash0 MCP). These loops allow the agent to iterate, catch regressions, and self-correct without human triage.
2. **Skills over Extended Prompts**: Harrer advocates moving execution guidelines, enterprise conventions, and specialized workflow instructions out of system prompts and into versioned, modular "skills". Keeping prompts minimal and delegating operational logic to modular skills reduces prompt bloat and improves adherence.
3. **Report-Driven Review vs. Line-by-Line Code Review**: As autonomous agent output expands exponentially, traditional pull request code diff reviews become cognitive bottlenecks. Harrer argues developers must transition to reviewing agent-generated synthesized reports (visual diffs, before-and-after tables, test coverage reports, architecture impact diagrams) rather than raw syntax.
4. **Loop Architecture and Human-on-the-Loop**: Harrer introduces "loop architecture"—mapping system edges, triggers, and automated agent entry points. Teams should begin with read-only gap analyses that report findings to a human-in-the-loop, iteratively moving to fully automated human-on-the-loop triggers as confidence in autonomous verification builds.

## Verbatim Quotes

> "Eleven months after Opus 4.5, I do everything with agents, and I no longer write code myself. In this evening keynote, I show what changed in how we build software: feedback loops that let agents review their own work, skills that encode our guidelines, reports that replace code reviews, and agents that are started automatically."

> "What came next: you were programming, and Claude kept asking: are you sure you want to run this command on your machine? Please confirm. And an approve fatigue set in. I just pressed Enter, or said 'yes, and don't ask again', but it did not remember. At some point I switched to YOLO mode, and today I use auto mode."

> "Review the report, not the code. Agents generate too much for line-by-line pull request reviews. Have them produce reports optimized for humans, such as before/after tables, screenshots and architecture diagrams, so you can decide quickly whether a change is good."

> "Encode how tasks are done as shared skills, so the prompt stays tiny and the logic lives in the skill."

## Key Takeaways

- **Approval Fatigue Drives Automation**: Interactive confirmation dialogs degrade developer velocity. Practitioner workflows inevitably shift from manual approval to YOLO/auto modes, necessitating defensive feedback loops (compilers, sandbox tests, MCP inspection tools) rather than human micro-oversight.
- **PR Diffs Are Obsolete at Scale**: High-velocity agentic generation requires shifting code review toward high-level impact reports (before/after metrics, architecture diagrams, Playwright screenshots) rather than syntax inspection.
- **Modular Skills Replace Prompt Bloat**: Standard operating procedures, architecture guidelines, and deployment protocols should be formalized into reusable skills that the agent invokes dynamically, keeping top-level prompts minimal.
- **Automate Edges via Loop Architecture**: Mature implementations map boundaries between systems, wiring triggers so agents kick off automatically upon events (e.g., gap analysis, infrastructure alert triage) rather than waiting for ad-hoc human prompting.

## Open Questions

- How do engineering teams audit subtle semantic or security bugs when human review moves entirely from line-by-line diff inspection to high-level synthetic reports?
- What standardized formats or schema conventions work best for agent-generated impact reports to prevent hallucinated compliance metrics?
- How should teams systematically version, test, and deprecate shared agent skills across distributed enterprise repositories?