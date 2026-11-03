---
title: "Revolut Moves 2,000 Engineers to Self-Hosted GLM"
url: https://www.linkedin.com/posts/guillermoflor_breaking-revolut-moved-2000-engineers-share-7523144822719803392-C1xT
authors: [Guillermo Flor]
captured: 2026-11-03
source_type: post
topics: [cost-management, enterprise-deployment, ai-productivity]
tags: [glm, self-hosting, b200, revolut, token-economics]
signal_level: low
status: raw
confidence: low
freshness_until: 2027-Q1
---

> **Low-Signal Flag**: Secondhand social post (tech influencer relaying unverified claims attributed to Revolut AI Ops lead David Abitbol via a third party). Contains unverified performance metrics ("lead time improved 70%") and engagement-farming formatting, though the underlying operational thesis is notable.

### Summary

Guillermo Flor reports secondhand that fintech Revolut transitioned approximately 2,000 software engineers from proprietary frontier coding tools (Claude Code, OpenAI Codex) to an in-house deployment of an open-weight GLM model running on 56 Nvidia B200 GPUs. Closed frontier APIs were reportedly shifted to an exception-only list.

The claimed economic metric is a blended rate of $0.30 per million tokens (stated as ~10x cheaper than hosted commercial frontier endpoints). The author claims engineering lead time improved by 70%, attributing this jump primarily to behavioral change rather than raw model capability: removing token budgets and rationing led engineers to integrate LLM assistance into everyday tasks rather than saving queries for complex issues.

### Key Takeaways

- **Token rationing distorts developer behavior**: When commercial token costs lead management to impose quotas, engineers hoard tokens for high-complexity problems. Removing friction encourages pervasive adoption across lower-stakes, routine workflows.
- **Open-weight economics at scale**: For large organizations (~2,000+ developers), dedicated hardware (56 B200s) serving open-weight models may radically undercut commercial frontier API unit economics if utilization remains high.
- **Secondary source caveats**: Metric claims (70% lead time reduction, precise blended hardware amortization) lack methodology, utilization window details, and independent verification. Direct reporting from Revolut's AI engineering team is needed to confirm implementation reality.
