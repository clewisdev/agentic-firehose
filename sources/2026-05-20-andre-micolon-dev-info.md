---
title: "AI-assisted (engineering) work tip — the dev:info pattern"
url: https://www.linkedin.com/posts/benjaminandremicolon_%F0%9D%90%80%F0%9D%90%88-%F0%9D%90%9A%F0%9D%90%AC%F0%9D%90%AC%F0%9D%90%A2%F0%9D%90%AC%F0%9D%90%AD%F0%9D%90%9E%F0%9D%90%9D-%F0%9D%90%9E%F0%9D%90%A7%F0%9D%90%A0%F0%9D%90%A2%F0%9D%90%A7%F0%9D%90%9E%F0%9D%90%9E%F0%9D%90%AB%F0%9D%90%A2-share-7460252175957561345-e09Q
authors: [Benjamin André-Micolon]
captured: 2026-05-20
source_type: post
topics: [harnesses, prompting]
tags: [dev-environment, self-discovery, agents-md, claude-md, autonomous-debugging, dev-info, context-engineering, files-as-config]
signal_level: medium
status: summarized
confidence: medium
freshness_until: evergreen
---

# André-Micolon — the `dev:info` pattern

> Caveats: LinkedIn post, ~1 week old as of capture, small engagement (30 reactions / 5 comments). Pattern is sound and the author has operational skin in the game (runs his business through Claude/Codex agents), but it's a personal tactic, not a measured study. "PI" is named alongside Claude/Codex/OpenCode as an agent harness — I don't recognise it, could be a real tool or a paraphrase artifact.

## Summary

A short, concrete workflow tip from Benjamin André-Micolon (~15 years coding background, last 8 months almost entirely managing agents instead of writing code). The pattern in two steps:

1. **Create a `dev:info` script** (bash command or npm script) that prints everything an agent needs to know about the running dev environment: which services are up, where their checkouts live, what endpoints they expose, how to hit their databases, where their logs are.
2. **Document the script in `AGENTS.md` / `CLAUDE.md`** as the "one-stop for debugging."

The agent now self-discovers context instead of needing to be told. Combined with a `/goal` command (described as enabling "fully autonomous workflow to fix bugs, optimise queries, investigate shortcomings"), the prompt complexity collapses dramatically.

The before/after demos are the strongest part of the post:

| Task | Before | After |
| --- | --- | --- |
| Debugging | "Please connect to http://localhost:4000/api/users and debug why it's failing" | "The users endpoint is failing. Fix it" |
| Optimisation | "In prod, the users query is super slow [pasted SQL]. What can be the cause?" | "Optimise the users query. Assume 37M rows in the table" |

The shift: the prompt stops carrying environmental scaffolding (URLs, ports, SQL paste-ins) because that information is reachable through the documented entry point. Author summarises it as: *"Your agent goes from 'where is it? what is it?' to 'I'm on it'."*

Author context: runs his company (sales, marketing, SEO, engineering) through Claude and Codex agents, with a GitHub-folder-per-domain structure. So this isn't theoretical — it's the pattern he uses to keep agents productive across business functions.

## Key quotes

> "Your agent goes from: 'where is it? what is it?' to 'I'm on it'."

The clearest articulation of what the pattern buys you. Removes the agent's environment-discovery latency at the start of every task.

> Pedro Fernandes Thomaz (commenter): *"Agents that know the environment from line one drift a lot less."*

Independent corroboration. Worth more than the post's own claim because it's from someone in a different setup reporting the same effect.

> Mrityunjay Singh (commenter): asks whether harnesses risk running out of context managing multiple agents.

The legitimate counter-concern. Self-discovery is cheap when the agent runs `dev:info` once per session; expensive if always-on context.

## Takeaways

- **Documented entry points beat prompt boilerplate.** Instead of pasting URLs / SQL / paths into every prompt, expose a single command (`dev:info`, `make status`, `bun run check`, whatever) and document it in `AGENTS.md`. The agent runs it when it needs to and stays out of it otherwise.
- **The pattern is a special case of "files-as-config-for-the-agent"** (now visible across Hassid, POHA, Pocock, and André-Micolon). What varies: writing style file vs domain lexicon vs runtime self-discovery. What's shared: a stable, human-readable, agent-loadable artefact that replaces ad-hoc prompting.
- **The prompt collapses correlate with intent isolation.** "Fix it" works when the agent already knows what *it* is. The post is a small concrete demonstration of a bigger principle: invest in stable agent-side context so prompts can be about *what to do* rather than *what exists*.
- **Pair this with Pocock's `CONTEXT.md`.** `dev:info` = runtime/environmental self-knowledge. `CONTEXT.md` = domain self-knowledge. Both same shape, both cheap, both compound. A new project should probably have both from day one.
- **Watch the context-load tradeoff** (per the commenter). Self-discovery is only a win if it's *invoked when needed*, not dumped into every system prompt. The agent should *know how to find* `dev:info`, not always have its output preloaded.

## Open questions / things to verify

- **Dynamic vs static.** Is `dev:info` better as a live command (executes `ps`, hits health endpoints, queries DB versions) or a documented snapshot? Dynamic is more accurate but adds latency; static drifts.
- **What goes in `/goal`?** Author mentions it as the second half of the autonomy story but doesn't describe its contents. Likely a prompt template — worth asking the author or hunting for examples.
- **What is "PI" as an agent harness?** Named alongside Claude/Codex/OpenCode. Don't recognise it. Could be a real tool, a typo, or a paraphrase artifact.
- **Failure modes.** What does the agent do when `dev:info` fails or returns stale info (services died, ports changed)? No discussion.
- **Cost of always-on self-discovery.** The commenter's concern about context blowup with multiple agents is unanswered.

## Related

- `topics/harnesses/index.md`
- `topics/prompting/index.md`
- `sources/2026-05-20-pocock-skills.md` — `CONTEXT.md` is the domain-knowledge sibling to `dev:info`'s runtime-knowledge.
- `sources/2026-05-20-poha.md` — `CLAUDE.md`-with-placeholders is another flavour of agent-side documented config.
