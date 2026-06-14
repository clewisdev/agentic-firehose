---
title: "DX and Culture"
written: 2026-05-29
updated: 2026-05-29
topics: [ai-productivity]
tags: [developer-experience, agent-experience, sustainability, skills-redistribution, measurement, alignment-cost]
---

# DX and Culture

Developer experience, engineering culture, and the human and organisational effects of AI-augmented engineering at scale. Distinct from harness/tool-use topics: this folder is about what happens to people, teams, and disciplines — not the technical architecture of agents.

## Sources

- `sources/2026-05-29-jamie-hurst-is-this-sustainable.md` — Senior engineer, 3 years in, 4,000-engineer org. Honest account of what AI augmentation costs at scale: build cost collapsed, alignment cost rose, thinking time and mentoring squeezed out. "Agent experience" as the right framing for DX investment. High signal.

## Key ideas

### Build cost vs alignment cost

Collapsed build cost does not collapse coordination overhead — it raises it. When PoCs are cheap, multiple teams independently solve the same problem, cohesion degrades, and platform fragmentation increases. The bottleneck shifts from engineering to alignment. This is the underreported failure mode of successful AI adoption at scale.

### Agent experience

Platform weaknesses that were tolerable when humans were the only consumers become serious bottlenecks when agents operate on the same codebase. A platform serving N engineers now serves N engineers plus an unbounded number of agent instances. "Agent experience" is emerging as the right frame — it changes the investment conversation from team-level to board-level. (Hurst, 2026.)

### Productivity gains and the volume trap

Productivity gains from AI get captured by output volume rather than output quality unless deliberately protected. Org expectations rise to absorb the speed-up; thinking time and mentoring — invisible on dashboards — are the first things squeezed. This is a design choice, not a natural outcome.

### Skills redistribution

Engineers who adopt AI tools effectively accrue disproportionate influence in AI-forward orgs: their proposals get taken more seriously, they shape direction more. This is a silent skills redistribution with equity and culture implications that most orgs aren't naming openly.

### Depth perishability

Expertise built on current AI tooling has an ~18-month obsolescence horizon (Hurst's estimate, consistent with the field pace in 2026). The defensible investment is in organisational change experience — knowing how large engineering orgs actually adopt new technology — rather than tool-specific depth.

### Measurement gap

DORA was built for a previous era. Adoption metrics tell you what people use, not whether the org is better off. No successor framework exists yet. This is an open problem.

## Open threads

- **"Agent experience" as a discipline** — Is a canonical definition forming? Which orgs (Stripe, GitHub, major internal platform teams) are publishing on this? Single-source so far (Hurst 2026).
- **Measurement successor to DORA** — What does a measurement framework for AI-era engineering quality look like? Connects to `topics/evals/index.md`.
- **Skills redistribution evidence** — Hurst's observation is plausible and consistent with the field, but it's one practitioner's view. Worth a second source before treating as established.
- **Depth perishability across transitions** — Does organisational change experience actually compound better than tool-specific expertise? The Docker/Kubernetes parallel is suggestive but not evidence.
