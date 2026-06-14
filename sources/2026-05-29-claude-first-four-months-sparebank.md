---
title: "After four months of Claude-first we decided to code more by hand"
url: https://www.linkedin.com/posts/asgaut-mjolne_after-four-months-of-claude-first-we-decided-ugcPost-7466023945259921408-Zkwi/
authors: ["Asgaut Mjølne Söderbom"]
captured: 2026-05-29
source_type: post
topics: [harnesses]
tags: [adoption, legacy-code, brownfield, workflow, practitioner-experience]
status: summarized
confidence: medium
freshness_until: 2027-Q1
---

<!-- LOW-SIGNAL FLAG: short LinkedIn post, anecdotal, no methodology, no specifics on tooling or workflow. Medium-signal at best due to named org, concrete constraints, and author's own disclaimer. Captured at brief register. -->

## Summary

Asgaut Mjølne Söderbom, a developer at SpareBank 1 Utvikling (Norway's largest banking alliance, ~1.2M customers, 100M+ API requests/day), reports that after four months of "Claude-first" development their team pulled back toward manual coding. The post was shared as a talk summary from Smidig 2026.

The stated losses from Claude-first: critical thinking, fast feedback loops, and joy of working. The conclusion reached: use Claude selectively, not as a brute-force workflow replacement.

The author explicitly notes that the constraint is **organisational and systemic readiness**, not AI capability:
- Legacy codebase not ready for high-velocity AI-assisted shipping
- Banks (as regulated stakeholders) not ready
- Partner teams and third-party systems not ready

They contrast their experience with Henrik Kniberg's (unnamed) team, which reportedly delivered at high pace and quality with agents as agile team members — but note that setup worked in a different context.

Core position: value comes from solving the right problems, fast learning through feedback, and maintainable software — AI doesn't change that equation, it just adds a tool that can be misused.

## Takeaways

- **Brownfield / regulated environments impose a ceiling on AI-assisted velocity that capability alone cannot lift.** Stakeholder readiness, legacy debt, and compliance surface area are the real bottlenecks.
- **"Claude-first" as a blanket policy is different from selective use.** The team's mistake was apparently the former; their fix was reverting to the latter.
- **Feedback-loop quality matters more than output speed.** The scientific engineering model (Farley's) relies on fast, human-legible signals — AI that outpaces your ability to verify creates hidden risk.
- **Context dependency is high.** Kniberg's team succeeded; this team didn't — same tools, different environments. Practitioner reports without context transfer poorly.

## Open questions

- No detail on *what specifically* went wrong — which tasks, which failure modes, which feedback loops broke. The post is assertional, not diagnostic.
- The comparison to Kniberg's approach is asserted but not examined — what structural differences explain the divergence?
- Alan Klement's comment in the thread makes a reasonable counter-point ("you gave up critical thinking *to* an AI; that's misuse, not an AI problem") — the post doesn't engage with that distinction.
- Author notes this reflects their team *right now* and expects it to change. This is an early-adoption friction report, not a stable conclusion.
