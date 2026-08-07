# Kayan Clarke — Notes

Personal blog/notes site for Kayan Clarke: technology, faith, career, motherhood, immigration, and everyday life. Built with [Astro](https://astro.build) as a static site.

Live features:

- ✅ Light/dark mode toggle with persisted preference (`localStorage`)
- ✅ Tagging, per-tag archive pages, and live client-side search on the notes list
- ✅ Reading-time estimates and a scroll-based reading-progress bar on posts
- ✅ Floating, scrollspy-driven table of contents on longer posts
- ✅ Related-posts suggestions based on shared tags
- ✅ Draft posts (`draft: true` in frontmatter) that only render in local dev, excluded from production builds
- ✅ Per-post Open Graph images generated at build time (`sharp` + hand-built SVG), no design tool needed
- ✅ View Transitions (`astro:transitions`) for smooth client-side navigation
- ✅ RSS feed, sitemap, canonical URLs

## 🚀 Project Structure

```text
├── public/
├── src/
│   ├── assets/            # fallback OG image, etc.
│   ├── components/        # Header, Footer, ThemeToggle, TableOfContents, TagList, ...
│   ├── content/
│   │   └── blog/          # posts, written in Markdown/MDX
│   ├── layouts/
│   │   └── BlogPost.astro # shared post layout (TOC, tags, related posts, reading progress)
│   ├── pages/
│   │   ├── index.astro    # home page
│   │   ├── blog/          # /blog (listing + search) and /blog/[slug]
│   │   ├── tags/          # /tags and /tags/[tag]
│   │   ├── og/             # /og/[slug].png — generated OG images
│   │   └── rss.xml.js
│   ├── styles/
│   │   └── global.css     # design system: CSS custom properties, palette, typography
│   ├── utils/
│   │   ├── posts.ts        # getPublishedPosts() — filters out drafts in prod
│   │   └── readingTime.ts
│   └── content.config.ts  # blog collection schema (title, tags, draft, ...)
├── astro.config.mjs
└── package.json
```

## Writing a post

Add a Markdown file to `src/content/blog/`:

```md
---
title: 'Post title'
description: 'One-line summary used for listings, RSS, and OG images.'
pubDate: 2026-01-01
tags:
  - technology
draft: true # omit or set to false to publish
---

Post content here.
```

Draft posts are visible while running `npm run dev` so you can preview them locally, but are excluded from `npm run build` output (listings, tag pages, RSS, sitemap, and OG image generation) until `draft` is removed or set to `false`.

## Design system

Colors, fonts, and shared component styles live in [`src/styles/global.css`](./src/styles/global.css) as CSS custom properties (`--heading`, `--accent`, `--accent2`, `--bg`, etc.), each redefined under `:root[data-theme='dark']` for dark mode. Update the palette there rather than hardcoding colors in individual components.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build the production site to `./dist/`           |
| `npm run preview`         | Preview the build locally, before deploying      |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## Credit

Originally scaffolded from Astro's blog starter, itself based on [Bear Blog](https://github.com/HermanMartinus/bearblog/).
