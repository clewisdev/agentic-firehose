---
title: "Emerging Patterns in Building GenAI Products"
url: https://martinfowler.com/articles/gen-ai-patterns/
authors: [Bharani Subramaniam, Martin Fowler]
captured: 2026-05-30
source_type: blog
topics: [evals, memory, prompting, harnesses]
tags: [rag, embeddings, guardrails, fine-tuning, evals, llm-as-judge, query-rewriting, reranking, hybrid-retrieval]
status: summarized
confidence: high
freshness_until: 2027-Q1
---

# Emerging Patterns in Building GenAI Products

**Source**: martinfowler.com — Bharani Subramaniam (CTO Thoughtworks India/ME) and Martin Fowler  
**Published**: 25 February 2025  
**Signal**: High. Thoughtworks practitioners writing from real client engagements, not tutorial-style theory. Named production deployments (17,000-document life sciences RAG system). Pattern-language format with explicit "when to use" discipline. Fowler's editorial standards apply.

---

## Summary

This is a practitioner-oriented pattern catalogue for production GenAI systems, structured around a core thesis: the jump from PoC to production fails when teams treat LLM-based systems as extensions of transactional/analytical systems. The unique problems are hallucination, unbounded data access, and non-determinism — and the patterns address each.

### Patterns covered

**1. Direct Prompting**  
Sending user input straight to a foundation model. Described as the baseline that almost always needs augmentation — knowledge cutoffs, hallucination, and adversarial prompt risks make it insufficient alone for production. Useful to name explicitly so you know when you're *not* doing it.

**2. Evals**  
The centrepiece of the article. Evals are the non-deterministic equivalent of tests — not binary pass/fail, but scored across a range of scenarios. Three judging approaches:
- *Self-evaluation*: explicitly warned against. Models reinforce their own errors.
- *LLM-as-judge*: a different model (more capable LLM or specialized SLM) scores output. Reduces shared-bias risk. Recommended for automation.
- *Human evaluation / vibe checking*: manual, unscalable, but catches qualitative failures automated scoring misses.

Recommendation: combine LLM-as-judge with human eval for comprehensive coverage. Evals run in the build pipeline (like performance tests — threshold-based, not binary) AND on the live production system to catch drift. Individual components (guardrails, query rewriting) can be evaled independently.

Code example uses [DeepEval](https://github.com/confident-ai/deepeval) with `AnswerRelevancyMetric`.

**3. Embeddings**  
Lossy compression of data (text, images) into high-dimensional numeric vectors where semantic similarity ≈ geometric proximity. Explained via image embeddings (CLIP model, 768-dim vectors, cosine similarity) then generalised to text. Key "when to use" guidance: embeddings are for *semantic* similarity on unstructured data; for exact matches, relational queries, or numerical comparisons, use SQL/traditional DBs. Don't over-apply.

**4. Retrieval Augmented Generation (RAG)**  
The recommended default for extending LLM knowledge beyond training data. Core metaphor: giving a junior researcher a curated dossier before asking a question. Basic flow: chunk documents → embed → vector DB → embed query → ANN similarity search → inject retrieved fragments into prompt with a template that explicitly instructs the LLM to acknowledge gaps.

Production case study: 17,000 life-sciences research reports (thousands of pages each, text + tabular data). Pre-RAG: days-to-weeks to answer a query. Post-RAG chatbot: minutes. Required all four enhancement patterns below to ship.

The original RAG paper is cited (Meta AI); authors note the blog post companion is more approachable than the paper.

**5. Hybrid Retriever**  
Addresses the core RAG limitation: dense vector embeddings alone compress too much semantic detail. A hybrid retriever combines dense embedding search with sparse/keyword retrieval (e.g., BM25). Neither approach dominates across query types; combining them recovers recall that either alone misses. Footnote mentions ColBERT as an interesting alternative — token-level rather than passage-level embeddings.

**6. Query Rewriting**  
Addresses short/ambiguous user queries that fail to retrieve relevant chunks. An LLM generates multiple alternative formulations of the query; all are searched; results are merged. Compensates for users who can't articulate intent precisely.

**7. Reranker**  
Addresses context bloat: even if retrieval returns many relevant fragments, stuffing them all into the context window degrades performance ("Lost in the Middle" effect — LLMs favour content at start/end of context, not middle). A reranker re-scores retrieved fragments for relevance to the specific query and sends only the top-k. Logically distinct from the retriever; can be evaled independently.

**8. Guardrails**  
Separate LLM calls (or embedding-based checks, or rule-based filters) applied at input and/or output. Three implementation modes:
- *LLM-based guardrails*: a separate model call to detect harmful/off-topic input or sanitize output.
- *Embedding-based guardrails*: classify input semantically against known safe/unsafe categories.
- *Rule-based guardrails*: regex/pattern matching for known failure modes.

All three can be layered. Guardrails are independently evaluable components.

**9. Fine Tuning**  
Additional training on a pre-trained model for domain-specific knowledge. Described as expensive and usually not the right first move — RAG is preferable in most situations. Fine tuning becomes worthwhile when the domain vocabulary or behaviour is so specialized that in-context injection (RAG) consistently underperforms. Article notes this as "further work" territory, suggesting the authors have less production pattern experience here vs. RAG.

---

## Key quotes

> "We believe that a lot of these difficulties come from folks thinking that these products are merely extensions to traditional transactional or analytical systems."

> "The difficult part of using evals lies in fact that it is still early days in our understanding of what mechanisms are best for scoring and judging. Despite this, we see evals as crucial to using LLM-based systems outside of situations where we can be comfortable that users treat the LLM-system with a healthy amount of skepticism."

> "When we create a single embedding vector for a document chunk, we compress multiple paragraphs into one dense vector. While dense embeddings are good at finding similar paragraphs, they inevitably lose some semantic detail. No amount of fine-tuning can completely bridge this gap."

> "A common metaphor for an LLM is a junior researcher. Someone who is articulate, well-read in general, but not well-informed on the details of the topic - and woefully over-confident, preferring to make up a plausible answer rather than admit ignorance."

> "Performance is generally strongest when relevant details are positioned at the beginning or end of the context. However, it drops considerably when models must retrieve critical information from the middle of long inputs. This limitation persists even in models specifically designed for large context."

---

## Takeaways

1. **Evals are the load-bearing pattern.** Every other pattern's value is only knowable through evals. Instrument evals per-component (guardrails, query rewriting, reranker) not just end-to-end — this localises regressions. Run them in CI and on production.

2. **Basic RAG is almost never sufficient for production.** The life sciences case shows that all four enhancement patterns (Hybrid Retriever, Query Rewriting, Reranker, Guardrails) were needed together. Treat basic RAG as the starting point for iteration, not a destination.

3. **LLM-as-judge + human eval is the recommended eval combination.** Self-evaluation is actively discouraged — it reinforces model errors. The hybrid approach gives automated coverage with qualitative signal.

4. **Embeddings have a clear scope boundary.** Semantic similarity on unstructured data: yes. Exact matching, relational queries, numerical comparisons: use traditional DBs. Don't stretch embeddings into structured-data problems.

5. **"Lost in the Middle" is a real production failure mode.** Context window size doesn't eliminate the problem. Reranking before context injection is the mitigation — don't assume more context is always better.

---

## Open questions

- The article is light on **fine tuning specifics** — when exactly does RAG underperform enough to justify the cost? Needs a separate source.
- **Eval thresholds**: how do practitioners calibrate acceptable score ranges for metrics like answer relevancy? DeepEval's `threshold=0.5` in the example seems arbitrary — is there guidance?
- **Hybrid retriever weighting**: what's the right balance between dense and sparse retrieval? Does this need to be tuned per corpus or per query type?
- The article mentions ColBERT as a chunk-embedding alternative but doesn't give production experience. Worth tracking separately.
- Article dated Feb 2025 — the RAG tooling landscape moves fast. Check whether specific library recommendations (DeepEval, CLIP model versions) are still current.

---

## Related

- `topics/evals/index.md` — primary home for eval patterns
- `topics/memory/index.md` — embeddings and RAG are the memory architecture for most agents
- `topics/harnesses/index.md` — guardrails pattern fits here
- `topics/prompting/index.md` — RAG template and query rewriting are prompting patterns
