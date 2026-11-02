import {readFileSync} from 'node:fs';

const register = readFileSync(new URL('../../docs/info/operas-origins.md', import.meta.url), 'utf8');

// Keep edition/translation-status checks tied to the canonical Markdown register,
// not to historical source prose removed from libretto bundles.
export function operaOrigins(slug) {
  const anchor = '<a id="' + slug + '"></a>';
  const start = register.indexOf(anchor);
  if (start < 0) throw new Error('Missing opera origin: ' + slug);
  const end = register.indexOf('\n### ', start + anchor.length);
  return register.slice(start, end < 0 ? undefined : end);
}
