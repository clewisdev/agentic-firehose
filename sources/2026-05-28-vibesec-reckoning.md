---
title: "The VibeSec Reckoning"
url: https://martinfowler.com/articles/vibesec-reckoning.html
authors: [Gautam Koul, Lucian Moss, Neil Drew-Lopez, Daberechi Ruth Edeokoh]
captured: 2026-05-28
source_type: blog
topics: [harnesses]
tags: [security, vibe-coding, governance, harness-engineering, automated-gates]
status: summarized
confidence: medium
freshness_until: 2026-Q4
---

# The VibeSec Reckoning

Published 2026-05-27 on martinfowler.com. **Note: authored by Thoughtworks' Global Marketing AI team, not Martin Fowler himself.** This affects signal level — it's practitioner-adjacent content from the marketing arm of a consultancy, published on a high-signal platform. The framing is sound but treat specific claims with the skepticism you'd apply to any consultancy position paper.

## Summary

"Vibe coding" — non-technical users building applications with generative AI, driven by intuition and iteration rather than engineering discipline — creates systemic security risks because AI gravitates toward convenient (insecure) defaults. The article argues that prompting AI to "be secure" is insufficient; you need deterministic, enforced controls.

The core insight is worth isolating: **telling an LLM desired behavior is not the same as enforcing it.** The article frames this as the gap between inferential controls (prompts, instructions) and computational controls (automated scanning, deployment gates, linting). This maps directly onto the Berkin harness-vs-agentics distinction: agentics describes what an agent *may* do; harness engineering describes what it's *allowed* to do, enforced.

Three-tier response:

**Short-term**: Feed security rules into each AI session; scrutinize permission requests; use red-team prompting to identify vulnerabilities.

**Medium-term**: Create a versioned security context file (non-negotiable rules: zero trust, secrets management, scanning gates, supply chain integrity). Automated daily CVE intelligence feeds.

**Long-term**: Harness engineering principles embedded as mandatory gates; secure-by-default templates organization-wide; feedback loops forcing model self-correction.

## Key quotes

> "telling an LLM desired behavior is not the same as enforcing it"

> "Move from inferential controls (prompts) to computational controls (automated scanning, linting, deployment gates)"

## Takeaways

- **The inferential-vs-computational control framing is the most reusable idea here.** Prompts are inferential; automated gates are computational. Any security-critical behaviour should be computational, not inferential.
- **The versioned security context file** is essentially a CLAUDE.md / AGENTS.md for security policy — the same files-as-config pattern applies to governance. Rosenthal's `.claude/hooks/` for tiered approvals is the implementation of this.
- **This is a harness engineering problem, not a prompting problem.** The article's conclusions map neatly onto harness design: what does the harness *prevent* the agent from doing, regardless of what the agent is told?
- **Vibe coding is an accelerant for existing security problems**, not a new class of vulnerability. The specific risks (over-permissioned accounts, public storage buckets) are well-known; AI just generates them faster and at scale.

## Open questions

- The article doesn't address agentic-specific attack vectors (prompt injection via tool outputs, autonomous code execution). The OWASP LLM Top 10 covers these more directly.
- "Secure-by-default templates" are mentioned but not specified. What does a secure-by-default template look like for a Claude Code project?

## Related

- `sources/2026-05-20-berkin-harness-engineering.md` — agentics vs harness distinction
- `sources/2026-05-20-rosenthal-company-os.md` — `.claude/hooks/` for tiered role-based approvals
- `sources/2026-05-28-owasp-llm-top10.md` — security vulnerabilities specific to LLM systems
