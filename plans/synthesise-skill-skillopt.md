---
title: "SkillOpt cycles for the synthesise skill"
status: planning
drafted: 2026-06-16
owner: chris
---

# Plan: SkillOpt cycles for the synthesise skill

## Background

SkillOpt (captured in `sources/2026-06-15-skillopt-executive-strategy.md`) treats agent skill files as trainable artifacts: a separate optimizer model generates bounded add/delete/replace edits on the SKILL.md, accepting only edits that strictly improve held-out validation performance. It reports +19–25 point improvements over baselines across 52 (model, benchmark, harness) cells.

The `synthesise` skill (`skills/synthesise/SKILL.md`) is a strong candidate for this treatment:
- It runs frequently (every batch of new captures)
- Quality variance is observable: sometimes over-summarises, misses cross-links, writes synthesis when it should flag, or flags when it should write
- Validation is feasible: correct cross-link presence + `status: summarized` flip are binary, checkable outputs

## Proposed approach

### Define the eval

A synthesise run is correct if:
1. Every `status: raw` source ends as `status: summarized`
2. Each source is linked in every topic index listed in its `topics:` frontmatter
3. No synthesis is written unprompted (only flagged)
4. No source is processed twice in the same run

These are checkable without a judge model — they're structural properties of the repo state before and after.

### Run SkillOpt

Use the SkillOpt approach: take scored rollouts (synthesise runs with known errors), ask an optimizer model to propose bounded edits to `SKILL.md`, accept only edits that improve the eval. Run for 3–5 epochs.

### Measure

Compare cross-link accuracy and skip rate before and after. The baseline is the current SKILL.md. Target: fewer missed cross-links per batch.

## Open questions

- What is the right optimizer model? SkillOpt uses a separate model from the task model. Sonnet/Opus as optimizer, Sonnet as executor is a reasonable split.
- How many historical runs do we have with known errors? At least the batches from this session have observable missed cross-links (some synthesis cross-links had to be fixed manually).
- Is the eval harness worth building as a standalone script, or is it sufficient to run it manually and grade informally?

## Status

Not started. Depends on having at least 5–10 labelled synthesise runs with known errors to use as training signal.
