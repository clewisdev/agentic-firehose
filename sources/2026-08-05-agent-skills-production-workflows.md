---
title: "Agent Skills: Production-Grade Engineering Workflows"
url: "https://www.linkedin.com/posts/addyosmani_ai-programming-softwareengineering-share-7490261590789914626-pENf/"
authors: [Addy Osmani]
captured: 2026-08-05
source_type: post
topics: [agent-architecture, agentic-workflows, engineering-judgment, system-design]
tags: [loop-engineering, agent-skills, verification, maker-checker, back-pressure, spec-first, test-driven]
signal_level: high
status: raw
confidence: high
freshness_until: 2027-Q1
---

## Summary

Addy Osmani announces agent-skills, an open-source framework for embedding production-grade engineering discipline into AI coding agents. The core insight: most teams don't need full autonomy; they need agents that internalize real SDLC practices (spec-first, test-driven, code review before merge) without re-explaining them each session.

The framework packages four reusable agent personas (code reviewer, test engineer, security auditor, performance auditor) as versioned, composition-safe skills that agents load on demand. Rather than hoping an agent remembers your team's standards mid-conversation, the practice gets encoded into workflows that integrate with any stack (Python, Go, Rust, Node).

**Key design patterns:**
- **Inner loop vs. outer loop separation**: agent investigates/implements/verifies; humans set constraints and own final verdict
- **Back pressure / graduated autonomy**: start interactive, climb to supervised, then unattended only as verification evidence earns it
- **Maker/checker split**: the agent writing code doesn't grade it; separate personas reduce bias and catch cross-skill regressions

**Recent releases include:**
- Three-tier eval framework running in CI (not "on vibes") that verifies skills trigger correctly, stay distinct, and change agent behavior as promised
- Ecosystem-neutral skill descriptions that call the repo's own test/build/audit commands instead of assuming npm
- Native support across Claude Code, Codex, Cursor, Copilot, and Gemini

## Verbatim quotes

> "Most folks are working with AI coding agents the hands-on way: a small number of agents, a fairly normal SDLC, you reviewing as you go. You don't need to be running fully autonomous loops to hit the same wall, which is that getting an agent to follow real engineering discipline (spec first, test-driven, review before merge, ship safely) means re-explaining it every single session."

> "Stop re-explaining the same engineering discipline every session. Star it, try it, tell us what's missing."

> "The competitive advantage won't come from having a smarter agent—it will come from encoding your engineering standards so every agent behaves like an experienced member of your team." (Dmitrii Lobanov, commenter)

> "Discipline that only lives in the prompt starts to fade as the session gets longer, and it fails quietly. The agent writes the code first, adds tests after, and still calls it TDD. So moving the process into versioned files that can be reviewed feels like the right direction." (Muhammad Aqib, commenter)

## Takeaways

- **Process as code, not conversation**: engineering discipline decays in unversioned prompts; encode it in reviewable, composable workflows that persist across sessions
- **Back pressure is directional**: teams easily grant autonomy but rarely revoke it; demotion triggers (model changes, near-misses, new codebases) need explicit definition alongside promotion evidence
- **Verification cost is non-linear**: a task-level check that scales cheaply may break at batch scale; honest back pressure caps batch size rather than trusting the ladder
- **Checker needs independent truth**: maker/checker split only prevents bias if the reviewing agent re-derives state from the repo itself, not just a report from the implementation agent
- **Cross-skill composition breaks silently**: a performance optimizer can remove a security check while both pass their own evals; regressions live at the seams and need CI coverage

## Open questions

- How are demotion triggers (degraded verification cost, near-miss on a skill, model version bump) monitored and surfaced in practice? Is there a ratchet, or does autonomy creep?
- When checker personas verify work, can they re-derive full repo state (test suite, build logs, security scans) or do they work from the maker agent's summary? Cost/latency tradeoff?
- For polyglot monorepos, how does the framework handle skills that need different invocation across language boundaries—e.g. test command in Python vs. Node?
- How do stale skills get invalidated? The post notes skills go stale like docs but get executed (unlike ignored docs)—what's the ownership model and invalidation signal?
