---
title: "How Meta Built Forum With AI-Native Engineering"
url: https://engineering.fb.com/2026/10/15/ml-applications/how-meta-built-forum-ai-native-engineering/
authors:
  - Shengbo Guo
  - Bohou Luo
  - Shubhojeet Sarkar
  - Vivian Qu
  - Max (Xiangjun) Fan
  - Prerna Jain
  - Mike Plumpe
  - Chinmay Abhyankar
  - Rish Tandon
captured: 2026-11-01
source_type: blog
topics: [agentic-workflows, agent-architecture, tool-use, system-design]
tags: [human-on-the-loop, verification-loop, simulator-tools, automated-testing, build-flavors]
signal_level: high
status: raw
confidence: high
freshness_until: 2027-Q4
---

# How Meta Built Forum With AI-Native Engineering

## Summary

Meta engineers describe building "Forum"—a standalone Facebook Groups app built from scratch—using an AI-native engineering model where agents operate as full participants in the loop rather than interactive typing assistants. Rather than optimizing for code generation volume, the team aligned success metrics around verified, production-ready changes that pass automated test suites, visual checks, and human code review.

The core cultural and structural transition was moving from "human-in-the-loop" (where an engineer manually drives every step while an LLM assists locally via autocompletion or Q&A) to "human-on-the-loop" (where autonomous agent runs handle the end-to-end iteration of planning, editing, building, testing, and self-correcting, while engineers set goals, intervene upon drift, and evaluate outcomes). Shifting humans from code writers to supervisors only succeeded when verification happened inside the agent loop; without automated verification, the development constraint simply shifted from authoring code to reviewing high volumes of plausible, non-working diffs.

The team identified four core foundational capabilities:
1. **Planning as technical specification**: Upstream decomposition into unambiguous, machine-readable specifications.
2. **Automated verification inside the loop**: Directly integrating build failures, unit tests, and UI spec matching into agent iterations so agents self-heal before opening a PR.
3. **Simulated user testing with agents**: Navigation agents interacting with live builds via the simulator to report regressions and verify UI state.
4. **Agentic production operations**: Automated post-launch root-cause analysis based on user feedback.

Meta structured their agentic machinery into five primitives: permanent **Rules** (encoded whenever an agent repeats an error more than twice), **Skills** (reusable team conventions), **Agents** (specialized autonomous checkers), **Commands** (chained workflows executing multi-stage reviews and bug fixes), and **Hooks** (deterministic triggers like running linters on every agent turn or checking simulator health). Crucially, the biggest throughput improvements came from modifying the codebase and tooling rather than prompt engineering: trading off complex legacy reuse for simplified, legible modular architecture; supplying live simulator inspection tools (reading the active view hierarchy directly) rather than textual UI descriptions to prevent hallucinated edits; and maintaining build-level isolation sandbox flavors for agent prototyping.

## Key Quotes

> "Point AI at the coding step alone doesn't change much. Our results compounded as we extended the approach to the stages around implementation — planning, building, testing, and verification."

> "Without verification, AI-generated code creates a familiar problem — plausible output that no one has confirmed actually works, which an engineer then has to read, debug, and often discard. Weak signals don't remove the constraint; they move it from writing code to reviewing code that looks finished and isn't."

> "The biggest gains came from changing our code and tooling, not our prompts."

> "Our main failure mode was the agent losing track of where it was in the app — editing the home feed when asked to change the group home screen, or guessing at screen coordinates. So instead of describing the app to the agent, we gave it tools to check: read the live view hierarchy from the simulator, list the elements actually on screen, and look up the path to a target view — all before it acts."

## Takeaways

- **Verification is the gating factor for delegation**: Moving from copilot-style (in-the-loop) to supervisor-style (on-the-loop) agent execution collapses unless fast, deterministic pass/fail signals (builds, tests, view comparisons) run inside the autonomous loop.
- **Adapt the environment, not just prompts**: Modifying architecture for extreme legibility and providing introspective tooling (e.g., queryable live view hierarchies via simulators) eliminates spatial and context disorientation much more effectively than prompt tuning.
- **Structured agent operating model**: Standardize on five distinct operational layers—Rules (error corrections), Skills (team conventions), Agents (autonomous checks), Commands (end-to-end chained workflows), and Hooks (deterministic lifecycle gates).
- **Architectural trade-offs for agent throughput**: Sacrificing legacy infrastructure reuse in favor of clean, modular scratch implementations yields massive dividends in agent reliability and developer velocity.

## Open Questions

- How did Meta implement the live view hierarchy inspection latency-wise, and what did the token payload per simulator state look like?
- What are the compute and cost profiles of multi-stage autonomous navigation loops running on headless simulators per pull request?