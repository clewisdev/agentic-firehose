---
title: "Scaling Laws for Agent Harnesses via Effective Feedback Compute"
url: https://arxiv.org/abs/2605.29682
authors: [Xuanliang Zhang, Dingzirui Wang, Keyan Xu, Qingfu Zhu, Wanxiang Che]
captured: 2026-06-18
source_type: paper
topics: [harnesses, agent-architecture, evals, cost-management]
tags: [scaling-laws, feedback-quality, test-time-compute, tool-calling, verification]
signal_level: high
status: raw
confidence: high
freshness_until: unknown
---

## Summary

This paper introduces **Effective Feedback Compute (EFC)**, a trace-level metric for measuring how efficiently agent harnesses convert computational budget into useful decision-making signals. Rather than treating all tool calls, tokens, or operations as equivalent, EFC credits feedback only when it is informative, valid, non-redundant, and actually retained for downstream decisions. The authors normalize EFC by task demand to allow fair comparison across problems with different feedback requirements.

The work directly addresses a gap in test-time scaling analysis: current methods parameterize agent cost by raw expenditure (tokens, tool calls, wall time), but this conflates wasteful computation with productive reasoning. EFC operationalizes the intuition that *how efficiently feedback is used* matters far more than *how much computation is spent*.

## Key Findings

**Prediction strength across evaluation settings:**
- Raw tokens and tool calls explain $R^2 = 0.33$ and $0.42$ respectively
- Strong multivariate baseline (SAS) reaches $R^2 = 0.88$
- Oracle-EFC reaches $R^2 = 0.94$
- Estimated-EFC/$D_{\mathrm{task}}$ reaches $R^2 = 0.99$

**Matched-budget interventions** (controlled cost, varied feedback quality): improving feedback quality alone raises success rate from $0.27$ to $0.90$, while raw cost and tool calls remain fixed. This directly demonstrates that quality of feedback, not quantity, drives harness performance.

**Real-world mixed traces:**
- NRS-EFC/$D_{\mathrm{task}}$ reaches $R^2 = 0.92$ while raw compute has near-zero or negative fit
- Remains best predictor in prospective holdout validation ($R^2 = 0.85$)

## Verbatim quotes

> "Agent harnesses increasingly determine the performance of language-model systems by deciding how models call tools, receive feedback, verify intermediate states, store memory, and revise solutions."

> "EFC-based coordinates consistently predict failure rates better than raw-compute baselines and a strong multivariate SAS baseline."

> "These results suggest that harness scaling is governed less by how much computation is spent than by how efficiently raw budget is converted into durable, task-sufficient feedback."

## Takeaways

- **Harness design matters more than raw budget**: Simply increasing token count or tool calls does not reliably improve agent performance; the *quality and retention* of feedback does.
- **EFC is actionable for cost optimization**: At matched budgets, prioritizing feedback informativeness and validity over raw operation count yields 3x improvement in success rate.
- **Task-normalized metrics are necessary**: Raw EFC is misleading across heterogeneous tasks; normalizing by task demand ($D_{\mathrm{task}}$) enables cross-domain scaling laws.
- **Existing scaling curves are incomplete**: Raw compute ($R^2 = 0.33$–$0.42$) and even strong baselines ($R^2 = 0.88$) leave substantial unexplained variance; EFC closes this gap systematically ($R^2 = 0.92$–$0.99$).
- **Feedback retention is empirically measurable**: The ability to trace whether feedback is actually used in subsequent decisions allows discrimination between redundant and productive computation.

## Open questions

- How does EFC scale with harness complexity (multi-agent, hierarchical tool graphs)?
- Can EFC be estimated cheaply in deployment without full trace instrumentation?
- Which harness design patterns (e.g., plan-verify loops vs. inline verification) naturally maximize EFC?
- Does task demand ($D_{\mathrm{task}}$) generalize across domains, or must it be learned per domain family?
