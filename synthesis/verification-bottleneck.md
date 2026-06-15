---
title: "The Verification Bottleneck: When Generation Outran Review"
written: 2026-06-15
updated: 2026-06-15 (added supervisory-engineering-middle-loop, kun No-Mistakes 68% catch rate)
topics: [code-generation, code-review, evals]
tags: [verification, review-capacity, comprehension-debt, assurance, throughput, agent-as-reviewer, verification-gates]
sources:
  - sources/2026-06-13-harness-engineering-codex.md
  - sources/2026-06-12-ai-engineering-report-2026.md
  - sources/2025-06-13-we-dont-write-code-anymore.md
  - sources/2025-06-10-claude-fable-5-announcement.md
  - sources/2025-06-09-dynamic-workflows-claude-code.md
  - sources/2025-06-11-agent-skills-structured-workflows.md
  - sources/2026-06-14-context-harness-engineering.md
  - sources/2026-06-13-context-as-code.md
  - sources/2026-06-12-fabro-workflow-orchestration.md
  - sources/2026-06-11-what-it-feels-like-to-work-with-mythos.md
  - sources/2026-06-09-claude-security-plugin.md
  - sources/2026-06-09-supervisory-engineering-middle-loop.md
  - sources/2026-06-09-kun-meta-agentic-workflow.md
status: draft
---

# The Verification Bottleneck: When Generation Outran Review

## The thesis in one line

When code generation became cheap, the scarce resource stopped being *output* and
became *assurance* — the confidence that what was generated is correct, safe, and
what you actually meant. Every constraint that used to bind software delivery has
moved one step downstream: from "can we write it?" to "can we verify it does what we
wanted?" This is now the single most-attested pattern in the KB, converging across
eleven independent sources from model vendors, enterprise practitioners, and tool
builders who agree on almost nothing else.

## Part 1 — Generation got cheap, and the numbers are not subtle

The proof points are no longer projections. OpenAI's Codex team
(`sources/2026-06-13-harness-engineering-codex.md`) reports ~1M lines of production
code with **zero hand-written code**, three engineers sustaining 3.5 merged PRs/day
each — and throughput *rising* as the team grew. Anthropic
(`sources/2025-06-10-claude-fable-5-announcement.md`) reports engineers shipping **8×
as much code per quarter** as the 2021–2025 baseline. Claude Code's dynamic workflows
(`sources/2025-06-09-dynamic-workflows-claude-code.md`) ported Bun from Zig to Rust —
**750K lines generated, 99.8% of the test suite passing, eleven days**. Mollick's
account of working with Mythos (`sources/2026-06-11-what-it-feels-like-to-work-with-mythos.md`)
describes autonomous generation from a 19-page design doc over 9.5 hours, at a scope
that "exceeded anything I have seen before."

The vendors say the quiet part out loud. Fable's launch frames the model as one that
"pushes the bottleneck further toward verification and review." The top comment on
that thread is the whole synthesis in one sentence:

> "As models get more capable, the differentiator stops being 'can we build it' and
> starts being 'can we verify it does what we actually wanted.'"

## Part 2 — Throughput is not the same as survival

The counterweight is the AI Engineering Report 2026
(`sources/2026-06-12-ai-engineering-report-2026.md`), and it is the most important
dissent in the set. AI is now the *primary* code author (acceptance 20%→60%), but
bugs-per-developer rose **9%→54%**, and — critically — the defect relationship
*steepens* with adoption maturity. The more you lean on generation, the worse the
ratio gets. Its one-liner is the mirror image of the vendor optimism:

> "Throughput measures what was shipped, not what survived."

This is why the bottleneck is real and not an artifact of immature tooling. The same
capability that produces the 8× and the 750K-line port also produces defects faster
than humans can find them. Generation and verification scale on different curves, and
the gap between them *is* the bottleneck.

## Part 3 — Why human review doesn't close the gap

The naïve fix — "just review more" — fails for structural reasons the sources name
precisely:

- **Review doesn't scale with generation rate.** Plandek's board-level primer
  (`sources/2026-06-14-context-harness-engineering.md`) states it flatly: "Human
  review does not scale with AI generation rates. Systematic governance is essential."
- **The expert can only validate the final artifact.** Mollick's Mythos account is the
  sharpest illustration: when generation runs autonomously for hours, the human never
  sees the intermediate reasoning — "generation outruns reviewability." You are handed
  a finished building and asked whether it is sound.
- **Comprehension debt compounds silently.** Huk's "context-as-code"
  (`sources/2026-06-13-context-as-code.md`) names the failure mode: "Frankenstein
  factories" accumulate comprehension debt (Osmani's term) when agents generate faster
  than teams can verify intent, constraints, and threat models. Velocity and coverage
  *mask* structural risk rather than revealing it — the debt surfaces later, as
  production incidents.
- **You can't trust the agent's own "done."** Osmani's structured-workflows piece
  (`sources/2025-06-11-agent-skills-structured-workflows.md`) diagnoses the root cause:
  an agent "optimizes for appearing done over being done." Self-report is worthless as
  a verification signal precisely where you need it most.

Thoughtworks' Richard Gall (`sources/2026-06-09-supervisory-engineering-middle-loop.md`)
names the structural consequence directly: the traditional two-loop model (inner loop =
local development; outer loop = CI/CD) is now incoherent because AI agents have
**collapsed the inner loop almost entirely**. The bottleneck relocated, and Gall gives
it a name: the **middle loop** — where human judgment meets machine execution.

> "The bottleneck is no longer around how fast we can type or implement code, it's about
> how fast we can verify."

> "You used to slow down while writing code; now, you have to force yourself to slow down
> while reading, questioning and auditing it."

> "The surface area of engineering responsibility hasn't shrunk; it has expanded."

The middle loop structures the verification challenge into three pillars: **directing**
(codifying architectural constraints, API specs, and style guides *before* agents build),
**evaluating** (deep system context to spot plausible nonsense — hallucinations, deprecated
APIs, edge cases), and **correcting** (maintaining coherence across parallel agent
workstreams). This is the most precise name the KB has for why "just review more" fails:
the skill required is not faster reading but a different orientation — behavioral auditing
rather than style checking, architectural coherence rather than line-level correctness.

## Part 4 — Three families of response

The sources converge on the problem but split into three (complementary, not
competing) strategies for the answer. The pattern: **you cannot fix verification with
a better prompt — you fix it structurally**, at one of three locations.

### A. Constrain the agent (verification gates *on the agent itself*)

Osmani's agent-skills (`sources/2025-06-11-agent-skills-structured-workflows.md`) is
the canonical example: **anti-rationalization tables** block the excuse on entry ("I'll
add tests later"), and **verification gates** block false completion on exit (the agent
must produce passing tests and runtime evidence before proceeding). "You constrain both
the reasoning and the proof rather than hoping a better prompt fixes it." Fabro
(`sources/2026-06-12-fabro-workflow-orchestration.md`) makes the same move at the
workflow layer: "Builds and tests are gates, not suggestions," with automatic fix loops.

### B. Verify with another agent (review capacity that *does* scale)

If human review is the scarce resource, manufacture more reviewers. The Claude Code
security plugin (`sources/2026-06-09-claude-security-plugin.md`) uses a **fresh-context**
model instance — no investment in the original approach — to review the diff, dodging
the author model's confirmation bias and catching logic-level vulnerabilities that
string matching misses. Dynamic workflows
(`sources/2025-06-09-dynamic-workflows-claude-code.md`) generalise this into
**adversarial verification**: independent agents attempt the problem from different
angles, other agents try to *refute* the findings, and iteration continues until
convergence. The Bun port ran *two reviewers per file*. Kun's "No Mistakes" tool
(`sources/2026-06-09-kun-meta-agentic-workflow.md`) provides a practitioner data point:
fresh-agent review of 267 AI-written PRs across 15 repos caught **68% of mistakes that
would have been missed in manual review** — the clearest published catch-rate figure in
the KB for agent-as-reviewer.

### C. Move governance upstream (build-time, before generation)

The most structural answer: stop verifying output and start constraining input. Huk's
context-as-code argues governance "must move upstream to build-time, before generation"
— encode API contracts, allowed patterns, and threat models *into the agent's working
context* so structurally invalid code is never generated. Plandek frames the same idea
as the orthogonal pair: **Context Engineering** (input quality) plus **Harness
Engineering** (output quality), "mutually reinforcing, neither emerges without explicit
design." The unifying claim across this family: "Tooling access is not a moat.
Proprietary context and evaluation infrastructure is."

## Open tensions (unresolved across the sources)

- **Cost.** Every scaling answer — adversarial agents, two reviewers per file,
  multi-hour workflows — burns substantially more tokens. Dynamic workflows explicitly
  warn of this; nobody publishes the cost multiplier of "verify everything with more
  agents." If verification is the bottleneck and verification is itself token-expensive,
  the economics are unproven.
- **Self-verification is discouraged, agent-verification is encouraged — why is one
  trustworthy?** The eval-methodology synthesis warns that models "reinforce their own
  errors." The security plugin's answer is *fresh context* (no shared investment), but
  whether a same-family reviewer model shares the same blind spots is open.
- **Does upstream governance constrain creativity?** Context-as-code's own open
  question: over-encoding constraints may also fence off the agent's useful
  exploration. Nobody has measured the trade.

## Frank summary

The cheapest take is "AI writes the code now." The correct take is "AI moved the
bottleneck, it didn't remove it." Generation became a solved-enough problem that the
constraint relocated downstream to verification and review — and that constraint is
*harder*, because review capacity scales with humans, comprehension debt compounds
invisibly, and the agent's own sense of "done" is untrustworthy by construction.

The teams that win are not the ones generating the most code. They are the ones who
have built **assurance infrastructure**: structural verification gates, scalable
agent-driven review, and build-time governance that prevents bad output instead of
catching it. This is the same lesson as
[harness engineering](harness-engineering-101.md) ("telling an LLM desired behaviour is
not the same as enforcing it") applied to the specific problem of trusting generated
code. The model can write it. The open question every source is circling is whether you
can prove it does what you meant — and that is now where the work lives.
