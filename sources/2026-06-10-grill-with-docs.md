---
title: "grill-with-docs: Align Before You Build"
url: https://www.aihero.dev/grill-with-docs
authors: [Matt Pocock]
captured: 2026-06-10
source_type: blog
topics: [prompting, system-design, context-engineering, code-review]
tags: [ubiquitous-language, context-md, adr, terminology, shared-understanding]
signal_level: high
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

Matt Pocock describes `/grill-with-docs`, an evolved prompt-engineering skill that combines his earlier `/grill-me` technique (relentless AI-driven questioning) with domain-driven design principles. The core insight: pairing an LLM interview loop with explicit shared-language documentation (CONTEXT.md + Architectural Decision Records) dramatically reduces re-explanation overhead and grounds design decisions in both code and domain semantics.

### Key mechanism

1. **CONTEXT.md as glossary**: Document ubiquitous language (terms shared by codebase, developers, domain experts) in a bounded context.
2. **Active refinement during grilling**: AI challenges fuzzy language against the glossary, surfaces cardinality/semantics tensions, sharpens edge cases.
3. **ADRs for non-obvious decisions**: Only document when decisions are hard to reverse, surprising without context, or involve real trade-offs (e.g., ON DELETE RESTRICT vs CASCADE).

### Concrete example (pitches feature in course system)

Pocock walks through a real grilling session: adding "pitches" (packaging containers for videos) to a course system. The AI surfaces:
- **Cardinality question**: 1:N, 1:1, or N:N relationship? (Recommends 1:N as cheap and reversible.)
- **Terminology collision**: "Standalone Video" (lessonId = NULL) now conflicts with "Pitched Video"; AI proposes treating Pitch as orthogonal metadata (sub-terms: Unattached vs Pitched Standalone).
- **Status semantics**: Are idle | scheduled | shipped manual or derived? Linear or free-form transitions? (Decides on manual, free-form.)
- **Empty pitches**: Can pitches exist with zero videos? (Yes, pitch-first workflow aligns with MrBeast philosophy.)
- **Deletion behavior**: ON DELETE SET NULL vs CASCADE vs RESTRICT? (Recommends RESTRICT to force conscious user actions; Pocock agrees, creating an ADR.)

Each decision is grounded in trade-offs, not defaults. The refined language then shapes variable/file naming, schema design, and future AI-assisted code generation.

### Why this matters

Without shared documentation, re-grilling the same fuzzy concepts in every session wastes tokens and reasoning cycles. By building a glossary and decision log incrementally, the AI learns domain constraints early and proposes designs that respect them. This is higher-fidelity than generic LLM coding assistance.

## Verbatim quotes

> "The core problem? We could communicate about the code effectively, but I had to re-explain all the non-obvious things about the codebase and domain before doing anything productive. There was a missing piece: documentation."

> "When all three groups speak the same language, something magical happens. A domain expert can say 'there's something wrong with this part of the app,' and the developer knows exactly what they mean. The code reflects it too."

> "A 'context' (in domain-driven design terms) is a bounded area of your app where you speak a shared language."

> "Some decisions are non-obvious, and they need explanation. That's where Architectural Decision Records (ADRs) come in. ADRs are simple markdown files that document non-obvious decisions. You only create an ADR when: The decision is hard to reverse, The decision would be surprising without context, The decision involved a real trade-off with consequences down the line."

> "This distinction matters because it will affect every variable name and file name the AI generates."

## Takeaways

- **Grilling + documentation are co-dependencies**: LLM interviews reveal fuzzy language; documentation prevents re-grilling the same surface area next session.
- **Ubiquitous language bridges code and domain**: Shared terminology makes domain experts, developers, and AI speak the same dialect, reducing translation friction.
- **ADRs encode non-obvious constraints**: Not every design choice needs recording, only decisions that are hard to reverse or surprising without context. This keeps documentation lean.
- **Orthogonality prevents terminology bloat**: Treating Pitch as metadata orthogonal to Standalone (a structural property) avoids combinatorial sub-terms and keeps the glossary clean.
- **Trade-off reasoning grounds design**: The example shows decisions like ON DELETE RESTRICT justified by consequences (forcing conscious deletion), not just defaults.

## Open questions

- How does CONTEXT.md scale in a large monorepo with multiple bounded contexts? Does the skill handle context switching and cross-context glossaries?
- Can ADRs be auto-generated or at least drafted by the AI after a grilling session, or must they be written manually post-hoc?
- How frequently should a CONTEXT.md be re-grilled / refreshed to catch drift as the codebase evolves?
- What prevents CONTEXT.md from becoming a maintenance burden that developers avoid updating?
