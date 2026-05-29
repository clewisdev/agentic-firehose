import type { Env } from './types.js';
import { parseEmail } from './email.js';
import { fetchUrl } from './fetch.js';
import { fetchAgentsMd, commitFile } from './github.js';
import { runCapture } from './claude.js';

export default {
  async email(message: ForwardableEmailMessage, env: Env): Promise<void> {
    const today = new Date().toISOString().split('T')[0];

    // Sender allowlist — any address in the comma-separated ALLOWED_SENDERS var is trusted.
    // Keep the trigger address private; this is a defence-in-depth measure, not the primary control.
    const allowed = env.ALLOWED_SENDERS.split(',').map(s => s.trim().toLowerCase());
    if (!allowed.includes(message.from.toLowerCase())) {
      console.log(`[capture] ignored email from unlisted sender: ${message.from}`);
      return;
    }

    const parsed = await parseEmail(message.raw);
    console.log(`[capture] from=${parsed.from} subject="${parsed.subject}" url=${parsed.url} override=${parsed.override}`);

    if (!parsed.url) {
      console.log('[capture] no URL found — logging to skipped/');
      await commitSkipped(env, '', today, 'other', `No URL in email: "${parsed.subject}"`);
      return;
    }

    // [test] override: smoke-test the pipeline without spending API tokens
    if (parsed.override === 'test') {
      await commitHealthcheck(env, today);
      console.log('[capture] healthcheck committed');
      return;
    }

    // [skip] override: trust the sender, don't even fetch
    if (parsed.override === 'skip') {
      await commitSkipped(env, parsed.url, today, 'manual-skip', '[skip] tag in email');
      console.log('[capture] manual skip committed');
      return;
    }

    const agentsMd = await fetchAgentsMd(env);
    const { content: fetchedContent, error: fetchError } = await fetchUrl(parsed.url);

    if (fetchError) {
      console.log(`[capture] fetch failed: ${fetchError}`);
    }

    const result = await runCapture(
      env,
      agentsMd,
      parsed.url,
      fetchedContent,
      fetchError,
      parsed.override,
      today,
    );

    console.log(`[capture] signal=${result.signal_level} path=${result.file_path}`);

    // Guard against a hallucinated or adversarial file_path writing outside sources/.
    // Claude's response is untrusted input; this is the last line before a repo write.
    if (!result.file_path.startsWith('sources/')) {
      throw new Error(`Rejected unsafe file_path from Claude: "${result.file_path}"`);
    }

    const commitMessage = result.file_path.startsWith('sources/skipped/')
      ? `skip [${result.signal_level}]: ${parsed.url.slice(0, 80)}`
      : `capture: ${result.file_path.replace(/^sources\//, '')}`;

    await commitFile(env, result.file_path, result.content, commitMessage);
    console.log(`[capture] committed ${result.file_path}`);
  },
};

async function commitHealthcheck(env: Env, today: string): Promise<void> {
  const timestamp = new Date().toISOString();
  const filePath = `sources/skipped/${today}-healthcheck.md`;
  const content = [
    '---',
    `url: ""`,
    `received_at: ${today}`,
    `triage_classification: other`,
    `reason: "[test] tag — pipeline smoke test, not a real capture"`,
    '---',
    '',
    `Worker reachable. Email routing → Worker → GitHub API all functional.`,
    `Timestamp: ${timestamp}`,
  ].join('\n') + '\n';

  await commitFile(env, filePath, content, `healthcheck: ${timestamp}`);
}

async function commitSkipped(
  env: Env,
  url: string,
  today: string,
  classification: string,
  reason: string,
): Promise<void> {
  const slug = toSlug(url || 'no-url', 40);
  const filePath = `sources/skipped/${today}-${slug}.md`;
  const content = [
    '---',
    `url: "${url}"`,
    `received_at: ${today}`,
    `triage_classification: ${classification}`,
    `reason: "${reason.replace(/"/g, "'")}"`,
    '---',
  ].join('\n') + '\n';

  await commitFile(env, filePath, content, `skip [${classification}]: ${(url || reason).slice(0, 80)}`);
}

function toSlug(text: string, maxLen: number): string {
  return text
    .replace(/^https?:\/\/[^/]+\/?/, '') // strip scheme + host from URLs
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, maxLen) || 'unknown';
}
