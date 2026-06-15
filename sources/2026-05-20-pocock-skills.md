---
title: "Skills For Real Engineers"
url: https://github.com/mattpocock/skills
authors: [Matt Pocock]
captured: 2026-05-20
source_type: repo
topics: [skills, prompting, harnesses]
tags: [claude-code, skills, slash-commands, tdd, debugging, alignment, ddd, shared-language, prds, triage, composability, mattpocock, agent-failure-modes, context-md]
signal_level: high
status: summarized
confidence: medium-high
freshness_until: 2026-Q4
---

# mattpocock/skills — Skills For Real Engineers

> Caveats: README via WebFetch (paraphrased). Reported metadata: 96,728 stars in ~3.5 months. That's at the top of the plausible range even for a known author (Pocock = TotalTypeScript) — treat the exact number with mild skepticism but the *signal of strong adoption* is real (active commits, last push 2026-05-20, 31 open issues). Created 2026-02-03, MIT-licensed (per API; README license field not surfaced).

## Summary

A curated, composable collection of Claude Code skills (slash commands) Matt Pocock uses daily. Positioned explicitly *against* the "framework that owns your whole workflow" approach (GSD, BMAD, Spec-Kit) — Pocock's bet is on **small, swappable, easy-to-adapt skills you stay in control of**, built around classic engineering practices (TDD, structured debugging, PRDs, triage, shared language).

The repo opens with a named taxonomy of **four failure modes** in agent-assisted development, which is itself the most reusable thing in the project:

1. **Misalignment** between developer intent and agent output.
2. **Verbosity without domain context** — agents produce a lot of generic prose because they don't know the project's vocabulary.
3. **Code that doesn't work** because the feedback loop is broken (no tests, no reproduction, no instrumentation).
4. **Accumulating tech debt and architectural complexity** that's never paid back down.

Each included skill maps to mitigating one of these.

**Engineering skills:**

- `/grill-with-docs` — alignment interview that *builds shared domain language* and updates a `CONTEXT.md`. (Addresses misalignment + verbosity-without-context simultaneously.)
- `/tdd` — red-green-refactor loop. (Addresses broken feedback loops.)
- `/diagnose` — structured debugging: reproduce → minimise → hypothesise → instrument → fix → test. (Broken feedback loops.)
- `/improve-codebase-architecture` — periodic (~weekly) architectural review using the shared lexicon. (Tech debt.)
- `/to-prd` — converts conversation into a PRD.
- `/triage` — issue state-machine workflow.
- `/prototype` — throwaway prototypes for design exploration before commitment.

**Productivity skills:**

- `/grill-me` — general-purpose alignment interview, ungrounded in docs. The pre-execution checkpoint pattern.
- `/caveman` — ultra-compressed communication, claimed ~75% token reduction. (Mechanism not detailed.)
- `/handoff` — packages conversation state for handoff to another agent.

Install via `npx skills@latest add mattpocock/skills`, then `/setup-matt-pocock-skills` configures per-repo settings (issue tracker, triage labels, docs location).

The single most interesting concrete artifact is the **`CONTEXT.md` shared-language file** seeded by `/grill-with-docs`. Pocock's worked example:

> Before: "There's a problem when a lesson inside a section of a course is made 'real' (i.e. given a spot in the file system)"
> After: "There's a problem with the materialization cascade"

The point: ad-hoc paraphrase forces the agent to re-decode the domain every turn, burning tokens and producing inconsistent naming. Investing once in a domain lexicon collapses that cost and stabilises code naming. This is straight domain-driven design transplanted into agent context engineering.

## Key quotes

> "Agent skills that I use every day to do real engineering — not vibe coding."

The framing thesis. Pocock is positioning against the "describe what you want and pray" mode of agent use.

> "Small, easy to adapt, and composable."

The design constraint that distinguishes this from frameworks like BMAD/Spec-Kit. Skills are MD files you can read, fork, and trim.

> Before/after on shared language: "made real / given a spot in the file system" → "the materialization cascade."

The clearest demonstration in the repo of why shared language matters. Worth holding onto as a teaching example.

## Takeaways

- **The "four failure modes" taxonomy is reusable independent of this repo.** When designing your own agent workflows, ask which of misalignment / verbosity-without-context / broken feedback loops / unmanaged complexity your design addresses, and which you're punting on.
- **Pre-execution alignment is a high-leverage pattern.** `/grill-me` and `/grill-with-docs` formalise a checkpoint *before* the agent runs off. For non-trivial tasks, asking the agent to interview you (or interview the codebase + docs) before acting will catch misunderstandings cheaply. This pattern generalises far beyond Pocock's skills.
- **`CONTEXT.md` as a shared lexicon is the underrated insight.** It's just a markdown file enumerating the project's domain terms with definitions. Cheap to maintain, large effect on agent output quality and naming consistency. Worth doing in any non-trivial project regardless of which skill pack you adopt — including this KB.
- **"Small composable skills" vs "end-to-end framework" is a real design choice in this space.** Frameworks (BMAD, Spec-Kit, GSD) own the process and give you opinionated structure at the cost of obscured control. Skill packs (Pocock, Anthropic's own marketplace) give you composable building blocks at the cost of having to assemble them. The skill-pack approach is more aligned with how experienced engineers actually work; the framework approach is more legible to teams without prior agent experience.
- **`/caveman` (compressed communication) deserves separate investigation.** A 75% token-reduction claim — if real and not too lossy — is a meaningful productivity lever. Mechanism not detailed in the README. Worth reading the actual skill file.
- **Pocock is the right kind of source.** Working engineer, established teaching record (TotalTypeScript), specific opinions grounded in real projects (`course-video-manager`). Weight this higher than influencer "how to AI" content for actual operational guidance.

## Open questions / things to verify

- **Where do skills install?** The README says `npx skills@latest add mattpocock/skills`. Presumably writes to `.claude/commands/` (or `~/.claude/commands/`) — but worth confirming, and worth understanding whether they're project-scoped or global.
- **Relationship to Anthropic's official skill marketplace.** Pocock's skills are MD slash commands — same format as Anthropic-published skills? Or a parallel convention? Affects whether they can be cross-installed.
- **`/caveman` mechanism.** How does it achieve ~75% token reduction? Compression of agent responses, system-prompt rewrite, or response-format constraint? Lossiness profile?
- **Skill quality evals.** Pocock asserts these are what he uses; no benchmark vs vanilla Claude Code. Plausible but unmeasured.
- **`CONTEXT.md` maintenance cost.** Shared lexicon decays as the codebase evolves. Is the expectation that `/grill-with-docs` is re-run periodically? Or does the agent maintain it as code changes?
- **The "framework vs composable" framing is fair to BMAD/Spec-Kit only if those frameworks really do obscure control.** Worth reading them directly before fully endorsing Pocock's positioning.

## Related

- `topics/prompting/index.md` — skills are essentially packaged prompts/workflows.
- `topics/harnesses/index.md` — skills extend Claude Code's harness surface.
- `sources/2026-05-20-poha.md` — also uses `CLAUDE.md` + markdown files to steer the agent; same files-as-config family.
- `sources/2026-05-20-its-not-x-its-y.md` — same "loadable style/context file" pattern, applied to writing style.
