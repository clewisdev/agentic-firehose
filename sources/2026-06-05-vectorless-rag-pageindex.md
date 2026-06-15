---
title: "Vectorless RAG: PageIndex approach for long-form documents"
url: https://www.linkedin.com/posts/basiakubicka_the-entire-rag-industry-is-about-to-get-cooked-share-7464735565519745028-FsIZ/
authors: [Basia Kubicka]
captured: 2026-06-05
source_type: post
topics: [memory]
tags: [pageindex, vectorless, tree-search, financial-documents, embeddings]
signal_level: medium
status: summarized
confidence: medium
freshness_until: 2026-Q3
---

## Summary

LinkedIn post introducing PageIndex, a "vectorless RAG" approach developed by VectifyAI that replaces traditional vector similarity search with tree-based document structure indexing. The author (testing RAG systems for months) claims the approach achieves 98.7% on FinanceBench—a benchmark for long financial documents—and solves failure modes of chunking-based vector RAG on complex professional documents.

### Key Architecture Claims

1. **Tree index instead of vector index**: Generates table-of-contents tree structure; LLM reasons through tree (compared to AlphaGo tree search); returns page and section references rather than opaque vector similarity scores.

2. **Similarity vs. relevance distinction**: Argues that vector similarity fails for legal, finance, and technical documents where structural relationships and precise references matter more than embedding-space proximity.

3. **Traceability**: Every retrieval is auditable—concrete page/section references vs. "vibe retrieval."

### Practical details

- Open-source, pip-installable, with Colab demo
- Can integrate with OpenAI Agents SDK (tree tool swaps for vector tool)
- No chunking required; no vector database required

## Verbatim quotes

> "Similarity is not the same as relevance for legal, finance, and technical docs."

> "No more 'vibe retrieval.' Every retrieval is traceable."

> "Structural chunking [is what's actually happening]. The granularity tradeoff still exists. It just moved layers." (Ottavio Braun comment)

> "Vector retrieval would confidently return the wrong context for policy enforcement or audit trails." (Sudhendra Seshachala, on workflow routing systems)

## Takeaways

- **Structure > embedding similarity for professional documents**: Tree-based indexing may outperform vector RAG when document hierarchy and section relationships are meaningful and stable.
- **Traceability as enterprise requirement**: Auditability (page + section references) addresses governance/trust gaps in high-stakes deployments (finance, legal, policy).
- **Failure mode identification**: Vector RAG "quietly falls apart" on long documents; this is an observed problem space, not theoretical.
- **Structural assumptions as liability**: Success depends on stable, clean document structure; PDFs are messy; no published stress tests on adversarial or malformed inputs yet.
- **"No chunking" is reframing, not elimination**: Structural chunking trades off against vector chunking; tradeoff analysis still needed.

## Open questions

- How does PageIndex handle PDFs with broken hierarchies, inconsistent headings, or OCR errors?
- Does FinanceBench benchmark cover cross-document queries or temporal reasoning?
- What is the latency/inference cost of tree reasoning vs. vector similarity + reranking?
- How does maintenance and incremental updates work as source documents evolve?
- What failure modes emerge when the reasoning path is structurally coherent but semantically incorrect?
- Is 98.7% FinanceBench score on the original 150-case sample or a larger evaluation set?

## Context notes

Thread has substantive pushback in comments from Ottavio Braun (on robustness of structural assumptions) and others on retrieval vs. generation quality decoupling. Author claims months of testing; no before/after metrics or comparative benchmarks shared. FinanceBench is a real arXiv benchmark (2311.11944) but 98.7% claim lacks methodology detail. Engagement-farming CTA at bottom ("drop a comment below") and workshop link reduce signal slightly, but technical substance in thread and comments is genuine.
