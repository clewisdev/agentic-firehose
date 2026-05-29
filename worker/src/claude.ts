import type { Env, CaptureResult, SignalLevel } from './types.js';

const API_URL = 'https://api.anthropic.com/v1/messages';
// Keep in sync with the model note in AGENTS.md / plans/cloud-capture-agent.md
const MODEL = 'claude-sonnet-4-6';

// Separate block so AGENTS.md gets its own cache slot; these instructions are short and change less often.
const CAPTURE_INSTRUCTIONS = `
You are an autonomous capture agent for the agents-kb knowledge base.

You will receive a URL, today's date, and pre-fetched page content (or a fetch error).

Apply the full capture flow from AGENTS.md above:
1. Triage the source per the signal levels defined there.
2. Write the appropriate markdown file, following the source capture template exactly (frontmatter + sections).
3. Output ONLY a single valid JSON object — no prose before or after:

{
  "file_path": "sources/YYYY-MM-DD-short-slug.md",
  "content": "<full markdown ready to commit>",
  "signal_level": "high" | "medium" | "low" | "negative" | "unfetchable"
}

Routing:
- high/medium signal  → sources/YYYY-MM-DD-slug.md   (full capture per AGENTS.md)
- low signal          → sources/YYYY-MM-DD-slug.md   (150-300 word brief, mark low-signal in body and frontmatter)
- negative / skip     → sources/skipped/YYYY-MM-DD-slug.md
- unfetchable         → sources/skipped/YYYY-MM-DD-slug.md  (triage_classification: unfetchable)

For sources/skipped/ files use this minimal frontmatter:
  url, received_at, triage_classification, reason (one line)

Slug: lowercase-hyphenated, derived from source title or URL path, max 40 chars.
`.trim();

interface AnthropicResponse {
  content: Array<{ type: string; text: string }>;
}

export async function runCapture(
  env: Env,
  agentsMd: string,
  url: string,
  fetchedContent: string,
  fetchError: string | undefined,
  override: 'skip' | 'brief' | 'full' | null,
  today: string,
): Promise<CaptureResult> {
  const userMessage = buildUserMessage(url, fetchedContent, fetchError, override, today);

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
      max_tokens: 8192,
      system: [
        // AGENTS.md gets prompt caching — it's static across invocations and large enough to benefit.
        { type: 'text', text: agentsMd, cache_control: { type: 'ephemeral' } },
        { type: 'text', text: CAPTURE_INSTRUCTIONS },
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
  fetchError: string | undefined,
  override: 'skip' | 'brief' | 'full' | null,
  today: string,
): string {
  const parts = [`URL: ${url}`, `Date: ${today}`];

  if (override) {
    parts.push(
      `Override tag: [${override}] — honour if it changes default triage (e.g. [brief] forces brief register even for high-signal material)`,
    );
  }

  if (fetchError || !content) {
    parts.push(
      `Fetch result: FAILED — ${fetchError ?? 'empty response'}`,
      `Route to sources/skipped/ with triage_classification: unfetchable`,
    );
  } else {
    parts.push(`Fetched content:\n${content}`);
  }

  return parts.join('\n\n');
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

  return result as CaptureResult;
}
