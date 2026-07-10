---
title: "awesome-llm-apps: 100+ AI Agent & RAG apps you can actually run"
url: https://github.com/Shubhamsaboo/awesome-llm-apps
authors: [Shubham Saboo]
captured: 2026-07-10
source_type: repo
topics: [agentic-workflows, agent-architecture, tool-use, memory]
tags: [templates, starter-code, multi-agent, rag, voice-agents, mcp, agent-skills, fine-tuning, claude, gemini, openai, llama]
signal_level: high
status: raw
confidence: high
freshness_until: unknown
---

## Summary

awesome-llm-apps is a working repository of 100+ self-contained, end-to-end tested templates for building AI agents and RAG applications. The core value proposition is reducing repetition: instead of rebuilding agent loops, RAG pipelines, or MCP integrations from scratch, practitioners can clone, customize, and ship templates that are guaranteed to run in 3 commands.

Every template is original, hand-built, and tested before publication—not aggregated from elsewhere. The repo explicitly targets no broken dependencies, no scaffolding guesswork. All templates run with a config change across Claude, Gemini, GPT, Llama, Qwen, and xAI.

## Key Details

**Template categories (15 total):**
- Agent Skills (modular abilities for coding agents)
- Starter AI Agents (single-file, API-key-only examples)
- Advanced AI Agents (production-style with tools, memory, multi-step reasoning)
- Always-on Agents (scheduled/background tasks like HN briefing scout)
- Multi-agent Teams (orchestrated agent coordination)
- Voice AI Agents (real-time voice I/O with Gemini Live)
- Generative UI and Agentic Frontends
- Autonomous Game-Playing Agents
- MCP AI Agents
- RAG Tutorials
- LLM Apps with Memory
- Chat with X Tutorials
- LLM Optimization Tools
- Fine-tuning Tutorials
- AI Agent Framework Crash Courses

**Notable featured templates:**
- Project Graveyard (Agent Skill): finds abandoned projects, diagnoses failure modes, helps completion
- Always-on HN Briefing Agent: scheduled signal filtering into delivery-ready briefs
- Insurance Claim Live Agent Team: real-time voice intake with Gemini Live + ADK
- Home Renovation Agent: photo-to-redesign multi-agent pipeline
- Self-Improving Agent Skills: automated optimization via Gemini + ADK

**Stack coverage:** provider-agnostic, supports ADK (Anthropic Developer Kit), Nano Banana Pro vision, Cursor/Claude Code integration.

**Licensing:** Apache-2.0 (no paywall, no signup, no telemetry).

## Verbatim Quotes

> "You shouldn't have to rebuild the same RAG pipeline, agent loop, or MCP integration from scratch every time you start a new LLM project."

> "🛠️ Hand-built, not curated - every template is original work, tested end-to-end before it ships. 🧪 Runs in 3 commands - no broken requirements.txt, no 'figure it out yourself' scaffolding."

> "⭐ If this saves you time, star the repo - that's how the next developer discovers it."

## Takeaways

- **High-signal working repo:** 1,064 commits, 117k stars, 17.5k forks indicate sustained practitioner adoption and vetting. Templates are tested, not aspirational.
- **Breadth over depth:** covers the full modern agentic stack (agents, RAG, voice, skills, fine-tuning, multi-agent, always-on) in one place, reducing the discovery tax.
- **Provider-agnostic abstractions:** config-switch between Claude, Gemini, GPT, Llama, Qwen, xAI is a practical signal that patterns are framework-neutral.
- **Integration with educational content:** paired with free step-by-step tutorials on Unwind AI, reducing friction from template selection to deployment.
- **Low friction entry:** 30-second quickstart (git clone → pip install → streamlit run) is a testable claim that removes scaffolding pain.

## Open Questions

- How are templates versioned and tested as underlying model APIs evolve?
- What is the attrition rate of templates as agent frameworks (ADK, LangChain, etc.) change?
- Are there production deployment patterns (Docker, cloud hosting) documented, or just local-first?
- Which templates have the most forks and active deployment, and why?
