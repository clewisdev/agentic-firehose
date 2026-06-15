# Evals

Evaluation frameworks, benchmarks, and methodologies for assessing agent and LLM capability. How to measure whether an agent actually works, and how to generate evaluation data.

## Synthesis

- [Evaluating agents: what we know and where the gaps are](../../synthesis/eval-methodology.md) (2026-05-30, draft) — LLM-as-judge + human eval as the production combination; per-component evals localise regressions; sensors framework (computational vs inferential); mutation testing over coverage; the METR productivity measurement problem; gap on non-coding agent evals.

## Sources

- [SWE-bench + SWE-smith](../../sources/2026-05-28-swebench-swesmith.md) — canonical coding agent benchmark (SWE-bench) and its synthetic training data generator (SWE-smith). Reference standard for comparing coding agent capability. **Freshness note**: leaderboard rankings change frequently; check swebench.com for current standings.

- [CAG vs vanilla prompting](../../sources/2026-05-29-cag-vs-vanilla-prompting.md) — contains the most significant productivity eval in the KB: METR RCT (Becker et al., arXiv:2507.09089) — 16 experienced developers, 246 real tasks, found AI made them **19% slower** (vs 24% forecast faster). Mature codebase setting. Also: METR Feb 2026 follow-up found new data too noisy for a reliable signal.
- [Böckeler — Maintainability sensors for coding agents](../../sources/2026-05-30-fowler-maintainability-sensors.md) — mutation testing (Stryker) as the right regression sensor: 100% coverage ≠ effective tests; mutation survivors reveal missing assertions. LLM modularity review as an inferential eval — run multiple times for high-stakes decisions (two runs caught issues one missed). AI helping AI: custom CLI to query Stryker JSON avoids context overflow. Feedback loop only works if sensors output feeds back into the agent's self-correction loop.
- [Fowler/Subramaniam — Emerging Patterns in Building GenAI Products](../../sources/2026-05-30-fowler-genai-patterns.md) — evals as non-deterministic tests run in CI and on live systems. LLM-as-judge + human eval as the recommended combination; self-evaluation actively discouraged. Eval per component (guardrails, reranker, query rewriting) not just end-to-end — localises regressions. DeepEval code example.

- [UpHill Workshop — Index](../../sources/2026-05-28-uphill-workshop-pdfs.md) — workshop index; evals content is distributed across component captures.
- [SkillOpt: Self-Evolving Agent Skills](../../sources/2026-06-15-skillopt-executive-strategy.md) — validation-driven optimization as the eval mechanism: edits accepted only on strict held-out improvement; rejected-edit buffer guards against overfitting noisy rollout scores. Benchmarked on 52 (model × benchmark × harness) cells, winning or tying every cell against human/one-shot/TextGrad/GEPA baselines.
- [Context & Harness Engineering - The Transition to Agentic Software Delivery](../../sources/2026-06-14-context-harness-engineering.md) — 'You cannot govern what you cannot measure' — without baselines and instrumentation, AI-generated security/tech debt surfaces as production incidents rather than being caught. DPI platforms positioned as the data backbone for evaluation.

## Open threads

- No sources yet on: eval design for non-coding agents, eval for RAG quality, or evaluation methodology for long-horizon agentic tasks. SWE-bench covers coding specifically — the broader question of "how do you eval an agent that does X" is unaddressed.
- DORA as insufficient for AI-era DX measurement: Hurst (2026) notes adoption metrics tell you what people use, not whether the org is better off. No successor framework exists. See `sources/2026-05-29-jamie-hurst-is-this-sustainable.md` and `topics/ai-productivity/dx-culture.md`.
