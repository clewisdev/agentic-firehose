---
title: "SlopStopper — deterministic, automated feedback for AI-driven development"
url: http://slopstopper.dev
authors: [hungovercoders]
captured: 2026-06-22
source_type: docs
topics: [harnesses, code-review, evals]
tags: [python-cli, github-actions, quality-gates, ai-assisted-development, dogfooding]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

SlopStopper is a Python CLI + GitHub Actions framework for adding deterministic, automated quality checks to repos that use AI-assisted development. Rather than post-hoc linting, it treats code quality feedback as a harness: five categories of checks (security, hygiene, reliability, operational, deployment) run on every PR and commit.

The project is notably **dogfooded on its own repository** — all published checks run live against the source code.

### Installation paths

**Quick try**: `pipx install slopstopper-cli` + `slopstopper check list` (CLI alone, no pinning).

**Full repo adoption**: `curl install.sh | bash` (requires `mise`). This:
- Pins CLI + task via `mise.toml` (keeps local and CI in lockstep)
- Seeds `.github/workflows/ss-*.yml` (five category workflows)
- Installs `Taskfile.ss.yml` shims
- Seeds `.slopstopper.yml` starter config
- **For Claude Code users**: also installs two companion skills (`slopstopper-install`, `slopstopper-triage`) into `.claude/skills/` so the agent can diagnose and fix failing checks

### Five feedback loops

1. **Security**: static analysis, dynamic scanning, secrets detection (gitleaks), dependency vulns (trivy)
2. **Hygiene**: complexity limits (lizard), docs structure, docs accuracy
3. **Reliability**: e2e, smoke, broken-link checks; accessibility; Core Web Vitals
4. **Operational**: auto-labelled PRs, agentic doc updater, failure alerts
5. **Deployment**: preview deployments per PR, automated production releases

### Key design choices

- **Deterministic only**: rules-based checks, not LLM scoring (important for CI reliability)
- **Composable tooling**: per-check tool installation (node, semgrep, docker, etc.) via `slopstopper doctor`
- **Per-repo pinning**: `mise` ensures local developer runs and CI use identical CLI versions
- **Customizable thresholds**: all rules tunable via `.slopstopper.yml`
- **Agent-native**: skills for Claude Code enable agentic troubleshooting and repair of failing checks
- **Provenance attestation**: Sigstore build-provenance on releases; verifiable with `gh attestation verify`

## Verbatim quotes

> "As AI-assisted development accelerates the pace of change, consistent automated checks keep code quality high without slowing teams down."

> "For a repo you'll keep — where local and CI must run the same version — use the pinned suite install below."

> "Different prompts trigger different skills: 'install / refresh / upgrade slopstopper' → slopstopper-install; 'fix this failing slopstopper check' → slopstopper-triage."

## Takeaways

- SlopStopper treats code-quality feedback as a **first-class CI harness**, not an afterthought; the framework enforces determinism (no probabilistic scoring) and reproducibility (version lockstep via mise)
- **Agentic integration** is native: companion skills for Claude Code let the agent diagnose and repair failing checks without human intervention
- **Dogfooding is real**: the authors run every check on their own repo; pipeline badges on the README are live, not mockups
- The **five-loop taxonomy** (security, hygiene, reliability, operational, deployment) provides a useful mental model for partitioning automated feedback
- Tool-composability via `slopstopper doctor` avoids bloated dependencies; you install only what you use

## Open questions

- How does deterministic-only feedback (no ML/LLM scoring) compare in signal quality vs. projects using probabilistic gates (e.g., SonarQube)?
- What fraction of CI failures in adopting teams are caught by which loop? (operational data would help practitioners prioritize)
- For teams already using pre-commit hooks or other harness frameworks, what's the migration path or complementarity story?
- How do the Claude Code skills handle domain-specific check failures (e.g., framework-specific patterns)?
