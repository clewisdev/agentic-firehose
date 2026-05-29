export interface Env {
  ANTHROPIC_API_KEY: string;
  GITHUB_TOKEN: string;
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
  GITHUB_DEFAULT_BRANCH: string;
  ALLOWED_SENDERS: string;
}

export type SignalLevel = 'high' | 'medium' | 'low' | 'negative' | 'unfetchable';

export interface CaptureResult {
  file_path: string;
  content: string;
  signal_level: SignalLevel;
}

export interface ParsedEmail {
  from: string;
  subject: string;
  url: string | null;
  override: 'skip' | 'brief' | 'full' | 'test' | null;
}
