# Cost Management

LLM API costs, rate limiting, token optimization, prompt caching, and model selection economics for agentic systems. Distinct from general frugality — focused on where token budgets are *structurally* wasted in agentic architectures and what patterns address it.

## Sources

- [Brussee — Caveman-Code](../../sources/2026-05-28-brussee-caveman-code.md) — 1.93x token reduction via terse replies, per-tool output caps, ANSI stripping, file-read deduplication, optional Rust preprocessing. Benchmark: 524k tokens vs Codex CLI's 1,010k on 25-task suite. ~4% accuracy trade-off.
- [an internal enterprise team Teams snippet](../../sources/2026-05-28-internal-teams-snippet.md) — captain-hindsight: post-session retrospective that improves future sessions by making interactions more deterministic. Complement to runtime compression. Also: multi-model routing by task type.

- [UpHill — Real workflows](../../sources/2026-05-28-uphill-real-workflows.md) — smart/dumb zone framing: past ~30% token fill is operational warning sign; start fresh session with handoff summary. Model routing: smart for planning (Opus 4.7), fast for mechanical execution (Sonnet 4.6). "Rules push, content pulls" — lean CLAUDE.md is cheaper than fat CLAUDE.md.

## Open threads

- **Runtime compression vs process optimization.** Caveman compresses outputs at runtime (fewer tokens per response); captain-hindsight reduces round-trips (fewer responses per task). Both reduce cost, but at different leverage points. A direct comparison — for a given task type, which strategy yields better cost/correctness trade-offs — would be valuable.
- **Per-tool output caps as a harness-level concern.** Brussee implements this in caveman-code; it's not a first-class feature of Claude Code's built-in harness. Is this configurable via AGENTS.md or hooks, or does it require a custom wrapper?
- **Prompt caching economics.** AGENTS.md is read on every invocation; caching it should be cheap. But the cache TTL (5 minutes per the system) means long-running batch processing may incur repeated full-file ingestion costs. Worth quantifying for the cloud capture agent use case.
