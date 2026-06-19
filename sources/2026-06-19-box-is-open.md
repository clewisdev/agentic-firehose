---
title: "The Box is Open"
url: https://wyrd-technology.com/blog/the-box-is-open/
authors: ["Wyrd Technology"]
captured: 2026-06-19
source_type: blog
topics: [cost-management, agentic-workflows, enterprise-deployment]
tags: [pricing, cloud-vs-local, agentic-loops, token-economics, inference-cost, infrastructure]
signal_level: high
status: raw
confidence: high
freshness_until: 2027-Q2
---

## Summary

A structural analysis of AI pricing and deployment economics, arguing that cloud AI is currently subsidized and that agentic workflows—the most transformative use case—are paradoxically the most expensive to run in the cloud.

The author contends:

1. **Cloud AI pricing is unsustainable.** OpenAI is projected to lose ~$14B in 2026 on $20B revenue; cumulative losses through 2028 near $44B. Anthropic shows better unit economics but remains on a "pricing curve that has not yet reached its equilibrium." Current pricing reflects market-share acquisition via investor capital, not steady-state compute cost.

2. **Token economics of agentic work are severe.** Simple completions consume thousands of tokens; complex agentic sessions (iterative code implementation, multi-step planning, tool invocation loops) consume tens of thousands per session. The capability-to-token-consumption curve is steep and nonlinear. Subscription models mask this cost today but will not persist.

3. **Agentic paradox:** The most transformative use cases (autonomous coding, iterative synthesis, multi-step research) are the most financially unsustainable for cloud delivery. Organizations making AI-assisted development their primary mode face per-session economics that will tighten as profitability pressure increases.

4. **Local/on-premises becomes strategically rational.** Hardware and models now make on-premises deployment viable for workloads beyond privacy use cases. Organizations that plan deliberate, workload-aware deployment (not default-to-cloud) will have structural advantage.

5. **This is not an anti-cloud argument** but a call for intentional deployment strategy rather than vendor lock-in by default.

## Key quotes

> "Cloud AI is not priced at its true cost. It is subsidised infrastructure, built on speculative capital, and that subsidy has a finite lifespan."

> "The use cases that make AI genuinely transformative, specifically the agentic, iterative, autonomous workflows that produce the biggest productivity gains, are also the most expensive to run in the cloud."

> "A complex agentic task might involve dozens of planning steps, hundreds of tool invocations, and thousands of tokens of context being passed back and forth at each stage. The relationship between capability and token consumption is not linear. It is steep."

> "The subscription model is a gift to heavy users today. It is not a long-term structural feature of the pricing landscape."

> "Building your AI strategy on the assumption that today's pricing persists is not prudent planning. It is an undeclared bet on someone else's balance sheet."

## Takeaways

- **Cost modeling must account for token economics at scale.** Flat subscription fees hide per-session burn; agentic workflows in production will expose this gap rapidly.
- **Agentic/autonomous workflows are both the highest-ROI use case AND the highest cloud cost risk.** Organizations scaling these should model on-premises alternatives urgently.
- **Pricing pressure is structural, not temporary.** OpenAI/Anthropic face IPO and profitability mandates; price increases are inevitable; margin will narrow or margins will expand.
- **Deployment strategy should be deliberate and workload-specific,** not defaulted to cloud because vendors launched there. Lock-in risk exists on both axes (cloud vendor + LLM provider).
- **The "Pandora" framing is about irreversibility:** once agentic automation becomes the productivity baseline, you cannot un-adopt it—but you can choose where it runs and who controls the cost.

## Open questions

- What is the actual per-token cost of frontier model inference at OpenAI/Anthropic, and how does it compare to published API rates? (Author references earlier work on billing opacity.)
- At what deployment scale or token-per-month volume does on-premises inference become cheaper than cloud? (Hardware capex, fine-tuning, operational overhead vs. cloud opex.)
- How do current enterprise licensing models (high-volume commitments) factor into the subsidy narrative? Do volume discounts shift the calculus?
- What is the realistic deployment timeline for "serious" open-weight models (Llama, Qwen, Mixtral) to match frontier proprietary models in agentic task performance?
- How does this analysis account for inference optimization (quantization, distillation, MoE routing) that could reduce token burn in agentic loops?
