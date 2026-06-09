---
title: "Cowork: How to Set Up Claude for Non-Coders"
url: http://claude-co.work
authors: [Ruben Hassid]
captured: 2026-06-09
source_type: blog
topics: [tool-use, claude, workflow-optimization, context-management]
tags: [claude, cowork, desktop-app, folder-structure, prompt-engineering]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2026-Q3
---

## Summary

Ruben Hassid's guide to Claude Cowork — Anthropic's desktop app feature for local folder-based AI workflows — focuses on folder architecture and context-window optimization for non-technical users. The core claim: Cowork adoption has driven Claude's ARR past ChatGPT's, and most users are setting it up suboptimally.

The prescribed setup centers three files in an `ABOUT ME/` folder:

1. **about-me.md** (~2,000 tokens): A condensed profile covering role, workflow, standards, and Claude-specific working rules. Hassid emphasizes interview-driven extraction of patterns rather than raw transcript storage, citing context-window bloat from 22,000+ word files. The interview framework covers identity (role, audience, what "good week" looks like), process (tools, task flow, QA), quality standards, pet peeves, hard rules, and contrarian opinions.

2. **anti-ai-writing-style.md**: Explicit rules against AI clichés (80+ banned words like "delve," "harness"; forbidden pattern templates like "this isn't X, it's Y"; formatting constraints like 3-sentence paragraphs max). Purpose: force Claude to mirror user voice rather than default LLM prose.

3. **A third file** (truncated in fetch): Implied but not detailed in available content.

Operational details: Pro account required ($20–100/month); Opus 4.6 + Extended Thinking recommended for complex tasks; folder-based context loading happens automatically at session start.

## Verbatim quotes

> "Claude had to read too much before answering. So I trimmed it to under 2,000 words by extracting the patterns and throwing away the raw transcripts. Almost the same, but 10x less noise."

> "If you already have it, trim it." (on existing about-me files)

> "Without it, Claude writes like Claude. With it, Claude writes like you (minus the parts you hate)."

> "Every sentence should carry signal. If a sentence could be cut without losing information, cut it."

## Takeaways

- **Context scarcity is real**: Token budgets force prioritization; raw interview transcripts waste more context than patterns extracted from them.
- **User profiles need anti-patterns, not just positive rules**: Negative examples (what to avoid) appear more actionable than aspirational guidance.
- **Folder structure as interface**: Cowork treats the file system as implicit schema; three-folder layout signals what Claude should read vs. cache.
- **Interview-driven prompt engineering**: Hassid advocates structured questioning to disambiguate vague user preferences ("clear" → specific examples) before compilation.
- **Extended Thinking availability**: The mention of Opus 4.6 + Extended Thinking suggests this feature is now standard in Claude desktop, not just API.

## Open questions

- What does the third file in `ABOUT ME/` contain? (Content truncated before name/purpose revealed.)
- How does Cowork's context loading behave with folders >10MB? Any performance cliff?
- Does the about-me file refresh on every session, or is it cached across tasks in a workspace?
- How does Hassid measure "10x less noise" — token count, latency, or quality regression testing?
- Are there failure modes for users who over-constrain anti-AI rules (e.g., banning legitimate vocabulary)?

## Notes on signal

Medium signal: Hassid reports specific working practice (two-month folder optimization, 22,000-word → 2,000-word compression) with concrete artifacts (his own about-me file structure, interview template). The guidance is prescription-heavy but grounded in stated friction (Claude defaulting to generic voice, context bloat). However, the post is partly engagement-marketing ("everyone actually switched"; ARR comparisons with no source link; "you must know Claude Cowork now") and audience-building (heavy newsletter signup CTA). No before/after metrics, no user testing data, no failure analysis. The advice is plausible but not validated.
