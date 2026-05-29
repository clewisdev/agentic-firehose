import PostalMime from 'postal-mime';
import type { ParsedEmail } from './types.js';

const URL_PATTERN = /https?:\/\/[^\s<>"{}|\\^\[\]`]+/g;
const OVERRIDE_PATTERN = /\[(skip|brief|full|test)\]/i;

export async function parseEmail(raw: ReadableStream): Promise<ParsedEmail> {
  // Buffer before parsing — message.raw is a single-use stream
  const buffer = await new Response(raw).arrayBuffer();
  const email = await PostalMime.parse(buffer);

  const subject = email.subject ?? '';
  const body = email.text ?? email.html ?? '';

  const overrideMatch = subject.match(OVERRIDE_PATTERN);
  const override = overrideMatch
    ? (overrideMatch[1].toLowerCase() as 'skip' | 'brief' | 'full')
    : null;

  const subjectUrls = subject.match(URL_PATTERN);
  const bodyUrls = body.match(URL_PATTERN);
  const url = subjectUrls?.[0] ?? bodyUrls?.[0] ?? null;

  return {
    from: email.from?.address ?? '',
    subject,
    url,
    override,
  };
}
