# Prompting

System prompts, project files, style control, instruction patterns, anti-patterns, and the surface area through which you steer model behaviour without retraining.

## Sources

- [It's not X, it's Y (Hassid)](../../sources/2026-05-20-its-not-x-its-y.md) — catalogues "negative parallelism" and ~15 variants as a top LLM writing tell. Proposes a loadable `anti-style.md` file as the mitigation. Pattern observation is strong; statistical claims and some prescriptions (em-dash bans) are weak.
- [POHA](../../sources/2026-05-20-poha.md) — illustrates "the configuration is the product": templated `CLAUDE.md` with placeholders (`{{USER_NAME}}`, tier definitions) + per-domain markdown files steer the agent's behaviour without code.
- [Pocock — Skills For Real Engineers](../../sources/2026-05-20-pocock-skills.md) — composable Claude Code slash commands. Named four-mode failure taxonomy. Pre-execution alignment interview pattern (`/grill-me`). `CONTEXT.md` as a shared domain lexicon (DDD applied to agent context).
- [André-Micolon — the `dev:info` pattern](../../sources/2026-05-20-andre-micolon-dev-info.md) — document a single `dev:info` entry-point script in `AGENTS.md`/`CLAUDE.md` so the agent self-discovers the runtime environment. Prompts collapse from "here's the URL/SQL/path, please debug" to "fix it."
- [Rosenthal — Company OS repo structure](../../sources/2026-05-20-rosenthal-company-os.md) — team-scale information architecture. Separates `.claude/` (instructional) from root (knowledge). Commenter Vignesh W. frames it as "shifting from prompt-centric to information architecture-centric thinking."

## Synthesis

- [Files-as-config for agents: when, why, and how](../../synthesis/files-as-config-for-agents.md) (2026-05-20, draft) — cross-source distillation. Names the 7-category taxonomy of agent-loadable file content (style, lexicon, runtime, memory, skills, org knowledge, governance) and the boundary at which the pattern hands off to DB-backed approaches.

## Open threads

- **Skills as flat folder, one file per task.** Pocock and Rosenthal both converge on this convention explicitly. Worth a focused note once we have a third concrete data point.
- **Pre-execution alignment.** Pocock formalises it as a slash command; the underlying pattern (interview before act) is broader. Worth a focused note once a second source addresses it.
