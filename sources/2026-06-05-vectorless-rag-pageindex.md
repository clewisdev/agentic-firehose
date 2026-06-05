---
title: "Vectorless RAG: PageIndex and the shift from similarity to structure-based retrieval"
url: https://www.linkedin.com/posts/basiakubicka_the-entire-rag-industry-is-about-to-get-cooked-share-7464735565519745028-FsIZ/
authors: [Basia Kubicka]
captured: 2026-06-05
source_type: thread
topics: [retrieval, rag, document-structure]
tags: [pageindex, vectordb, chunking, financial-documents]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2026-Q4
---

## Summary

Basia Kubicka presents PageIndex, an open-source retrieval approach that replaces vector embeddings and similarity search with a tree-structured index built on document hierarchy. Instead of chunking documents and computing vector similarity, PageIndex generates a table-of-contents tree, then uses LLM reasoning (framed as AlphaGo-style tree search) to traverse it and return page/section references.

Key claimed advantage: 98.7% on FinanceBench—reportedly state-of-the-art for long professional documents. The frame positions this as addressing a real failure mode of vector RAG on long, complex financial/legal documents where "similarity is not the same as relevance."

## Verbatim quotes

> "Most of them quietly fall apart on long documents. And PageIndex is the first one that made me rethink chunking entirely."

> "No more 'vibe retrieval.' Every retrieval is traceable."

> "Similarity is not the same as relevance for legal, finance, and technical docs."

## Substantive pushback (from thread comments)

**Ottavio Braun** flags three realistic concerns:
1. Assumes stable, meaningful document structure; real PDFs are messy with layout shifts and inconsistent hierarchies
2. "No chunking" is misleading—it's structural chunking; granularity tradeoff moves layers, not vanishes
3. Missing failure analysis—no stress tests on ambiguous queries, cross-section reasoning, malformed documents

**Junaid Ahmed**: Retrieval quality ≠ answer quality; generation errors still happen. Notes pattern of "RAG is dead" cycles spawning new architectures.

**Sudhendra Seshachala**: Similarity vs. relevance distinction resonates in enterprise workflows; asks whether this matters equally across domains or if finance/legal docs expose it fastest.

**Cynthia Vazquez**: Emphasizes traceability as governance requirement, not just technical feature. Audit trails and explainability matter for decision-making.

**Pranath Fernando**: Flags maintenance friction—managing tree indexes as source documents evolve may be the real operational constraint.

## Takeaways

- **Real failure mode identified**: Vector RAG does struggle on long, reference-dense financial and legal documents; structure-aware retrieval is a reasonable hypothesis
- **Traceability > fuzziness**: Page/section references are more defensible than vector similarity scores in high-stakes domains
- **Unresolved robustness**: Approach assumes well-formed PDFs and coherent hierarchies; no published failure analysis on messy documents, cross-cutting queries, or semantic contradictions in reasoning paths
- **"No chunking" framing is loose**: Structural chunking still has granularity tradeoffs; the trade just moved from token-level to semantic-tree-level
- **FinanceBench results need context**: 150-case benchmark; unclear how generalize beyond financial QA or how it compares to recent hybrid approaches

## Open questions

- How does PageIndex handle PDFs with unstable/inconsistent hierarchies (headers missing, layout shifts, embedded tables)?
- What is the actual latency vs. vector RAG for retrieval + LLM reasoning over tree paths?
- Has anyone tested it on ambiguous queries requiring cross-section synthesis or on documents with contradictory claims in different sections?
- How does maintenance scale when source documents change—do trees need regeneration, and how are updates versioned?
- Is the AlphaGo framing (tree search) literal, or is it just LLM-in-the-loop navigation? What is the actual search/pruning strategy?
