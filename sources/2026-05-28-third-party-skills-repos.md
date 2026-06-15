---
title: "Third-party skills repos: mattpocock/skills and anthropics/skills"
url: "https://github.com/mattpocock/skills"
authors: [mattpocock, Anthropic]
captured: 2026-05-28
source_type: repo
topics: [skills, harnesses, cost-management]
tags: [skills, claude-code, productivity, handoff, grill-me]
signal_level: high
status: summarized
confidence: high
freshness_until: 2026-Q4
---

# Third-party skills repos

Two repos surfaced from the captainhindsight.zip third-party references. Fetched and triaged 2026-05-28.

## mattpocock/skills

Full skill catalog. Organized into `engineering/`, `productivity/`, `misc/`, `personal/`, `deprecated/`, `in-progress/`.

**Cost/efficiency relevant skills:**
- **caveman** (productivity) — token compression, captured separately in `sources/2026-05-28-caveman-skill.md`. Preserved and installed.
- **handoff** (productivity) — compact conversation into handoff document. Preservation + install: `skills/handoff/SKILL.md`, `.claude/commands/handoff.md`. Directly addresses the 30%-threshold session-transition discipline.

**Design/process skills (high value, lower priority for KB right now):**
- **grill-me** (productivity) — intensive one-question-at-a-time questioning until all decision branches resolve. Useful for design sessions.
- **diagnose** (engineering) — debugging loop for complex bugs.
- **tdd** (engineering) — red-green-refactor cycle skill.
- **to-prd** (engineering) — generate PRDs from conversation.
- **write-a-skill** (productivity) — create new skills with proper structure.
- **zoom-out** (engineering) — request broader system context.

**Skills worth revisiting when relevant:**
- **git-guardrails-claude-code** (misc) — git safety hooks. Relevant when setting up CI/CD for the Worker.
- **to-issues** (engineering) — convert plans into GitHub issues. Useful when the Worker project gets a formal issue tracker.

## anthropics/skills

Official Anthropic skills repo. 142k stars, Apache 2.0. Focus is document manipulation:
- `docx`, `pdf`, `pptx`, `xlsx` skills — file creation/editing
- `example-skills` — demonstration patterns

Not relevant to this KB's current work. The document skills could become relevant if the KB ever ingests Word docs or PDFs at volume — but for now, `pdftotext` + capture flow covers the PDF case already.

## Signal assessment

Both repos: **high signal**. mattpocock's skills are specific, named, operational — not vague advice. The caveman benchmarks are measured. The handoff skill addresses a real workflow gap (session transitions). anthropics/skills is lower relevance to this KB but authoritative for document handling patterns.
