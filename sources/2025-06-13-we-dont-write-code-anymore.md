---
title: "We don't write code anymore: An engineering manager's field report from an AI-first engineering team"
url: https://www.sanity.io/blog/we-dont-write-code-anymore
authors: [Vincent Quigley]
captured: 2025-06-13
source_type: blog
topics: [ai-productivity, team-dynamics, code-review, agent-architecture]
tags: [management, workflow-change, intent-description, review-process]
signal_level: high
status: raw
confidence: high
freshness_until: 2025-Q3
---

## Summary

Vincent Quigley, engineering manager at Sanity who has used AI in engineering for 2.5 years, reports on nine months of AI-first team workflows. He frames software engineering as having moved through four generations of abstraction: assembly → high-level languages → frameworks/cloud → AI-first development.

**Core claim:** His team of senior engineers (10+ years each) now write ~1% of code by hand. The center of gravity in engineering work has shifted from code production to intent articulation, context management, code review, and validation.

**Key pipeline changes:**
- Work structured as long-running agent-led pipelines with human steering
- Engineers interrogate agents to understand trade-offs and problem shape
- Code review has expanded to become the larger portion of the job (not just syntax, but intent matching and architecture)
- Implementation cost has collapsed; design, requirements clarity, and judgment now matter more
- Merge/deploy is not the end—monitoring and interpretation are continuous

**Uncomfortable truths he identifies:**
- High token costs ("enough money to make your head turn")
- AI accelerates existing patterns (both good and bad)
- Output quality variance is unacceptable; "slop" gets caught in review
- Intent matching requires ownership clarity—agent work without clear ownership creates diffusion
- The work can be exhausting (managing agents + reviews + interpretation)

**Organizational impact:**
- Smaller teams can do significantly more
- Requires different hiring and management mental models
- Review discipline becomes critical bottleneck
- Engineers need stronger judgment; implementation is no longer the gating factor

## Verbatim quotes

> "Code was the cost. The product was always the point. For decades, writing code was one of the most expensive parts of software engineering. We built our habits around that cost.… Now, with AI-first development, the cost of implementation has collapsed so far that some of the rituals we built to protect expensive code no longer make sense."

> "I asked the team how much code they still write by hand. This is a team of senior engineers, each with at least 10 years of experience. One person said 1%. Another said they had tried writing code directly, then found themselves going back to the agent because it no longer felt like the intuitive path."

> "The question is no longer, 'How do we write code faster?' It is, 'What does software engineering look like when code is cheap?'"

> "Intent === ownership. The agent can draft a lot of code. But someone has to own the intent. If the intent is fuzzy, the code will be fuzzy."

> "Review is now a larger part of the job. What used to be, 'Does this code follow our style guide?' is now, 'Does this code match the intent? Does the shape of the solution match what we were trying to build?'"

## Takeaways

- **Workflow inversion**: Code *output* is now abundant; the bottleneck has moved upstream to intent clarity and downstream to review discipline. Quigley's team structures this as conversational steering loops with agents, not batch code-writing cycles.
- **Review is now architectural**: The merge gate becomes a judgment point about whether the agent's interpretation matched the human's intent and whether the solution shape is sound. Requires stronger architectural sense from reviewers.
- **Cost explosion, not elimination**: Token spend is real; Quigley notes it "costs enough money to make your head turn." This inverts the economic case—you now *pay per token* rather than *pay per engineer-hour*, which changes how you think about quality and iteration.
- **Ownership and accountability**: Fuzzy intent → fuzzy code. Unlike traditional code-writing where the engineer is the explicit author, agent-first work requires clearer intent specification upfront, or diffusion of responsibility.
- **Scaling paradox**: Smaller teams can ship more volume, but only if they can sustain the review load and judgment calls. This is a *different* kind of scaling constraint, not a removal of it.

## Open questions

- How does token spend scale with team size and feature velocity? Is there an optimal cost-per-feature-shipped?
- What's the failure mode when intent is clear but the agent's generated shape is wrong—how much rework is typical?
- How do you hire and onboard into this workflow? Does it require different seniority/judgment profiles than traditional engineering?
- What's the relationship between agent autonomy and human review overhead? Does more context → fewer review cycles, or does it just shift the review effort?
- How does this change incident response, debugging, and on-call? If agents generated the code, do humans still own the mental model?
