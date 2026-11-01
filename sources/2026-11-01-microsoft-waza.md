---
title: "Waza: CLI and Framework for Agent Skills and Workflow Evaluation"
url: https://github.com/microsoft/waza
authors: [Microsoft]
captured: 2026-11-01
source_type: repo
topics: [evals, skills, harnesses, agentic-workflows]
tags: [mcp, testing, benchmarks, copilot-cli, azd, assurance-profiles]
signal_level: high
status: raw
confidence: high
freshness_until: 2027-Q4
---

# Waza: CLI and Framework for Agent Skills and Workflow Evaluation

## Summary

Waza is an open-source Go CLI and testing framework developed by Microsoft designed to author, test, grade, and monitor agent workflows, tool/skill implementations, and custom agents. Positioned directly at the intersection of agent evaluation and developer harnesses, Waza treats agent evaluation as an engineering discipline with preflight checks, recorded reliability runs, regression gates in CI/CD, and evidence collection.

The tool addresses a major gap in the agent ecosystem: moving beyond brittle end-to-end prompt evaluations to structured scenario authoring across repository, CLI, and Model Context Protocol (MCP) interactions. It enables teams to write deterministic test scenarios for agents, execute graded trials, and capture detailed run evidence (including file modifications, tool execution traces, and model completions) to verify agent skill efficacy before production deployment.

Key architectural and operational features include:
- **Scenario Authoring & Trial Grading**: Scenarios define expected behaviors across CLI invocations, repository changes, or MCP server calls. The harness executes trials and grades results against assurance profiles and controlled release policies.
- **Integrated Executors**: Waza bundles and manages the GitHub Copilot CLI runtime (via `copilot-sdk`) while also supporting external custom agent binaries and MCP endpoints.
- **CI/CD Regression Gates**: Differentiates between harness mock success (verifying test scaffolding) and live agent evaluation (grading actual agent quality and live service safety). Designed to run inside continuous integration to catch prompt drifts or regression in tool calling.
- **Packaging & Delivery**: Distributed as a standalone compiled Go binary (`install.sh` / `install.ps1`) and as an Azure Developer CLI (`azd`) extension (`microsoft.azd.waza`), allowing teams to initiate evals via `azd waza init` and run them via `azd waza run`.

## Key Quotes

> "A Go CLI for evaluating agent workflows, skills, and custom agents — author repository, CLI, and MCP scenarios, run graded trials, and inspect the evidence."

> "Mock success checks the harness, not agent quality or live service safety. Version boundary (October 20, 2026): the published standalone CLI is v0.39.0. Scenario authoring, preflight, selected-file evidence, assurance profiles, controlled release policies, recorded reliability, and the opt-in dashboard Lab described here are included in that release."

> "Waza bundles the GitHub Copilot CLI used by the copilot-sdk executor and extracts it and its runtime assets to a versioned directory in the local user cache on first use..."

## Takeaways

- **Decouple harness checks from model quality evals**: Waza explicitly highlights that verifying the execution harness via mocks is distinct from evaluating agent decision-making and safety on live calls.
- **Scenario-based MCP and CLI testing**: Agent testing requires treating tool interfaces (CLI, MCP, filesystem diffs) as formal integration contracts with graded assurance profiles.
- **Artifact-centric evidence collection**: Automated evaluations require persistent run artifacts (selected-file diffs, logs, execution traces) to diagnose non-deterministic failures.
- **CI gating for agentic capabilities**: Agent skills need formal regression suites integrated into CI pipelines before deployment or prompt updates are merged.

## Open Questions

- How does Waza handle non-deterministic LLM grading variations across repeated runs of identical scenarios?
- What are the cost management and token budget enforcement mechanisms when running expansive CI eval suites against paid inference endpoints?
- How does the scenario schema model multi-turn stateful dialogues and complex MCP tool interactions over long trajectories?
