---
title: "IntelliJ IDEA Goes LSP: Java and Kotlin Intelligence Comes to VS Code, Cursor, and Agentic Flows"
url: https://blog.jetbrains.com/idea/2026/08/intellij-idea-goes-lsp/
authors: [Marco Behler]
captured: 2026-08-08
source_type: blog
topics: [tool-use, agentic-workflows, agent-architecture]
tags: [lsp, java, kotlin, vs-code, cursor, language-server-protocol, code-completion, debugging]
signal_level: high
status: raw
confidence: high
freshness_until: 2026-Q4
---

## Summary

JetBrains has announced a preview release of the Java & Kotlin by IntelliJ IDEA extension, bringing IntelliJ's language intelligence to VS Code, Cursor, and agentic workflows via the Language Server Protocol (LSP). This directly addresses a shift in development patterns: as agentic systems take over more implementation work, developers and agents need narrower but more reliable language features (navigation, completion, refactoring) rather than full IDE depth.

The extension is powered by IntelliJ IDEA's native Java/Kotlin analysis engine and includes:

- **Java, Kotlin, and mixed-language project support**
- **DAP-based debugging**
- **Smart code completion, navigation, code analysis**
- **Refactorings and editor assistance**
- **Build system support**: Maven, Gradle, Bazel
- **Performance**: optimized for large projects and monorepos

Key insight from the post: "Even agents can make use of LSP servers today, leading to faster and more deterministic results and, eventually, reduced token consumption." JetBrains has run internal trials with external customers showing measurable improvements in "terminal-based agentic workflows, like with Claude Code or Codex." Full results promised in follow-up publication.

During the free preview phase (30-day eval windows per build), the extension is available on VS Marketplace and Open VSX. Post-preview will require IntelliJ IDEA Ultimate subscription. Pure Kotlin projects can use the Apache 2.0–licensed Kotlin LSP for free indefinitely.

## Verbatim quotes

> "As agents take on more and more of the implementation work, developers spend less and less time manually editing code. For this manual work, they might only need a basic, narrow set of features that IDEs provide, like navigating to declarations, finding references, some simple code completion, or renaming."

> "Even agents can make use of LSP servers today, leading to faster and more deterministic results and, eventually, reduced token consumption."

> "We strongly believe the best way to do Java and Kotlin development is inside IntelliJ IDEA. At the same time, we recognize that teams may have practical reasons to work in other environments, with other editors and tools."

## Takeaways

- **Agentic workflows favour deterministic, narrow language features over IDE breadth** — LSP is a natural fit and reduces token overhead for agents.
- **Tool-use standardization matters**: LSP enables a single language implementation (IntelliJ's) to power multiple editors and agent platforms, reducing fragmentation.
- **Enterprise tooling is moving toward multi-environment licensing**: single IntelliJ IDEA subscription now covers desktop IDE, VS Code, and "other supported environments" — a hedge against editor lock-in.
- **Performance at scale is a stated win**: large projects and monorepos are explicitly supported, suggesting real-world agentic workloads operate on large codebases.
- **Agent-vendor partnerships are real and measured**: Jetbrains names Claude Code and Codex as test partners and promises token-consumption metrics — concrete signal of agentic adoption.

## Open questions

- What are the specific token-consumption and determinism improvements observed in agentic trials? (Promise to publish but not yet public.)
- How does LSP-based code analysis compare to fine-grained AST traversal or semantic search for long-context agentic tasks?
- Will the extension support language-aware pruning or caching to further optimize agent context windows?
- How does licensing enforcement work for agents / CI-based agentic workflows?
