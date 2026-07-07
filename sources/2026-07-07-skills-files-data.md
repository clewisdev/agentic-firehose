---
title: "We are writing skills files all wrong — actual data on what makes them effective"
url: https://www.linkedin.com/posts/seldo_we-are-writing-skills-files-all-wrong-fun-activity-7480110409757143040-I3ZZ
authors: [Laurie Voss]
captured: 2026-07-07
source_type: post
topics: [skills, agent-architecture, prompting]
tags: [skill-files, harness, model-saturation, domain-specificity]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

Laurie Voss presents empirical findings on effective skill file design, moving beyond speculative practice to "real, scientific data." The core claim: models are saturated with software engineering knowledge, rendering 38% of published skills (in that domain) nearly ineffective. The post articulates five design principles distilled from this data:

1. **Write it yourself** — avoid templating or generation; personalization matters
2. **Keep it short** — brevity improves signal
3. **Don't write too many** — precision over volume
4. **Ship one skill per harness** — granular assignment reduces interference
5. **Aim for a domain the model doesn't already know about** — exploit gaps in training data saturation

The framing is explicitly data-driven ("real, scientific data") but the post itself references an external article for "full instructions, nuance, sources and caveats." The post functions as a teaser.

## Key quotes

> "models are so saturated with software engineering expertise that writing a skill about software engineering makes almost no difference. And yet, 38% of published skill files are about software development."

> "There's 5 core principles, and they're easy to remember: write it yourself, keep it short, don't write too many, ship one skill per harness, and aim for a domain the model doesn't already know about."

## Takeaways

- **Model saturation is measurable and actionable**: the 38% stat implies empirical analysis of skill effectiveness; domain selection matters more than previously assumed
- **Skill file design parallels individual authorship**: "write it yourself" suggests skills need context and nuance that cannot be templated
- **Granularity > quantity**: single skill per harness aligns with modern agent architecture thinking (reduced cognitive load, easier iteration)
- **Gap-seeking strategy**: effectiveness correlates with teaching the model domains it lacks, not reinforcing existing knowledge
- **Practical principles are testable**: the five rules are concrete enough to validate; tension with the LinkedIn comment thread (Eric Boromisa's skepticism on ROI) signals this remains contested terrain

## Open questions

- What is the underlying dataset size and domain coverage? (38% stat needs context: sampled from which population?)
- How is "effectiveness" measured? Token efficiency? Task completion? Human preference?
- Does model saturation decay over time as foundation models improve, or is it stable?
- How do harness-to-skill ratio and total token count trade off?

## Notes

The comment thread surfaces real-world friction: Eric Boromisa raises the meta-question of whether skill files solve a problem worth solving (vs. adding operational burden). Ivan Davidov counters with orchestration metaphor (book structure: cover=summary, preface=rules, ToC=skills, chapters=individual skills, appendix=references). This suggests the signal extends beyond the post into practitioner debate.

