// Minimal frontmatter parser: a leading `---` delimited block of `key: value`
// lines, followed by a Markdown body. Deliberately dependency-free (avoids
// gray-matter's Node/Buffer assumptions under webpack 5).

function parseValue(raw) {
  const value = raw.trim();

  if (value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }

  if (/^-?\d+$/.test(value)) return parseInt(value, 10);

  return value.replace(/^['"]|['"]$/g, '');
}

export function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);

  if (!match) {
    return { data: {}, body: raw.trim() };
  }

  const [, frontmatterBlock, body] = match;
  const data = {};

  frontmatterBlock.split(/\r?\n/).forEach((line) => {
    if (!line.trim()) return;
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1);
    data[key] = parseValue(value);
  });

  return { data, body: body.trim() };
}
