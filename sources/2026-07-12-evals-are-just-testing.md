---
title: "AI evals are just testing (with a much weirder answer key)"
url: https://jimbobbennett.dev/blogs/evals-are-just-testing/
authors: [Jim Bennett]
captured: 2026-07-12
source_type: blog
topics: [evals, prompting]
tags: [llm-as-judge, golden-dataset, testing-philosophy, oracle-drift]
signal_level: medium
status: raw
confidence: high
freshness_until: evergreen
---

## Summary

Jim Bennett draws a direct lineage from classical software testing to modern AI evaluation, arguing that evals are fundamentally the same practice applied to non-deterministic outputs. He grounds the argument in a concrete 2000s anecdote: building a chiral-molecule search feature against a hand-labelled golden dataset from a product manager. When some test cases failed despite correct code, he discovered the dataset itself contained errors—flipping the task from "make tests pass" to "fix tests because some are lying."

Bennett maps the classical testing loop—decide what "good" looks like, check reality against it, revise either the definition or the system—onto modern evals:

- **Golden dataset** = test fixtures and expected values (hand-labelled examples of right and wrong)
- **LLM-as-judge** = the assertion (a second model prompted to grade outputs on fuzzy criteria like "helpful" or "factual")
- **Score** = pass/fail, but fuzzier and subjective

He grounds this in Dijkstra and Glenford Myers: testing has never been about proving correctness, only about failing to disprove it. TDD made this explicit—write failing tests first, build toward them. Evals apply the same red-green-refactor loop to LLM outputs.

The critical discomfort: with evals, the oracle (judge) is often another model, human annotator, or statistical threshold—not a crisp `assert`. Oracles drift, disagree, have biases. Optimizing against a judge risks gaming the judge instead of improving the system (teaching to the test in AI form).

Bennett's core insight: **your eval is itself a product and needs testing.** The golden dataset, judge prompts, and scoring thresholds are all fallible and should be iterated on as part of the loop. This inverts naive eval practice where datasets are treated as immutable ground truth.

## Key quotes

> "The tests were failing because the answer was wrong." (on discovering mislabelled examples in the golden dataset)

> "It wasn't 'write code until the tests pass' any more. It was 'write code and fix the tests, because some of the tests are lying to me.'" (reframing the iteration)

> "Testing shows the presence, not the absence of bugs." (Dijkstra paraphrase)

> "Your eval is a product, and it needs testing too." (thesis)

> "[The oracle] is subjective. It drifts. Two reasonable people disagree on whether an answer was 'helpful.' Your judge model has its own biases."

## Takeaways

- Evals are not a new category—they're testing applied to non-deterministic, fuzzy-graded outputs; the loop (define good → check reality → revise) is unchanged
- Golden datasets are not immutable oracles; treating them as fallible products needing iteration is the core lesson from decades of testing practice
- Judge models (LLM-as-judge or human raters) introduce subjectivity, drift, and bias that classical unit test assertions avoid—a difference of degree, not kind, but large enough to demand explicit management
- Optimization against a judge creates a new failure mode (gaming the eval) absent in classical testing; this requires meta-evaluation and dataset hygiene
- The chiral-matching example is transferable: any domain where the specification is fuzzy ("helpfulness," "tone," "correctness") requires the tighter loop Bennett describes

## Open questions

- How do you systematically detect when an eval itself has drifted or begun rewarding the wrong behaviors? (Analogous to detecting a test suite that no longer covers the intended behavior)
- What are the practical patterns for versioning / rotating golden datasets so they don't calcify into a false oracle?
- Does the three-part oracle (model judge + human annotator + threshold) create redundancy or compound the problem of oracle drift?
- How should teams partition responsibility for eval maintenance vs. model improvement when the two are tightly coupled?
