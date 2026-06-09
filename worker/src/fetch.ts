// Truncate fetched content to keep it within a reasonable context budget.
// 8K chars (~2K tokens) is enough for triage classification and metadata extraction.
const MAX_CHARS = 8_000;

// Hosts excluded from outbound URL extraction — navigation, social, or platform chrome.
// lnkd.in is intentionally NOT excluded: it's LinkedIn's shortener for external article links.
// licdn.com is LinkedIn's CDN for images/static assets — must be excluded alongside linkedin.com.
const EXCLUDED_HOSTS = ['linkedin.com', 'licdn.com', 'twitter.com', 'x.com', 'facebook.com', 'instagram.com'];

export async function fetchUrl(url: string): Promise<{ content: string; outboundUrls: string[]; error?: string }> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'agents-kb-capture/1.0 (+https://github.com/clewisdev/agents-kb)',
        Accept: 'text/html,text/plain,application/json,*/*',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      return { content: '', outboundUrls: [], error: `HTTP ${response.status} ${response.statusText}` };
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('text/') && !contentType.includes('application/json') && contentType !== '') {
      return { content: '', outboundUrls: [], error: `Non-text content-type: ${contentType}` };
    }

    let text = await response.text();

    let outboundUrls: string[] = [];
    if (contentType.includes('text/html')) {
      outboundUrls = extractOutboundUrls(text);
      text = stripHtml(text);
    }

    if (text.length > MAX_CHARS) {
      text = text.slice(0, MAX_CHARS) + '\n\n[content truncated at 8 000 chars]';
    }

    return { content: text, outboundUrls };
  } catch (err) {
    return { content: '', outboundUrls: [], error: String(err) };
  }
}

export function extractOutboundUrls(html: string): string[] {
  const seen = new Set<string>();
  const results: string[] = [];
  for (const [, url] of html.matchAll(/href="(https?:\/\/[^"]+)"/gi)) {
    if (seen.has(url)) continue;
    seen.add(url);
    try {
      const host = new URL(url).hostname;
      if (!EXCLUDED_HOSTS.some(ex => host === ex || host.endsWith('.' + ex))) {
        results.push(url);
      }
    } catch {
      // skip malformed URLs
    }
  }
  return results;
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s{2,}/g, ' ')
    .trim();
}
