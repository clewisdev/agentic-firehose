---
title: "Code maintainability plummets in the AI coding era"
url: https://leaddev.com/ai/code-maintainability-plummets-in-the-ai-coding-era
authors: [Bill Doerrfeld]
captured: 2026-07-07
source_type: blog
topics: [code-generation, technical-debt, evals]
tags: [code-quality, maintainability, duplication, legacy-code, error-handling, technical-debt]
signal_level: medium
status: raw
confidence: high
freshness_until: 2026-Q4
---

## Summary

This piece reports on GitClear and GitKraken research analyzing 623 million real-world code changes from 2023–2026 to quantify code quality shifts since widespread AI-assisted coding adoption. The study finds measurable deterioration across eight maintainability metrics, with AI-assisted commits now comprising one quarter of all commits.

## Key findings

**Code duplication and reuse decline:**
- Code duplication up 81% (measured as five or more consecutive repeated meaningful lines)
- Code reuse (refactor commits) down 70%
- Every new feature generates new implementations rather than extending shared libraries
- CEO Bill Harding: "Every time you want something, AI creates a new package for it."

**Legacy code neglect:**
- Legacy refactoring (commits touching code untouched >12 months) down 74% since 2023
- Functional connectivity (calls to existing functions in new commits) down 35%
- Developers building new rather than maintaining/integrating existing systems

**Error handling becomes obfuscation:**
- 47% increase in error-masking patterns (rescue/catch blocks, safe-navigation operators, stubbed methods that suppress signals)
- AI trades proper error inference for prompt satisfaction; avoids throwing errors regardless of input validity
- Result: shallow apps with silent failures and confusing user behavior
- Harding: "That shortcut becomes tech debt for the maintainers, who eventually need to ascertain which error handling was added for cause."

**Contextual data points:**
- Google's 2024 DORA report: 25% increase in AI usage correlates with 7.2% more deployment instability
- Concrete incidents cited: Moltbook token leak, Replit/PocketOS database deletion agents
- Metrics show signs of plateauing in early 2026, though duplication and churn remain elevated

## Takeaways

- **Quantified technical debt signal**: Eight-metric study over three years provides concrete baseline for AI's code quality impact; not speculative.
- **DRY principle erosion**: LLMs optimized for prompt satisfaction, not architecture; absence of enforced reuse patterns creates structural bloat.
- **Error handling as debt vector**: Silent failures (obfuscation) harder to audit and debug than explicit errors; compounds over time as maintainers can't distinguish intentional vs. expedient error suppression.
- **Legacy code as abandoned burden**: Declining refactoring suggests neither AI nor developers incentivized to improve or integrate existing systems.
- **Leadership action items**: Harding recommends measuring obfuscation patterns, auditing AI tool/cohort quality variance, enforcing code review discipline.

## Open questions

- Are metrics plateauing due to developer adaptation/best practices, or just slower growth rate of new code?
- How does error-masking density correlate with production incident rate in the wild?
- What specific code review / architectural patterns reverse duplication and boost reuse in AI-assisted workflows?
- Do different LLMs or prompt engineering strategies produce measurably different technical debt signatures?
