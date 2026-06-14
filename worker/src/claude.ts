import type { Env, CaptureResult, SignalLevel } from './types.js';

const API_URL = 'https://api.anthropic.com/v1/messages';
// Keep in sync with the model note in plans/two-tier-processing.md
const MODEL = 'claude-haiku-4-5-20251001';

// Capture-only system prompt. Contains only what the automated path needs.
// Synthesis, cross-linking, topic indexes, and advice mode are intentionally absent —
// those belong to the interactive Claude Code path, not this Worker.
const CAPTURE_SYSTEM = `
You are the automated capture agent for agents-kb, a personal knowledge base on agentic engineering.

Your single job: triage the source and write one raw source file. Nothing else.
Do NOT cross-link. Do NOT update topic indexes. Do NOT synthesise.

## Signal levels

- **High signal**: working practitioners reporting specific experience with concrete details — code, configs, versions, named tools, before/after, failure modes.
- **Medium signal**: framing / vocabulary pieces or well-argued opinion from credible authors. Useful for terminology and mental models.
- **Low signal**: aggregator / listicle / resource-list posts, content-marketing, engagement-farming, generic advice with no rationale.
- **Negative signal**: actively misleading — fabricated statistics, prescriptive rules with no evidence, obviously LLM-written and unedited.
- **Unfetchable**: fetch failed, returned an error status, or the response is genuinely empty. A page that overlays a sign-in modal but contains readable post content in the DOM is NOT unfetchable — triage the actual content.

## Hype tells (low/negative signal indicators)

- Mathematical bold/italic Unicode in headline (e.g. "𝐀𝐈 𝐀𝐠𝐞𝐧𝐭𝐬")
- Round-number claims with no methodology (10x, 95%, "saves 20 hours/week")
- Numbered listicles where each item is one line
- "I tested X for Y days" with no actual data
- "Most people don't know this..." / engagement-farming CTAs
- Heavy credentialing in the intro; real practitioners cite work, not audience size
- All-bullet posts with no prose connective tissue
- The "It's not X, it's Y" construction

## What to write at each level

- **High / medium**: full capture — frontmatter + 300–600 word summary + verbatim quotes + takeaways (3–5 bullets) + open questions
- **Low**: brief capture — frontmatter + 150–300 words, explicit low-signal flag in body
- **Negative / unfetchable**: minimal skipped file (frontmatter only, 4 fields)

## Source frontmatter schema (full captures)

\`\`\`yaml
---
title: "..."
url: https://...
authors: [Name, ...]
captured: YYYY-MM-DD
source_type: blog | post | repo | docs | paper | talk | video | podcast | report | user_derived
topics: [tool-use, memory]
tags: [react, reflection, mcp]
signal_level: high | medium | low
status: raw
confidence: high | medium | low
freshness_until: YYYY-QN | unknown | evergreen
---
\`\`\`

status is always "raw" — synthesis happens in a separate interactive pass.

## Skipped file frontmatter

\`\`\`yaml
---
url: https://...
received_at: YYYY-MM-DD
triage_classification: low | negative | unfetchable
reason: "one line"
---
\`\`\`

## Routing

- high / medium signal → sources/YYYY-MM-DD-slug.md
- low signal           → sources/YYYY-MM-DD-slug.md  (brief register, low-signal flag)
- negative             → sources/skipped/YYYY-MM-DD-slug.md
- unfetchable          → sources/skipped/YYYY-MM-DD-slug.md

Slug: lowercase-hyphenated, from source title or URL path, max 40 chars.

## Output

Output ONLY a single valid JSON object — no prose before or after:

{
  "file_path": "sources/YYYY-MM-DD-short-slug.md",
  "content": "<full markdown ready to commit>",
  "signal_level": "high" | "medium" | "low" | "negative" | "unfetchable"
}
`.trim();

// Canonical source_type vocabulary. Mirror any change into AGENTS.md and the
// CAPTURE_SYSTEM schema above. Unlike signal_level (a routing-critical JSON
// field that we reject on), source_type lives inside the markdown frontmatter
// and is organisational only — so we normalise in place rather than throw,
// preserving the capture. See plans/kb-dashboard.md (Phase 1a).
const SOURCE_TYPE_CANONICAL = new Set([
  'blog', 'post', 'repo', 'docs', 'paper',
  'talk', 'video', 'podcast', 'report', 'user_derived',
]);

// Renamed/drifted values → canonical. `thread` renamed to `post`.
const SOURCE_TYPE_ALIASES: Record<string, string> = {
  thread: 'post',
  analysis: 'blog',
};

interface AnthropicResponse {
  content: Array<{ type: string; text: string }>;
}

export async function runCapture(
  env: Env,
  url: string,
  fetchedContent: string,
  _fetchError: undefined,
  override: 'skip' | 'brief' | 'full' | null,
  today: string,
): Promise<CaptureResult> {
  const userMessage = buildUserMessage(url, fetchedContent, override, today);

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'prompt-caching-2024-07-31',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1500,
      system: [
        // CAPTURE_SYSTEM is static across all invocations — prompt caching keeps repeat cost low.
        { type: 'text', text: CAPTURE_SYSTEM, cache_control: { type: 'ephemeral' } },
      ],
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Anthropic API ${response.status}: ${text}`);
  }

  const data = (await response.json()) as AnthropicResponse;
  const text = data.content.find(b => b.type === 'text')?.text ?? '';

  return parseCaptureResult(text);
}

function buildUserMessage(
  url: string,
  content: string,
  override: 'skip' | 'brief' | 'full' | null,
  today: string,
): string {
  const parts = [`URL: ${url}`, `Date: ${today}`];

  if (override) {
    parts.push(
      `Override tag: [${override}] — honour if it changes default triage (e.g. [brief] forces brief register even for high-signal material)`,
    );
  }

  if (isLinkedInUrl(url)) {
    parts.push(
      'Note: this is a LinkedIn page. LinkedIn overlays a sign-in modal on publicly accessible posts — the stripped content below may begin with sign-in / cookie-consent text. Skip past that noise and triage the actual post content that follows.',
    );
  }

  parts.push(`Fetched content:\n${content}`);

  return parts.join('\n\n');
}

function isLinkedInUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return host === 'linkedin.com' || host.endsWith('.linkedin.com');
  } catch {
    return false;
  }
}

function parseCaptureResult(raw: string): CaptureResult {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error(`No JSON found in Claude response. First 500 chars: ${raw.slice(0, 500)}`);
  }

  const result = JSON.parse(match[0]) as Partial<CaptureResult>;

  if (!result.file_path || !result.content || !result.signal_level) {
    throw new Error(`Incomplete capture result: ${JSON.stringify(result).slice(0, 300)}`);
  }

  const validSignals: SignalLevel[] = ['high', 'medium', 'low', 'negative', 'unfetchable'];
  if (!validSignals.includes(result.signal_level)) {
    throw new Error(`Unknown signal_level: ${result.signal_level}`);
  }

  result.content = normaliseSourceType(result.content);

  return result as CaptureResult;
}

// Rewrites the `source_type:` frontmatter line to its canonical value. Maps
// known aliases; leaves (and warns about) anything novel so it surfaces in
// logs without losing the capture.
function normaliseSourceType(content: string): string {
  return content.replace(
    /^(source_type:[ \t]*)(.+?)[ \t]*$/m,
    (_full, key: string, raw: string) => {
      const canonical = SOURCE_TYPE_ALIASES[raw] ?? raw;
      if (!SOURCE_TYPE_CANONICAL.has(canonical)) {
        console.warn(`Unknown source_type "${raw}" — committing as-is; extend vocabulary or alias map`);
        return `${key}${raw}`;
      }
      return `${key}${canonical}`;
    },
  );
}
