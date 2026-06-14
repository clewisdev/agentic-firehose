---
title: "Pre-Mortem Risk Analysis Expert: Tiger/Paper Tiger/Elephant Classification"
url: https://github.com/borghei/Claude-Skills/blob/main/project-management/discovery/pre-mortem/SKILL.md
authors: [borghei]
captured: 2026-06-03
source_type: repo
topics: [enterprise-deployment, product-strategy, engineering-judgment]
tags: [pre-mortem, prospective-hindsight, gary-klein, risk-categorization]
signal_level: medium
status: summarized
confidence: high
freshness_until: evergreen
---

## Summary

A structured pre-mortem framework from the Claude-Skills repo that operationalizes prospective hindsight (imagining a product has failed 14 days post-launch, then working backward to identify root causes). The key innovation is the Tiger/Paper Tiger/Elephant risk taxonomy:

- **Tigers**: real, evidence-backed risks that could cause serious harm (authentication failures, missing market segments, regulatory gaps)
- **Paper Tigers**: risks that sound alarming but are unlikely or low-impact (theoretical competitor responses, hypothetical scaling limits without supporting data)
- **Elephants**: unspoken organizational concerns (disengaged team members, political roadmap decisions, staffing cliffs) that are frequently the *actual* cause of failure despite being avoided in discussion

Once classified, Tigers are further triaged by urgency: Launch-Blocking (must resolve before shipping), Fast-Follow (2-week post-launch window), or Track (monitor, escalate if needed).

## Methodology

The framework follows four phases over ~90 minutes:

1. **Set the Scene (5 min)**: Prompt participants with the core fiction—"It is 14 days after launch. The product has failed." Frame the exercise as explanation-focused, not prediction-focused, exploiting the cognitive bias that humans are better at explaining past events than predicting future ones.

2. **Generate Risks (10 min)**: Participants independently brainstorm failure reasons, one risk per sticky note or digital entry. Anonymous contributions remove attribution and judgment. Prompts include: "What technical system is most likely to break? What customer objection have we not addressed? What team dynamic could derail us?"

3. **Cluster and Label (15 min)**: Group similar risks. Assign preliminary Tiger/Paper Tiger/Elephant labels. Avoid debate; capture all perspectives.

4. **Classify and Prioritize (30 min)**: Rigorous classification of Tigers. Each Tiger gets an urgency level (Launch-Blocking, Fast-Follow, Track). Assign owners and decision dates.

## Key Insights

**On Elephants**: The repo explicitly notes that organizational and interpersonal risks ("the tech lead is disengaged," "the CEO's pet feature is driving the roadmap") are "frequently the actual cause of failure when projects fail," yet are avoided due to politics, hierarchy, or discomfort. This reframes pre-mortem from a purely technical risk exercise to a social/organizational alignment check.

**On Paper Tigers**: The framework provides specific criteria for demotion—lack of supporting evidence, very low probability, or manageable impact even if realized. Example: "Users might hate the new UI" is demoted to Paper Tiger if usability testing with 8 users showed high satisfaction. This prevents analysis paralysis on unlikely scenarios.

**Cognitive framing**: The core mechanism—placing the failure in the "past" rather than future—exploits a documented bias. People generate more specific and honest assessments when explaining a hypothetical past event than when predicting a future one.

## Takeaways

- Pre-mortem is effective *before* committing significant resources (post-ideation, pre-build) and before major launches, migrations, or architectural decisions.
- The Tiger/Paper Tiger/Elephant taxonomy is immediately actionable: it surfaces which risks require concrete mitigation vs. which can be deferred or dismissed without waste.
- Elephants—organizational and interpersonal risks—are systematically *under-discussed* in technical planning but over-represented in actual failure post-mortems. Pre-mortem is a format to force them into the open.
- The exercise is lightweight (90 min facilitation) and designed to stress-test high confidence and force articulation of unstated concerns.
- Urgency classification (Launch-Blocking, Fast-Follow, Track) bridges gap between risk identification and action assignment.

## Open Questions

- How does Elephant classification and mitigation differ when the risk is hierarchical (e.g., CEO conviction)? Can a pre-mortem *change* organizational direction, or only surface it?
- How does team size affect pre-mortem quality? Does anonymity at scale (50+ people) introduce signal loss vs. small teams (5-8)?
- What is the empirical track record? Is there published data on risks identified in pre-mortem vs. actual post-launch failures—do Tigers reliably predict failure modes?
- How does this interact with other risk frameworks (SWOT, FMEAs, scenario planning)? When would you use pre-mortem *instead of* vs. *in addition to* those?

