# Safety

Structural enforcement for agent behaviour — guardrails (approvals, budgets, secret masking), permission boundaries, OWASP LLM risks, and the distinction between prompting for behaviour vs. enforcing it structurally.

## Sources

- [Pydantic AI Harness — Production](../../sources/2026-05-31-pydantic-ai-harness-production.md) — guardrails as a composable harness module (approvals, budgets, secret masking); safety as one of six capability matrix dimensions for production agents.
- [Claude Code security plugin (Anthropic)](../../sources/2026-06-09-claude-security-plugin.md) — defense-in-depth in three layers: per-edit deterministic pattern match (zero model cost — `eval`, `pickle.loads`, `dangerouslySetInnerHTML`), end-of-turn fresh-context Opus review of the full diff (logic bugs: authz bypass, IDOR, SSRF), and a deeper agentic commit-time review. Surfaces findings as instructions, does not block. −30–40% security PR comments.
- [Claude Fable 5 Launch: Mythos-class Model with Safety Fallback Architecture](../../sources/2025-06-10-claude-fable-5-announcement.md) — safety-as-routing in production: every request passes classifiers (cyber/bio misuse); on trigger, Opus 4.8 answers instead. >95% of sessions never see a fallback; 1000+ red-team hours, no universal jailbreak. Classifier false positives (filename fuzzy-matching) already reported in the thread.
- [Augmented Coding Weekly #48: Claude Fable 5, AI safety, and the rockstar developer problem](../../sources/2026-06-12-augmented-coding-weekly-48.md) — Fable's relentless proactivity is double-edged: 'if it hits a wall it will not stop — it tries all manner of creative work-arounds and hacks.' Safety-via-classifier-routing is 'not 100% failsafe'; jailbreaks judged likely inevitable.
- [AI/ML Engineer Skills Beyond Prompt Engineering](../../sources/2026-06-10-ai-ml-engineer-skills.md) — production correctness/safety: prompt-injection defense, data-leakage prevention, function-calling reliability with argument validation + idempotency, agent loop/tool budgets to stop runaway agents. 'You learn these by shipping something real, watching it fail, and fixing it under constraints.'
- [Fragments: June 2 (AI metrics, open vs closed models, hallucinated citations, LLM-assisted security)](../../sources/2026-06-09-fowler-fragments-ai-metrics.md) — Ernst & Young hallucinated citations case: >50% of references fabricated; well-known firms publishing AI-generated slop 'poisons the well' for future researchers
- [Omnigent: Open-sourcing a meta-harness for AI agents](../../sources/2025-06-14-omnigent-meta-harness.md) — Omnigent contextual policies: security-team sandbox isolation; runtime-state-aware permissions more expressive than static role-based access for cost and security control in agent systems

## Synthesis

- [Harness Engineering: A 101](../../synthesis/harness-engineering-101.md) — permissions/guardrails section; OWASP LLM Top 10 mapped to harness layers.
