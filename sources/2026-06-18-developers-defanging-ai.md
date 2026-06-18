---
title: "Developers build the best tools for developers – and are now defanging the AI menace"
url: https://www.theregister.com/ai-and-ml/2026/06/17/developers-build-the-best-tools-for-developers-and-are-now-defanging-the-ai-menace/5255316
authors: [Mark Pesce]
captured: 2026-06-18
source_type: blog
topics: [agent-architecture, cost-management, engineering-judgment, team-dynamics]
tags: [token-cost, diffusion-models, feedback-loops, ci-cd, agents, developer-tooling]
signal_level: medium
status: raw
confidence: medium
freshness_until: 2027-Q2
---

## Summary

Mark Pesce reports from AI Engineer Melbourne conference on how developers are adapting to agentic systems not by panic but by pragmatic tool-building and cost optimization. The piece frames the emotional arc of engineering communities moving through denial/anger/bargaining toward acceptance and productive innovation.

Key practical contributions:

**Token cost management**: AJ Fisher demonstrated "diffusion" models—text generators analogous to image diffusers that trade speed/accuracy for cost efficiency. The "Ralph Wiggum loop" pattern: use a cheaper, lower-quality model with iterative refinement to match full-fat frontier model results at 1/2 to 1/10 the token spend. Google released DiffusionGemma days after this talk, making the approach immediately accessible.

**Psychological divide**: Annie Vella (author of "The Software Engineering Identity Crisis") documented grief responses among engineers. The field splits into outcome-seekers (who embrace AI shortcuts) and learning-seekers (for whom the journey *is* the work). She prescribes sensitivity and listening rather than forced adoption.

**Critical thinking as guardrail**: Jeremy Howard (Kaggle/fast.ai) emphasized maintaining skeptical thinking despite AI ubiquity. His SolveIT tool combines notebook, reference, and chat paradigms to encourage knowledge exploration over passive consumption.

**Self-healing systems via feedback loops**: Daniel Rodgers-Pryor's CI/CD pipeline feeds metrics, logs, and user feedback into agents that identify issues, fix code, test, and deploy—creating an "anti-fragile" system that improves under load. Reframes engineering as optimizing feedback-loop tightness rather than manual patch cycles.

## Verbatim quotes

> "Developers build the best tools for developers" – framing that agentic engineering is not top-down imposition but practitioner-driven.

> "Use a low-quality model and make it iterate on a problem...until it gets a satisfactory solution. This approach delivers the same result as a full-fat model, for anywhere from one half to one tenth the spend."

> "How can you make those feedback loops shorter and tighter?" – Rodgers-Pryor's reframing of engineering work in the agent era.

> "Those who look for outcomes, and those who look for learning, for whom the journey into understanding is the whole point of the exercise."

## Takeaways

- **Diffusion models + iteration**: viable cost-reduction pattern; DiffusionGemma commoditizes it immediately (high signal for cost-management practitioners).
- **Emotional labor matters**: grief and identity-threat are real blockers; prescriptive adoption without listening creates division.
- **Feedback loops as unit of work**: reframing engineering from task completion to system responsiveness; agents as enablers of closed-loop optimization.
- **Skepticism as hygiene**: Howard's insistence on critical thinking is a necessary counterweight to passive AI consumption.
- **Practitioner-driven tooling**: Pesce's framing suggests agentic adaptation emerges from ground-up problem-solving, not vendor mandate.

## Open questions

- How do diffusion-model iteration loops compare empirically to frontier models across different task classes (e.g., code generation vs. reasoning)?
- What are failure modes of the "anti-fragile" feedback loop when agents are deployed to production without human validation gates?
- How do learning-focused engineers integrate AI tools without neutering the epistemic value of struggle?
- Is DiffusionGemma suitable for safety-critical codepaths, or only for lower-stakes iteration?
