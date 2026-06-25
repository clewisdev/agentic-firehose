---
title: "AI-coding agents are now the default. What comes next?"
url: https://www.linkedin.com/posts/engineeringleadership-aiagents-softwareengineering-share-7475888184313323521-jHmC/
authors: [LeadDev]
captured: 2026-06-25
source_type: post
topics: [agentic-workflows, code-generation, team-dynamics, cost-management]
tags: [linear, claude, opus, pr-velocity, code-review, context-management]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2026-Q3
---

## Summary

LeadDev reports on Linear's shift to AI-coding agents as default practice after a one-week trial. The memo asked engineers to use Claude Code or Opencode (with Opus) for code generation instead of hand-writing; engineers did not revert. Results: PR velocity jumped 30% in month one, 33% in month two; the coding agent now generates >50% of mergeable PRs.

Broader signal: internal AI adoption has become engineering leadership's #1 priority (77% of leaders, up from 45% in 2025), overtaking feature development for the first time in LeadDev's three-year research. The framing shifts from "whether to adopt" to "what to do about the bottlenecks that follow."

Identified friction points:
- Code review at scale
- Context management
- Cost control
- Security
- Junior developer pipeline transformation

The post hints at a follow-up analysis on agent-first engineering and remedial patterns, though does not detail them in this post.

## Key quotes

> "I'm asking everyone to install either Claude Code or Opencode and start writing code with Opus instead of by hand. Use IDE to review the diffs but rely on the model. Build a feeling for it."

> "Their coding agent now generates over 50% of mergeable PRs, making it one of Linear's top contributors. This isn't a pilot program. It's the new default."

> "[I]nternal AI adoption has overtaken feature development as engineering's #1 priority, cited by 77% of leaders, up from 45% in 2025."

## Takeaways

- **Velocity gains are real and measurable**: 30–33% PR increase month-over-month after normalizing to agents; engineers did not revert after trial period, suggesting adoption sticks.
- **Adoption is now a leadership default, not a pilot**: The framing of "what to do next" rather than "whether to adopt" reflects genuine shift in survey cohort priority.
- **Bottlenecks are known but not yet solved**: Code review, context, cost, security, and workforce implications are named but the post does not detail solutions — suggests those are covered in linked LeadDev article.
- **Agents contributing meaningfully to output**: 50% mergeable PR rate suggests quality threshold is being met, not just volume gaming.
- **Downstream effects on organizational structure**: Junior pipeline transformation is flagged but underdeveloped; unclear whether this means reduction, reskilling, or redeployment.

## Open questions

- What metrics distinguish "mergeable" vs. rejected PRs from agents? (Quality bar, test coverage, security checks?)
- How does context management work at scale — are agents operating within per-PR context windows, or is there session/codebase memory?
- What is the cost per PR (tokens, API calls, compute) and how does it compare to hand-writing + review cycle?
- Are security reviews being automated, or do agents still require human security sign-off?
- What reskilling / mentorship burden do junior engineers face, and does the org have a plan?
