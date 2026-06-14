---
title: "Is this sustainable?"
url: https://jamiehurst.co.uk/2026-05-24_ai-sustainable
authors: [Jamie Hurst]
captured: 2026-05-29
source_type: blog
topics: [dx-culture, harnesses, evals]
tags: [senior-engineering, agent-experience, developer-experience, sustainability, skills-redistribution, alignment-cost, measurement]
signal_level: medium
status: summarized
confidence: high
freshness_until: 2026-Q4
---

# Is this sustainable? — Jamie Hurst

Hurst is a senior engineer, 3 years into leading AI-augmented coding adoption across a ~4,000-engineer organisation. Posted 2026-05-24. Surfaced via a Rob Bowley LinkedIn reshare (`sources/skipped/2026-05-29-bowley-hurst-sustainable.md`); the LinkedIn post was unfetchable, this article was captured from a saved PDF.

The piece is notable for what it refuses to do: it won't claim productivity wins without naming what they cost.

## Summary

### We build before we think

The gap between idea and demoable thing has collapsed. Slide decks have largely gone; PoC-as-proposal replaced them. Stakeholders now want to see how something works in a concrete context rather than read a theoretical case for it. This is mostly good — it exposes more thinking earlier and removes a place where detail was buried to make things digestible.

The trade is real: **build cost collapsed, but alignment cost has not — it's risen.** When three teams can each produce a working solution to the same problem in the time it used to take to write a proposal, the bottleneck moves from engineering to coordination. The MR review situation is Hurst's worked example: several teams independently built homegrown bots, none solving the problem at scale. "It's now easier to build a new bot than to adopt someone else's, which means cohesion gets harder to achieve, not easier."

A quieter effect: this shift advantages engineers who've adopted AI tools effectively. They get heard more, get proposals taken seriously more, shape direction more. Hurst calls it "a skills redistribution happening inside every AI-forward org right now, and most of us aren't talking about it openly."

### The senior role got more powerful and less sustainable

Counter to the standard narrative (AI threatens juniors, elevates seniors into pure strategy), AI landed on senior roles first. Senior engineers are positioned to recognise where AI applies across the SDLC, write proposals, navigate the org — and now also build the thing themselves. The role expanded in two directions simultaneously: more hands-on coding and more strategic writing.

What gave way: mentoring and thinking time. 1-2-1s can't be backloaded — they require dedicated time and attention. When the other parts of the role expand to consume available hours, mentoring goes first. Thinking time followed: "The productivity gains from AI got captured by output volume rather than output quality. The org's expectations rose to absorb the speed-up, and the slack that used to exist between tasks — the unstructured time where strategic thinking actually happens — got eaten first because it's invisible on a dashboard."

The honest conclusion: "The volume of what I'm being asked to deliver is rising faster than AI is making me capable of delivering it."

### The depth I bet on

Hurst traded generalist breadth for AI/GenAI specialisation. The current depth is **partly perishable** — most of what he knows about applying GenAI in an SDLC context will be obsolete within 18 months. His defensible bet: organisational change experience — knowing how a large engineering org actually adopts new technology, who needs to be convinced, what governance constraints mean in practice — will compound and stay valuable when specific tools age out. "That's a defensible bet but it isn't a certain one."

The labelling risk: being "the AI person" is an asset now; it becomes a liability when the landscape shifts. The Docker/Kubernetes people from five years ago are either grandfathered into their roles or carefully repositioning.

### Scope expanded because the discipline expanded

DX was worthy-but-overlooked for years. Problems were real but absorbable; distributed cost and hard-to-measure impact meant DX couldn't compete for investment against revenue-adjacent work. DORA and adoption metrics didn't make the case sharp enough.

AI changed the economics: platform weaknesses tolerable when humans were the only consumers become serious bottlenecks when agents try to operate on the same codebase. "The term 'agent experience' is starting to emerge in the industry to describe this, and it's the right framing." Fixes made for developers also serve agents, and agents scale in ways developers never could. A platform that served 4,000 humans now potentially serves 4,000 humans plus an unbounded number of agent instances. "The investment economics flip when you frame it that way, and the conversation moves from team-level prioritisation to board-level prioritisation almost overnight."

The uncomfortable note: DX got its moment through external forcing, not through advocacy. AI exposed how much the platform was already holding back. "That's humbling if you've spent years arguing for the work, and worth being honest about because it's what every DX organisation is now experiencing."

### Measurement

DORA was built for a previous era. Adoption metrics tell you what people use, not whether the org is better off. Hurst is inventing the measurement framework while running the programme. No resolution offered — the apparatus doesn't exist yet. Broader scope also means credit-share: org-wide programmes are political, success attributed across many contributors. "You exchange clear attribution for actual leverage on outcomes."

### What he thinks this means

The pattern isn't unique to him: "Senior engineers in AI-forward orgs are doing more leveraged, more hands-on, more meeting-heavy work simultaneously, with the human-focused parts of the role paying for it." He expects the same dynamic to reach mid-level engineers in two years. "It works for now. It won't last forever."

## Key quotes

> "The cost of building has collapsed, but the cost of aligning organisationally has not. If anything, it's gone up."

> "It's now easier to build a new bot than to adopt someone else's, which means cohesion gets harder to achieve, not easier."

> "The productivity gains from AI got captured by output volume rather than output quality. The org's expectations rose to absorb the speed-up, and the slack that used to exist between tasks, the unstructured time where strategic thinking actually happens, got eaten first because it's invisible on a dashboard."

> "A piece of internal platform that previously served 4,000 humans now potentially serves 4,000 humans plus an unbounded number of agent instances those humans deploy. The investment economics flip when you frame it that way."

> "The discipline got its moment through external forcing, not through advocacy. That's humbling if you've spent years arguing for the work."

## Takeaways

- **Collapsed build cost does not collapse alignment cost — it raises it.** When PoCs are cheap, coordination becomes the constraint. Factor this into any agentic rollout: more bots means more governance overhead, not less.
- **"Agent experience" is the right frame for platform investment.** If your platform serves N humans, it now serves N humans plus an unbounded number of agent instances. Platform debt that was tolerable changes category when agents magnify it. Use this framing when making the investment case.
- **Productivity gains get captured by volume unless deliberately protected.** Thinking time and mentoring are invisible on dashboards; they go first when orgs absorb speed-ups into expanded expectations. This is a design choice, not a natural outcome — it requires explicit protection.
- **The skills redistribution is real and silent.** Engineers who adopt AI tools effectively accrue disproportionate influence. Worth naming as an equity and culture issue, not just a productivity metric.
- **Depth built on current tooling has an ~18-month horizon.** The defensible investment is in organisational and process knowledge. Hurst's framing is consistent with the pace of the field in 2026.

## Open questions / things to verify

- "Agent experience" is starting to emerge as a term — is there a canonical definition forming (Stripe, GitHub, internal platform orgs)? Worth tracking as the discipline formalises.
- Does organisational change experience actually compound better than tool-specific expertise across platform transitions? The Docker/Kubernetes parallel is suggestive but not evidence.
- DORA as insufficient for AI-era measurement — is anyone publishing a successor framework? This is an evals gap worth filling.
- The silent skills redistribution: is there data on influence accrual patterns inside AI-forward orgs, or is this purely Hurst's observed experience?

## Related

- `sources/skipped/2026-05-29-bowley-hurst-sustainable.md` — the LinkedIn reshare that surfaced this; now fully captured
- `topics/dx-culture/index.md`
- `topics/harnesses/index.md` — agent experience framing is relevant to harness and platform design
- `topics/evals/index.md` — measurement gap, DORA obsolescence
