---
title: "Hensu: Infrastructure-as-Code for AI Agent Workflows"
url: https://github.com/hensu-project/hensu
authors: [hensu-project]
captured: 2025-06-09
source_type: repo
topics: [agent-orchestration, agent-architecture, enterprise-deployment, harnesses]
tags: [kotlin, json, graalvm, gemini, langchain4j, terraform-analogy]
signal_level: medium
status: raw
confidence: medium
freshness_until: unknown
---

## Summary

Hensu is an open-source infrastructure-as-code framework for AI agent workflows. It defines agent workflows as directed graphs in a type-safe Kotlin DSL, compiles them to portable JSON artifacts, and executes them on a GraalVM native server. The architecture emphasizes separation of workflow definition from application code and parity between local and production execution environments.

**Core design principles:**
- Workflows defined in Kotlin DSL, compiled to JSON (portable, versionable)
- Single shared engine for CLI and server execution (no drift between environments)
- Agent routing, rubric-based scoring, conditional branching, parallel execution
- Type-safe graph construction (start → nodes → end with explicit transitions)
- Credentials managed separately (e.g., API keys via `hensu credentials set`)

## Key features

**Workflow DSL capabilities:**
- Agent definition with model selection (e.g., Gemini 3.1 Flash, Pro)
- State variables (input/output) with explicit types
- Graph nodes with agent routing, prompt templating, writes to state
- Rubric scoring (markdown-defined criteria, numeric thresholds)
- Conditional branching (onScore, onApproval, onRejection, goto)
- Parallel branches, consensus patterns, dynamic planning, fork/join, sub-workflows (referenced in DSL docs)
- Virtual thread support (Java 25) for parallel execution

**Deployment model:**
- CLI for local development: `hensu build`, `hensu run` with JSON context
- Server with in-memory mode (dev) and PostgreSQL + JWT (production)
- Push workflows to server: `hensu push` → REST execution: POST /api/v1/executions
- Pre-built binaries for Linux x86_64; source build for macOS/Windows

## Positioning vs. alternatives

**vs. Temporal/Camunda/Airflow:** Temporal-style durable execution requires significant worker setup; Hensu workflows are standalone compiled artifacts with no application coupling.

**vs. LangGraph/CrewAI/AutoGen:** Those use single-threaded execution and couple AI logic tightly to application code; Hensu uses Java virtual threads for parallelism and keeps workflows independent of application codebase.

**vs. LangChain4J/Spring AI:** Those embed graph construction in application code; Hensu separates workflow definition as a first-class artifact (JSON), enabling versioning, CI/CD, and reuse.

## Concrete example

Two-agent content pipeline with quality loop:
```kotlin
fun contentPipeline() = workflow("content-pipeline") {
  agents {
    agent("writer") { role = "Content Writer"; model = Models.GEMINI_3_1_FLASH_LITE }
    agent("reviewer") { role = "Content Reviewer"; model = Models.GEMINI_3_1_PRO }
  }
  state {
    input("topic", VarType.STRING)
    variable("draft", VarType.STRING, "the full written article text")
  }
  graph {
    start at "write"
    node("write") {
      agent = "writer"
      prompt = "Write a short article about {topic}. {recommendation}"
      writes("draft")
      rubric = "content-quality.md"
      onScore { whenScore lessThan 70.0 goto "write" }
      onSuccess goto "review"
    }
    node("review") {
      agent = "reviewer"
      prompt = "Review this article: {draft}. Is it good enough to publish?"
      writes("draft")
      onApproval goto "done"
      onRejection goto "write"
    }
    end("done", ExitStatus.SUCCESS)
  }
}
```

Workflows compile to JSON, stored in `build/` folder, and execute identically on CLI or server.

## Takeaways

- **IaC pattern for agents:** Terraform-like approach (DSL → portable artifact) is novel for agent workflows; reduces deployment friction and environment drift.
- **Explicit graph semantics:** Nodes, transitions, and state are first-class; avoids hidden control flow in prompt chains.
- **Rubric integration:** Quality gates are baked into workflow definition, enabling deterministic retry/loop logic without external evaluators.
- **Decoupled from application:** Workflows are independent binaries/JSON; can be versioned, tested, and deployed separately.
- **Early-stage maturity:** Beta (v0.1.0-beta.1), active development, missing production patterns (e.g., observability, error handling details not documented in README).

## Open questions

- How does state serialization work across distributed execution? (Virtual threads are single-machine.)
- What observability/tracing is available? (Not mentioned in README.)
- How are long-running agents (streaming, polling) handled?
- Is the JSON artifact introspectable / visualizable for debugging?
- What's the upgrade path for workflows between Hensu versions?
