---
title: "Emerging Patterns in Building GenAI Products"
url: https://martinfowler.com/articles/gen-ai-patterns/
authors: [Bharani Subramaniam, Martin Fowler]
captured: 2025-02-25
source_type: blog
topics: [retrieval, evals, model-internals, safety]
tags: [llm, production, hallucination, non-determinism, prompt-engineering]
signal_level: medium
status: raw
confidence: high
freshness_until: 2026-Q2
---

## Summary

Martin Fowler and Bharani Subramaniam (CTO, Thoughtworks) document patterns observed across real client engagements moving GenAI systems from proof-of-concept to production. The core insight: these systems introduce fundamentally different problems than traditional software—hallucination, unbounded data access, non-determinism—requiring systematic engineering patterns.

The article identifies nine patterns organized around two axes:

1. **Knowledge/context enhancement**: Direct Prompting, Embeddings, RAG, Fine Tuning
2. **Safety & reliability**: Evals, Guardrails, Hybrid Retriever, Query Rewriting, Reranker

### Key patterns:

**Direct Prompting**: Connect user queries directly to a foundation LLM. Works for many contexts but fails on: knowledge cutoff (static training data), context unawareness (can't prioritize relevant knowledge), confidentiality risks, and hallucination (confident false answers). "Direct Prompting is a powerful tool, but one that often cannot be used alone."

**Evals**: Systematic evaluation of LLM responses in task-specific context. Essential because Gen AI systems are non-deterministic; cannot rely on traditional testing. "When evolving our practices to work with Gen AI, we've found it's crucial to establish a systematic approach for evaluating the effectiveness of a model's responses."

**Retrieval Augmented Generation (RAG)**: Retrieve relevant document fragments and include them in prompts. Solves knowledge cutoff and context problems but requires scaffolding (reranking, query rewriting, guardrails).

**Fine Tuning**: Additional training on pre-trained LLMs for domain-specific knowledge when RAG is insufficient.

**Guardrails**: Separate LLM calls to prevent malicious input or sanitize outputs. Can use embeddings or rule-based approaches.

## Verbatim quotes

> "As we move software products using generative AI technology from proof-of-concepts into production systems, we are uncovering a range of common patterns."

> "The transition of Generative AI powered products from proof-of-concept to production has proven to be a significant challenge for software engineers everywhere... folks thinking that these products are merely extensions to traditional transactional or analytical systems."

> "Evals play a central role in ensuring that these non-deterministic systems are operating within sensible boundaries."

> "The LLM will not know anything that has happened since it was trained... unaware of the context that's operating in, which should make it prioritize some parts of its knowledge base that's more relevant to this context."

> "As with any pattern, none of these are gold standards that should be used in all circumstances. The notes on when to use it are often more important than the description of how it works."

## Takeaways

- **Non-determinism is the root problem**: Traditional software testing/QA frameworks break; systematic evals are mandatory, not optional.
- **RAG is not plug-and-play**: Basic RAG fails on real queries; requires hybrid retrievers, query rewriting, reranking, and guardrails to be production-ready.
- **Patterns are contextual, not prescriptive**: Each pattern has specific failure modes and trade-offs; no single approach solves all problems.
- **Production GenAI is *systems* engineering**: Individual LLM prompts are insufficient; the full stack (evals → guardrails → reranking → fallbacks) is the unit of analysis.
- **Knowledge source matters more than model size**: The article privileges context injection (RAG, fine-tuning) over larger model capability—suggests real bottleneck is *relevance* not raw performance.

## Open questions

- How do these patterns compose under resource constraints (latency, cost, token limits)? Trade-off matrix between RAG complexity and fine-tuning cost?
- What does evaluation coverage look like for non-deterministic systems? How many eval samples are sufficient for production confidence?
- Failure modes of each pattern under adversarial / out-of-distribution user input—beyond the broad guardrails frame?
- How does this architecture evolve as LLM capabilities improve (reasoning, tool use, multimodal)? Are these patterns time-bound?
