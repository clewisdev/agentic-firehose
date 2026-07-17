---
title: "Antipatterns of Software Engineering with AI"
url: https://www.principalengineer.com/p/antipatterns-of-software-engineering
authors: [Wille Faler]
captured: 2026-07-17
source_type: blog
topics: [agentic-workflows, spec-driven-development, engineering-judgment, code-review]
tags: [agent-generated-code, technical-debt, testing, architecture, comprehension-debt]
signal_level: medium
status: raw
confidence: high
freshness_until: 2027-Q1
---

## Summary

Wille Faler, a practitioner with sustained hands-on experience across multiple AI coding agents (from Copilot private preview onwards), identifies four durable antipatterns emerging at the boundary between AI capability and real-world software constraints. Unlike capability gaps that shift monthly, Faler argues these antipatterns are structural and persist because they reflect how teams interact with acceleration, not AI weakness.

**Spec-driven development (the new big bang):** Teams are treating AI's ability to generate larger scope as license to write comprehensive specifications and build in one pass, skipping iterative feedback cycles. The failure mode: large-scope work produced in a vacuum accumulates micro-ambiguities in specs that compound into systematic drift from intent. Faler notes English (or any natural language) cannot encode the precision of code; LLMs filling implicit gaps with "sensible" assumptions is indistinguishable from humans making the same mistake. The result is rapid accumulation of technical debt based on conjecture. Remedy: keep spec scope minimal, close feedback loops with real users before expanding.

**Architectural over-engineering:** AI is trained on the average corpus of available code, which skews toward over-abstraction, leaky layering, and cargo-culted patterns. Unguided AI architecture definition produces brittle 15-layer stacks that make future change risky and expensive. Faler doubts this is addressable by model sophistication alone—good architecture requires years of hindsight feedback and human domain context. Training data quality (finding people to label "good" architecture objectively) is the binding constraint.

**AI grading its own homework:** Unsupervised code + test generation means tests may reflect what code *does* rather than what it *should* do. The antipattern: no external validation of test comprehensiveness or failure coverage. Faler suggests mutation testing and adversarial grading (different models/processes auditing each other) as partial mitigations, but notes the top-level problem remains unsolved: distinguishing "tests that pass the code" from "tests that validate the spec."

**Comprehension debt:** Generated code severs the tacit, embodied learning that comes from writing code yourself. When returning to a codebase after interval, generated sections lack the mental footprint that aids context recovery. Documentation helps but is inferior to internalized understanding built through act of authorship.

## Key Quotes

> "The fact that we can build quicker, doesn't solve the bottleneck of real-world feedback. And if you keep building past sensible points of soliciting that feedback, you might be piling more and more code onto a foundation that is all wrong. All you are achieving is a big pile of technical debt, faster."

> "If you let an AI define your entire architecture, chances are you'll sit upon a brittle pile of 15 layers and 100 abstractions that make no sense and which fit badly together."

> "You wouldn't let a school-child grade their own homework, but we are ok with AI doing this."

> "Even labeling 'good' and 'bad' requires the right people would be labeling the data (how do you find the above average people willing to do it?). Unlike mathematics and other hard sciences, or even human language grammar, good software architecture is hard to objectively prove without the benefit of years of hindsight."

## Takeaways

- **Spec scope is the critical lever, not specification detail:** more detail doesn't reduce ambiguity risk; smaller scope + tight feedback loops does. Specs are useful for documentation, not as generation blueprints for entire systems.
- **AI-generated architecture requires human architectural vision:** unguided convergence on corpus average produces technically debt at scale. This is a training data / labeling problem, not a model capability problem.
- **Test quality is inseparable from specification fidelity:** tests written to validate code are not equivalent to tests written to validate intent. Mutation testing and adversarial review offer partial solutions; human review remains necessary for high-stakes domains.
- **Embodied understanding cannot be fully substituted:** generated code creates "comprehension debt" because it severs the tacit learning that accompanies authorship. Recovery friction increases with codebase age and complexity.
- **Feedback cycle length determines technical debt trajectory:** large-scope unvalidated work (spec-driven or otherwise) accelerates debt accumulation. Faler frames this as a control knob: throwaway prototypes can tolerate high AI autonomy; systems with real constraints need human-in-loop on tests, architecture, and spec validation.

## Open Questions

- How can "correctness" of architecture be objectively labeled for training without years of hindsight? What would a dataset of "good" vs "bad" architecture look like, and who validates the labels?
- Can mutation testing + adversarial grading fully replace human test review for critical domains, or is there a residual category of tests (e.g., integration, user-facing) that require embodied domain knowledge?
- What are the economic tradeoffs between comprehension debt (tacit understanding loss) and development velocity? Is there a point at which teams become velocity-trapped by their own generated code?
- How does the antipattern change as agent autonomy increases? Does higher model capability reduce or amplify the risk of large-scope unvalidated work?
