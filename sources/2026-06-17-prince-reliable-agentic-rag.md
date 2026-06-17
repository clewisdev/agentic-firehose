---
title: "Building Reliable Agentic AI Systems: A Case Study in Pharmaceutical RAG"
url: https://martinfowler.com/articles/reliable-llm-bayer.html
authors: [Sarang Sanjay Kulkarni]
captured: 2026-06-17
source_type: blog
topics: [agent-architecture, tool-use, context-engineering, harnesses, evals]
tags: [rag, multi-agent, drug-discovery, pharmaceutical, reflection-loop, text-to-sql, error-handling, observability]
signal_level: high
status: raw
confidence: high
freshness_until: 2027-Q2
---

## Summary

Sarang Kulkarni from Thoughtworks documents PRINCE, a production agentic RAG system deployed at Bayer AG to solve preclinical pharmaceutical research data access. The system evolved from keyword-based search to a multi-agent orchestration handling decades of safety study reports, unstructured PDFs, and structured metadata across silos.

The core architectural pattern: **user intent clarification → researcher agent (retrieval + text-to-SQL) → reflection agent (validation + sufficiency checking) → writer agent (synthesis + formatting)**. Each agent receives carefully bounded context; no agent sees the full corpus.

Kulkarni explicitly frames the engineering work through two lenses:

1. **Context engineering**: what information each model receives, what it doesn't, and how context flows between specialist steps
2. **Harness engineering**: orchestration, tool boundaries, state persistence, retries, fallbacks, validation loops, reflection, observability, and human review gates

The system prioritizes trust via transparency (intermediate reasoning steps logged), explainability (sources cited), and human-in-the-loop design. Error handling includes recovery from model hallucinations through reflection loops that validate sufficiency of retrieved data before synthesis. Structured metadata annotation and named-entity recognition enhanced data quality upstream.

## Key Quotes

> "Traditional keyword-based search methods, often reliant on rigid Boolean logic, frequently fall short when confronted with the nuanced and intricate nature of preclinical research questions."

> "Many of the engineering decisions behind PRINCE can now be understood through the lens of context engineering and harness engineering, although when the system was first designed we did not use these terms."

> "Harness engineering shaped the scaffolding around the models: orchestration, tool boundaries, state persistence, retries, fallbacks, validation, reflection loops, observability, and human review."

> "Crucially, the authoritative 'gold standard' information was consistently present within the approved PDF study reports."

## Takeaways

- **Agentic RAG in practice**: multi-agent decomposition (researcher, reflection, writer) outperforms single-pass retrieval; each agent has narrow scope and receives curated context
- **Reflection as validation**: dedicated agent to check data sufficiency before synthesis; prevents hallucination propagation downstream
- **Harness + context as twin design lenses**: orchestration and error recovery are as critical as prompt engineering; observability must track agent reasoning, not just final output
- **Human-in-the-loop gates**: production pharmaceutical systems require human review; design for easy escalation and audit trails
- **Upstream data quality**: NER annotation and structured metadata cleanup reduced hallucination; RAG is only as good as retrieval precision
- **Tool boundaries matter**: text-to-SQL tool gating, state persistence across agent calls, explicit retry logic for transient failures

## Open Questions

- How does the system handle conflicting information across multiple study reports? Is reconciliation a researcher or reflection agent concern?
- What was the false-positive rate for the reflection agent's sufficiency checks in early deployments? Did it ever block valid answers?
- How are new documents ingested and indexed? Is there a pipeline to auto-extract metadata or is human annotation required?
- What evaluation metrics were used to measure improvement over keyword search? (Paper cited but not available in fetch.)
- How does the writer agent handle regulatory document formatting compliance? Is that a separate harness or integrated into synthesis?
