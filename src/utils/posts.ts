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

const isProd = import.meta.env.PROD;

export async function getPosts(lang: Lang): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return isProd ? data.draft !== true : true;
  });
  return posts
    .filter((post) => getLang(post) === lang)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getTags(lang: Lang): Promise<string[]> {
  const posts = await getPosts(lang);
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) tags.add(tag);
  }
  return [...tags].sort((a, b) => a.localeCompare(b, lang));
}
