---
title: "Pi Agent Harness: Unified LLM API and Coding Agent Toolkit"
url: https://github.com/earendil-works/pi
authors: [earendil-works]
captured: 2026-06-23
source_type: repo
topics: [agent-architecture, tool-use, agentic-workflows, code-generation]
tags: [typescript, llm-api, agent-runtime, cli, tui, multi-provider, openai, anthropic, google]
signal_level: high
status: raw
confidence: high
freshness_until: unknown
---

## Overview

Pi is a production-grade agent harness project consisting of three core packages: a unified multi-provider LLM API, an agent runtime with tool calling and state management, and an interactive coding agent CLI. The project is actively maintained with 64.9k stars and 4,672 commits, indicating mature, battle-tested code.

## Core Components

**@earendil-works/pi-ai**: Unified LLM API abstracting OpenAI, Anthropic, Google, and other providers into a single interface. This handles multi-provider compatibility without forcing provider-specific code paths into application logic.

**@earendil-works/pi-agent-core**: Agent runtime implementing tool calling loops and state management. Manages the core agentic loop—perception, action selection, tool invocation, state updates.

**@earendil-works/pi-coding-agent**: Interactive CLI for code generation and modification tasks. Demonstrates practical agent-as-developer workflows.

**@earendil-works/pi-tui**: Terminal UI library with differential rendering, enabling interactive agent interfaces without full browser dependencies.

## Architecture & Operations

The project explicitly **does not include built-in permission/sandbox boundaries**—it runs with user/process permissions. Documentation provides three containerization patterns (Gondolin extension, plain Docker, OpenShell) for stronger isolation when needed. This is a deliberate design choice: trust the deployment boundary, not the agent runtime.

Supply-chain hardening is rigorous: npm dependencies pinned to exact versions (direct deps only), lockfile as source of truth, pre-commit blocks on accidental lockfile changes, scheduled CI audit runs, and explicit allowlists for lifecycle scripts. Release smoke tests use isolated npm/Bun installs outside the repo.

## Notable Features

- **Shrinkwrap generation** for CLI distribution ensures transitive dependency pinning in published packages.
- **Session sharing infrastructure** (via badlogic/pi-share-hf) for publishing open-source agent work. Contributor explicitly publishes their own sessions to improve agent training on real tasks, not toy benchmarks.
- **RFCs** documenting longer-term plans, indicating structured roadmap governance.
- **Auto-close policy** for issues/PRs from new contributors, with maintainer daily review—filters noise while staying responsive.

## Takeaways

- Multi-provider LLM abstraction is now table stakes; Pi's unified API design shows how to do it cleanly without provider leakage.
- Agent harnesses need explicit permission/sandbox *configuration* (not built-in), delegating to deployment context. Don't try to sandbox inside the agent.
- Shrinkwrap + pinned deps + audit loops are the new minimum for distributable agent tooling; this is now a supply-chain expectation.
- Real-world session data (code, logs, failures) is more valuable for agent improvement than synthetic benchmarks; infrastructure for sharing should be baked in early.
- Tool calling and state management are now abstracted as reusable libraries, not one-off implementations per agent.

## Open Questions

- How does the state management handle long-running agent sessions with context windows >100k tokens? Is there garbage collection / summarization?
- What's the failure mode distribution in published OSS sessions? (e.g., tool hallucination vs. parsing vs. planning)
- Does the unified LLM API provide a fallback/retry strategy, or does it delegate to the caller?
- How are tool schemas versioned/evolved without breaking existing agent code?
