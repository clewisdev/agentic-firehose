---
title: "Adoption and Impact of Command-Line AI Coding Agents: A Study of Microsoft's Early 2026 Rollout of Claude Code and GitHub Copilot CLI"
url: https://arxiv.org/abs/2607.01418v1
authors: [Emerson Murphy-Hill, Jenna Butler, Alexandra Savelieva]
captured: 2026-07-20
source_type: paper
topics: [enterprise-deployment, ai-productivity, agent-orchestration]
tags: [claude-code, github-copilot-cli, adoption-metrics, retention, merged-pull-requests, social-networks, token-spend]
signal_level: high
status: raw
confidence: high
freshness_until: 2026-Q4
---

## Summary

This peer-reviewed empirical study from Microsoft researchers examines the real-world adoption and impact of command-line agentic tools during an organizational rollout in early 2026. The work addresses a critical gap for enterprises deploying tools like Anthropic's Claude Code and GitHub's Copilot CLI: *who adopts them, who retains them, and do they move the needle on output?*

The researchers tracked tens of thousands of engineers at Microsoft over a four-month window. Key findings:

**Adoption and spread**: First use spread primarily through social networks rather than top-down mandate or demographic targeting. This suggests peer visibility and word-of-mouth are stronger drivers than organizational push.

**Retention patterns**: Retention correlated more strongly with engineers' existing coding activity than with demographic factors. Active coders were more likely to stick with the tools, suggesting they're not a novelty for high-velocity developers.

**Output lift**: Adopters merged approximately 24% more pull requests than they would have otherwise, with this lift persisting across the entire four-month observation window. The authors acknowledge merged PRs as an imperfect proxy for value delivery but frame it as the best available organizational metric for impact.

**Cost implications**: The abstract frames token spend as a material concern (millions annually at scale), making adoption and retention analysis critical to cost-justification.

## Key Quotes

"Organizations rolling out agentic command line tools... need to know who will try them, who will keep using them, and whether the tools produce enough output to justify their cost."

"...the lift persists across our four-month window. These results suggest that CLI coding agents are neither uniformly adopted nor mere novelty effects..."

"...organizations should treat visible peer use as central to rollout strategy."

## Takeaways

- **Social networks drive adoption more than policy**: CLI agent rollouts benefit from peer visibility; consider seeding champions and making usage visible.
- **Retention is activity-dependent, not demographic**: High-coding-velocity engineers adopt and stick; low-activity engineers may churn quickly. Tailor enablement to activity profiles.
- **Measurable output lift persists**: A 24% increase in merged PRs suggests material productivity gains, not placeholder adoption.
- **Token spend at scale is non-trivial**: Organizations need instrumentation to track adoption, retention, and cost-per-merged-PR to justify rollout budgets.
- **Four-month window shows sustained effect**: The lift is not a first-week honeymoon; it holds through the observation period, suggesting real workflow integration.

## Open Questions

- How does the 24% PR lift vary by task type (e.g., refactor vs. new feature vs. bugfix)?
- Does peer influence create clustering effects (e.g., team-level adoption vs. cross-team diffusion)?
- What is the cost-per-merged-PR for CLI agents vs. baseline engineering velocity?
- Do retention and output lift diverge after six months? (The study is limited to four months.)
- How does code quality of agent-assisted PRs compare to non-assisted baseline?
