---
title: "claude-code-harness: Plan → Work → Review → Sync → Release"
url: https://www.linkedin.com/posts/himanshu-sanwal-7a5b04197_claudecodeharness-claudecode-ai-share-7466168040028676096-lX0o/
authors: [Himanshu Sanwal]
captured: 2026-05-30
source_type: thread
topics: [harnesses]
tags: [claude-code, harness, guardrails, drift-detection, multi-agent, workflow]
status: raw
confidence: low
freshness_until: 2026-Q3
---

# claude-code-harness — LinkedIn promotional post

> **Low-signal flag.** This is a LinkedIn promotional post with several hype tells: hashtag-heavy, LLM-cadence prose, round-number emoji bullets, engagement-farming structure. One commenter explicitly called it out as LLM-generated content. The underlying repo (`Chachamaru127/claude-code-harness`) may be worth a direct look, but this post itself should not be treated as evidence for any claim.

## What the post claims

The post promotes `claude-code-harness`, a GitHub repo, as a structured workflow layer for Claude Code. Core pitch: Claude Code drifts badly on large refactors; this harness fixes it with declarative guardrails rather than better prompts.

Five slash-command "verbs" are described:
- `/harness-plan` — generates `spec.md` and `Plans.md` with acceptance criteria for human approval
- `/harness-work` — auto-detects parallelism, runs up to 5 workers with preflight self-checks
- `/harness-review` — produces verification output as persistent evidence
- `/harness-sync` — keeps a single source of truth (SSOT) aligned; warns on direct edits to `settings.json`
- `/harness-release` — packages result into CHANGELOG, tag, and release steps

Additional claimed features: 13 declarative TypeScript guardrail rules (R01–R13), drift detection tracking recurring bug shapes across version history, multi-host support (Claude Code / Codex / OpenCode), pre-commit hooks, optional cross-session memory via `harness-mem`.

Install: `claude /plugin marketplace add Chachamaru127/claude-code-harness`

Repo link from comments: https://github.com/Chachamaru127/claude-code-harness

## Signal assessment

The post exhibits multiple LinkedIn clickbait patterns: dense hashtag block, em-dash-heavy LLM prose, emoji-bulleted feature list, no code shown, no before/after metrics. The author has 1,101 followers and 102 posts — not a known practitioner with an established track record outside LinkedIn. A commenter (Sjoerd Verweij) directly called out the post as AI-generated with a "meaningless AI generated PowerPoint slide."

The *concept* described — a structured harness addressing Claude Code's known drift problem on long-horizon tasks — is legitimate and maps to real problems documented in higher-signal sources. The repo itself could be genuine. The post is not evidence of that.

## Takeaways

- **Don't cite this post** as evidence for any claim about claude-code-harness or harness patterns generally.
- **The repo is worth a direct fetch** if harness patterns for Claude Code are a priority. Check the README and actual TypeScript source before drawing conclusions.
- The drift problem framing ("brilliant in 10-line spurts, disastrous over 1,000-line refactors") matches practitioner reports elsewhere — that part is credible independently of this post.
- The SSOT / contract-before-execution philosophy aligns with patterns in higher-signal harness material in this KB.

## Open questions

- Is the repo actively maintained, or a weekend project with 64 stars from a viral post?
- Do the 13 TypeScript guardrail rules (R01–R13) correspond to anything documented, or is that number itself marketing?
- Is the `plugin marketplace` install command a real Claude Code feature, or fabricated?
