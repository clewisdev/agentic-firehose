---
title: "We doubled engineering productivity at eBay, but couldn't change culture"
url: https://leaddev.com/culture/we-doubled-engineering-productivity-at-ebay-but-couldnt-change-culture
authors: [Randy Shoup]
captured: 2026-06-17
source_type: talk
topics: [agentic-workflows, enterprise-deployment, team-dynamics, engineering-judgment]
tags: [devops, dora-metrics, organizational-transformation, culture-change, eBay, velocity]
signal_level: medium
status: raw
confidence: medium
freshness_until: evergreen
---

## Summary

Randy Shoup, SVP Engineering at Thrive Market and former Chief Architect and VP of Platform Engineering at eBay (2020–2022), presents a case study on organizational transformation paradox: eBay's company-wide Velocity initiative successfully doubled engineering productivity across all 5,000 engineers and improved all DORA software delivery metrics, yet the organization failed to translate these micro-level gains into macro-level business impact or cultural change.

Shoup spent 8 years at eBay across two tenures (2004–2011 and 2020–2022), providing insider perspective on a 20-year organizational arc from hyperscaler pioneer to steady decline. The Velocity initiative executed a "standard DevOps playbook" with measurable success: teams improved collaboration, developer satisfaction increased, and metrics across deployment frequency, lead time, change failure rate, and MTTR all moved in the right direction.

Yet improvements stagnated, teams struggled to reach Elite status on DORA benchmarks, and the overall business trajectory remained unchanged. Shoup frames this contradiction as a gap between execution excellence and organizational capacity to act on technical capability.

## Key structural failures identified

**Strategy and Planning**
- Learned helplessness embedded in planning cycles
- Innovator's Dilemma: incumbent inertia preventing substantive market moves
- Centralized waterfall planning creating bottlenecks despite distributed execution capability

**Execution and Delivery**
- Massive Coordinated Releases: coordination overhead that negates velocity gains
- Feature Factory dynamics: output measured by feature count rather than business impact

**Organizational Culture** (Westrum pathological model)
- Zero-sum thinking blocking cross-team collaboration despite technical tooling improvements
- Empire building: resource and credit hoarding
- Risk aversion: structural inability to experiment or fail fast
- Failure denial: pathological inability to acknowledge or learn from mistakes

## Takeaways

- Technical transformation (DevOps, metrics, tooling) is necessary but insufficient; organizational culture acts as a ceiling on velocity gains
- DORA metrics may be gamed or plateau without corresponding changes to incentive structures and psychological safety
- Centralized planning and waterfall release coordination can persist even after distributed execution tooling is in place
- 20 years of organizational erosion (1990s hyperscaler → 2010s+ decline) suggests that cultural debt accumulates faster than technical debt paydown can overcome it
- Leadership alignment on "why" (strategy) matters more than engineering excellence on "how" when organizations face mature-market constraints

## Open questions

- How does Shoup define the inflection point where culture becomes a hard ceiling vs. a friction factor?
- What specific incentive or organizational structure changes were attempted or considered?
- Are there examples of teams within eBay that broke the pathological pattern? What enabled them?
- How portable are these lessons to organizations smaller than 5,000 engineers?
