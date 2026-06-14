---
title: "Maintainability sensors for coding agents"
url: https://martinfowler.com/articles/sensors-for-coding-agents.html
authors: [Birgitta Böckeler]
captured: 2026-05-30
source_type: blog
topics: [harnesses, evals, tool-use]
tags: [static-analysis, linting, mutation-testing, modularity, dependency-rules, sensors, self-correction, coupling, eslint, stryker, dependency-cruiser]
signal_level: high
status: summarized
confidence: high
freshness_until: 2027-Q2
---

## Summary

Birgitta Böckeler (Distinguished Engineer, Thoughtworks) is a practitioner with a named body of work on harness engineering for coding agents. This is a **direct follow-up** to an earlier piece on harness mental models, narrowing to one specific concern: keeping a codebase *maintainable* when AI agents are making changes continuously.

The test application is a real internal tool — TypeScript/Next.js/React analytics dashboard — rebuilt from scratch with AI (Cursor + Claude Code + OpenCode, primarily Claude Sonnet with Opus for planning). The experiments are documented with concrete configs, tool names, and actual findings. This is high-signal practitioner fieldwork.

### The core mental model

Sensors are automated feedback mechanisms that run during coding sessions, in CI, or on a schedule. They fall on a spectrum:

- **Computational (deterministic)**: type checker, ESLint, dependency-cruiser, Stryker mutation testing — run as part of the agent loop, fast, no token cost beyond processing results.
- **Inferential (LLM-based)**: AI-generated coupling reports, modularity reviews, security checklists — slower, higher token cost, but able to apply semantic judgment.

Sensors only help if they feed back into the agent's self-correction loop. A sensor that produces output the agent never reads is just CI theater.

### Static analysis: Basic linting (ESLint)

**Key insight**: Default ESLint presets don't include the rules most relevant to AI failure modes. Böckeler had to explicitly configure:
- Max function arguments
- File length
- Function length
- Cyclomatic complexity

She built a **custom ESLint formatter** that overrides default messages with self-correction guidance — essentially prompt injection via lint output. Example: instead of a bare `no-explicit-any` warning, the message includes a judgment call instruction and the suppress-with-comment pattern.

Also notable: agents can now make the "keep a clean house" discipline feasible that teams historically failed at. The agent is allowed to suppress a warning (with a reason), or slightly increase a threshold — not suppress forever. This preserves the rule's future sensitivity without forcing a binary comply/suppress choice.

**Observation**: The one rule category where the agent consistently chose to increase thresholds rather than refactor was cyclomatic complexity — and Böckeler traced this back to missing self-correction guidance for that specific rule. This validates that custom lint messages make a measurable difference.

### Static analysis: Dependency rules (dependency-cruiser)

Partway through the build, she worked with the agent to define a layered module structure (`routes → services → clients + domain`) and encode it as dependency-cruiser rules. Error messages include a recap of the full layering concept to aid self-correction.

**Key finding**: Dependency rules are a viable substitute for markdown architecture guides for the parts of structure that are expressible via import paths and folder layout. The agent self-corrected on violations. Without AI, the configuration cost of dependency-cruiser would have been prohibitive; AI absorbed it.

**Limit**: Only catches what's expressible as import relationships and file paths — not semantic coupling.

### Static analysis: Coupling metrics

Built a custom CLI + web UI to extract coupling metrics (fan-in/fan-out per file) using the TypeScript compiler. Ran an LLM (Claude Opus) against the CLI output with a detailed report prompt.

**Key findings**:
- LLM flagged a dependency-injection factory as a coupling hotspot — but it was intentional.
- LLM flagged a shared Zod schema as a "god module" — also a legitimate pattern for frontend/backend contracts.
- One useful finding: an `index.ts` that indiscriminately re-exported everything in a domain folder, imported widely — worth investigating.

**Conclusion**: Raw coupling data is not useful to AI on its own. Context matters enormously. Better use case: **impact radius for code review** — before reviewing an AI-changed file, check how many callers it has.

### Static analysis: AI modularity review

Used Vlad Khononov's "Modularity Skills" (an inferential sensor) to do a full codebase design review. This was the most productive of the experiments.

**Concrete findings the modularity review surfaced**:
1. **Duplicate route code** — three nearly-identical backend endpoint implementations; AI never refactored on its own at 3x repetition.
2. **Inconsistent backend calling patterns** — third page deviated from the established hook pattern; creates error-handling drift.
3. **Leaky argument passing** — `chatSpaceId` and `dateRange` threaded through 40+ files; a single config object was partially introduced but never consistently applied.
4. **Misplaced auth logic** — authentication fallback sitting inside the DI factory rather than a dedicated layer.
5. **Correct identification of legitimate hubs** — unlike the raw coupling analysis, the modularity skills correctly recognized the factory and shared schema as intentional patterns.

Running the modularity review against coupling CLI data didn't add material findings. Running it twice (without shared context) surfaced an issue the first run missed — **worth running LLM-based analyses multiple times when stakes are high**.

**Key takeaway**: Without human coupling expertise AND without these inferential sensors, the agent was steadily compounding technical debt. Computational sensors alone can't catch design-level issues.

### Test suite as a regression sensor

The entire test suite was AI-generated without review. Key tension:
- **Coverage** tells you a line was *executed* — not that its output was *verified*.
- **Mutation testing** (Stryker) catches missing assertions by introducing code mutations and checking if tests fail.

**Concrete example**: `mappers.ts` had 100% statement coverage, 75% branch coverage — but 13 mutation survivors and no unit tests. Coverage came from an acceptance test that called the function but never asserted its specific outputs.

AI was effective at analyzing Stryker's mutation hotspot output and prioritizing where to improve test quality. Böckeler wrote a custom CLI script to query Stryker's JSON output efficiently — avoiding context window overflow. "AI helping AI."

## Verbatim quotes worth preserving

> "Internal quality problems affect AI agents in similar ways that they affect human developers. An agent working in a tangled codebase might look in the wrong place for an existing implementation, create inconsistencies because it has not noticed a duplicate, or be forced to load more context than a task should require."

> "With coding agents, we might now have a chance at [the clean baseline]. In the guidance text above, the agent is told to make a judgment call, and allowed to suppress a warning in the code. This keeps the suppressions manageable, visible and reviewable."

> "A sensor is meant to give the agent feedback so that it can self-correct. Ideally, we want to give the agent extra context for that self-correction - a good kind of prompt injection."

> "I ran the modularity review after building most of the codebase without applying that type of review myself — and it had some quite concerning and very valid findings that would have increased risk in the future. It shows that without human review and coupling expertise, AND without these extra AI reviews, the agent was definitely compounding inadvertent technical debt."

> "AI agents usually don't go ahead and start refactoring without an explicit nudge when they repeat a piece of code for the third or fourth time, they are quite happy to copy and paste."

> "Another reason why linters like this have been less used in the past is that they have limits, and we have been wary of using them as a simplified indicator of quality... I can't help but wonder if this can also lead to a false sense of security and an illusion of quality."

## Takeaways

1. **Encode self-correction guidance in lint messages, not just rules.** The lint message is prompt injection — use it. Custom ESLint formatters are cheap to build with AI assistance and measurably affect agent behavior. Missing guidance for a rule (cyclomatic complexity) led to consistently wrong agent choices.

2. **Dependency rules > markdown architecture docs** for structural constraints expressible as import graphs. dependency-cruiser rules are machine-enforceable and feed directly into the agent loop. AI absorbs the config cost.

3. **Raw coupling metrics need semantic interpretation; don't trust them alone.** Fan-in/fan-out data surfaces legitimate patterns as false positives. Best use: impact-radius triage for code review, not standalone AI analysis.

4. **AI modularity review (inferential) is the highest-value maintainability sensor** — but only with well-designed prompts. It caught issues the deterministic sensors missed entirely. Run it multiple times for important decisions.

5. **Coverage is not test effectiveness.** Mutation testing is the right sensor for regression gap detection. Build tooling to query mutation results efficiently (custom CLI over raw JSON) to avoid context overflow.

6. **AI will not self-refactor at 3x+ repetition without an explicit nudge.** Design modularity review cadence to catch this pattern before it compounds.

## Open questions

- **Feedback overload risk**: Böckeler explicitly worries that activating many lint rules simultaneously could send agents into over-engineered refactoring spirals. No resolution offered — worth tracking.
- **Applying modularity review to diffs**: She notes it would be valuable to scope the inferential review to changed files in a PR, but hasn't explored this yet. High-priority research gap for harness design.
- **False sense of quality**: Legitimate concern that sensor coverage creates an illusion that quality is monitored when the semantic gaps remain large. No answer offered.
- **Component prop drilling**: ESLint's `max-lines-per-function` caused AI to decompose React components into smaller ones — but this created components with deeply nested prop chains. Rule interaction tradeoffs not resolved.
- **Test suite testing faulty behavior**: This article explicitly scopes to *test effectiveness*, not whether the tests assert *correct* behavior. The harder problem is deferred.

## Related

- Companion piece on harness mental models referenced but not linked here — worth finding and capturing.
- Vlad Khononov's "Modularity Skills" referenced as an inferential sensor prompt — check if this is a public artefact.
- Factory ESLint plugin with AI-specific rule sets mentioned — worth a separate capture.
