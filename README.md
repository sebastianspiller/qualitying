# Qualitying

A minimal, bilingual (English / German) blog built with [Astro](https://astro.build)
and deployed to GitHub Pages. Posts are plain Markdown. English content lives
under `/en/`, German content under `/de/`, with a language switcher in the
header. Includes dark mode, tags, and per-language RSS feeds.

## Develop locally

Requires Node 20+ (see [`.nvmrc`](.nvmrc)).

```bash
npm install
npm run dev      # start the dev server at http://localhost:4321
npm run build    # build the static site into dist/
npm run preview  # preview the production build locally
```

## Writing a post

Create a Markdown file in the folder for its language:

- English: `src/content/blog/en/my-post.md`
- German: `src/content/blog/de/mein-beitrag.md`

The file name (without `.md`) becomes the URL slug, e.g.
`src/content/blog/en/my-post.md` -> `/en/blog/my-post/`.

Each post starts with frontmatter:

```markdown
---
title: "My post title"
description: "A short summary used in lists, meta tags and RSS."
pubDate: 2026-05-29
updatedDate: 2026-06-01   # optional
tags: ["astro", "notes"]  # optional
draft: false              # optional; drafts are visible in dev, hidden in production
---

Your content here, in **Markdown**.
```

Posts in `en/` and `de/` are independent — you do not have to translate a post
into both languages. Tags are also per-language, so use the words that fit each
language (e.g. `writing` vs `schreiben`).

## Project structure

```
src/
  content/blog/{en,de}/   # your Markdown posts
  i18n/ui.ts              # UI strings + helpers for each language
  utils/posts.ts          # helpers to load/sort posts and derive language
  layouts/                # BaseLayout, PostLayout
  components/             # Header, LanguageSwitcher, ThemeToggle, PostCard
  pages/                  # routes (localized under [lang]/)
  styles/global.css       # minimal design + light/dark theme
.github/workflows/deploy.yml  # builds and deploys on push to main
astro.config.mjs          # site, base, i18n and integrations
```

## Deploy to GitHub Pages

1. Create a GitHub repository named `qualitying` and push this project to the
   `main` branch.
2. In [`astro.config.mjs`](astro.config.mjs), replace `YOUR_USERNAME` in `site`
   with your GitHub username.
3. On GitHub: **Settings -> Pages -> Build and deployment -> Source** =
   **GitHub Actions**.
4. Push to `main`. The workflow builds the site and deploys it to
   `https://YOUR_USERNAME.github.io/qualitying/`.

## Using a custom domain later

When you are ready to serve the blog from your own domain:

1. In [`astro.config.mjs`](astro.config.mjs): set `site` to your domain (e.g.
   `https://example.com`) and **delete** the `base: '/qualitying'` line.
2. Add a file `public/CNAME` containing just your domain, e.g.:

   ```
   example.com
   ```

3. Configure your DNS to point at GitHub Pages, and set the custom domain in
   **Settings -> Pages**.
