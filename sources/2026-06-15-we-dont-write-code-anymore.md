---
title: "We don't write code anymore"
url: https://www.sanity.io/blog/we-dont-write-code-anymore
authors: [Vincent Quigley]
captured: 2026-06-29
source_type: blog
topics: [agentic-workflows, team-dynamics, code-review, ai-productivity]
tags: [ai-first, engineering-management, pr-review, ownership, cost, pipeline, sustainability]
status: raw
confidence: high
freshness_until: 2026-Q4
---

# We don't write code anymore

## Summary

Vincent Quigley is an engineering manager at Sanity with 2.5 years of AI-assisted engineering experience, nine months of full AI-first workflows. This is a field report from the inside of a senior team that has genuinely shifted its daily operating model — not a think piece about the future.

The frame: software engineering has moved through four generations of abstraction (assembly → high-level languages → frameworks/cloud → AI-first). Each generation changed what engineers wrote and where the hard problems sat. The fourth generation's unit of work is intent, context, and conversation with models. Implementation cost has collapsed. What was expensive (writing code) is now cheap. What was implied (judgment, product thinking, spec clarity) is now the constraint.

**The development pipeline:** Work runs as a long-running pipeline — shape context → produce spec → agent builds and iterates → human reviews diff → pushes back → tightens tests → ships → monitors → iterates. The agent isn't just a code generator; it stays involved across the full change lifecycle including post-merge monitoring. This is the key structural insight: most teams still treat the PR merge as the end of the agent's job. Quigley argues the agent should remain active post-merge, watching signals, surfacing what needs attention next — the context investment is too large to abandon at merge.

**PR size as a discipline:** Quigley's hardest rule — target 500 lines per PR. At 1,000, acceptable. At 10,000, the process has failed and no one is reviewing it properly. He trains agents explicitly on this constraint. Stacked, focused PRs are far easier to reason about than one large blob of generated code.

**The uncomfortable failure modes (the most useful section):**

- *$2,000/month AI spend* — real infrastructure cost, not a rounding error. Teams need to measure it and ask whether it produces better outcomes, not just more output.
- *AI accelerates what is already there* — strong engineers get faster; weak habits get louder. The concern isn't bad code, it's technically-correct-but-product-wrong output. KISS still applies — cheap implementation makes over-engineering tempting.
- *Slop is unacceptable* — volume without quality. Engineers sending work they haven't read, approving text that sounds coherent but says nothing precise. Cannot become the new normal.
- *Intent === ownership* — "AI helped with this" is not a disclaimer. If you asked for the work, reviewed it, and shipped it, you own it. The bar doesn't lower because the code was cheap to produce.
- *Review is now heavier, not lighter* — when you wrote code yourself, understanding accumulated line by line. With agents, you must rebuild the mental model in one review pass. This is cognitively heavier.
- *Sustainability* — some days feel like 2.5 days of work in one. Agentic work is addictive (dopamine hit from watching features assemble). No good practices exist yet for managing this.

**Team and management changes:** Engineering management is now managing people managing agents. Engineers are expected to operate at a level many were never explicitly trained for — framing problems, constraining work, steering implementation, reviewing output, deciding whether what shipped moved the product. Smaller teams can carry more of the path from problem to release with fewer handoffs. Clarity becomes the binding constraint.

**Personal note worth capturing:** Quigley describes resolving a long-standing tension between management and IC work. Cheap implementation let him be an engineering manager who ships meaningful production work alongside his team — not as a side project, but as part of how he operates.

## Key quotes

> "Code was never the cost. The product was always the point. Code was the cost of getting there."

The framing that unlocks the rest of the piece — implementation was expensive so we built habits (requirements docs, stage gates, estimates) around protecting it. Those habits still matter but their rationale has changed.

> "AI accelerates whatever habits are already there. That is great when someone has strong product instincts, technical taste, and enough discipline to verify the work. It is dangerous when someone is used to being handed narrow tickets, producing exactly what was asked for, and moving on without thinking about the outcome."

Habit amplification, not habit creation. The most important management implication in the piece.

> "When you wrote code by hand, you usually thought about every line as you typed it. With agents, that is no longer true... If you do not review carefully, you may be approving work you have never properly internalized."

The review burden shift — understanding no longer accumulates during implementation, it must be rebuilt during review.

> "If it becomes 10,000, the process has failed. No one is reviewing that properly."

On PR size discipline. The 500-line target is a practice, not a preference.

> "The pipeline does not stop at merge... A useful agent is not only a code generator. It can become a long-running assistant that knows what was built, why it was built, and what signals matter after it ships."

Post-merge agent continuity — underexplored in most agentic engineering writing.

> "Agentic work also makes it tempting to pretend you can multitask. You cannot. You are still one person with one thread of attention."

On the CPU-scheduling metaphor for agentic work — async pipelines increase throughput but do not make human judgment finite.

## Takeaways

- **500-line PR cap is an operational discipline, not a preference.** Train agents explicitly on this. 10,000-line PRs represent process failure, not just discomfort — nobody reviews them properly.
- **Post-merge agent continuity is the underexplored opportunity.** Most teams kill the agent at merge. Keeping it active to monitor signals and surface what needs attention next extracts full value from the context investment.
- **Review effort increases with agentic workflows, not decreases.** The mental model that used to accumulate during implementation now has to be rebuilt in one review pass. Budget for this; don't pretend reviews stay the same.
- **"AI helped" is not a quality disclaimer.** If you shipped it, you own it. Enforce this as a team norm before "the AI wrote it" becomes a defence for approving work nobody read.
- **AI spend is infrastructure, not discretionary.** $2,000/month is real. Measure it, budget for it, and evaluate it on outcomes (did it ship the right thing sooner?) not output (did it generate more code?).

## Open questions / things to verify

- Quigley's $2,000/month figure is personal spend; no team-level number is given. At scale across a team of 5–10 engineers, what does the cost curve look like?
- The "post-merge agent continuity" pattern is described but not detailed — what tooling makes this practical? Persistent Claude sessions? Long-running Slack/webhook integrations?
- "Slop is unacceptable" is a norm statement, not a mechanism. What enforcement exists? PR CI with automated review is mentioned briefly — worth exploring what that pipeline looks like concretely.
- Sustainability problem flagged ("we do not yet have good practices for this") but left open. Worth watching for follow-up writing from Quigley or others on the Sanity team.

## Related

- `sources/2026-06-27-verifiable-intent-spec-driven.md` — spec-first as the accountability mechanism; complements Quigley's "intent === ownership" framing
- `sources/2026-06-23-loop-engineering.md` — gate engineering as the hard part of loops; maps to Quigley's review discipline
- `synthesis/loops-as-unit-of-work.md` — loop anatomy and the completion-promise design
- `synthesis/verification-bottleneck.md` — review burden shift is the same dynamic from a different angle
- `topics/agentic-workflows/index.md`
- `topics/team-dynamics/index.md`
- `topics/code-review/index.md`
- `topics/ai-productivity/index.md`
