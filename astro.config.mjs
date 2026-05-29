// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// When you move to a custom domain later:
//   1. set `site` to your domain (e.g. 'https://example.com')
//   2. delete the `base` line below
//   3. add a `public/CNAME` file containing your domain
export default defineConfig({
  site: 'https://YOUR_USERNAME.github.io',
  base: '/qualitying',
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [sitemap()],
});
