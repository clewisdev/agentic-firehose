---
title: "Santander AI Open Source"
url: https://github.com/SantanderAI
authors: [Banco Santander AI Labs]
captured: 2026-06-21
source_type: repo
topics: [agent-architecture, tool-use, safety, memory, evals]
tags: [open-source, financial-services, responsible-ai, mlops, graph-ml, llm-evaluation, harness-engineering]
signal_level: medium
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

Santander AI Labs maintains a curated portfolio of open-source AI engineering tools targeting financial services, with explicit focus on responsible AI, MLOps, graph machine learning, and LLM evaluation. The organization publishes 14+ active projects under Apache-2.0 and CC-BY licenses, all using synthetic or anonymized data only.

### Featured projects include:

**ralph** — configurable Bash/PowerShell loop for running an AI coding CLI with fresh session per iteration. Directly applicable to agentic loop harness engineering.

**autoguardrails** — alignment-research scaffold (autoresearch-style) for LLM guardrails over a single policy.md surface. Model-agnostic governance for high-stakes LLM decisions.

**mech-gov-framework** — Mechanical Governance for LLM Decisions; hard gates and governance metrics for production agent systems.

**gen-fraud-graph** — synthetic fraud graph generator; scales to 100M+ accounts for training graph-based fraud detection. Demonstrates concrete agentic orchestration over relational data.

**linear-adapter-trainer** — trains linear embedding adapters with triplet loss for RAG retrieval alignment—relevant to memory / context-engineering in agent workflows.

**llm_bridge** — tiny vendor-neutral LLM client (OpenAI, AWS Bedrock, Google Gemini, custom); single interface pattern for multi-model agent deployments.

**causal-perception-implementation** — ML research code comparing structural causal models via interventional and counterfactual distributions, applied to fair credit decisions. Relevant to engineering judgment and safety.

**auto-bayesian** — config-driven interpretable Bayesian network training for relational tabular data; interpretability focus aligns with financial services risk.

### Governance model

Two-track review process: Fast Track (forks, generic tools, tutorials) < 4 hrs SLA; Full Track (AI models, IP frameworks) reviewed by FOSS Review Board (OSPO Lead + Legal + CISO + Architect), 2–4 week SLA. Transparent GOVERNANCE.md published.

## Takeaways

- **Harness + orchestration**: ralph and mech-gov-framework provide concrete patterns for looped agentic execution with governance enforcement.
- **Financial domain signal**: projects target real friction in fraud detection, fairness, and decision transparency—not generic list-posts.
- **Memory/retrieval**: linear-adapter-trainer and llm_bridge address practical multi-model rag and embedding alignment.
- **Safety-first framing**: autoguardrails, causal-perception, mutatis-mutandis prioritize fairness and discrimination testing as first-order concerns.
- **Reproducibility**: synthetic data policy and published governance docs suggest mature operational discipline.

## Open questions

- How is ralph's loop termination / success criteria defined in practice? Does it integrate with CI/CD guardrails?
- What does policy.md look like in autoguardrails; is there a template or published example?
- How does mech-gov-framework compare to existing policy-as-code tools (OPA, etc.)?
- Linear-adapter-trainer: triplet-loss alignment for RAG—what query distribution was used for financial domain?

