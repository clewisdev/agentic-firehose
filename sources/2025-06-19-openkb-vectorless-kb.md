---
title: "OpenKB: Open LLM Knowledge Base"
url: https://github.com/VectifyAI/OpenKB
authors: [VectifyAI]
captured: 2025-06-19
source_type: repo
topics: [memory, context-engineering, agentic-workflows]
tags: [knowledge-base, rag, pageindex, vectorless, wiki, obsidian, skill-distillation]
signal_level: high
status: raw
confidence: high
freshness_until: unknown
---

## Summary

OpenKB is an open-source CLI system that compiles raw documents into a structured, persistent wiki-style knowledge base using LLMs, with no vector database dependency. It uses PageIndex's reasoning-based tree indexing to handle long documents and maintains cross-references, summaries, and entity pages automatically.

The core insight: traditional RAG re-derives context on every query; OpenKB compiles knowledge once into a persistent wiki that accumulates and compounds over time. The two-layer architecture separates wiki foundation (compilation and maintenance) from generators (query, chat, Skill Factory).

## Key capabilities

- **Format support**: PDF, Word, Markdown, PowerPoint, HTML, Excel, CSV, text, URLs
- **Vectorless retrieval**: Uses PageIndex tree indexing instead of embeddings; enables accurate context-aware retrieval for long documents
- **Native multimodality**: Retrieves and understands figures, tables, images alongside text
- **Compiled wiki structure**: Auto-generates summaries, concept pages, entity pages (people, orgs, places, products), cross-links
- **Session persistence**: One-off queries or multi-turn chat with resumable sessions
- **Skill Factory**: Distills redistributable agent skills from the wiki
- **Obsidian-compatible**: Wiki stored as plain `.md` files with `[[wikilinks]]`; graphable in Obsidian

## Architecture

Short documents → markitdown → LLM reads full text  
Long PDFs (≥20 pages) → PageIndex → LLM reads document trees

Both feed into wiki compilation:
- `index.md`: Knowledge base overview
- `log.md`: Operations timeline
- `AGENTS.md`: Wiki schema (LLM instructions)
- `sources/`: Full-text conversions
- `summaries/`: Per-document summaries
- `concepts/`: Cross-document synthesis
- `entities/`: Named entities
- `explorations/`: Saved query results
- `reports/`: Lint / consistency reports

Generators (query, chat, Skill Factory, report, podcast, ppt) consume the compiled wiki.

## Installation & quick start

```bash
pip install openkb
mkdir my-kb && cd my-kb
openkb init
openkb add paper.pdf
openkb add ~/papers/  # whole directory
openkb add https://arxiv.org/pdf/...  # from URL
openkb query "What are the main findings?"
openkb chat  # multi-turn
openkb skill new my-expert "Reason like an expert on <topic>"
```

Multi-LLM support via LiteLLM (OpenAI, Claude, Gemini, etc.). Configure model in `config.yaml` or `.env`.

## Knowledge compilation workflow

When a document is added:
1. LLM generates summary page
2. Reads existing concept and entity pages
3. Creates or updates concepts with cross-document synthesis
4. Creates/updates entity pages
5. Updates index and log

A single source may touch 10–15 wiki pages; contradiction detection and synthesis reporting built in.

## Conceptual grounding

Based on Andrej Karpathy's concept that LLMs can generate structured, interlinked summaries and concepts. Contrasts with transient RAG: knowledge should compound, not be re-derived per query. Wiki becomes the single source of truth; retrieval becomes lookup into compiled structure.

## Takeaways

- **Persistent vs. transient**: Core innovation is moving from per-query retrieval to compiled, maintained knowledge structure
- **No vector DB requirement**: Reasoning-based tree indexing (PageIndex) replaces embedding-based similarity
- **Multimodal at retrieval time**: Images, tables, figures are part of the indexed structure, not post-hoc attachments
- **Agent skill distillation**: Knowledge base can export reusable agent behaviors (Skill Factory)
- **Format agnostic ingestion**: Handles PDFs, images, URLs, structured data; auto-extracted via markitdown and PageIndex
- **Obsidian interop**: Wiki format enables offline browsing, graph exploration, manual refinement

## Open questions

- How does PageIndex tree indexing perform on very long (100K+ token) documents vs. chunking + BM25 or dense retrieval?
- What is the cost/latency trade-off of compilation (LLM calls per source) vs. query time savings?
- How does contradiction detection and merge conflict resolution work when two sources state conflicting facts?
- Scalability: tested up to how many documents / total KB size?
- Version control / audit trail: how are wiki changes tracked and reverted?
