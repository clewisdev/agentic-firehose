// Truncate fetched content to keep it within a reasonable context budget.
// 8K chars (~2K tokens) is enough for triage classification and metadata extraction.
const MAX_CHARS = 8_000;

// Hosts excluded from outbound URL extraction — navigation, social, or platform chrome.
// lnkd.in is intentionally NOT excluded: it's LinkedIn's shortener for external article links.
// licdn.com is LinkedIn's CDN for images/static assets — must be excluded alongside linkedin.com.
const EXCLUDED_HOSTS = ['linkedin.com', 'licdn.com', 'twitter.com', 'x.com', 'facebook.com', 'instagram.com'];

export async function fetchUrl(url: string): Promise<{ content: string; outboundUrls: string[]; rawHtml?: string; error?: string }> {
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
    let rawHtml: string | undefined;
    if (contentType.includes('text/html')) {
      const authorSlug = extractLinkedInAuthorSlug(url);
      outboundUrls = extractOutboundUrls(text, authorSlug);
      // Preserve DOM structure for debug capture (scripts/styles removed to reduce size)
      rawHtml = text
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '');
      text = stripHtml(text);
    }

    if (text.length > MAX_CHARS) {
      text = text.slice(0, MAX_CHARS) + '\n\n[content truncated at 8 000 chars]';
    }

    return { content: text, outboundUrls, rawHtml };
  } catch (err) {
    return { content: '', outboundUrls: [], error: String(err) };
  }
}

// Extract the post author's slug from a LinkedIn posts URL.
// linkedin.com/posts/{authorSlug}_{rest} → authorSlug (lowercased)
export function extractLinkedInAuthorSlug(url: string): string | undefined {
  return url.match(/linkedin\.com\/posts\/([^_]+)_/)?.[1]?.toLowerCase();
}

// Extract outbound URLs from HTML, optionally filtered to sections owned by authorSlug.
//
// LinkedIn's HTML marks section boundaries with profile hrefs that carry a trk parameter:
//   trk=public_post_feed-actor-*    → post body (owned by the post author)
//   trk=public_post_comment_actor-* → a comment (owned by the named commenter)
//
// We track the "current section owner" as we scan left-to-right. When authorSlug is
// provided, only URLs whose section owner matches the author are returned — this
// excludes links from other users' comments. Falls back to all outbound URLs when
// no authorSlug is given (non-LinkedIn pages, or /feed/update/ URLs with no slug).
export function extractOutboundUrls(html: string, authorSlug?: string): string[] {
  // Collect section-boundary markers (profile links with _actor in trk)
  const sectionHeaders: Array<{ slug: string; pos: number }> = [];
  if (authorSlug) {
    for (const match of html.matchAll(
      /href="https?:\/\/[a-z.]*linkedin\.com\/in\/([^?"#/]+)[^"]*[_-]actor[^"]*"/gi,
    )) {
      sectionHeaders.push({ slug: match[1].toLowerCase(), pos: match.index! });
    }
  }

  const seen = new Set<string>();
  const results: string[] = [];

  for (const match of html.matchAll(/href="(https?:\/\/[^"]+)"/gi)) {
    let url = match[1];
    const pos = match.index!;

    // Resolve LinkedIn redirect wrapper → real destination before exclusion check.
    // LinkedIn wraps post body links as linkedin.com/redir/redirect?url=ENCODED_URL,
    // which would otherwise be filtered by EXCLUDED_HOSTS.
    try {
      const parsed = new URL(url);
      const isLinkedIn = parsed.hostname === 'linkedin.com' || parsed.hostname.endsWith('.linkedin.com');
      if (isLinkedIn && parsed.pathname === '/redir/redirect') {
        const dest = parsed.searchParams.get('url');
        if (!dest) continue;
        url = dest;
      }
    } catch {
      continue;
    }

    if (seen.has(url)) continue;

    try {
      const host = new URL(url).hostname;
      if (EXCLUDED_HOSTS.some(ex => host === ex || host.endsWith('.' + ex))) continue;
    } catch {
      continue;
    }

    if (authorSlug) {
      // Find the last section header before this URL's position
      let ownerSlug: string | undefined;
      for (const header of sectionHeaders) {
        if (header.pos < pos) ownerSlug = header.slug;
        else break;
      }
      // Only include if the URL belongs to the author's section
      if (ownerSlug !== authorSlug) continue;
    }

    seen.add(url);
    results.push(url);
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
