#!/usr/bin/env node
// One-off Phase 1c normaliser for plans/kb-dashboard.md.
// Consolidates the open-vocabulary `topics:` frontmatter list down to the
// controlled vocabulary of 24 canonical topics (the `topics/` folder set).
//
// Before 1c the corpus had ~179 distinct topic values across 96 sources; this
// maps every value to one of 24 canonical topics, de-duplicates, and preserves
// first-seen order. Unknown values (not in the canonical set, no alias) are left
// in place and reported so a human can decide — never invented, never dropped.
//
// The TOPIC_CANONICAL / TOPIC_ALIASES below MUST stay in sync with
// worker/src/claude.ts (normaliseTopics guard) and the controlled-vocab list in
// AGENTS.md. They diverged once for source_type; keep them aligned by editing
// all three together.
//
// Usage (from repo root):
//   node worker/scripts/normalise-topics.mjs           # dry-run, prints remaps
//   node worker/scripts/normalise-topics.mjs --write    # apply changes in place
//
// Re-runnable and idempotent: a second --write run reports zero changes.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIRS = ['sources', 'sources/skipped'];
const WRITE = process.argv.includes('--write');

// --- Canonical topic vocabulary (24) -----------------------------------------
export const TOPIC_CANONICAL = new Set([
  'harnesses', 'tool-use', 'agentic-workflows', 'agent-architecture',
  'code-generation', 'memory', 'cost-management', 'evals', 'ai-productivity',
  'prompting', 'enterprise-deployment', 'context-engineering', 'system-design',
  'safety', 'agent-orchestration', 'code-review', 'team-dynamics',
  'spec-driven-development', 'engineering-judgment', 'model-internals',
  'product-strategy', 'technical-debt', 'retrieval', 'personalization',
]);

// Drifted / synonymous values → canonical. Identity mappings are omitted (a
// value already in TOPIC_CANONICAL maps to itself).
export const TOPIC_ALIASES = {
  // harnesses
  'harness-engineering': 'harnesses', 'agent-scaffolding': 'harnesses',
  'agent-infrastructure': 'harnesses', 'agent-frameworks': 'harnesses',
  'agent-deployment': 'harnesses', 'packaging': 'harnesses',
  'distribution': 'harnesses', 'skill-management': 'harnesses',
  // tool-use
  'cli-integration': 'tool-use', 'web-access': 'tool-use',
  'real-time-data': 'tool-use', 'capability-extension': 'tool-use',
  'agent-augmentation': 'tool-use', 'developer-tools': 'tool-use',
  'ai-tools': 'tool-use',
  // agent-architecture
  'agent-design': 'agent-architecture', 'agent-engineering': 'agent-architecture',
  'agent-patterns': 'agent-architecture', 'agentic-patterns': 'agent-architecture',
  'abstraction-layers': 'agent-architecture', 'architectural-control': 'agent-architecture',
  'llm-architecture': 'agent-architecture', 'llm-integration': 'agent-architecture',
  'agent-interfaces': 'agent-architecture', 'agents': 'agent-architecture',
  'ai-agents': 'agent-architecture', 'dsl': 'agent-architecture',
  // agent-orchestration
  'orchestration': 'agent-orchestration', 'multi-agent': 'agent-orchestration',
  'parallel-execution': 'agent-orchestration', 'workflow-orchestration': 'agent-orchestration',
  'task-delegation': 'agent-orchestration', 'workflow-engines': 'agent-orchestration',
  // agentic-workflows
  'workflow': 'agentic-workflows', 'workflow-design': 'agentic-workflows',
  'workflow-automation': 'agentic-workflows', 'workflow-optimization': 'agentic-workflows',
  'automation': 'agentic-workflows', 'ralph-loops': 'agentic-workflows',
  'agentic-coding': 'agentic-workflows', 'agentic-development': 'agentic-workflows',
  'agentic-software-engineering': 'agentic-workflows', 'agentic-systems': 'agentic-workflows',
  'agentic-behavior': 'agentic-workflows', 'autonomous-agents': 'agentic-workflows',
  'agent-autonomy': 'agentic-workflows', 'coding-agents': 'agentic-workflows',
  'research-automation': 'agentic-workflows', 'research': 'agentic-workflows',
  // code-generation
  'code-quality': 'code-generation', 'ai-slop': 'code-generation',
  'codebase-understanding': 'code-generation',
  // code-review
  'review-patterns': 'code-review', 'human-review': 'code-review',
  'quality-gates': 'code-review', 'verification': 'code-review',
  'validation': 'code-review', 'collaborative-grilling': 'code-review',
  // memory
  'memory-systems': 'memory', 'knowledge-representation': 'memory',
  'knowledge-graphs': 'memory', 'knowledge-management': 'memory',
  'organizational-knowledge': 'memory', 'second-brain': 'memory',
  // context-engineering
  'context-management': 'context-engineering', 'context-gathering': 'context-engineering',
  'context-building': 'context-engineering', 'long-context': 'context-engineering',
  'long-context-work': 'context-engineering',
  // retrieval
  'rag': 'retrieval', 'retrieval-augmented-generation': 'retrieval',
  'embeddings': 'retrieval', 'document-indexing': 'retrieval',
  // prompting
  'prompt-engineering': 'prompting', 'reflection': 'prompting',
  // evals
  'evaluation': 'evals', 'measurement': 'evals', 'metrics': 'evals',
  'testing-evals': 'evals', 'agent-evaluation': 'evals', 'outcomes': 'evals',
  // cost-management
  'cost-optimization': 'cost-management', 'cost-control': 'cost-management',
  'token-efficiency': 'cost-management', 'inference-optimization': 'cost-management',
  'inference-routing': 'cost-management', 'model-selection': 'cost-management',
  'model-capability': 'cost-management', 'model-capabilities': 'cost-management',
  // model-internals
  'transformer-architecture': 'model-internals', 'transformer-mechanics': 'model-internals',
  'transformers': 'model-internals', 'attention': 'model-internals',
  'training': 'model-internals', 'training-fundamentals': 'model-internals',
  'fine-tuning': 'model-internals', 'instruction-tuning': 'model-internals',
  'data-pipeline': 'model-internals', 'claude': 'model-internals',
  // safety
  'ai-safety': 'safety', 'safety-alignment': 'safety', 'guardrails': 'safety',
  'security': 'safety', 'left-shift-security': 'safety', 'sandboxing': 'safety',
  'hallucination': 'safety', 'reliability-engineering': 'safety',
  // enterprise-deployment
  'governance': 'enterprise-deployment', 'risk-analysis': 'enterprise-deployment',
  'enterprise-operations': 'enterprise-deployment', 'production-deployment': 'enterprise-deployment',
  'deployment': 'enterprise-deployment', 'ai-adoption': 'enterprise-deployment',
  'agent-adoption': 'enterprise-deployment', 'incident-response': 'enterprise-deployment',
  // system-design
  'architecture': 'system-design', 'distributed-systems': 'system-design',
  'domain-driven-design': 'system-design', 'platform-engineering': 'system-design',
  'production-systems': 'system-design', 'observability': 'system-design',
  'reliability': 'system-design',
  // engineering-judgment
  'decision-making': 'engineering-judgment', 'trade-offs': 'engineering-judgment',
  'conceptual-models': 'engineering-judgment', 'senior-engineering': 'engineering-judgment',
  'cognitive-debt': 'engineering-judgment', 'risk': 'engineering-judgment',
  // ai-productivity
  'developer-productivity': 'ai-productivity', 'developer-experience': 'ai-productivity',
  'dx-culture': 'ai-productivity', 'ai-impact': 'ai-productivity',
  'ai-augmentation': 'ai-productivity', 'ai-assisted-engineering': 'ai-productivity',
  'ai-in-development': 'ai-productivity', 'ai-coding-tools': 'ai-productivity',
  'human-ai-collaboration': 'ai-productivity', 'human-in-the-loop': 'ai-productivity',
  // team-dynamics
  'team-workflow': 'team-dynamics', 'team-effectiveness': 'team-dynamics',
  'org-dynamics': 'team-dynamics', 'engineering-leadership': 'team-dynamics',
  'onboarding': 'team-dynamics', 'work-structure': 'team-dynamics',
  // product-strategy
  'product-discovery': 'product-strategy', 'value-delivery': 'product-strategy',
  'startups': 'product-strategy', 'career-trajectories': 'product-strategy',
  'compensation': 'product-strategy',
  // spec-driven-development
  'planning': 'spec-driven-development', 'sdlc-change': 'spec-driven-development',
  'ai-sdlc': 'spec-driven-development', 'software-engineering': 'spec-driven-development',
  'implementation': 'spec-driven-development',
  // technical-debt
  'tech-debt': 'technical-debt', 'legacy-modernization': 'technical-debt',
  'bottleneck-analysis': 'technical-debt',
  // personalization
  'personal-systems': 'personalization',
};
// ----------------------------------------------------------------------------

function listMarkdown(dir) {
  const abs = join(REPO_ROOT, dir);
  let entries;
  try {
    entries = readdirSync(abs, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .filter(e => e.isFile() && e.name.endsWith('.md'))
    .map(e => join(abs, e.name));
}

// Maps one topic value to canonical; pushes to `unknowns` if unresolvable.
function canon(value, file, unknowns) {
  const mapped = TOPIC_ALIASES[value] ?? value;
  if (!TOPIC_CANONICAL.has(mapped)) {
    unknowns.push({ file, value });
    return value; // leave visible; do not invent
  }
  return mapped;
}

function processFile(path, changes, unknowns) {
  const original = readFileSync(path, 'utf8');
  const rel = path.slice(REPO_ROOT.length + 1);
  const lf = original.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  const lines = lf.split('\n');
  if (lines[0] !== '---') return lf;
  const end = lines.indexOf('---', 1);
  if (end === -1) return lf;

  for (let i = 1; i < end; i++) {
    const m = lines[i].match(/^(topics:[ \t]*)\[(.*)\][ \t]*$/);
    if (!m) continue;
    const [, key, body] = m;
    const before = body.split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    const seen = new Set();
    const after = [];
    for (const v of before) {
      const c = canon(v, rel, unknowns);
      if (!seen.has(c)) { seen.add(c); after.push(c); }
    }
    const newLine = `${key}[${after.join(', ')}]`;
    if (newLine !== lines[i]) {
      changes.push({ file: rel, from: before.join(', '), to: after.join(', ') });
      lines[i] = newLine;
    }
  }
  return lines.join('\n');
}

const changes = [];
const unknowns = [];
let filesTouched = 0;

for (const dir of DIRS) {
  for (const path of listMarkdown(dir)) {
    const before = readFileSync(path, 'utf8');
    const after = processFile(path, changes, unknowns);
    if (after !== before) {
      filesTouched++;
      if (WRITE) writeFileSync(path, after);
    }
  }
}

console.log(`${WRITE ? 'APPLIED' : 'DRY-RUN'} — ${filesTouched} file(s) would change\n`);
for (const c of changes) {
  console.log(`  ${c.file}\n    [${c.from}]\n -> [${c.to}]`);
}

if (unknowns.length) {
  const distinct = [...new Set(unknowns.map(u => u.value))].sort();
  console.log(`\nUnknown topic values (extend TOPIC_ALIASES/CANONICAL, then re-run):`);
  for (const v of distinct) console.log(`  ${v}`);
}

if (!WRITE && filesTouched) console.log(`\nRe-run with --write to apply.`);
