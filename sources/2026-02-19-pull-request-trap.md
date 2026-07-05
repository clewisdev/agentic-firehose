---
title: "The Pull Request Trap"
url: https://cladam.github.io/2026/02/19/the-pull-request-trap/
authors: [Claes Adamsson]
captured: 2026-07-05
source_type: blog
topics: [team-dynamics, agentic-workflows, system-design]
tags: [pr-review, continuous-integration, throughput, trunk-based-development, dora]
signal_level: medium
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

Claes Adamsson argues that pull request workflows, despite being introduced to improve quality, have become a constraint on software delivery throughput. The post frames PR gatekeeping as introducing hidden costs—wait time, context switching, batch bloat, and false safety—that directly contradict high-performance delivery cultures. Rather than viewing PRs as a quality mechanism, Adamsson cites DORA research showing that lightweight, fast feedback and rapid integration correlate with both speed and stability, while heavy approval processes do not improve deployment safety.

The piece proposes an alternative workflow centred on pair/mob programming and non-blocking reviews, where code integrates immediately and review happens in parallel with CI verification. The core claim: throughput and safety are not at odds; they are aligned when quality control shifts from pre-integration gatekeeping to fast feedback and shared responsibility for trunk health.

## Key Quotes

> "For many developers, the time spent waiting for reviews exceeds the time spent writing the change."

> "A developer's hour costs far more than a CI runner's hour. Pausing flow to save compute is almost always the wrong trade-off."

> "DORA research consistently shows the opposite. High-performing teams favour lightweight, fast feedback and rapid integration. Heavy approval processes correlate with longer lead times and lower deployment frequency, without improvements in stability."

> "Quality comes from fast feedback and rapid correction, not from waiting."

> "Removing the PR trap does not remove quality control. It shifts quality into the daily work: small changes, fast feedback, and shared responsibility for the trunk."

## Takeaways

- **Cost of gatekeeping**: PR workflows introduce measurable friction (queue time, context switching, batch growth) that slows integration without corresponding quality gains.
- **DORA alignment**: The argument is grounded in empirical research showing high-performing teams use lightweight review and rapid integration, contradicting the assumption that more approval steps improve safety.
- **Economic reasoning**: Framing developer wait time as far costlier than compute time makes the efficiency argument concrete and shifts the optimisation target.
- **Workflow alternative**: Pairing/mobbing + non-blocking reviews + atomic commits positions continuous integration as the default mode, with review as a parallel activity, not a serial gate.
- **Throughput as safety**: Reframes safety as a function of feedback speed and correction capacity, not approval ceremony—directly relevant to engineering velocity in agentic and continuous-deployment contexts.

## Open Questions

- How does non-blocking review scale in distributed teams with async-first cultures? The piece assumes real-time pairing is viable.
- What does "fix forward" mean in practice when a live commit introduces a production issue? (Rollback? Hotfix?)
- How do non-blocking reviews interact with compliance/audit requirements in regulated environments?
- Does the absence of a formal approval gate create liability or governance gaps for certain orgs?
