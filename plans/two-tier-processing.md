---
title: "Two-tier processing: cheap automated capture, capable interactive synthesis"
status: planning
drafted: 2026-05-30
updated: 2026-05-30
owner: chris
---

# Plan: two-tier processing

## Goal

Separate the cost and capability profile of automated capture (Worker, every email) from interactive synthesis (Claude Code sessions, owner-triggered). Automated path is cheap and fast; interactive path is capable and deliberate.

## Problem

The current Worker calls Sonnet 4.6 for every capture — the same model used in interactive Claude Code sessions. These are billed differently (API vs Claude plan) and have different cost sensitivity. Automated captures are high-volume relative to synthesis; they also need less capability — classification, tagging, topic mapping, and structured extraction are well within a smaller model's range.

## Proposed direction

### Automated path (Worker)

- Swap Sonnet for Haiku 4.5 ($0.80/MTok input vs $3/MTok). Classification and tagging don't need Sonnet.
- Aggressively reduce prompt and content budget. Current 30K char article budget is 3–4x what classification needs. Target: ≤2K tokens in, ≤200 tokens out per capture.
- Scope: **classify, tag, extract metadata, write raw source file only.** No synthesis. No cross-linking. No topic index updates. Those require reading KB state, which is expensive.
- Prompt compression techniques (caveman-style output, minimal whitespace, no prose in responses) — live experiment opportunity.

### Interactive path (Claude Code sessions)

- Full Sonnet/Opus with full article content and cross-source KB context.
- Owner-triggered via a skill (`/synthesise` or similar): reads unprocessed captures, runs synthesis, updates topic indexes.
- "Unprocessed" could be tracked via a `status: raw` frontmatter field (already in schema) — the skill picks up any file with `status: raw`.
- Model choice stays in the owner's hands; token budget refreshes over time on the Claude plan.

### Subagent framing (optional, later)

Named subagents (classifier-carl, tagger-tim, synthesiser-stuart) as a mental model for scoping prompts — each has a single job, minimal context, and an evaluable output. Also live material for the evals open thread.

## Open questions

- What is the minimum prompt that produces correct triage classification? Needs a few test runs to calibrate.
- Does cross-linking need to happen at capture time, or can it be deferred to the interactive synthesis pass? Deferring it simplifies the Worker significantly.
- Should the `/synthesise` skill be scoped per-topic (process all raw captures in `topics/X`) or global?
- Is `status: raw` sufficient as the handoff signal, or does the Worker need to write a separate queue/manifest?

## Relationship to other plans

Extends `plans/cloud-capture-agent.md`. Does not change the Worker's email/fetch/commit architecture — only the AI call inside it.
