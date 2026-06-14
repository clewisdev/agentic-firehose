---
title: "OWASP LLM Top 10 (2025)"
url: https://genai.owasp.org/llm-top-10/
authors: [OWASP GenAI Working Group]
captured: 2026-05-28
source_type: docs
topics: [harnesses]
tags: [security, owasp, prompt-injection, excessive-agency, supply-chain, reference]
signal_level: high
status: summarized
confidence: high
freshness_until: 2027-Q1
---

# OWASP LLM Top 10 (2025 Edition)

Reference standard for LLM application security. Use as a checklist when designing harnesses, evaluating agent permissions, or reviewing agentic architectures.

## The 10 risks

1. **Prompt Injection** — user or tool output manipulates LLM behavior
2. **Sensitive Information Disclosure** — LLM leaks data from training or context
3. **Supply Chain** — vulnerabilities in LLM dependencies (models, datasets, plugins)
4. **Data and Model Poisoning** — contaminated training or fine-tuning data
5. **Improper Output Handling** — insufficient validation/sanitization of LLM outputs before use
6. **Excessive Agency** — agent granted more capabilities than the task requires
7. **System Prompt Leakage** — internal instructions exposed to users
8. **Vector and Embedding Weaknesses** — security risks in RAG/vector stores
9. **Misinformation** — false or misleading LLM outputs acted upon
10. **Unbounded Consumption** — uncontrolled resource/token/cost usage

OWASP also maintains a separate "Agentic App Security" initiative recognizing that agentic architectures have distinct risk surfaces beyond the generic LLM list.

## Agentic relevance

The most directly harness-relevant risks: **Prompt Injection** (tool output poisoning), **Excessive Agency** (permission scoping), **Unbounded Consumption** (rate limits, cost controls), and **Improper Output Handling** (agent acting on unsanitized LLM output). These four should be the checklist for any agentic harness design review.

## Related

- `sources/2026-05-28-vibesec-reckoning.md` — security governance for LLM-assisted development
- `sources/2026-05-20-berkin-harness-engineering.md` — harness as what the agent is *allowed* to do
- `topics/harnesses/index.md`
