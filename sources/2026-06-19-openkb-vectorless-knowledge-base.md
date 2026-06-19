---
title: "OpenKB: Open LLM Knowledge Base"
url: https://github.com/VectifyAI/OpenKB
authors: [VectifyAI]
captured: 2026-06-19
source_type: repo
topics: [memory, context-engineering, system-design]
tags: [knowledge-base, reasoning-retrieval, multi-modal, wiki, pageindex, long-documents]
signal_level: high
status: raw
confidence: high
freshness_until: unknown
---

## Summary

OpenKB is an open-source CLI system that compiles raw documents into a persistent, structured wiki-style knowledge base using LLMs. It implements a reasoning-based retrieval layer (PageIndex) instead of traditional vector embeddings, enabling handling of long documents and multi-modal content without a vector database.

The core insight: traditional RAG re-derives knowledge on every query; OpenKB compiles knowledge once into a persistent wiki with cross-references, then keeps it current. The system operates in two layers:

1. **Wiki foundation**: Compiles documents into summaries, concept pages, entity pages, and cross-links, maintained automatically as new documents are added
2. **Generators**: Query/chat interfaces and Skill Factory (extracts redistributable agent skills) that consume the compiled wiki

### Architecture & Key Features

**Short vs. long document handling:**
- Short documents: Converted to Markdown, read in full by LLM
- Long PDFs (≥20 pages): Indexed via PageIndex into hierarchical tree with per-node summaries; LLM reads tree structure instead of full text

**Broad format support**: PDF, Word, Markdown, PowerPoint, HTML, Excel, CSV, text, URLs.

**Native multi-modality**: Retrieves and understands figures, tables, images via inline extraction (short docs) and PageIndex extraction (long docs).

**Wiki structure** (plain .md with [[wikilinks]], Obsidian-compatible):
- `index.md` — knowledge base overview
- `summaries/` — per-document summaries
- `concepts/` — cross-document synthesis
- `entities/` — named entities (people, orgs, places, products)
- `sources/` — full-text conversions
- `explorations/` — saved query results
- `reports/` — lint reports

**Knowledge compilation flow**: When a document is added, the LLM generates summaries, creates or updates concept and entity pages with cross-document synthesis, updates index and operations log. A single source may touch 10–15 wiki pages.

### Implementation Details

- **LLM support**: Multi-LLM via LiteLLM (OpenAI, Claude, Gemini, etc.)
- **Retrieval**: PageIndex tree indexing for vectorless, reasoning-based retrieval
- **Skill Factory**: Distills redistributable agent skills from wiki content
- **Session persistence**: Multi-turn chat with resumable sessions
- **Configuration**: YAML-based config, environment-driven API keys

### Quick Start Commands

```bash
openkb init
openkb add paper.pdf
openkb add ~/papers/  # directory
openkb add https://arxiv.org/pdf/...  # fetch from URL
openkb query "What are the main findings?"
openkb chat
openkb skill new my-expert "Reason like an expert on <topic>"
```

## Takeaways

- **Knowledge accumulation, not re-derivation**: The persistent wiki model directly addresses RAG's stateless limitation—synthesis compounds over time rather than being reconstructed per-query.
- **Vectorless long-document retrieval**: PageIndex tree indexing enables accurate context-aware retrieval without vector embeddings; solves the problem of applying dense retrieval to documents beyond typical context windows.
- **Multi-modal out of the box**: Figures, tables, and images are extracted and understood natively, not stripped away as many RAG systems do.
- **Skill distillation as a capability**: Exporting knowledge as reusable agent skills is a concrete path toward modular, redistributable expertise.
- **Plain-text wiki persistence**: Markdown + wikilinks keeps the knowledge base human-readable, version-controllable, and portable (Obsidian integration).

## Open Questions

- How does PageIndex tree indexing scale to document collections > 1GB? Is there a point where hierarchical summarization becomes lossy or introduces drift?
- How are contradictions detected and surfaced across documents? Is this an LLM task or does the system implement formal consistency checking?
- What is the token cost of maintaining and re-synthesizing a large wiki as new documents are continuously added?
- Can Skill Factory actually produce agent skills that generalize beyond the original knowledge base, or are they tightly bound to the source corpus?
- How does the system handle dynamic/temporal documents (versions, corrections, retractions)?
