---
title: "What Is Harness Engineering and Why It Matters More Than the Model"
url: https://www.linkedin.com/pulse/what-harness-engineering-why-matters-more-than-model-david-berkin-ybbfe
authors: [David Berkin]
captured: 2026-05-20
source_type: blog
topics: [harnesses, evals]
tags: [enterprise, governance, vocabulary, definitions, routing, observability, build-vs-buy, cost, agentics, control-plane]
status: summarized
confidence: medium
freshness_until: 2026-Q4
---

# Berkin — What Is Harness Engineering and Why It Matters More Than the Model

> Capture caveat: fetched via WebFetch (paraphrased through a small model). One named product — "Claude Design" — appears in the retrieved summary alongside "Codex Desktop"; I don't recognise it and suspect it's a paraphrase artifact (the real text probably said Claude Code or Claude Cowork). Don't cite it as a real product without re-reading the source.

## Summary

LinkedIn Pulse article from David Berkin (May 18 2026, ~3,500 words). Framing piece, not implementation guidance. Argues that the bottleneck for enterprise AI adoption is not model quality but the *operational wrapper* — the "harness" — surrounding the model. Most enterprise AI failures, in Berkin's view, won't trace to picking the wrong model; they'll trace to capable models dropped into workflows without the engineering that makes outputs "reliable, governed, measurable, and sustainable."

Berkin's definition of harness engineering:

> "The discipline of designing the operational wrapper around model intelligence. It is the difference between asking a model a clever question and operating AI as part of a business process."

He enumerates the components: *context design, orchestration, model routing, prompts, tool access, identity, permissions, guardrails, evaluation, observability, human approval points, resilience patterns, and cost controls.*

The cleanest contribution of the piece is the **agentics vs harness distinction**:

> "Agentics describes what an AI system may be able to do. Harness engineering describes how the enterprise decides what it is allowed to do."
>
> "An agent might plan a sequence of steps. The harness determines whether those steps are permitted."

He distinguishes two operating modes:

- **Power-user harness** — informal, personal, idiosyncratic. The human acts as the manual control plane. Tolerates inconsistency.
- **Enterprise harness** — must optimise for *trustworthiness*, not just usefulness. Requires regression testing, evaluation, monitoring, release discipline, identity/permission enforcement, cost controls.

On economics he is sharp:

> "Every prompt, retrieval step, tool call, retry, agent loop, and oversized context window has a cost. A badly designed harness does not just create technical risk; it creates financial risk."
>
> "The cheapest model on paper is not necessarily the cheapest system in production. A weaker model may need more retries, more context, more validation, or more human intervention."
>
> "When token usage scales, architecture becomes finance engineering."

He proposes an "Enterprise AI Platform" — a shared control plane bundling model abstraction, routing, policy enforcement, evaluation pipelines, observability, and lifecycle controls. The mantra: *"Make the right thing the easy thing."*

On the build-vs-buy question (increasingly live as Cowork, Codex Desktop, etc. productise harness components): use vendor harness where it's strong and economically sensible; build your own where you need control, portability, assurance, or consistency across use cases.

Closes with a "proportionality" principle: too little harness leaves the enterprise carrying unmanaged risk; too much slows innovation and drives shadow AI. Target: *"minimum viable standardisation."*

## Key quotes

> "Agentics describes the autonomy. Harness engineering defines the boundaries."

The cleanest sentence in the piece. Worth borrowing as standing vocabulary.

> "The cheapest model on paper is not necessarily the cheapest system in production."

The right cost frame. A weaker model that needs three retries, larger context, and human review can easily cost more than a frontier model that gets it on the first try.

> "When token usage scales, architecture becomes finance engineering."

Compact restatement of the same point. Useful when talking to finance/ops stakeholders.

> "Make the right thing the easy thing."

Standard platform-engineering mantra applied to the AI control plane. If the governed path is harder than the shadow path, governance loses.

## Takeaways

- **The term "harness engineering" is escaping its origin context.** It started as Anthropic-ecosystem vocabulary (the wrapper around Claude Code) and is now being used in enterprise-architecture framing pieces. Adopt the vocabulary; it's becoming standard.
- **Agentics vs harness is the right cleavage.** When discussing what an agent *should* do, separate "what is it capable of" from "what are we allowing it to do." Most "is this agent safe" debates collapse one into the other.
- **Total cost of operation, not per-token cost.** When evaluating model choice for a workflow, count retries, validation calls, context overhead, and human-review time — not just the headline `$/M tokens`. A frontier model that's right on the first try often beats a cheap model that needs three rounds.
- **Power-user vs enterprise harness is a real distinction, not a style choice.** What works as a personal workflow (informal, ad-hoc, you-as-control-plane) does not survive being scaled to a team or a regulated function. Don't promise "we just need to roll this out more widely" without rebuilding the harness.
- **Build-vs-buy is now the live harness question.** With Cowork, Codex Desktop, Bedrock/Vertex tooling, etc., much of the harness surface is being productised. The strategic call is *which layers to inherit and which to own* — not whether to have a harness.
- **This is a vocabulary piece, not an implementation piece.** Don't expect concrete patterns here. Useful to share with non-engineering stakeholders to align language; not useful as a how-to.

## Open questions / things to verify

- **What does "regression testing" a harness actually look like in practice?** Berkin asserts the requirement; the operational pattern (eval suites, golden traces, drift detection on model upgrades) is left as an exercise.
- **Unit of harness governance.** Is the harness scoped per app, per team, per business unit, per organisation? The article is silent and this drives platform-vs-decentralised debates.
- **Has anyone actually built the "Enterprise AI Platform" coherently?** It's a sensible list of capabilities; the integration into one usable surface is the hard part. No examples cited.
- **What does the power-user → enterprise transition path look like?** Personal harnesses don't naturally graduate. Likely the answer is "rewrite, don't promote," but the piece doesn't say.
- **Author bio.** No details captured. Worth a quick check (Berkin's role/employer affects how to weight the enterprise framing).

## Related

- `topics/harnesses/index.md`
- `topics/harnesses/cowork.md` — Cowork is an example of vendor-productised harness in Berkin's sense.
- `sources/2026-05-20-claude-mem.md` — instrumentation of an existing harness (Claude Code) for memory.
- `sources/2026-05-20-poha.md` — a power-user harness built on top of vendor harness (Cowork).
