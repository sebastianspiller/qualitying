import { getCollection, type CollectionEntry } from 'astro:content';
import { isLang, type Lang } from '../i18n/ui';

export type BlogPost = CollectionEntry<'blog'>;

// Entry ids look like "en/hello-world" or "de/hallo-welt".
export function getLang(entry: BlogPost): Lang {
  const segment = entry.id.split('/')[0];
  return isLang(segment) ? segment : 'en';
}

// The slug is everything after the language segment.
export function getSlug(entry: BlogPost): string {
  return entry.id.split('/').slice(1).join('/');
}

export function shouldIncludePost(draft: boolean | undefined): boolean {
  return import.meta.env.PROD ? draft !== true : true;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return getCollection('blog', ({ data }) => shouldIncludePost(data.draft));
}

function comparePosts(a: BlogPost, b: BlogPost): number {
  const byDate = b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
  if (byDate !== 0) return byDate;

  // Same-day posts: higher order = newer = listed first; missing order sorts last.
  const orderA = a.data.order ?? 0;
  const orderB = b.data.order ?? 0;
  if (orderA !== orderB) return orderB - orderA;

  return getSlug(a).localeCompare(getSlug(b));
}

export async function getPosts(lang: Lang): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) => getLang(post) === lang).sort(comparePosts);
}

export async function getTags(lang: Lang): Promise<string[]> {
  const posts = await getPosts(lang);
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) tags.add(tag);
  }
  return [...tags].sort((a, b) => a.localeCompare(b, lang));
}
