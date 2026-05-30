import { getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLang, languages, type Lang } from '../i18n/ui';
import { withBase } from './url';

export const SITE_NAME = 'Qualitying';
export const DEFAULT_OG_IMAGE = '/og.jpg';
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;
export const TWITTER_HANDLE = undefined as string | undefined;

export type PageType = 'website' | 'article';

export interface HreflangLink {
  hreflang: string;
  href: string;
}

export interface BlogPostingJsonLd {
  headline: string;
  description: string;
  url: string;
  siteUrl: string;
  datePublished: string;
  dateModified: string;
  inLanguage: string;
  keywords?: string[];
  image?: string;
}

export function absoluteUrl(path: string, site: URL | undefined): string {
  if (!site) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return new URL(withBase(normalized), site).href;
}

export function canonicalUrl(pathname: string, site: URL | undefined): string {
  if (!site) return pathname;
  return new URL(pathname, site).href;
}

export function ogLocale(lang: Lang): string {
  return lang === 'de' ? 'de_DE' : 'en_US';
}

/** Locale-prefixed paths for pages that exist in every language (e.g. `blog`, `about`). */
export function hreflangForAllLocales(
  site: URL,
  localePath: string,
): HreflangLink[] {
  return hreflangForLocales(site, localePath, Object.keys(languages) as Lang[]);
}

export function hreflangForLocales(
  site: URL,
  localePath: string,
  locales: Lang[],
): HreflangLink[] {
  const unique = [...new Set(locales)];
  const links: HreflangLink[] = unique.map((locale) => ({
    hreflang: locale,
    href: canonicalUrl(getRelativeLocaleUrl(locale, localePath), site),
  }));

  const xDefaultLocale = unique.includes(defaultLang)
    ? defaultLang
    : unique[0];
  if (xDefaultLocale) {
    links.push({
      hreflang: 'x-default',
      href: canonicalUrl(getRelativeLocaleUrl(xDefaultLocale, localePath), site),
    });
  }

  return links;
}

export function blogPostingJsonLd(
  data: BlogPostingJsonLd,
): Record<string, unknown> {
  const entry: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.headline,
    description: data.description,
    url: data.url,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    inLanguage: data.inLanguage,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: data.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: data.siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
  };

  if (data.keywords?.length) entry.keywords = data.keywords.join(', ');
  if (data.image) entry.image = data.image;

  return entry;
}

export function webSiteJsonLd(site: URL, lang: Lang, description: string): Record<string, unknown> {
  const home = canonicalUrl(getRelativeLocaleUrl(lang, ''), site);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description,
    url: home,
    inLanguage: lang,
  };
}
