import type { Env } from './types.js';

const GITHUB_API = 'https://api.github.com';

interface FileResponse {
  content: string;
  sha: string;
}

async function request<T>(env: Env, method: string, path: string, body?: unknown): Promise<T> {
  const response = await fetch(`${GITHUB_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'agents-kb-capture/1.0',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub ${method} ${path} → ${response.status}: ${text}`);
  }

  return response.json() as Promise<T>;
}

function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach(b => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function decodeBase64(b64: string): string {
  const binary = atob(b64.replace(/\n/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

export async function fetchAgentsMd(env: Env): Promise<string> {
  const data = await request<FileResponse>(
    env,
    'GET',
    `/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/AGENTS.md`,
  );
  return decodeBase64(data.content);
}

export async function commitFile(
  env: Env,
  filePath: string,
  content: string,
  message: string,
): Promise<void> {
  try {
    const existing = await request<FileResponse>(
      env,
      'GET',
      `/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${filePath}`,
    );
    if (existing.sha) {
      console.log(`[capture] skipping duplicate — ${filePath} already exists`);
      return;
    }
  } catch {
    // File doesn't exist yet — proceed to create
  }

  await request(
    env,
    'PUT',
    `/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${filePath}`,
    {
      message,
      content: encodeBase64(content),
      branch: env.GITHUB_DEFAULT_BRANCH,
      committer: { name: 'agents-kb capture', email: 'capture@agents-kb.local' },
    },
  );
}
