---
title: "How to build software in 2026? An engineering manifesto for AI-generated code"
url: https://www.linkedin.com/posts/larsjankowfsky_this-one-is-for-the-nerds-i-need-help-johann-peter-ugcPost-7471051056454598656-ho9u/
authors: [Lars Jankowfsky]
captured: 2025-06-12
source_type: post
topics: [code-generation, quality-gates, human-review, agentic-software-engineering]
tags: [ai-code, review-gates, deterministic-gates, risk-stratification]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2026-Q3
---

## Summary

Lars Jankowfsky proposes a concrete engineering manifesto for AI-generated code in 2026, moving beyond future speculation to present-day practice. The core thesis: autonomous agents write code; deterministic gate suites and automated reviewers inspect every line; named humans verify and sign off on high-risk changes. The manifesto explicitly rejects "slop"—code that is correct and secure but reads as machine-generated, with generic names, over-defensive boilerplate, and obvious AI artifacts.

The proposal introduces a three-layer verification model:
1. Autonomous agent implementation against spec
2. Deterministic gate suite + automated reviewers (all lines)
3. Named human accountability on high-risk merges only

Jankowfsky frames this as an "engineering manifesto," not opinion, and invites direct criticism on five specific failure modes:
- Risk stratification gaming (high-risk changes misclassified as low-risk)
- Defect classes the gates will miss
- Legal/practical breakdowns in "machine verifies, human is accountable"
- Whether this model works only for "risky" MRs
- Whether AI-generated code can actually match hand-written code quality in 2026

Comments reveal real operational tension: one responder (Bjoern Simon Lange) questions whether humans can even review the volume of code agents produce—raising the "dark factory" pattern concern. Ingo Hagemann counters with a stress test: could the codebase survive without LLM access? If not, it relies too heavily on generated content and requires additional manual hardening. Brenn Hill confirms shipping AI-written software at scale is already happening.

## Key quotes

> "The actual engineering manifesto I want to ship every line of code against. The bet is simple and it makes a lot of devs uncomfortable: AI writes our code. Not in future. Now."

> "The part I care about most: no slop. Code can be correct, tested, secure, and still read like a machine narrated it. Generic names, docstrings on obvious constants, defensive boilerplate nobody asked for."

> "Where does 'the machine verifies, a human is accountable' break down legally or in practice?"

> "Could we realistically operate and further develop this software — while meeting our SLAs — if all access to LLMs were to disappear tomorrow? If the answer is 'no,' the code relies too heavily on machine-generated content." (Ingo Hagemann)

## Takeaways

- **Risk stratification is attackable**: The proposal hinges on correctly classifying changes as high/low-risk. Adversarial or negligent triage could allow high-risk changes to bypass human review. No mechanism described for calibrating risk levels.
- **Human scalability ceiling**: The manifesto doesn't address the volume problem—if agents can generate code 10x faster, can a team of humans review it at that velocity? One commenter explicitly raises this concern.
- **Code readability as a gate**: "No slop" is a concrete quality criterion beyond correctness, but it's subjective and expensive to enforce at scale. Requires a human reviewer whose sole job is aesthetic/stylistic detection.
- **LLM-dependency risk**: The stress test ("would this survive without LLMs?") surfaces a hidden liability—codebases that are unmaintainable by humans without continued AI support. This is acknowledged but not solved.
- **Accountability assignment is unresolved**: "Machine verifies, human is accountable" raises unanswered questions: What is the liability model? Does this differ by jurisdiction or industry? The manifesto brackets this as open.

## Open questions

- How are defect classes and risk categories defined for a given codebase? Is this hand-crafted per team or emergent?
- What is the SLA for human review of high-risk changes? If agents produce code faster than humans can review it, is the model broken?
- Can "no slop" be automated, or does it require subjective human judgment every time?
- How do you measure whether AI-generated code actually clears the bar of hand-written code in production? (Brenn Hill claims it does; no metrics provided.)
- What happens when an automated gate fails to catch a defect that later causes production harm? Who is liable?
