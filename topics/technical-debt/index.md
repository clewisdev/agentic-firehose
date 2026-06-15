# Tech debt

How AI-assisted development changes tech debt accumulation and remediation — agents hide guilt-triggering hacks (increasing accumulation), but also make bulk refactoring cheap (enabling cleanup at scale if leadership prioritizes it).

## Sources

- [Building OpenCode with Dax Raad](../../sources/2026-06-02-opencode-podcast-dax-raad.md) — agents hide hacks, reducing intrinsic guilt and increasing debt accumulation; bulk refactoring now cheap (apply a pattern across codebase instantly); enterprise patterns (DDD) returning as agent navigation scaffolding.
- [The AI Engineering Report 2026 — Ten Takeaways](../../sources/2026-06-12-ai-engineering-report-2026.md) — quantifies the debt: code churn (deleted/added) +861% — the "asterisk on every output number." Open question it raises: how much churn is productive refactoring vs rework of bad AI code (needs Git-provenance analysis). Defect debt compounds, not stabilises, with maturity.
- [Context as Code: Build-time Governance in the Era of Infinite Syntax](../../sources/2026-06-13-context-as-code.md) — 'comprehension debt' compounds silently — velocity and coverage mask structural risk in generated codebases; it deserves explicit measurement before it becomes architectural risk.
- [Will There Be Source Code in the Future?](../../sources/2026-06-09-will-there-be-source-code-future.md) — 'cognitive debt is the new technical debt' (Fuchs): generation scales faster than architectural comprehension, so maintaining the shared mental model of *why* becomes the limiting factor. Open question: how do you even measure cognitive debt across teams?
- [Fragments: June 2 (AI metrics, open vs closed models, hallucinated citations, LLM-assisted security)](../../sources/2026-06-09-fowler-fragments-ai-metrics.md) — 'Generative debt': LLMs see confused code as precedent, not debt — poor patterns reproduced at scale; code quality hygiene is now a model-steering problem
- [AI Accelerates Bottleneck in Software Engineering](../../sources/2026-06-08-ai-bottleneck-software-engineering.md) — Bottleneck-first evaluation: optimizing non-bottleneck steps (code generation speed) produces theater, not value; legacy modernization as the well-defined task where AI addresses a real bottleneck (3x faster)
