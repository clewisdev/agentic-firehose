---
title: "No course will teach you Harness engineering—two GitHub repos will"
url: https://www.linkedin.com/posts/shreyshahh_no-course-will-teach-you-harness-engineering-share-7507357919823339520-FYzA/
authors: [Shrey Shah]
captured: 2026-09-20
source_type: post
topics: [harnesses, agent-architecture, engineering-judgment]
tags: [learning-by-implementation, external-memory, error-recovery, agentic-loops]
signal_level: medium
status: raw
confidence: medium
freshness_until: evergreen
---

## Summary

Shrey Shah argues that harness engineering—the mechanical work of building reliable agent loops—is best learned through reading and implementing real code rather than courses or tutorials. He recommends four concrete repositories as the learning pathway:

1. **learn-harness-engineering** — walks through core mechanisms and internals
2. **pi (earendil-works)** — end-to-end module design and implementation
3. **harnesscode** — long-running agents with external memory, small-step execution, and auto-loop (based on Anthropic harness paper)
4. **llm-wiki-compiler** — structured knowledge accumulation with outer loop (decisions) / inner loop (knowledge) separation

The learning method proposed: read real implementations → build something small → use AI as a tutor when stuck, not docs or tutorials.

## Key insight from comments

Siddartha Reddy Chinthala surfaces an important tension in the thread: "Most agent failures I have seen trace back to the loop around the model. The error handling and retry logic around tool calls matter more than the model choice itself." This reframes harness engineering as fundamentally about **error recovery and state management**, not model capability.

## Takeaways

- **Harness engineering is a craft learned from code, not lectures.** The mechanisms (loops, retries, external memory, small-step execution) are learnable patterns.
- **Error recovery is the hidden failure mode.** Most DIY harnesses fail silently on retry logic and long-running state, not on base model output.
- **External memory + small-step execution is the reliability pattern.** Both harnesscode and llm-wiki-compiler use this separation.
- **AI-assisted code reading is a valid learning strategy.** Using Claude/ChatGPT to explain mechanism as you read the source is positioned as legitimate pedagogy.

## Open questions

- Which of these repos handles error recovery best? (Asked but not answered in thread.)
- How does the "small-step execution" pattern compare to synchronous tool-use loops vs. async event-driven harnesses?
- What is the difference between harness design (loop structure) and harness tuning (timeout, retry budgets, memory eviction)?
