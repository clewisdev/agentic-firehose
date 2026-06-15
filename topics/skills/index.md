# Skills

Agent Skills as a first-class unit of capability: the `SKILL.md` / progressive-disclosure format, skill libraries and marketplaces, skill managers and packaging, and the design of individual skills. Distinct from `harnesses` (the surrounding operational layer) and `tool-use` (raw tool/MCP calls) — a skill is a portable, model-invokable bundle of instructions (and optional scripts/resources) that extends what an agent can do.

## Sources

- [Agent Skills Overview](../../sources/2026-06-14-agent-skills-overview.md) — the standardized Agent Skills format: a folder with `SKILL.md` (name, description, instructions) plus optional scripts/resources; progressive disclosure so the agent loads detail only when relevant. Reference for the canonical structure.
- [Skills For Real Engineers (Pocock)](../../sources/2026-05-20-pocock-skills.md) — composable slash-command skills as a counter-position to end-to-end frameworks (BMAD/Spec-Kit/GSD). What a well-designed harness extension via skills looks like.
- [grill-with-docs (Pocock)](../../sources/2026-06-10-grill-with-docs.md) — a `/grill-with-docs` slash-command skill: pre-build interview loop tied to a `CONTEXT.md` glossary + ADRs. Evolution of `/grill-me`; an example of a design-alignment skill that compounds shared language across sessions.
- [google/skills](../../sources/2026-05-28-google-skills-repo.md) — official Google skills library for GCP services; `npx skills add google/skills`. Validates the skills pattern as vendor-standard, not just practitioner practice.
- [Third-party skills repos](../../sources/2026-05-28-third-party-skills-repos.md) — mattpocock/skills and anthropics/skills; the emerging ecosystem of shareable skills.
- [agent-skill-manager (asm)](../../sources/2026-06-08-agent-skill-manager.md) — universal skill manager across AI coding agents; install/version/share skills as packages.
- [Packaging Copilot Agents & Skills with APM](../../sources/2026-06-13-packaging-github-copilot-apm.md) — Agent Package Manager for distributing GitHub Copilot agents and skills; packaging and distribution mechanics.
- [SkillOpt: Self-Evolving Agent Skills](../../sources/2026-06-15-skillopt-executive-strategy.md) — executive strategy for skills that improve themselves over time; evaluation-driven skill refinement.
- [Caveman skill](../../sources/2026-05-28-caveman-skill.md) — ultra-compressed communication skill (~65% token reduction, no infra). Example of a tactical, single-purpose skill.
- [Captain Hindsight skill](../../sources/2026-05-28-captain-hindsight-skill.md) — opt-in retro that converts session friction into harness improvements. `disable-model-invocation: true`. Example of a governance/process skill.
- [knowledge-base-wiki skill](../../sources/2026-05-28-kbwiki-skill.md) — Karpathy-inspired two-layer KB skill (raw/ + wiki/) with Ingest/Query/Archive/Lint operations. Example of a knowledge-management skill.
- [an internal enterprise team Teams snippet](../../sources/2026-05-28-internal-teams-snippet.md) — captain-hindsight + caveman skills in a real team setup, alongside model routing by task type.
- [Andrej Karpathy Skills — CLAUDE.md Principles](../../sources/2026-05-28-karpathy-skills-claude-md.md) — four Karpathy principles packaged as an installable skill / `CLAUDE.md` (viral, 160k★). Treat as packaging, not research — an example of conventions distributed in skill form.
- [Agent Skills: Structured Workflows for Production-Grade AI Code Generation](../../sources/2025-06-11-agent-skills-structured-workflows.md) — agent-skills repo (52K★, #1 trending): 7 slash commands (/spec /plan /build /test /review /code-simplify /ship) encoding engineering discipline. Two structural innovations: anti-rationalization tables block the excuse on entry; verification gates block false completion on exit.
