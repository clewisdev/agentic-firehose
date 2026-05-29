// Truncate fetched content to keep it within a reasonable context budget.
// A typical webpage at 30K chars is ~7-8K tokens — enough for triage and capture.
const MAX_CHARS = 30_000;

export async function fetchUrl(url: string): Promise<{ content: string; error?: string }> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'agents-kb-capture/1.0 (+https://github.com/clewisdev/agents-kb)',
        Accept: 'text/html,text/plain,application/json,*/*',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      return { content: '', error: `HTTP ${response.status} ${response.statusText}` };
    }

    const contentType = response.headers.get('content-type') ?? '';
    let text = await response.text();

    if (contentType.includes('text/html')) {
      text = stripHtml(text);
    }

    if (text.length > MAX_CHARS) {
      text = text.slice(0, MAX_CHARS) + '\n\n[content truncated at 30 000 chars]';
    }

    return { content: text };
  } catch (err) {
    return { content: '', error: String(err) };
  }
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
