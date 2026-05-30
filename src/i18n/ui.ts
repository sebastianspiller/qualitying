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
    'nav.about': 'About',
    'about.title': 'About',
    'about.description': 'Languages, translations, and how this site is built.',
    'about.lede':
      'Qualitying is a bilingual blog — English and German live in separate sections, linked by the language switcher in the header.',
    'about.aiNote':
      'Some German posts are translations of English originals. Those were produced with AI assistance and reviewed lightly; they may not capture every nuance of the source.',
    'about.aiTagIntro': 'Translated posts are marked with the tag',
    'about.originalNote':
      'Posts without that tag were written directly in the language you are reading.',
    'home.intro': 'Welcome. This is where I write — sometimes in English, sometimes in German.',
    'home.latest': 'Latest posts',
    'home.viewAll': 'View all posts',
    'blog.title': 'Blog',
    'blog.description': 'All posts — notes, essays and experiments in English.',
    'blog.empty': 'No posts yet. Check back soon.',
    'post.readMore': 'Read more',
    'post.back': 'Back to all posts',
    'post.updated': 'Updated',
    'post.draft': 'Draft',
    'tags.title': 'Tags',
    'tags.description': 'Browse posts by topic and theme.',
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
    'nav.about': 'Über',
    'about.title': 'Über',
    'about.description': 'Sprachen, Übersetzungen und wie diese Seite entsteht.',
    'about.lede':
      'Qualitying ist ein zweisprachiger Blog — Englisch und Deutsch haben jeweils einen eigenen Bereich, verbunden über den Sprachschalter in der Kopfzeile.',
    'about.aiNote':
      'Einige deutsche Beiträge sind Übersetzungen englischer Originale. Sie wurden mit KI-Unterstützung erstellt und nur leicht überarbeitet; sie treffen möglicherweise nicht jede Nuance des Ausgangstextes.',
    'about.aiTagIntro': 'Übersetzte Beiträge sind mit dem Schlagwort',
    'about.originalNote':
      'Beiträge ohne dieses Schlagwort wurden direkt in der Sprache verfasst, in der du sie liest.',
    'home.intro': 'Willkommen. Hier schreibe ich — mal auf Deutsch, mal auf Englisch.',
    'home.latest': 'Neueste Beiträge',
    'home.viewAll': 'Alle Beiträge ansehen',
    'blog.title': 'Blog',
    'blog.description': 'Alle Beiträge — Notizen, Essays und Experimente auf Deutsch.',
    'blog.empty': 'Noch keine Beiträge. Schau bald wieder vorbei.',
    'post.readMore': 'Weiterlesen',
    'post.back': 'Zurück zu allen Beiträgen',
    'post.updated': 'Aktualisiert',
    'post.draft': 'Entwurf',
    'tags.title': 'Schlagwörter',
    'tags.description': 'Beiträge nach Thema und Schlagwort durchstöbern.',
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
