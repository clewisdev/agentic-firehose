---
title: "Evaluating agents: what we know and where the gaps are"
written: 2026-05-30
updated: 2026-05-30
topics: [evals, harnesses]
tags: [llm-as-judge, mutation-testing, swebench, metr, sensors, per-component-evals, productivity-measurement]
sources:
  - sources/2026-05-28-swebench-swesmith.md
  - sources/2026-05-29-cag-vs-vanilla-prompting.md
  - sources/2026-05-30-fowler-genai-patterns.md
  - sources/2026-05-30-fowler-maintainability-sensors.md
  - sources/2026-06-05-msft-build-ai-sdlc.md
status: draft
---

# Evaluating agents: what we know and where the gaps are

## The core problem

Evals for agents are not unit tests. There is no binary pass/fail; outputs exist on a quality spectrum, and the same input can produce legitimately different correct answers across runs. The challenge is designing evaluation mechanisms that are both automatable and sensitive to the failure modes that matter.

The KB currently has four relevant sources: two on eval methodology for production AI systems (Fowler/Subramaniam, Böckeler), one on the only gold-standard productivity study to date (METR RCT via cag-vs-vanilla-prompting), and one on the canonical coding agent benchmark (SWE-bench). Together they cover what we know — but also illuminate a significant gap.

## What the sources agree on

**1. Evals are the load-bearing pattern.** Every other investment in an agent system — RAG, guardrails, context design, model selection — is only knowable through evals. Fowler/Subramaniam frame this explicitly: "The difficult part of using evals lies in the fact that it is still early days in our understanding of what mechanisms are best for scoring and judging. Despite this, we see evals as crucial."

**2. The right eval combination is LLM-as-judge plus human evaluation.** Self-evaluation is actively dangerous — models reinforce their own errors. A different, more capable model as judge reduces shared-bias risk. Human evaluation catches qualitative failures that automated scoring misses. The two are complementary, not alternatives.

**3. Eval per component, not just end-to-end.** Fowler/Subramaniam and Böckeler converge on this independently. End-to-end evals tell you something broke; per-component evals (guardrail, retrieval step, reranker, lint rule) tell you what broke. The cost of instrumentation pays off in localised regressions. Böckeler: a sensor that produces output the agent never reads is CI theater — the feedback loop must close.

**4. Coverage is not test effectiveness.** Böckeler's mutation testing finding is striking: `mappers.ts` had 100% statement coverage, 75% branch coverage — and 13 mutation survivors. Coverage tells you a line was executed; mutation testing (Stryker) tells you whether failing that line actually causes test failures. For AI-generated test suites specifically, this gap is large: agents generate tests that execute code but don't assert its specific outputs.

**5. Run LLM-based analyses multiple times.** For inferential sensors (modularity reviews, coupling analysis), running twice without shared context surfaced issues the first run missed. Stakes determine cadence. This is not a failure of the approach — it is how probabilistic judgment works.

## The productivity measurement problem

The METR RCT (Becker et al., arXiv:2507.09089) is the only gold-standard study of AI productivity. Findings: 16 experienced developers, 246 real tasks on mature codebases, found AI made them **19% slower** (vs 24% forecast faster). Participants *believed* they'd been 20% faster. METR's Feb 2026 follow-up concluded new data was too noisy for a reliable signal.

The methodological lesson: **measuring AI-assisted productivity is genuinely hard.** Subjective reports are unreliable (participants were wrong about their own performance). Controlled studies narrow to specific task types. The METR result may not generalize to greenfield, simple, or exploratory tasks — but it should suppress overconfidence in productivity claims.

SWE-bench addresses a different question: not "does AI help developers" but "what can this coding agent actually do." It is an agent capability benchmark, not a human+AI productivity benchmark. The distinction matters.

## The sensors framework (Böckeler)

The most actionable contribution in this KB for eval design is Böckeler's sensors taxonomy:

| Type | Examples | Cost | Capability |
|------|----------|------|------------|
| Computational (deterministic) | ESLint, dependency-cruiser, type checker, Stryker | Cheap, fast, no token cost | Rules and structure expressible as code |
| Inferential (LLM-based) | Modularity review, coupling analysis, security checklists | Higher cost, slower | Semantic judgment rules cannot express |

Key design principles:
- **Encode self-correction guidance in sensor output**, not just the rule. Custom ESLint formatters with instructions measurably changed agent behavior where default messages did not. This is "prompt injection via lint output" — use it.
- **Raw coupling data produces false positives without semantic context.** Fan-in/fan-out metrics flagged a dependency-injection factory and a shared Zod schema as problems — both legitimate patterns. Best use for raw coupling data: impact-radius triage before code review.
- **AI will not self-refactor at 3x+ repetition without an explicit nudge.** Design inferential sensors to catch this pattern before it compounds.

## The gap: non-coding agents

Everything above applies to coding agents or RAG systems. The question "how do you eval an agent that does X" for non-coding X is almost entirely unaddressed in this KB.

Specific gaps:
- **Eval design for long-horizon agentic tasks.** SWE-bench covers bounded coding tasks (fix this GitHub issue). A multi-step research or capture pipeline has no analogous benchmark.
- **Eval for RAG quality beyond relevancy.** Fowler mentions DeepEval's `AnswerRelevancyMetric`, but calibrating acceptable score thresholds is unresolved — the `threshold=0.5` in the example is arbitrary.
- **DORA as insufficient for AI-era DX measurement.** Hurst (2026) notes adoption metrics tell you what people use, not whether the org is better off. No successor framework exists.

This KB itself has an implicit eval: the triage classification in `sources/skipped/` is an auditable record of quality decisions. Whether Haiku's automated classifications are as good as Sonnet's is an open empirical question — one that could be answered by running a sample through both models and comparing.

## Frank summary

The eval picture for production AI systems is maturing but fragmented. For RAG systems and coding agents, there are concrete methodologies: per-component evals, LLM-as-judge + human review, sensors (computational + inferential), mutation testing. For productivity measurement and non-coding agents, the honest answer is that the field hasn't developed reliable methods yet. The METR result should make anyone cautious about evaluating AI impact with self-report or anecdote.

The most actionable thing this KB can do: **instrument the automated capture pipeline with an explicit eval** — sample a batch of Haiku captures, compare triage decisions against Sonnet, measure signal level agreement. This would be a concrete user-derived data point and directly relevant to the two-tier processing plan.
