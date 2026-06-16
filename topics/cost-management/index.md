# Cost Management

LLM API costs, rate limiting, token optimization, prompt caching, and model selection economics for agentic systems. Distinct from general frugality — focused on where token budgets are *structurally* wasted in agentic architectures and what patterns address it.

## How-to guide

- [How to use the cost management stack](how-to-use-the-stack.md) — practical reference: when to invoke each layer, how the session-start hook works, model selection guide, quick-reference table.

## Sources

- [Brussee — Caveman-Code](../../sources/2026-05-28-brussee-caveman-code.md) — 1.93x token reduction via terse replies, per-tool output caps, ANSI stripping, file-read deduplication, optional Rust preprocessing. Benchmark: 524k tokens vs Codex CLI's 1,010k on 25-task suite. ~4% accuracy trade-off.
- [Caveman skill](../../sources/2026-05-28-caveman-skill.md) — standalone SKILL.md for `/caveman` mode in Claude Code. 65-75% output token reduction benchmarked on real tasks. Five intensity levels. Preserved in `skills/caveman/`, installed as `.claude/commands/caveman.md`.
- [Third-party skills repos](../../sources/2026-05-28-third-party-skills-repos.md) — `mattpocock/skills` and `anthropics/skills`. Caveman + handoff installed. Handoff skill directly supports the 30%-threshold session-transition practice.
- [an internal enterprise team Teams snippet](../../sources/2026-05-28-internal-teams-snippet.md) — captain-hindsight: post-session retrospective that improves future sessions by making interactions more deterministic. Complement to runtime compression. Also: multi-model routing by task type.

- [UpHill — Real workflows](../../sources/2026-05-28-uphill-real-workflows.md) — smart/dumb zone framing: past ~30% token fill is operational warning sign; start fresh session with handoff summary. Model routing: smart for planning (Opus 4.7), fast for mechanical execution (Sonnet 4.6). "Rules push, content pulls" — lean CLAUDE.md is cheaper than fat CLAUDE.md.
- [Anthropic prompt caching](../../sources/2026-05-28-anthropic-prompt-caching.md) — cache reads cost 0.1× base input (90% discount). `cache_control: {"type": "ephemeral"}` on static system prompt block. 5m default TTL, 1h optional. Min 1,024 tokens for Sonnet. Track via `cache_creation_input_tokens` / `cache_read_input_tokens` in response. AGENTS.md (~3k tokens) is above Sonnet minimum — cache it in the Worker.
- [Claude Fable 5 & Mythos 5 (Anthropic)](../../sources/2026-06-10-claude-fable-5-mythos-5.md) — Fable 5 GA pricing: $10 / $50 per M input/output tokens — less than half the Mythos Preview rate. The economics that make long-horizon autonomous runs (the 9.5–12h sessions Mollick describes) viable; "the longer and more complex the task, the larger Fable's lead."
- [Captain Hindsight skill](../../sources/2026-05-28-captain-hindsight-skill.md) — post-session retro that converts session friction into AGENTS.md rules, skills, or scripts. Identifies token burn, quality misses, tool gaps, rule/skill misses, process misses. Hard cap 5 entries. `disable-model-invocation: true` — opt-in only, not automatic. Invoke with `/captain-hindsight` after expensive sessions.
- [Claude Fable 5 Launch: Mythos-class Model with Safety Fallback Architecture](../../sources/2025-06-10-claude-fable-5-announcement.md) — fallback-as-routing economics: API `fallbacks` param retries blocked turns on Opus 4.8 server-side, preserving partial output. Commenters flag token-burn and multi-tier cost strategy as table-stakes — capability alone doesn't drive adoption.
- [Enterprise AI Agent Cost Management Playbook](../../sources/2026-06-13-enterprise-ai-agent-cost-playbook.md) — tiered model access: gate frontier models to a specialist 'Agentic Workflow Engineers' team, give everyone cost-effective models. Hardcode the optimal model into each workflow and its subagents rather than exposing runtime choice — shrinks the blast radius of cost overruns and simplifies audit trails.
- [The Return of the Memory Budget](../../sources/2026-06-12-return-memory-budget.md) — the 'memory budget' returns: as Copilot/Anthropic move to metered billing (June 2026), an unguided agent in a compile-test-fix loop can burn $20–50/hr; a 50-dev team running unoptimized workflows faces $50k+/month. 'Build-Time OpEx' is a direct cost line now, not sunk labor — audit 'Return on Token'. [medium-confidence: the $/hr figure isn't methodologically backed]
- [AI/ML Engineer Skills Beyond Prompt Engineering](../../sources/2026-06-10-ai-ml-engineer-skills.md) — observability as cost control: token-level tracing, per-*feature* (not just per-model) cost attribution, latency profiling, drift detection — surfacing cost overruns and runaway agents before they reach the invoice.

## The cost reduction stack (complementary layers)

| Layer | Technique | Mechanism | When it applies |
|-------|-----------|-----------|----------------|
| Cross-session | Prompt caching | AGENTS.md cached 90% cheaper on hits | Multiple calls within TTL window |
| Session structure | Smart/dumb zone + `/handoff` | Fresh session + handoff summary at 30% fill | Any long session |
| Session structure | Captain Hindsight | Post-session retro → deterministic scripts replace LLM calls | After expensive sessions |
| Per-response | Caveman skill | Compressed model output (65% reduction) | During session |
| Per-response | Per-tool output caps | ANSI stripping, JSON extraction, cap at N tokens | During session (caveman-code) |

- [UpHill Workshop — Index](../../sources/2026-05-28-uphill-workshop-pdfs.md) — workshop index; cost-management content is in the real-workflows capture (smart/dumb zone, model routing).
- [Dynamic Workflows for Claude Code](../../sources/2026-05-30-claude-code-dynamic-workflows.md) — explicitly flagged as high token consumption by Anthropic; commenter reports session limits in 30–40 min on Max 20x. Dynamic multi-agent runs need a cost-management strategy before use. [low-signal]
- [CAG vs vanilla prompting](../../sources/2026-05-29-cag-vs-vanilla-prompting.md) — **context rot** (Chroma 2025, 18 frontier models): every model degrades with input length, even below nominal window capacity. *Lost in the middle* (TACL 2024): >30% accuracy drop for mid-context material. EMNLP 2025: context length alone hurts even with perfect retrieval. Practical ceiling: ~50% window fill. Reinforces lean-AGENTS.md practice and the Caveman/caveman-code approach.

## Open threads

- **Runtime compression vs process optimization.** Caveman compresses outputs at runtime; captain-hindsight reduces round-trips. A direct comparison — for this KB's capture workflow specifically, which yields better cost/correctness trade-offs — would be useful to run empirically.
- **Per-tool output caps as a harness-level concern.** Brussee implements this in caveman-code. Applicability to the Cloudflare Worker (where WebFetch responses can be large): preprocess the fetched content before sending to the model rather than letting the model receive raw HTML output.
- **TTL choice for the Worker.** Current recommendation is 5m default (low volume), switch to 1h for batch sessions. The threshold (>2 captures per hour) should be confirmed against actual Worker log data once live.

## Synthesis

- [Token Economics: When Architecture Became Finance Engineering](../../synthesis/cost-management.md) (2026-06-16, draft) — across eight sources: the subsidy cliff, why verbosity not reasoning is the primary cost driver (Brussee 1.93× benchmark), the five-layer cost stack (caching/session-structure/captain-hindsight/caveman/per-tool), enterprise governance (hardcoded model bindings, tiered access, ROI-first expansion), and the unresolved verification-cost loop.
