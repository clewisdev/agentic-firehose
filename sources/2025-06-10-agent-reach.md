---
title: "Agent Reach: Give your AI agent eyes to see the entire internet"
url: https://github.com/Panniantong/Agent-Reach
authors: [Panniantong]
captured: 2025-06-10
source_type: repo
topics: [tool-use, harnesses]
tags: [twitter, reddit, youtube, github, bilibili, xiaohongshu, rss, web-scraping, mcp]
signal_level: high
status: summarized
confidence: high
freshness_until: unknown
---

## Summary

Agent Reach is an open-source scaffolding tool that equips AI agents with web browsing and data retrieval capabilities across 15+ platforms. Rather than wrapping functionality, it installs and orchestrates existing CLI tools (twitter-cli, rdt-cli, yt-dlp, gh CLI, mcporter, Jina Reader) and exposes them as skill modules.

Installation is single-command: agents copy a URL pointing to an install script, which automatically detects environment, installs system dependencies, configures API access (free MCP-based search via Exa), and registers a SKILL.md guide in the agent's knowledge base.

**Core design principle**: pluggable scaffolding, not a framework. Each platform channel wraps an independent upstream tool that can be swapped or extended. No vendor lock-in.

### Out-of-box capabilities (no config):
- Web page reading (Jina Reader)
- YouTube subtitle extraction + search
- RSS/Atom feed parsing
- GitHub public repo access + search
- Weibo trending + search
- V2EX posts + discussions
- WeChat public account search + article reading

### Requires setup (cookie-based or API config):
- Twitter/X: single tweets (free), full search + timeline (needs config)
- Reddit: search + comments (rdt-cli with cookie auth)
- Bilibili: local subtitle extraction, server deployment unlocks China-accessible access
- XiaoHongShu (Little Red Book): full CRUD (read/search/post/comment/like)
- Douyin (TikTok CN): video parsing + watermark-free download links
- LinkedIn: Jina Reader for public pages
- Xueqiu (stock discussion): quotes, search, trending posts
- Xiaoyuzhou Podcast: audio → text via Whisper (free key)

### Diagnostic & iteration:
- `agent-reach doctor` command reports channel status and repair guidance
- Cookie extraction via Chrome extension (Cookie-Editor) fed directly to agent for configuration
- Safe mode (`--safe` flag) skips auto-package-install, reports dependencies only
- Supports Claude Code, OpenClaw, Cursor, Windsurf, and any CLI-capable agent

## Key quotes

> "Agent Reach 是一个脚手架（scaffolding），不是框架。你给一个新 Agent 装环境的时候，总要花时间去找工具、装依赖、调配置——Twitter 用什么读？Reddit 怎么绕封？YouTube 字幕怎么提取？每次都要重新踩一遍。"

("Agent Reach is scaffolding, not a framework. When you set up a new Agent, you always spend time finding tools, installing dependencies, adjusting configs—what reads Twitter? How do you bypass Reddit blocks? How do you extract YouTube subtitles? Every time you have to start over.")

> "不满意？换掉就行。" ("Not happy with it? Swap it out.")

Emphasis on pluggable architecture: each channel = independent upstream tool; replacement is not lock-in.

## Takeaways

- **Agent scaffolding as distribution**: solves the cold-start problem for multi-platform web access by packaging known-good tool combinations + installation automation into a single entry point
- **Cookie + CLI hybrid**: avoids reinventing auth/scraping; reuses battle-tested CLI tools (twitter-cli, rdt-cli) and delegates credential management to the agent itself via simple prompts
- **MCP as an integration layer**: uses Model Context Protocol (mcporter) to wrap platform-specific tools; free, MCP-based search (Exa) replaces paid API dependency
- **Continuous platform maintenance**: explicitly positions the project as an observability layer that absorbs breaking changes from upstream tools and platforms, reducing agent toolchain maintenance burden
- **Practical platform fragmentation**: different platforms have different constraints (auth walls, geo-blocking, paid APIs, data format heterogeneity); scaffolding hides this complexity behind uniform agent interface
- **Local-first, server-optional**: agents can run locally without proxy; servers are only needed for platforms with geo-blocking (Bilibili, Douyin) at ~$1/month cost

## Open questions

- How does cookie management scale for multi-user / multi-agent deployments? Does the agent handle refresh/expiry?
- What's the update cycle for tracking breaking changes in upstream tools and platform access patterns?
- How does the project handle rate-limiting or access restrictions across platforms (e.g., Twitter API limits, Reddit shadowbans)?
- Does `agent-reach doctor` also validate cookie freshness and suggest re-authentication?
- What's the test coverage for platform integrations, given they're fragile external dependencies?
