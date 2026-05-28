---
title: "SWE-bench and SWE-smith: Coding Agent Evaluation Standards"
url: https://www.swebench.com/
authors: [Princeton NLP / SWE-bench team]
captured: 2026-05-28
source_type: docs
topics: [evals]
tags: [swebench, swesmith, benchmark, coding-agent, evaluation, training-data]
status: summarized
confidence: high
freshness_until: 2026-Q4
---

# SWE-bench and SWE-smith

The canonical benchmarks for evaluating coding agent capability. From the "my links" section of the UpHill workshop materials — the owner flagged these as personally relevant.

## SWE-bench (swebench.com)

Evaluation framework for software engineering agents. Tests agents on real GitHub issues requiring actual code changes. Variants:

- SWE-bench (original)
- SWE-bench Verified (human-verified task instances)
- SWE-bench Lite (faster evaluation)
- SWE-bench Multilingual
- SWE-bench Multimodal

Peer-reviewed paper. Official leaderboard with open-source vs proprietary comparison. As of 2026-05-28, leaderboard top entries not captured (check swebench.com directly for current standings — this field moves fast).

## SWE-smith (swesmith.com)

Data generation companion to SWE-bench. Generates synthetic training data at scale:

- 50k+ task instances generated so far
- Covers 128 popular GitHub repositories
- Used to train SWE-agent-LM-32B (strong SWE-bench performer)

Core problem addressed: "Creating training data for software engineering agents is difficult." SWE-smith enables any team to generate evaluation/training instances for their own repositories.

## Relevance to this KB

SWE-bench is the reference standard for coding agent capability comparisons. When evaluating harness choices, tool choices, or model choices for coding tasks, check current SWE-bench scores for the relevant configurations. When building evaluation sets for a custom coding agent, SWE-smith's methodology is the template.

**Freshness note**: leaderboard rankings change frequently. Don't cite specific scores without checking current standings.

## Related

- `topics/evals/index.md`
