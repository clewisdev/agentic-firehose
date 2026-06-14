---
title: "20-person AI-native services company: the Claude Code Company OS repo structure"
url: https://www.linkedin.com/posts/dan-m-rosenthal_were-a-20-person-ai-native-services-company-share-7459935567636525057-hXac
authors: [Dan Rosenthal]
captured: 2026-05-20
source_type: post
topics: [harnesses, prompting]
tags: [claude-code, repo-structure, ai-native-services, skills, hooks, approvals, mcp, gtm, organizational-cognition, information-architecture, files-as-config, non-engineering]
status: summarized
confidence: medium-high
freshness_until: 2026-Q4
---

# Rosenthal — Company OS repo structure for a 20-person AI-native services firm

> Caveats: LinkedIn post via WebFetch (paraphrased). Engagement is real and high (1,096 reactions / 153 comments), and the commenters add substantive material. Author is co-founder of Workflows.io ("Growth playbooks using AI") so this is operational practice from a working team, not theory — but it's also self-promotional and there's no independent verification of the claimed productivity gains.

## Summary

Dan Rosenthal describes the repo structure his 20-person AI-native services company has converged on after testing 10+ variants. Every team member uses Claude Code against a shared "Company OS" GitHub repo. This is the **first source we have using Claude Code as a non-engineering business operating surface** — sales, GTM, ops, client work — rather than for software engineering. That distinction matters.

The architecture cleanly separates **agent instruction** from **organisational knowledge**:

**`.claude/` — AI instructional layer (how the agent behaves):**

- `skills/` — one file per task, deliberately flat (no nesting). Examples cited: TAM mapping, viral LinkedIn research, ICP matrices.
- `agents/` — longer workflows that compose multiple skills.
- `commands/` — slash commands for team operations.
- `hooks/` — **permission controls keyed to user role; tiered approvals.** Junior team members can't trigger unapproved actions.
- `rules/` — behavioural instructions that apply contextually based on which file the agent is operating on.

**Repo root — organisational layer (what the agent knows):**

- `CLAUDE.md` — core context + behavioural instructions.
- `INDEX.md` — content catalogue for efficient retrieval (so the agent isn't scanning the whole repo to find what it needs).
- `wiki/` — company knowledge base.
- `clients/` — one markdown per client with links to their repo/folder, Slack, Airtable.
- `raw-context/` — unsorted inputs (transcripts, briefs) staged before being distilled.
- `archive/` — valuable but outdated content kept for reference, out of the active path.

Integration surface: **20+ MCPs connecting their GTM stack** (Airtable cited explicitly for client records).

The post's framing pitch:

> "For non-technical GTM teams, this is the main reason to switch to Claude Code. The functionality you unlock when this is set up is worth all the hype."

## Comments worth keeping

Comments on this one are unusually substantive — several extend the post rather than just react.

- **Vignesh W.** — reframes the whole structure: *"an organizational cognition system, not file organization. Core innovation: separating memory, behavior, permissions, and workflows — shifting from prompt-centric to information architecture-centric thinking."* This is the sharpest articulation in the whole thread.
- **Himanshu Shukla** — adds two production-scale patterns: **atomic knowledge extraction** (raw narrative → distilled decisions/patterns rather than dumping transcripts) and a **context lookup hierarchy (4 levels, not everything in `CLAUDE.md`)**. Claims a 95% token reduction from markdown restructuring — unverified but directionally suggestive that flat-vs-tiered loading matters a lot.
- **Idan Schorr** — flags `hooks/` as the most underrated piece. Tiered approvals = governance at small team scale.
- **Noam Nisand** — repeats "one file per skill, flat" as deceptively-obvious but rarely done.
- **Lorenzo Di Cataldo** — the honest counter: *"Getting tacit knowledge from senior practitioners into markdown files is the harder problem; structure alone won't prevent wiki staleness."*

## Key quotes

> "We're a 20-person AI-native services company where every single team member uses Claude Code + our Company OS GitHub repo."

The setup. Note "every single team member" — this is mandated, shared infrastructure, not opt-in tooling.

> Vignesh W.: *"An organizational cognition system, not file organization."*

The right reframe. The structure works because it maps to *kinds of knowledge an agent needs* (memory, behaviour, permissions, workflows), not because flat folders are inherently better.

> Lorenzo Di Cataldo: *"Getting tacit knowledge from senior practitioners into markdown files is the harder problem."*

The honest limit. The repo structure is the easy half; populating it well is the hard half.

## Takeaways

- **This is the most fully-realised "files-as-config-for-the-agent" example in the KB so far.** Five sources now exhibit the pattern; this one is the most complete and the most team-scale. Synthesis is overdue (flagged separately).
- **Separating "how the agent behaves" from "what the agent knows" is the cleanest principle.** `.claude/` for instructional code; root for knowledge. Most amateur repos collapse both into one giant `CLAUDE.md` and pay for it in token cost and update friction.
- **Hooks for tiered approvals operationalise Berkin's "human approval points" at small scale.** Berkin asserted them abstractly; Rosenthal shows what they look like in `.claude/hooks/` — role-based permission controls so junior team members can't trigger high-stakes actions. This is harness governance you can actually ship next week.
- **INDEX.md beats letting the agent scan.** Maintaining a content catalogue so the agent can navigate by index rather than searching the whole repo is a real token-cost win at scale. Worth adopting in this KB.
- **"Skills as flat folder, one file per task" is now a convention across multiple sources** (Pocock, Rosenthal, implicit in POHA). Nesting is tempting and almost always wrong — it forces the agent to navigate a hierarchy you invented.
- **Non-engineering Claude Code use is real and serious.** The default mental model for Claude Code is "developer tool"; Rosenthal's team uses it as a *general-purpose operating surface* for a services business. The architecture transfers; the use cases broaden considerably.
- **The hard problem is content, not structure.** Lorenzo's counter is the one worth holding onto: a perfect repo structure populated with stale or shallow markdown gives you nothing. Tacit-knowledge extraction is the bottleneck.

## Open questions / things to verify

- **What does `INDEX.md` actually look like?** Auto-generated? Hand-maintained? How does the agent use it (loaded into context vs. searched on demand)? The post doesn't say.
- **The "4-level context lookup hierarchy" Shukla mentions.** Sounds important and reusable, but the structure isn't described in the post. Worth chasing — could be a separate write-up by Shukla.
- **How are hooks actually authored?** Claude Code's hook surface is documented (claude-mem instruments 5 of them); the role-based-permissions use case is less obvious. What's the actual code/config for tiered approvals?
- **Productivity claim.** "Worth all the hype" — no quantified before/after. Plausible but unmeasured.
- **MCP sprawl.** "20+ MCPs" is a lot. What's their failure mode profile and maintenance cost? Not discussed.
- **Tacit-knowledge extraction (per Lorenzo).** What's the actual mechanism for getting senior practitioners' implicit know-how into the wiki? The post is silent.

## Related

- `topics/harnesses/index.md`
- `topics/prompting/index.md`
- `topics/harnesses/cowork.md` — Cowork productises some of this for non-developers; Rosenthal's setup is the build-your-own version of the same idea.
- `sources/2026-05-20-pocock-skills.md` — same "flat skills folder" convention; same `CONTEXT.md` / `INDEX.md` family.
- `sources/2026-05-20-poha.md` — files-as-config at personal scale; Rosenthal is the team-scale version.
- `sources/2026-05-20-andre-micolon-dev-info.md` — same "documented entry point so the agent self-discovers" principle.
- `sources/2026-05-20-berkin-harness-engineering.md` — the "human approval points" Berkin lists abstractly are Rosenthal's `.claude/hooks/`.
