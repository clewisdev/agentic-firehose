---
title: "Save the vibes for Friday night. On Monday morning, write a spec (SDD)"
url: https://www.linkedin.com/posts/vipultaneja_if-youve-spent-the-last-few-months-chasing-ugcPost-7476520529366102018-wfoz/
authors: [Vipul Taneja]
captured: 2026-06-27
source_type: post
topics: [spec-driven-development, engineering-judgment, code-generation]
tags: [verification, intent, ai-assisted-development, sdd, code-review]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

Vipul Taneja frames a critical shift in AI-assisted software development: the bottleneck is no longer code generation speed, but the ability to verify and trust the output. He argues for **Verifiable Intent** — a spec-driven development (SDD) practice where requirements are written down and auditable before the model writes code, not after.

The core claim is that "vibe coding" (prompt-based development without formal specs) fails in production because reviewers cannot distinguish between "the code looks done" and "the code is actually done." The spec becomes the artifact against which to measure output, converting code review from guessing to a binary check: "does this match what we agreed?"

Comments from practitioners reinforce this:
- **Silver Hamster**: Reviews improved dramatically after writing specs first; edge cases the model skips become obvious during comparison.
- **Vishesh Prajapati**: Teams shipping features in 20 minutes that took 3 days to debug because no one could explain requirements.
- **Denis Kharchenko**: The spec must be executable (tests, gates, judges) or it becomes unenforced documentation. Highlights the discipline gap between spec-as-prose and spec-as-runnable-check.

## Key quotes

> "The bottleneck is our ability to verify and trust the output."

> "We're stripping away the hype and focusing on the only thing that actually ships production-grade software: Verifiable Intent."

> "With code the AI wrote, you can't always tell if it's actually wrong or if you just never said what 'right' was. Once we wrote the spec first, reviews became 'does this match what we agreed' instead of guessing."

> "The spec isn't bureaucracy, it's the artifact you check the output against — without it, 'looks done' and 'is done' are indistinguishable."

## Takeaways

- Code generation is no longer the bottleneck; verification and trust are. Specs enable reviewers to check intent, not guess.
- Spec-driven development (SDD) converts ambiguous "does this look right?" code review into objective "does this match the agreed spec?" checks.
- Specs must be executable (backed by tests or automated gates) to maintain discipline; prose-only specs are easily abandoned.
- The AI model is not the constraint — the organizational discipline around requirements and accountability is.
- In regulated/enterprise contexts, verifiable intent is a prerequisite for governance, auditability, and deployment confidence.

## Open questions

- How does verifiable intent scale to large multi-agent systems where specs may conflict or require dynamic adjustment?
- What tooling or process frameworks best enforce the spec-execution link without becoming bureaucratic overhead?
- How do teams handle evolution of specs when requirements change post-deployment?
- Can verifiable intent be automated as a gate (e.g., via test generation from specs)?
