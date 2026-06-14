---
title: "Useful AI skills for Engineering Leaders"
url: https://www.linkedin.com/posts/catehuston_useful-ai-skills-for-engineering-leaders-share-7470089287666139136-pnBV/
authors: [Cate Huston]
captured: 2026-06-09
source_type: post
topics: [engineering-leadership, workflow-automation, team-effectiveness]
tags: [process-automation, reporting, observability]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2026-Q3
---

## Summary

Cate Huston (experienced engineering leader) frames three concrete AI applications for engineering managers addressing the overload problem: routing tedious requests, generating morning briefings, and making PR data queryable for team insights.

The post is a LinkedIn teaser for fuller content on her blog (cate.blog/2026/06/09/useful-ai-skills-for-engineering-leaders/), but the three-job framing is specific enough to extract.

## Key framing

**The problem**: "The EM role is harder than ever. More PRs, more pings, more incidents, more asks from more directions."

**Why existing advice fails**: "The advice is always vague: 'leverage AI,' 'work smarter.' How, exactly?"

**Three jobs, in priority order**:

1. **Route the tedious stuff** — Process enforcement fails at scale (C-suite exceptions). AI can enforce a process uniformly without rigidity: "Now you can get the same outcome with less rigidity for everyone."

2. **Report usefully** — Not dashboards requiring interpretation. Instead: "One morning orientation that looks through everything and tells me whether today's plan goes in the bin." (Morning briefing automation.)

3. **Understand what's actually going on** — "The PR as a queryable unit of work that helps you understand and iterate on team effectiveness." (Structured data extraction from PRs for team metrics.)

## Signal assessment

**Medium signal**: Huston has credibility as a practitioner (widely known EM voice) and frames a concrete problem with three specific use cases. However:
- The post itself is a teaser; full reasoning/evidence lives behind the blog link (unfetchable in this capture).
- No code, config, or failure modes.
- No before/after metrics or example output.
- "Queryable unit of work" and "morning orientation" are suggestive but lack implementation detail.

## Takeaways

- **Routing friction**: Process enforcement has exceptions; AI as uniform application layer.
- **Briefing as first automation win**: Reduce interpretation overhead by synthesizing status into actionable go/no-go signal.
- **PR as data source**: Structured extraction from code review artifacts for team-level insights is underused in EM tooling.
- **Vagueness problem**: Most EM + AI advice lacks the "how"—this starts to fill that gap but incompletely.
- **Morning briefing is concrete**: This is immediately implementable (LLM summarizes overnight alerts/PRs/on-call logs).

## Open questions

- What does "queryable PR" look like in practice? (API? CLI? Dashboards?)
- How does the morning briefing integrate with existing on-call/alert systems?
- Does routing handle escalation paths, or just noise reduction?
- What metrics prove the three jobs reduced EM overhead?

