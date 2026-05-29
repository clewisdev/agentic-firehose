# Evals

Evaluation frameworks, benchmarks, and methodologies for assessing agent and LLM capability. How to measure whether an agent actually works, and how to generate evaluation data.

## Sources

- [SWE-bench + SWE-smith](../../sources/2026-05-28-swebench-swesmith.md) — canonical coding agent benchmark (SWE-bench) and its synthetic training data generator (SWE-smith). Reference standard for comparing coding agent capability. **Freshness note**: leaderboard rankings change frequently; check swebench.com for current standings.

- [CAG vs vanilla prompting](../../sources/2026-05-29-cag-vs-vanilla-prompting.md) — contains the most significant productivity eval in the KB: METR RCT (Becker et al., arXiv:2507.09089) — 16 experienced developers, 246 real tasks, found AI made them **19% slower** (vs 24% forecast faster). Mature codebase setting. Also: METR Feb 2026 follow-up found new data too noisy for a reliable signal.

## Open threads

- No sources yet on: eval design for non-coding agents, eval for RAG quality, or evaluation methodology for long-horizon agentic tasks. SWE-bench covers coding specifically — the broader question of "how do you eval an agent that does X" is unaddressed.
