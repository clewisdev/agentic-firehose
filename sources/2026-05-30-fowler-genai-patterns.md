---
title: "Emerging Patterns in Building GenAI Products"
url: https://martinfowler.com/articles/gen-ai-patterns/
authors: [Bharani Subramaniam, Martin Fowler]
captured: 2026-05-30
source_type: blog
topics: [evals, memory, prompting, harnesses]
tags: [rag, embeddings, guardrails, fine-tuning, evals, llm-as-judge, query-rewriting, reranker, hybrid-retrieval, production]
status: summarized
confidence: high
freshness_until: 2027-Q1
---

# Emerging Patterns in Building GenAI Products

**Source:** martinfowler.com · Bharani Subramaniam & Martin Fowler · Published 25 Feb 2025  
**Signal level:** High — Thoughtworks practitioners documenting patterns from real client engagements, not tutorial content. Fowler's editorial oversight adds signal discipline. Code examples and named failure modes throughout.

## Summary

This is a practitioner pattern catalogue covering the journey from basic LLM usage to production-grade GenAI systems. The framing is explicit: proof-of-concept to production is the hard problem, and most teams underestimate it by treating GenAI products as extensions of transactional systems. The article is structured as named patterns in the GoF sense — each has a "when to use it" section, and the authors are clear that the anti-pattern is applying them indiscriminately.

### Patterns catalogued

**Direct Prompting** — baseline: connect user to foundation LLM. Named primarily to establish what's *insufficient*: knowledge cutoff, context blindness, hallucination confidence, prompt injection risk. Every other pattern is a mitigation.

**Evals** — the article treats evals as the non-negotiable foundation before any other enhancement. Key framing: evals are to GenAI what tests are to traditional software, but they're non-binary (scores + thresholds, not pass/fail). Three judging strategies:
- *Self-evaluation*: explicitly discouraged — reinforces errors/biases
- *LLM-as-judge*: a different (possibly smaller) model scores the output; popular for automation
- *Human evaluation ("vibe checking")*: informal but catches qualitative failures automated scoring misses

Recommended combination: LLM-as-judge + human eval. Example uses [DeepEval](https://github.com/confident-ai/deepeval) with `AnswerRelevancyMetric`. Evals run in CI pipeline *and* against the live production system continuously — framed analogously to performance testing.

Distinction drawn between **benchmarking** (model-level, standardized datasets, LLM vendors' job) and **evals** (product-level, custom datasets, your job).

**Embeddings** — explained mechanically with a worked image-embedding example (CLIP model, cosine similarity). Key conceptual point: embeddings encode semantic similarity, not surface pattern matching. Limitation noted: not appropriate for structured/relational data where SQL queries are superior.

**RAG (Retrieval Augmented Generation)** — the central pattern. Framing: gives the "over-confident junior researcher" a dossier of relevant docs before answering. Standard pipeline: chunk → embed → vector store → ANN similarity search → inject context into prompt template.

RAG template structure provided explicitly:
```
User prompt: {{user_query}}
Relevant context: {{retrieved_text}}
Instructions:
1. Use context; be accurate
2. If context insufficient, acknowledge gap
3. No unsupported speculation
```

Real engagement: 17,000 reports / thousands of pages for a life sciences company. Before: days-to-weeks of manual PDF search. After: minutes via multi-hop chatbot queries. Named as successful but requiring four enhancements to become production-viable:

| Limitation | Mitigating Pattern |
|---|---|
| Inefficient retrieval (dense embeddings lose semantic detail) | Hybrid Retriever |
| Minimalistic/ambiguous user queries | Query Rewriting |
| Context bloat / "Lost in the Middle" problem | Reranker |
| Gullibility (LLM accepts false context) | Guardrails |

**Hybrid Retriever** — combines dense vector search with other techniques (e.g. BM25 keyword search). Rationale: single-embedding retrieval compresses paragraphs into one vector and inevitably loses semantic detail. ColBERT mentioned as an alternative (token-level embeddings per passage rather than paragraph-level).

**Query Rewriting** — uses an LLM to generate multiple alternative phrasings of the user's query, then searches with all of them. Addresses the problem that real users write short, ambiguous queries that don't match document vocabulary.

**Reranker** — after retrieval returns a candidate set, a reranker scores fragments by usefulness and sends only the top results to the LLM. Directly addresses "Lost in the Middle": LLMs perform best when relevant content is at the beginning or end of context, not buried in the middle.

**Guardrails** — separate LLM calls to sanitize inputs and/or outputs. Three approaches:
- *LLM-based guardrails*: a second model checks for dangerous/off-topic inputs or problematic outputs
- *Embeddings-based guardrails*: similarity checks against known-bad patterns
- *Rule-based guardrails*: regex/keyword filters, simpler and faster

Note: guardrails address "gullibility" — the risk that adversarial context injected through RAG retrieval can manipulate the LLM's response.

**Fine Tuning** — additional training on a pre-trained LLM for domain-specific knowledge. Framed as a last resort: expensive, resource-intensive, and usually worse ROI than RAG. Authors include it but explicitly recommend exhausting RAG enhancements first.

### The realistic RAG stack

The article builds toward a "realistic RAG" that combines all enhancement patterns: Hybrid Retriever → Query Rewriting → Reranker → Guardrails wrapping the whole pipeline. Each layer addresses a specific failure mode of basic RAG.

## Key quotes

> "We believe that a lot of these difficulties come from folks thinking that these products are merely extensions to traditional transactional or analytical systems."

> "The difficult part of using evals lies in fact that it is still early days in our understanding of what mechanisms are best for scoring and judging. Despite this, we see evals as crucial to using LLM-based systems outside of situations where we can be comfortable that users treat the LLM-system with a healthy amount of skepticism."

> "When you're just starting with retrieval systems, it's a shock to realize that relying solely on document chunk embeddings in a vector store won't lead to efficient retrieval. The common assumption is that chunk embeddings alone will work, but in reality it is useful but not very effective on its own."

> "The Lost in the Middle paper reveals that LLMs currently struggle to effectively leverage information within lengthy input contexts. Performance is generally strongest when relevant details are positioned at the beginning or end of the context."

> "Fine-tuning requires substantially greater resources, and thus most of the time we've found RAG to be more effective."

## Takeaways

1. **Evals before everything else.** Don't build enhancements without a baseline eval suite. The article is structured this way deliberately — you can't tell if RAG, guardrails, or reranking are helping unless you can measure. Run evals in CI *and* continuously in production.

2. **Basic RAG will disappoint in production.** Chunk-level dense embeddings alone fail in four specific ways (retrieval quality, query ambiguity, context length, adversarial inputs). Expect to implement Hybrid Retriever + Query Rewriting + Reranker + Guardrails for any serious use case.

3. **LLM-as-judge + human spot-check is the practical eval combination.** Self-eval is actively harmful. Pure automation misses qualitative failure modes. The combination is imperfect but better than either alone.

4. **Embeddings ≠ relational data.** Don't reach for vector search when SQL is appropriate. Embeddings are for semantic similarity over unstructured text/images; exact matching and numerical comparisons belong in traditional databases.

5. **Fine-tuning is expensive enough to treat as a last resort.** The authors have tried both approaches across many engagements and consistently find RAG (with enhancements) more practical than fine-tuning for domain adaptation.

## Open questions

- The article was published Feb 2025 — how does this hold up against late-2025/2026 models with much larger context windows? The "Lost in the Middle" problem may be partially addressed by newer models; the reranker pattern's necessity should be re-evaluated.
- Guardrail implementation details are high-level. What are the practical false-positive rates for LLM-based vs. embeddings-based vs. rule-based guardrails? The article doesn't give operational numbers.
- ColBERT is mentioned as an alternative to chunk embeddings but not developed. Worth a separate capture.
- The article predates widespread MCP and tool-use patterns — these patterns predate agentic multi-step workflows. How do they compose with tool-calling agents rather than single-shot RAG?
- No discussion of cost trade-offs between running multiple LLM calls (guardrails, query rewriting, LLM-as-judge) vs. latency and API spend.
