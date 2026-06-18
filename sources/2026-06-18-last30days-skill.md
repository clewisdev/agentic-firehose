---
title: "last30days-skill: AI agent skill for cross-platform synthesis"
url: https://github.com/mvanhorn/last30days-skill
authors: [mvanhorn]
captured: 2026-06-18
source_type: repo
topics: [tool-use, agent-architecture, agentic-workflows]
tags: [multi-source, information-synthesis, search, reddit, x, youtube, hacker-news, polymarket]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

`last30days-skill` is an open-source AI agent skill (plugin architecture) that synthesizes real-time information across seven platforms—Reddit, X, YouTube, TikTok, Hacker News, Polymarket, and GitHub—to produce a unified, ranked summary of what happened in a topic space over the past 30 days. The repo is a working implementation of multi-source parallel search + agentic synthesis, with explicit framing around why it exists: the author needed to keep up with rapid AI community discourse but found training data and search engines months behind.

### Framing & motivation

The core insight is audience routing: instead of relying on editorial curation (Google) or a single large language model's native data access (ChatGPT has Reddit, Gemini has YouTube, Claude has none natively), the skill bridges platform silos by accepting user-provided API keys and browser sessions, then orchestrating parallel queries and synthesizing results via an AI judge.

Quote:
> "Not one better search engine. A dozen disconnected platforms, bridged by an agent. Each platform is a walled garden with its own API, its own tokens, its own auth. But you can bring your own keys and browser sessions, and suddenly an AI agent can search all of them at once, score them against each other, and tell you what actually matters."

Use cases cited:
- Pre-meeting research (person's recent tweets, podcast transcripts, GitHub activity)
- Topic research before building (community-reported pain points)
- Event planning (real user sentiment on Disney Genie+ vs. editorial reviews)

### Scoring & ranking

Sources are weighted by engagement signals:
- **Reddit**: upvotes on top comments
- **X**: likes and reply volume
- **YouTube**: transcript searchability + length (treats 45-minute deep dives as higher-signal than short clips)
- **Polymarket**: real-money odds (frames as ground truth: "Not opinions. Odds.")
- **Hacker News**: comment count and score
- **GitHub**: PR merge rate, star velocity, release notes

No editorial scoring; purely engagement-based ranking.

### Technical surface

- Installable via Claude Code (marketplace), Codex, Cursor, Copilot, Gemini CLI, or as a global npm skill
- Zero-config for Reddit and HN (public APIs)
- Setup wizard unlocks X, YouTube, TikTok, Instagram (30s credential flow)
- Architecture: `.agents/` folder, `.claude-plugin/` plugin spec, `skills/last30days/` contains the runtime spec
- 754 commits; active maintenance; 42 open issues

## Takeaways

- **Agentic skill as platform bridge**: Demonstrates a working pattern for agents to overcome API silos by accepting user credentials and orchestrating parallel search—useful reference for tool-use and agent-architecture work.
- **Engagement as ground truth**: Frames upvotes, likes, odds as more trustworthy than editorial curation or model training data. Testable framing (easy to measure whether community-ranked sources are actually more actionable than Google).
- **Skill marketplace as distribution**: Published via Claude, Copilot, Codex; suggests a maturing ecosystem for agent plugins outside monolithic LLM APIs.
- **No synthesis methodology disclosed**: The repo doesn't document how the "AI judge" ranks and merges conflicting narratives across sources—important gap for reproducibility.
- **Self-reported use case prevalence unclear**: Author's Disney World and sales-call examples are anecdotes; no metrics on adoption or validation that the cross-platform synthesis is more accurate than single-source search.

## Open questions

1. How does the synthesis step handle contradictory claims (e.g., X consensus vs. Polymarket odds)? Which source wins?
2. What is the latency of parallel queries? How many sources does it actually query vs. skip if some APIs fail?
3. Are there any user studies or A/B tests comparing last30days summaries to Google + manual research for decision-making tasks?
4. How stable is the skill marketplace distribution model? Is the plugin auto-update claim actually working in practice?

