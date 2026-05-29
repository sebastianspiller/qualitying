export const languages = {
  en: 'English',
  de: 'Deutsch',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'site.title': 'Qualitying',
    'site.description': 'Notes, essays and experiments — in English and German.',
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.tags': 'Tags',
    'home.intro': 'Welcome. This is where I write — sometimes in English, sometimes in German.',
    'home.latest': 'Latest posts',
    'home.viewAll': 'View all posts',
    'blog.title': 'Blog',
    'blog.empty': 'No posts yet. Check back soon.',
    'post.readMore': 'Read more',
    'post.back': 'Back to all posts',
    'post.updated': 'Updated',
    'tags.title': 'Tags',
    'tags.all': 'All tags',
    'tags.postsTagged': 'Posts tagged',
    'tags.empty': 'No tags yet.',
    'theme.toggle': 'Toggle dark mode',
    'rss.subscribe': 'RSS',
    'footer.builtWith': 'Built with Astro.',
  },
  de: {
    'site.title': 'Qualitying',
    'site.description': 'Notizen, Essays und Experimente — auf Deutsch und Englisch.',
    'nav.home': 'Start',
    'nav.blog': 'Blog',
    'nav.tags': 'Schlagwörter',
    'home.intro': 'Willkommen. Hier schreibe ich — mal auf Deutsch, mal auf Englisch.',
    'home.latest': 'Neueste Beiträge',
    'home.viewAll': 'Alle Beiträge ansehen',
    'blog.title': 'Blog',
    'blog.empty': 'Noch keine Beiträge. Schau bald wieder vorbei.',
    'post.readMore': 'Weiterlesen',
    'post.back': 'Zurück zu allen Beiträgen',
    'post.updated': 'Aktualisiert',
    'tags.title': 'Schlagwörter',
    'tags.all': 'Alle Schlagwörter',
    'tags.postsTagged': 'Beiträge mit',
    'tags.empty': 'Noch keine Schlagwörter.',
    'theme.toggle': 'Dunkelmodus umschalten',
    'rss.subscribe': 'RSS',
    'footer.builtWith': 'Erstellt mit Astro.',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function isLang(value: string): value is Lang {
  return value === 'en' || value === 'de';
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
