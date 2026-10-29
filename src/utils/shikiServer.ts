import { codeToHtml } from 'shiki';

/**
 * Server-only Shiki highlighting, run at build time for prerendered pages.
 * `codeToHtml` lazily loads each grammar once per process and caches it.
 */

const LANGUAGE_ALIASES: Record<string, string> = {
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  console: 'bash',
  terminal: 'bash',
  yml: 'yaml',
  cfg: 'ini',
  conf: 'ini',
  plaintext: 'text',
  txt: 'text',
};

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function highlightCode(code: string, language: string): Promise<string> {
  const lang = LANGUAGE_ALIASES[language] ?? language;
  try {
    return await codeToHtml(code, { lang, theme: 'one-dark-pro' });
  } catch {
    // Unknown grammar — fall back to plain text with the same markup shape.
    return `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`;
  }
}
