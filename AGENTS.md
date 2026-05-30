# Qualitying — AI project guide

Bilingual (English / German) static blog on [Astro](https://astro.build) 5, deployed to GitHub Pages at `https://qualitying.com` (`public/CNAME`).

## Commands

- Node 20+ (see `.nvmrc`)
- `npm run dev` — local dev at http://localhost:4321
- `npm run build` — production build → `dist/`
- `npm run preview` — preview production build
- `npm run check` — Astro + TypeScript check

Push to `main` triggers `.github/workflows/deploy.yml` (Astro build + GitHub Pages).

## Architecture

| Area | Path | Notes |
|------|------|--------|
| Posts | `src/content/blog/{en,de}/*.md` | Language = first path segment of entry id (`en/slug`) |
| Content schema | `src/content.config.ts` | `title`, `description`, `pubDate`, optional `updatedDate`, `tags`, `draft` |
| UI copy | `src/i18n/ui.ts` | All visible strings; add keys to **both** `en` and `de` |
| Post helpers | `src/utils/posts.ts` | `getLang`, `getSlug`, `getPosts`, drafts hidden in prod |
| Tags | `src/utils/tags.ts` | Per-language tag lists |
| URLs | `src/utils/url.ts` | `withBase()` for `BASE_URL` / custom domain |
| Routes | `src/pages/[lang]/` | Blog, tags, about, RSS |
| Layouts / components | `src/layouts/`, `src/components/` | Astro components |
| Styles | `src/styles/global.css` | Light/dark theme |
| Site config | `astro.config.mjs` | `site`, optional `base`, `i18n` locales `en`/`de` |

Root `/` redirects via `src/pages/index.astro`. Default locale is `en`; both locales are prefixed (`/en/...`, `/de/...`).

## Writing posts

Create Markdown under the target language folder only — posts are **not** paired across languages unless the author chooses.

- English: `src/content/blog/en/YYMMDD-slug.md` → `/en/blog/YYMMDD-slug/`
- German: `src/content/blog/de/YYMMDD-slug.md` → `/de/blog/YYMMDD-slug/`

Filename (without `.md`) = URL slug. Existing posts use `YYMMDD-` date prefixes; follow that pattern for new posts.

```markdown
---
title: "Title"
description: "Short summary for lists, meta, RSS"
pubDate: 2026-05-30
updatedDate: 2026-05-31   # optional
tags: ["meta", "writing"]  # optional; use language-appropriate labels
draft: false               # drafts: visible in dev, hidden in production
---
```

- German AI translations of English originals: tag with `ai translated` (see About copy in `ui.ts`).
- Tags are per-language (e.g. `writing` vs `schreiben`).

## i18n and routing

- Supported langs: `en`, `de` (`Lang` type in `src/i18n/ui.ts`).
- New UI text: add the same key to `ui.en` and `ui.de`, use `useTranslations(lang)` in pages/components.
- Do not hardcode user-visible strings in Astro pages when a `ui` key fits.

## Config and deploy

- **Custom domain**: `site` in `astro.config.mjs`, no `base`, `public/CNAME` with domain.
- **Project Pages** (username.github.io/repo): set `site`, uncomment `base: '/qualitying'`, update `YOUR_USERNAME` in README if needed.
- Use `withBase()` for internal links that must respect `BASE_URL`.

## Conventions for agents

- **Scope**: Smallest correct change; do not refactor unrelated code.
- **Commits**: Only when the user explicitly asks.
- **README**: User-facing; update when workflow or post instructions change materially.
- **No secrets** in repo (`.env`, tokens).
- Prefer extending existing helpers (`posts.ts`, `tags.ts`, `ui.ts`) over duplicating logic.
- After Astro/content changes, run `npm run build` or `npm run check` if you touched types or collections.

## Common tasks

| Task | What to touch |
|------|----------------|
| New English post | `src/content/blog/en/*.md` |
| New German post | `src/content/blog/de/*.md` |
| Nav / footer / labels | `src/i18n/ui.ts` |
| Blog list / sorting | `src/utils/posts.ts`, `src/pages/[lang]/blog/` |
| Tag pages | `src/utils/tags.ts`, `src/pages/[lang]/tags/` |
| Theme / layout | `src/styles/global.css`, `src/layouts/`, `src/components/` |
| SEO meta / JSON-LD | `src/components/SEO.astro`, `src/utils/seo.ts`, `BaseLayout` / `PostLayout` |
| Default social image | `public/og.png` |
| Domain / base URL | `astro.config.mjs`, `public/CNAME` |
