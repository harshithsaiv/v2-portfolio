import { parseFrontmatter } from '../lib/frontmatter';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parseDate(dateStr = '') {
  const [month, year] = dateStr.split(' ');
  const monthIndex = MONTHS.indexOf(month);
  return new Date(parseInt(year, 10) || 0, monthIndex >= 0 ? monthIndex : 0).getTime();
}

// Enumerates every post under ./posts at build time; webpack resolves each
// .md to a static asset URL (CRA has no raw-text loader without ejecting).
const postContext = require.context('./posts', false, /\.md$/);

let cachedPromise = null;

async function fetchPost(url) {
  const response = await fetch(url);
  const raw = await response.text();
  const { data, body } = parseFrontmatter(raw);
  return { ...data, body };
}

export function loadPosts() {
  if (!cachedPromise) {
    cachedPromise = Promise.all(postContext.keys().map((key) => fetchPost(postContext(key)))).then(
      (posts) => posts.sort((a, b) => parseDate(b.date) - parseDate(a.date))
    );
  }
  return cachedPromise;
}

export async function loadPost(slug) {
  const posts = await loadPosts();
  return posts.find((post) => post.slug === slug);
}
