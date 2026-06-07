# RAG (Retrieval-Augmented Generation)

Architectures for extending LLM knowledge with retrieved context — vector-based, hybrid, and structural (tree/graph) approaches; when each wins and where each fails.

## Sources

- [Vectorless RAG — PageIndex](../../sources/2026-06-05-vectorless-rag-pageindex.md) — tree-based indexing (LLM reasons through ToC structure) vs. vector similarity; 98.7% FinanceBench claim; "similarity ≠ relevance for legal/finance/technical docs"; traceability (page + section refs) as enterprise audit requirement.

## Synthesis

- [The memory architecture spectrum: files, graphs, and vectors](../../synthesis/memory-architecture-spectrum.md) — positions 3 (knowledge graph) and 4 (production RAG) address the RAG design space; vectorless approach would sit between these positions for structured document corpora.
