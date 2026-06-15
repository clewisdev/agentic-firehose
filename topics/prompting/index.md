# Prompting

System prompts, project files, style control, instruction patterns, anti-patterns, and the surface area through which you steer model behaviour without retraining.

## Sources

- [It's not X, it's Y (Hassid)](../../sources/2026-05-20-its-not-x-its-y.md) — catalogues "negative parallelism" and ~15 variants as a top LLM writing tell. Proposes a loadable `anti-style.md` file as the mitigation. Pattern observation is strong; statistical claims and some prescriptions (em-dash bans) are weak.
- [POHA](../../sources/2026-05-20-poha.md) — illustrates "the configuration is the product": templated `CLAUDE.md` with placeholders (`{{USER_NAME}}`, tier definitions) + per-domain markdown files steer the agent's behaviour without code.
- [Pocock — Skills For Real Engineers](../../sources/2026-05-20-pocock-skills.md) — composable Claude Code slash commands. Named four-mode failure taxonomy. Pre-execution alignment interview pattern (`/grill-me`). `CONTEXT.md` as a shared domain lexicon (DDD applied to agent context).
- [André-Micolon — the `dev:info` pattern](../../sources/2026-05-20-andre-micolon-dev-info.md) — document a single `dev:info` entry-point script in `AGENTS.md`/`CLAUDE.md` so the agent self-discovers the runtime environment. Prompts collapse from "here's the URL/SQL/path, please debug" to "fix it."
- [Rosenthal — Company OS repo structure](../../sources/2026-05-20-rosenthal-company-os.md) — team-scale information architecture. Separates `.claude/` (instructional) from root (knowledge). Commenter Vignesh W. frames it as "shifting from prompt-centric to information architecture-centric thinking."

- [Fowler/Subramaniam — Emerging Patterns in Building GenAI Products](../../sources/2026-05-30-fowler-genai-patterns.md) — RAG prompt template pattern: explicit instruction to acknowledge gaps ("do not fabricate if the answer is not in the dossier"). Query Rewriting: LLM generates multiple reformulations of ambiguous user queries before retrieval — compensates for users who can't articulate intent precisely.
- [CAG vs vanilla prompting](../../sources/2026-05-29-cag-vs-vanilla-prompting.md) — long-form synthesis with academic citations. Key findings: every frontier model degrades with input length (context rot, Chroma 2025); METR RCT found AI 19% slower on mature codebases; rules-as-nudges not guarantees; "recite your build commands" acid test; ~150-line limit; Anthropic's own stance is hybrid JIT + files-as-config, not pure-CAG. `AGENTS.md` now a Linux Foundation standard.

- [SkillOpt: Self-Evolving Agent Skills](../../sources/2026-06-15-skillopt-executive-strategy.md) — the rigorous end of prompt engineering: skill/prompt text as learnable parameters optimized via bounded add/delete/replace edits, accepted only when held-out validation improves. Reproducible optimization vs ad-hoc hand-tuning; +19–25 pts over no-skill baselines across models/harnesses.
- [Harness engineering: Codex in an agent-first world (OpenAI)](../../sources/2026-06-13-harness-engineering-codex.md) — "give Codex a map, not a 1,000-page instruction manual." Direct evidence that a monolithic `AGENTS.md` fails at scale (context-crowding, pattern-matching over intentional navigation, instant rot); the fix is distributed, queryable, mechanically-verified constraints — a second strong data point for the open thread below.
- [grill-with-docs: Align Before You Build (Pocock)](../../sources/2026-06-10-grill-with-docs.md) — evolves `/grill-me` into a pre-build interview loop tied to a `CONTEXT.md` glossary of ubiquitous language; the AI challenges fuzzy terms, surfaces cardinality/semantics tensions, and writes ADRs only for hard-to-reverse decisions. "This distinction will affect every variable name the AI generates." Second formalisation of pre-execution alignment (see open thread).
- [AI Engineering Coach – VS Code Extension for AI Session Analysis](../../sources/2025-06-14-ai-engineering-coach.md) — AI Engineering Coach: 45-rule anti-pattern taxonomy (prompt quality, session hygiene, code review, tool mastery, context) as a practical reflection framework; editable markdown rules with live playground

## Synthesis

- [Files-as-config for agents: when, why, and how](../../synthesis/files-as-config-for-agents.md) (2026-05-20, draft) — cross-source distillation. Names the 7-category taxonomy of agent-loadable file content (style, lexicon, runtime, memory, skills, org knowledge, governance) and the boundary at which the pattern hands off to DB-backed approaches.

## Open threads

- **Skills as flat folder, one file per task.** Pocock and Rosenthal both converge on this convention explicitly. Worth a focused note once we have a third concrete data point.
- **Pre-execution alignment.** Pocock formalises it as a slash command; the underlying pattern (interview before act) is broader. Worth a focused note once a second source addresses it.
- **Rules reliability.** Crosley (2026, cited in `sources/2026-05-29-cag-vs-vanilla-prompting.md`) found common `AGENTS.md` patterns produced no observable behaviour change across 10+ runs. No second source yet. If confirmed by further work, this is a significant downgrade of files-as-config as a behavioural guarantee.
- **AGENTS.md as Linux Foundation standard.** The ecosystem is consolidating. Does this change how we should structure `AGENTS.md` vs `CLAUDE.md` in this KB and in the Cloudflare Worker?
