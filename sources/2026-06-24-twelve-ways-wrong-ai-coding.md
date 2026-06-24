---
title: "Twelve Ways to Be Wrong About AI-Assisted Coding"
url: https://third-bit.com/2026/05/20/twelve-ways-to-be-wrong/
authors: [Greg Wilson]
captured: 2026-06-24
source_type: blog
topics: [evals, ai-productivity, engineering-judgment]
tags: [measurement, copilot, productivity-metrics, research-methods, bias]
signal_level: high
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

Greg Wilson systematizes twelve methodological failures in how organizations measure and evaluate AI-assisted coding tools, grounded in research design principles from the human sciences. Rather than attacking LLM-assisted coding itself, this post diagnoses why procurement and anecdotal claims mislead: proxy metrics obscure actual outcomes, toy tasks don't predict real-world performance, and organizational context collapses causal inference.

Key methodological failures documented:

**Measurement errors:**
- Lines of code generated confuse verbosity with productivity (40% LOC increase may mask technical debt)
- Commits, PRs, and tickets incentivize splitting work, not improving it (Goodhart's Law)
- Adoption rate measures installation, not benefit
- Only measuring the easy half: code generation speed, while ignoring review burden, security debt, and debugging time

**Causal inference failures:**
- Before/after without control group: hiring, refactoring, and infrastructure changes confound tool effects
- Volunteers vs. non-volunteers conflate selection bias with treatment effect (early adopters differ fundamentally in motivation and skill)
- Individual productivity vs. system throughput: AI boosting one stage while review becomes the bottleneck can *worsen* cycle time

**Perception bias:**
- Self-report surveys suffer Hawthorne effect, novelty effect (new tools feel faster temporarily), and social desirability bias
- Artificial task environments (90-minute greenfield HTTP server) don't predict navigation of large codebases, ambiguous tickets, and coordination overhead

**Empirical findings cited:**
- GitHub Copilot study: 55% faster on toy task [Peng2023], but randomized trial with open-source developers found 19% *increase* in task completion time [Becker2025]
- Security: substantial fraction of Copilot code contains vulnerabilities; five major LLMs failed to meet industry web-app security standards [Dora2025]; 15% of AI-authored commits introduce quality issues, 25% persist long-term [Liu2026]
- System effects: IBM enterprise assistant showed non-uniform gains; Copilot study at large IT org found senior developers experienced 19% productivity *decline* due to 6.5% increase in code-review load from AI-generated code [Xu2025]
- Pre-existing differences: developers using Copilot were already more active than non-users before tool introduction [Stray2026]

Wilson explicitly frames this as methodology, not tool criticism, and notes the lessons apply equally to failed evaluation of agile, TDD, and other practices.

## Verbatim quotes

"Deleting 2000 lines of tangled logic and replacing it with 200 clean ones is an improvement that looks like a loss on this metric."

"Speed on a greenfield toy task does not predict speed on any of that [real software development involving large codebases, ambiguous requirements, coordination]."

"Measuring only the inputs that go up while ignoring the costs that also rise is not measurement; it is marketing."

"A study of IBM's enterprise AI coding assistant found that while the tool often provided net productivity increases, those gains were not experienced uniformly across its user base."

"More code generated also means more code to review: if AI increases code volume without increasing review capacity, cycle time may worsen."

"Selection bias means any observed difference between the groups may be a property of the person rather than the tool. This is the most common design flaw in industry AI productivity reports, because it is the cheapest study to run."

## Takeaways

- **Measurement systems must track outcomes, not proxies**: LOC, commits, and adoption are activity metrics that actively mislead when used as evidence of productivity. Track cycle time, defect escape rates, and business value.
- **Real productivity studies require internal validity**: before/after claims need control groups; volunteer comparisons need randomization or longitudinal pre/post matching; toy tasks need validation against production tasks.
- **System-level effects dominate**: optimizing code generation while ignoring review capacity, security debt, and maintenance burden produces Goodhart's Law failures. Measurement must span the full pipeline.
- **Novelty and selection effects are strong**: surveys and early-adopter studies systematically overestimate benefit. Longitudinal designs with matched cohorts are necessary to isolate tool effects.
- **Security and quality costs are real and underreported**: 15–25% of AI-authored code introduces persistent defects; vulnerability prevalence in generated code is substantial. These belong in the productivity calculation.

## Open questions

- How would you design a randomized trial of AI coding tools in a real enterprise codebase while controlling for task selection, developer experience level, and review-capacity constraints?
- What metrics would capture true cycle-time impact rather than individual throughput? (Def: time from ticket creation to production deployment, including review and debugging.)
- Are there organizations currently tracking security issues and refactoring burden introduced by AI-generated code, and what do those numbers look like?
- How would you measure heterogeneous treatment effects to understand which classes of developers (seniority, domain, task type) actually benefit vs. bear the cost?
