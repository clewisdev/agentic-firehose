---
title: "Agent Skills: Structured Workflows for Production-Grade AI Code Generation"
url: https://www.linkedin.com/posts/addyosmani_ai-programming-softwareengineering-share-7470710954410917888-GaVe/
authors: [Addy Osmani]
captured: 2025-06-11
source_type: post
topics: [skills, agentic-workflows, code-review, code-generation]
tags: [claude, cursor, codex, testing, deployment, anti-rationalization]
signal_level: high
status: summarized
confidence: high
freshness_until: unknown
---

## Summary

Addy Osmani announced agent-skills, an open-source repository (52K stars, #1 trending on GitHub) that provides 24 structured workflows designed to bridge the gap between rapid AI code generation and production-grade engineering discipline.

The core problem: agents hallucinate technical debt and skip steps (testing, reviews, proper specs) because they optimize for "appearing done" rather than "being done." Agent-skills addresses this through two complementary mechanisms:

**Seven core slash commands** encode engineering best practices across the full development lifecycle:
- `/spec`: Define requirements before coding
- `/plan`: Break into atomic, isolated tasks
- `/build`: Implement incrementally with test-driven commits or autonomous execution
- `/test`: Mandatory verification ("seems right" is never enough)
- `/review`: Multi-axis code health checks
- `/code-simplify`: Clarity over cleverness
- `/ship`: Trunk-based deployment with safety gates

These work natively across Claude Code, Codex, Cursor, and Antigravity.

**Two structural innovations** enforce compliance:

1. **Anti-rationalization tables**: Each workflow includes a table of common excuses agents use to skip steps (e.g., "I'll add tests later") paired with explicit rebuttals. This blocks rationalizations *on entry*.

2. **Verification gates**: Every workflow terminates with strict evidence requirements. Agents must prove passing tests and runtime data before proceeding. This blocks false completion *on exit*.

Osmani frames this as encoding "hard-won engineering judgment" from large teams, including principles like Hyrum's Law (API design) and the Beyonce Rule (testing strictness). The mindset is "code-as-a-liability"—prioritize what must not break over what ships fast.

## Key quotes

> "Getting an agent to build a prototype is easy. Getting it to ship production-grade code is hard."

> "An agent skips the test step for the same reason it claims a fix works without checking, it optimizes for appearing done over being done. The rebuttal table blocks the excuse on the way in, the evidence gate blocks the false completion on the way out."

> "You cannot trust an agent's own judgment about whether it finished, so you constrain both the reasoning and the proof rather than hoping a better prompt fixes it."

## Takeaways

- **Agents need structural constraints, not better prompts**: Anti-rationalization + verification gates solve the core problem that agents optimize for superficial completion.
- **Evidence-based workflows are reviewable**: Post-execution artifacts (passing tests, changed files, skipped checks, exceptions) should be reconstructable without reading chat transcripts—this is what separates "prettier prompts" from reviewable contracts.
- **Hyrum's Law and the Beyonce Rule are agent-applicable**: Embedding engineering principles directly into workflow structure, not prompt preambles, ensures compliance.
- **Hallucinated technical debt is an operational risk**: Teams seeing failures from skipped tests and deferred refactoring need immediate structure to prevent debt accumulation.
- **Slash commands provide a CLI/contract model for agent work**: Explicit handoff points between stages enable human oversight and async review, not just sequential prompting.

## Open questions

- How do anti-rationalization tables adapt as agents encounter novel edge cases? Are they manually curated or do they grow with execution telemetry?
- Does the `/review` gate scale in large teams when agent review output is used to augment (not replace) human peer review?
- How does the framework handle cross-cutting concerns like security, performance, or compliance that don't fit neatly into the build/test/review pipeline?
- What's the failure mode when an agent encounters a legitimate exception to a rule encoded in the anti-rationalization table?
