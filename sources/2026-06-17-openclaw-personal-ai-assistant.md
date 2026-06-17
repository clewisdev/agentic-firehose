---
title: "OpenClaw — Personal AI Assistant"
url: https://github.com/openclaw/openclaw
authors: [OpenClaw Contributors]
captured: 2026-06-17
source_type: repo
topics: [agent-architecture, agentic-workflows, tool-use]
tags: [multi-channel, messaging, local-first, mcp, node.js, open-source]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

OpenClaw is an open-source, self-hosted personal AI assistant that runs on user devices and interfaces with multiple messaging channels (WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, Teams, Matrix, and ~20 others). The core architecture separates a "Gateway" control plane from the assistant runtime, with support for voice/audio on macOS/iOS/Android and a live Canvas UI.

### Key architectural choices:

- **Multi-channel design**: Single agent responds across heterogeneous messaging surfaces via a unified protocol layer
- **Local-first with optional daemon mode**: Runs as systemd/launchd user service; can also run foreground/debug mode
- **Model agnostic**: Supports OpenAI, Claude, and other providers; encourages use of current flagship models
- **Security defaults**: DM pairing policy by default; untrusted inbound treated as such; gateway exposure runbook provided
- **Node.js runtime**: Node 24 recommended or 22.19+; supports npm/pnpm/bun; onboarding via `openclaw onboard --install-daemon`

### Evidence of maturity:

- 59,715 commits, 379k stars, 3.3k issues, 3k PRs indicate active development
- Extensive config schema (channels, skills, agents, taxonomy)
- Docker, Fly.io, Render deployments supported
- Comprehensive security guide and gateway exposure runbook (mentioned but not fully visible in fetch)
- Pre-commit hooks, semgrep linting, TypeScript strict mode

### Notable gaps in visibility:

- README truncated; full architecture, skill system, and agent capability model not visible
- No inline code examples or failure modes documented in fetched content
- Cost management and rate-limiting strategy not evident
- Agent orchestration primitives (chaining, branching, state) not specified

## Verbatim quotes

> "OpenClaw is a personal AI assistant you run on your own devices. It answers you on the channels you already use."

> "The Gateway is just the control plane — the product is the assistant."

> "Default behavior on Telegram/WhatsApp/Signal/iMessage/Microsoft Teams/Discord/Google Chat/Slack: DM pairing ( dmPolicy="pairing" ) — unknown senders receive a short pairing code and the bot does not process their message."

## Takeaways

- Multi-channel agent dispatch is a concrete pattern in production (20+ platforms integrated)
- Local-first + daemon model appeals to privacy-conscious users; reduces operational blast radius vs. cloud-hosted
- Security posture starts defensible (pairing by default, DM-as-untrusted) but requires user discipline (gateway exposure runbook)
- Open-source repository structure suggests modular extensions (agents, skills, extensions dirs) but skill/agent SDKs not sampled
- Node.js ecosystem choice enables broad cross-platform deployments but may constrain performance for compute-heavy tasks

## Open questions

1. How does the skill system (skills/) enable or constrain tool-use vs. pure LLM reasoning?
2. What is the agent state model for multi-turn conversations across channels?
3. How are costs tracked/controlled when running multiple concurrent model providers?
4. Does the Canvas UI expose real-time agent reasoning or only final outputs?
5. How are deployment secrets (model keys, channel tokens) rotated in daemon mode?
