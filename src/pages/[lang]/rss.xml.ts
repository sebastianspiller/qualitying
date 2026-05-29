import rss from '@astrojs/rss';
import { getRelativeLocaleUrl } from 'astro:i18n';
import type { APIContext } from 'astro';
import { languages, ui, type Lang } from '../../i18n/ui';
import { getPosts, getSlug } from '../../utils/posts';

export function getStaticPaths() {
  return (Object.keys(languages) as Lang[]).map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  const posts = await getPosts(lang);

  return rss({
    title: ui[lang]['site.title'],
    description: ui[lang]['site.description'],
    site: context.site ?? 'https://example.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: post.data.tags,
      link: getRelativeLocaleUrl(lang, `blog/${getSlug(post)}`),
    })),
    customData: `<language>${lang}</language>`,
  });
}
