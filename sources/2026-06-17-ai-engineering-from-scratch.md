---
title: "AI Engineering from Scratch"
url: https://github.com/rohitg00/ai-engineering-from-scratch
authors: [Rohit G]
captured: 2026-06-17
source_type: repo
topics: [skills, code-generation, agentic-workflows, agent-architecture]
tags: [curriculum, foundations, multi-language, end-to-end, learning-resource]
signal_level: medium
status: raw
confidence: high
freshness_until: evergreen
---

# AI Engineering from Scratch

## Summary

A comprehensive open-source curriculum designed to close the gap between awareness of AI tools and professional readiness. Created by the author of Agent Memory, this project offers 503 lessons across 20 phases (~320 hours), structured from mathematical foundations through autonomous swarms.

The curriculum spans four programming languages (Python, TypeScript, Rust, Julia) and emphasizes first-principles understanding: every algorithm is derived from raw mathematics before framework implementations are introduced. Each lesson follows a consistent structure: motto → problem → concept → build it (from scratch) → use it (production library) → ship it (artifact: prompt, skill, agent, or MCP server).

**Curriculum architecture:**
- Phases 0–3: Setup, math foundations, ML basics, deep learning core
- Phases 4–6: Branching paths for vision, NLP, speech/audio
- Phases 7–12: Transformers through multimodal models
- Phases 13–19: Tools, protocols, agent engineering, autonomous systems, multi-agent swarms, infrastructure, ethics, capstone projects

The philosophy explicitly rejects scattered learning ("a paper here, a fine-tuning post there"). Instead, learners build from first principles—implementing backpropagation, tokenizers, attention mechanisms, and agent loops by hand before touching frameworks like PyTorch. All code runs on personal laptops; free and MIT-licensed.

**Project maturity indicators:**
- 150,639 readers; 241,669 page views in 30 days (as of 2026-06-07)
- 1,634 commits; active issues and pull requests (53 open)
- Structured contribution guidelines and lesson templates
- Multi-language implementations for each lesson

## Verbatim quotes

> "84% of students already use AI tools. Only 18% feel prepared to use them professionally. This curriculum closes that gap."

> "You don't just learn AI. You build it. End-to-end. By hand."

> "Most AI material teaches in scattered pieces... The pieces rarely line up. You ship a chatbot but can't explain its loss curve. You hook a function to an agent but can't say what attention does inside the model that's calling it. This curriculum is the spine."

> "Every algorithm gets built from raw math first... By the time PyTorch shows up, you already know what it's doing under the hood."

## Key takeaways

- **Systematic progression**: Linear algebra through autonomous swarms in a single, connected narrative. Skip lower layers at your own risk.
- **Build-then-use pattern**: First implement algorithms from scratch; then study production libraries. This reverses conventional curriculum order and embeds mental models.
- **Artifact-driven**: Every lesson ships reusable output (prompts, skills, agents, MCP servers), bridging learning and practice.
- **Polyglot by design**: Python, TypeScript, Rust, Julia implementations for each lesson. Useful for teams with language preferences and for understanding language trade-offs in AI work.
- **Scalable to teams**: Clear structure and contribution guidelines suggest this can grow beyond a solo project.

## Open questions

1. How do learners verify correctness of their implementations before moving to production libraries? Are there reference outputs or test suites per lesson?
2. What is the typical time-to-completion for a learner working 10–15 hours/week? Do completion rates vary by phase?
3. How does this compare to university curricula or other end-to-end programs (e.g., fast.ai, DeepLearning.AI) on retention and job placement?
4. Are the MCP servers and agents produced per lesson integrated into a larger system, or are they standalone artifacts?
5. What scaffolding exists for learners who lack linear algebra or CS fundamentals—is Phase 1 self-contained?
