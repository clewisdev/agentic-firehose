# Code generation

Using AI to generate implementation from specifications — the abstraction ladder (code-first→spec-first), when generation is deterministic vs. requires agent creativity, and the boundary where generation breaks down.

## Sources

- [The Spec Is the Code Now](../../sources/2026-06-04-spec-is-code-now.md) — "We stopped writing assembly by hand. We may stop writing most implementation by hand too." Spec-first as the infrastructure play that makes code generation viable at scale; guesswork disappears with contract clarity on inputs, types, error codes.
- [Harness engineering: Codex in an agent-first world (OpenAI)](../../sources/2026-06-13-harness-engineering-codex.md) — concrete proof point: ~1M lines, zero hand-written code, 3 engineers at 3.5 merged PRs/day each (throughput rose as the team grew to 7). Intent specification scales faster than code review; the bottleneck moves from generation to human QA capacity — solved by making app behaviour agent-legible.
- [The AI Engineering Report 2026 — Ten Takeaways](../../sources/2026-06-12-ai-engineering-report-2026.md) — the counterweight to Codex's success story: AI is now the *primary* code author (acceptance 20%→60%), but bugs/developer rose 9%→54% and the defect relationship steepens with adoption maturity. "Throughput measures what was shipped, not what survived."
- [What it feels like to work with Mythos (Mollick)](../../sources/2026-06-11-what-it-feels-like-to-work-with-mythos.md) — generation from a 19-page self-authored design doc, executed autonomously over 9.5h ("Concord"). Output scope "exceeded anything I have seen before," but the expert can only validate the final artifact — generation outruns reviewability.
- [Claude Code security plugin (Anthropic)](../../sources/2026-06-09-claude-security-plugin.md) — agent-as-reviewer for generated code: a fresh-context Claude instance (no investment in the original approach) reviews the diff, avoiding the author model's confirmation bias and catching logic-level vulns string matching misses.
