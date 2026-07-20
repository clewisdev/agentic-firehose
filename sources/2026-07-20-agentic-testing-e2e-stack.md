---
title: "Agentic Testing: Where Agents Fit in the E2E Testing Stack"
url: https://slack.engineering/agentic-testing-where-agents-fit-in-the-e2e-testing-stack/
authors: [Sergii Gorbachov]
captured: 2026-07-20
source_type: blog
topics: [evals, harnesses, agentic-workflows]
tags: [playwright, mcp, testing, e2e, agent-reliability, cost-analysis]
signal_level: high
status: raw
confidence: high
freshness_until: 2026-Q4
---

## Summary

Slack engineering conducted a controlled experiment with 200+ agentic E2E test runs to evaluate where agent-driven testing fits in existing testing stacks. The study compares three execution models (Playwright MCP, Playwright CLI, and generated Playwright tests) across two workflow complexities using both natural language and structured YAML inputs.

Key finding: agents should verify *goals* (outcomes), not enforce specific *journeys* (action sequences), and have a clear complementary role—not replacement—for deterministic tests. The Playwright MCP approach proved most reliable (0–12% failure rate), though cost ($15–30/run) and runtime (5–11 min) limit applicability to exploratory or high-risk scenarios rather than CI/CD gates.

## Full Findings

### Execution Models

**Agent + Playwright MCP** (most reliable):
- Agent interacts via predefined MCP actions with persistent DOM snapshots and logs
- Thread Reply: 0% failure, Search Discovery: ~12% failure
- Runtime: 5–8 min
- Higher in-session context reuse; live stable view of app state

**Agent + Playwright CLI**:
- Agent executes CLI commands one step at a time, rebuilds state from snapshots
- Thread Reply: ~12% failure, Search Discovery: ~20% failure
- Runtime: 9–11 min
- Failures accumulate from timing and navigation inconsistencies over longer flows

**Generated Playwright Tests**:
- AI generates deterministic test code from natural language, iteratively refines
- Thread Reply: ~8% failure, Search Discovery: ~48% failure
- Runtime: ~3 min (fastest, but degrades sharply with complexity)
- Failures primarily from UI state variability and page object abstraction mismatches

### Reliability vs. Complexity

Failure rate gap widens with flow length. MCP's persistent state handling and in-session context reuse explain superior reliability on complex workflows. CLI's incremental state rebuilding and generated tests' abstraction brittleness both degrade with steps.

### Cost and Execution Time

- MCP and CLI: $15–30 per run (model tokens + browser interaction)
- Generated tests: $5–10 per run, but 48% failure rate on complex flows negates savings
- Cost makes agentic tests unsuitable for high-frequency CI gates; better for exploratory, post-commit, or high-risk path validation

### Input Format Impact

Natural language vs. YAML: marginal difference. Agent interpretation cost roughly equal to explicit mapping burden. Natural language slightly preferable for flexibility; YAML for reproducibility in high-stakes runs.

## Key Takeaways

- **Goals, not journeys**: Agents verify that outcomes are reachable, not that specific action sequences are followed. This fundamental difference justifies coexistence with deterministic tests.
- **Reliability tier**: MCP >> CLI >> Generated tests for complex flows. Use MCP for production-critical agentic tests.
- **Cost-reliability tradeoff**: $15–30/run with 0–12% failure on complex flows. Not suited for every test, but valuable for exploratory and high-risk coverage.
- **State management matters**: Persistent, live DOM context (MCP) far outperforms snapshot-based state reconstruction (CLI) as workflows grow.
- **Input format flexibility**: Natural language acceptable; YAML adds marginal rigor without proportional reliability gains for simple/medium flows.

## Open Questions

- How does failure mode distribution shift if agents have explicit retry/refinement budgets?
- Can MCP-style persistent context be applied to generated test refinement to improve complex-flow pass rates?
- What heuristics should teams use to decide *when* to use agentic vs. deterministic E2E tests in a CI/CD pipeline?
- Does agent-generated test code improve on rerun, or does generated code tend to remain brittle even after iteration?
