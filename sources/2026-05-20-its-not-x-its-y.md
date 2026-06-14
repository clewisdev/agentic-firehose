---
title: "It's not [X], it's [Y]. — Stop using this expression right away. You sound like an AI."
url: https://ruben.substack.com/p/its-not-x-its-y
authors: [Ruben Hassid]
captured: 2026-05-20
source_type: blog
topics: [prompting]
tags: [writing-style, anti-patterns, voice, style-guides, llm-tells, system-prompt, project-files]
signal_level: medium
status: summarized
confidence: medium
freshness_until: 2026-Q4
---

# It's not [X], it's [Y].

> Capture caveat: fetched via WebFetch, which paraphrases through a small model. Direct verbatim quotes confirmed by a second fetch are marked as such; everything else is reported wording. The product name "Claude Cowork" appears literally in the post — it's outside my Jan 2026 knowledge cutoff, so I'm not asserting what it is, only that the author uses that term.

## Summary

Ruben Hassid (How to AI newsletter, April 29, 2026) argues that the rhetorical construction **"It's not X, it's Y"** has become the single most reliable tell of AI-generated writing. He calls the underlying shape "negative parallelism" — rejecting one frame in order to assert another — and claims it appears roughly 4× more often in Fortune 500 filings between 2023 and 2025 (~50 instances → 200+), without showing methodology.

The post catalogues ~15 variants of the same pattern:

- "This isn't X. This is Y."
- "Not X. Y."
- "Forget X. Focus on Y."
- "Less X, more Y."
- "X is overrated. Y matters."
- Softened forms: "While X might seem… Y actually…" / "Sure, X works. But Y is…"

The proposed fix is operational, not just stylistic: maintain a file called `anti-ai-writing-style.md` and load it into whatever long-context writing surface you use. The author says: *"I prefer Claude Cowork for this. But a ChatGPT Project could work too."* He also suggests managing the file in Obsidian inside the "Cowork folder."

The style guide itself goes well beyond the headline pattern. It allegedly bans 100+ "AI words" (delve, unlock, leverage, synergy, paradigm), prohibits em-dashes and "dead transitions" (furthermore, moreover), restricts analogies to roughly one per 1,500 words, and enforces active voice, contractions, and varied paragraph lengths. The substantive principle behind the rules is specificity over polish:

> Weak: "The company faced challenges."
> Better: "The company missed payroll twice in 6 months."

Length: ~3,500–4,000 words. Register: marketing-influencer "how to AI" newsletter — useful for the pattern catalogue, weaker on evidence and prescriptions.

## Key quotes

> "I prefer Claude Cowork for this. But a ChatGPT Project could work too."

The recommended workflow: an external style-guide file loaded into a long-running project surface, not pasted into every prompt.

> "You create an anti-ai-writing-style.md. file."

The artefact is just a markdown file. No special tooling — leverages whatever "project files" / "custom instructions" feature the chosen surface already has.

> Weak: "The company faced challenges." / Better: "The company missed payroll twice in 6 months."

The clearest articulation of the underlying principle: *concrete particulars beat polished abstraction.* The "It's not X, it's Y" structure is a symptom of the broader failure mode — substituting rhetorical shape for substance.

## Takeaways

- **"It's not X, it's Y" is a real LLM tell.** If you care about output not reading as AI, explicitly forbid the construction in the system prompt or a loaded style file. The pattern shows up because models have been RLHF'd toward "balanced contrast" framings.
- **Style-guide-as-loadable-file is a useful pattern.** Maintain a single `anti-style.md` (or equivalent) and load it into every writing surface you use — Claude Code project memory, Anthropic Projects, ChatGPT Projects, system-prompt of any agent you build. Centralises the rules; updates propagate.
- **The pattern is also a detector.** When reviewing AI-edited prose, "It's not X, it's Y" (and its 15 variants) is a high-signal flag for "this paragraph was probably ghost-written by an LLM and not edited."
- **Don't over-index on surface heuristics like "ban em-dashes."** Em-dashes are legitimate punctuation; their statistical overrepresentation in LLM output isn't the problem. The actual problem is cadence and substance — banning the marker treats the symptom and punishes good human writers too.
- **The deeper principle is specificity.** "Missed payroll twice in 6 months" beats "faced challenges" because particulars are harder to generate without grounding. A model writing without facts defaults to abstractions and balanced contrasts. The fix is to feed it specifics, not just to ban its tics.
- **Influencer "how to AI" content is a mixed signal source.** Pattern observation: usually real. Statistics: usually unverified. Prescriptions: often overfit to surface markers. Mine the catalogues, distrust the rules.

## Open questions / things to verify

- **What's the actual statistical evidence?** The "50 → 200+ in Fortune 500 filings" claim has no methodology. EDGAR is searchable; this should be checkable, but the post doesn't link a notebook or query.
- **Does the loaded style-file actually reduce these patterns in output?** No A/B in the post. Worth running: write the same prompt with and without `anti-style.md` loaded and diff the outputs across 20 runs.
- ~~**What is "Claude Cowork"?**~~ **Resolved 2026-05-20**: real Anthropic product, GA'd April 9 2026, same engine as Claude Code in a Desktop surface. See [`topics/harnesses/cowork.md`](../topics/harnesses/cowork.md). The author's workflow recommendation makes sense — Cowork has project folders + file mounting, which is exactly what loading a persistent style file requires.
- **Half-life of these rules.** Style tells shift as models update. A 2026-April anti-style guide may be partly stale by 2026-Q4. Plan to revisit.
- **Em-dash false-positive rate.** Plenty of strong human writers use em-dashes. Surface-marker bans are blunt; an output-quality eval would tell you whether the rule helps or hurts.

## Related

- `topics/prompting/index.md`
