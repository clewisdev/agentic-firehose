---
title: "dotnet/skills: .NET Agent Skills Repository"
url: https://github.com/dotnet/skills
authors: [dotnet team]
captured: 2026-07-06
source_type: repo
topics: [tool-use, agentic-workflows, code-generation]
tags: [dotnet, c-sharp, lsp, copilot, claude, cursor, mcp, skills-standard]
signal_level: medium
status: raw
confidence: high
freshness_until: unknown
---

## Summary

The dotnet/skills repository is an official Microsoft-maintained registry of curated skills and custom agents designed to extend AI coding agents' capability to work with .NET and C# codebases. It implements the open agentskills.io standard and provides plugin packages for major agent platforms: GitHub Copilot (CLI), Claude Code, Cursor, and Codex CLI.

The repository contains 13 published skill plugins covering domains across the .NET ecosystem:
- **Core**: dotnet (LSP integration), dotnet-advanced (special scenarios)
- **Build & Package**: dotnet-msbuild (build diagnostics, optimization, modernization), dotnet-nuget (dependency management)
- **Framework-specific**: dotnet-data (EF), dotnet-maui (mobile), dotnet-aspnetcore, dotnet-blazor, dotnet-test, dotnet-diag (performance/debugging)
- **Migration**: dotnet-upgrade (version/feature upgrades), dotnet-test-migration (test framework conversion)
- **Emerging**: dotnet-ai (LLM integration, RAG, MCP, ML.NET), dotnet-template-engine
- **Latest**: dotnet11 (new .NET 11 APIs)

Installation is declarative across platforms—users add the marketplace endpoint and install plugins via CLI or UI. The repo includes a dashboard (dotnet.github.io/skills/) tracking accuracy and efficiency metrics for contained plugins. Skills follow the agentskills.io standard and are interoperable across OpenAI Codex, Copilot, and Claude-based agents.

## Key observations

- **Standardized distribution**: Uses agentskills.io spec to guarantee interoperability across agent platforms—reduces lock-in and tooling fragmentation.
- **Domain breadth**: Coverage spans build systems (MSBuild, NuGet), testing (MSTest, xUnit, migration), web (ASP.NET Core, Blazor), data (EF), AI/ML (RAG, MCP, LLM integration), and diagnostics. Reflects pragmatic adoption needs in enterprise .NET.
- **Metric visibility**: Public accuracy/efficiency dashboard suggests Microsoft is treating agent skill quality as measurable, empirical, and transparent—contrasts with proprietary / undocumented agent capability claims elsewhere.
- **Multi-platform**: Simultaneous support for Copilot CLI, Claude Code, Cursor, VS Code, and Codex CLI indicates Microsoft treating agent extensibility as platform-agnostic. No platform lock-in in the spec.
- **Migration as core use case**: Three plugins dedicated to framework upgrade and test migration—reflects real cost of legacy .NET estates and positions agents as viable for technical debt reduction at scale.
- **Active development**: 562 commits, 48 open issues, 31 PRs, and explicit contribution guidelines. Recently added dotnet-ai (LLM, RAG, MCP) and dotnet11 (new .NET features) suggest iterative expansion.

## Takeaways

- **Skills registry as platform**: dotnet/skills is a reference implementation of modular, versioned, cross-platform agent capability distribution. Useful pattern for any ecosystem seeking agent extensibility without vendor lock-in.
- **Agent-native testing**: The presence of a public accuracy dashboard implies Microsoft is treating agent-skill quality as a testable, measurable property—not magic. Applicable to other domains.
- **Enterprise upgrade narrative**: Test migration, framework upgrades, and diagnostics skills suggest agents' most immediate value in large codebases is technical debt remediation, not greenfield coding.
- **LLM/agentic workflows as ecosystem need**: dotnet-ai plugin (RAG, MCP, LLM selection) indicates Microsoft sees agentic workflow tooling as essential for .NET developers—not an afterthought.

## Open questions

- How are individual skills versioned and updated? Does dotnet/skills support pinning to specific skill versions, or do marketplace updates force all-or-nothing upgrades?
- What is the actual accuracy/efficiency metric methodology behind the public dashboard? (Automated test pass rate? User satisfaction? Latency?)
- How do skills handle agent-to-agent fallback or skill composition when a plugin fails or times out?
- Are skills designed for **in-context learning** (agent reads skill spec, calls it as tool) or **in-weights** (agent embedding trained on skill examples)? Or both?
