---
title: "Context & Harness Engineering - The Transition to Agentic Software Delivery"
url: https://plandek.com/blog/the-transition-to-agentic-software-delivery
authors: [Charlie Ponsonby]
captured: 2026-06-14
source_type: blog
topics: [enterprise-deployment, harnesses, context-engineering, evals, code-generation]
tags: [harness-engineering, context-engineering, ai-sdlc, compliance, risk-management]
signal_level: medium
status: summarized
confidence: medium
freshness_until: 2027-Q2
---

## Summary

A Board-level primer from Plandek's CEO on the infrastructure requirements for safely scaling AI-assisted code generation. The piece introduces two complementary disciplines: **Context Engineering** (curating organizational knowledge—architecture, standards, conventions—fed into agent working memory) and **Harness Engineering** (building evaluation infrastructure to catch regressions, enforce standards, and block code reaching production without review).

The argument is that most organizations pursuing AI-driven productivity are capturing only a fraction of potential gains while incurring compliance and security debt. Unharnessed AI tool use violates emerging regulatory frameworks (EU AI Act, ISO 42001, FCA, SEC) and creates invisible accumulation of technical debt and security vulnerabilities. Organizations that establish these disciplines early develop a structural competitive advantage: richer context → higher-quality output → continuous feedback loops that improve both context and evaluation infrastructure.

The piece frames Context Engineering as "the briefing you give a highly capable new employee" and Harness Engineering as "the quality assurance, compliance review, and performance management system that ensures their output meets your standards."

Five concrete risks are enumerated for Board consideration:
- **Security & compliance**: Ungoverned agent output accumulates vulnerabilities at machine speed
- **Quality & reliability**: Silent degradation without regression detection; problems surface as customer incidents
- **Competitive position**: Without proprietary context, agents behave like generic models
- **Technical debt**: AI adoption without governance accelerates (not slows) debt accumulation
- **Institutional knowledge**: Tacit knowledge erodes as agents take over, unless explicitly captured first

The post closes with six questions for CTOs (baseline measurement, context curation, governance gates, instrumentation, proprietary advantage strategy, accountability ownership) and argues that Developer Productivity Insight (DPI) platforms are the data backbone enabling both disciplines.

## Key Quotes

> "The AI can only act on what it knows. Context engineering ensures it knows the right things."

> "Without Context Engineering, AI agents operate on incomplete or generic information, producing code that may ignore your architecture, violate your security patterns, or contradict decisions your teams previously. Without Harness Engineering, that output enters your codebase without systematic review — accumulating risk invisibly."

> "You cannot govern what you cannot measure. If there is no baseline, there is no visibility."

> "Tooling access is not a moat. Proprietary context and evaluation infrastructure is."

> "Human review does not scale with AI generation rates. Systematic governance is essential."

## Takeaways

- **Two-phase dependency**: Context Engineering (input quality) and Harness Engineering (output quality) are orthogonal but mutually reinforcing. Neither emerges without explicit design.
- **Governance as competitive moat**: Regulatory compliance is table stakes; proprietary context + evaluation infrastructure is where structural advantage accumulates.
- **Invisible risk accumulation**: Without instrumentation and baselines, security debt and technical debt from AI-generated code surface as production incidents rather than being caught by engineering teams.
- **Board-level accountability gap**: Diffuse ownership of AI governance across teams creates accountability vacuums at scale; clear ownership and decision rights are prerequisite to safety.
- **Data-driven disciplines**: Both Context and Harness Engineering require continuous signal from code repositories, CI/CD, PRs, and agents themselves—DPI platforms are the enabling infrastructure.

## Open Questions

- How do organizations systematically identify *which* architectural decisions, security patterns, and domain rules should be encoded into agent context? (Risk of over-encoding may also constrain agent creativity.)
- What does a mature evaluation harness actually look like operationally—is this primarily automated test expansion, or does it require new tooling?
- How do you measure the quality/freshness of agent context over time? What are leading indicators that context is drifting from actual system state?
- Are there failure modes or organizational structures where Harness Engineering creates process friction that negates productivity gains?
- How does this framework scale to multi-agent coordination, where agents are writing code that depends on agents' code?
