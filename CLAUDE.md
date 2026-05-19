# CLAUDE.md

Guidance for Claude Code working in this repository.

## Stack

Astro 5 static site, Tailwind, TypeScript content collection (Zod schema in `src/content/config.ts`). Bilingual EN / RO via Astro i18n. Deployed to Render at https://universe-of-glass.onrender.com/.

## Running locally

```bash
npm install
cp .env.example .env   # fill in TINA_CLIENT_ID and TINA_TOKEN from app.tina.io
npm run dev            # tinacms dev -c "astro dev"
```

Open `http://localhost:4321/` for the site, `http://localhost:4321/admin` for the Tina editor.

`npm run build` runs `tinacms build && astro build`. `npm run check` runs `astro check`.

## Content

- Artworks: `src/content/artworks/*.md`, frontmatter validated by `src/content/config.ts`.
- Images: `public/images/`. Frontmatter references them as `/images/<file>`.
- Tina schema mirror: `tina/config.ts`. When fields change, update BOTH the Zod schema and the Tina schema.

## CMS

TinaCMS via Tina Cloud. `/admin` is built by `tinacms build` into `dist/admin/` and gated by Tina Cloud auth. Project is owned by the artist on app.tina.io; collaborators are invited there.

Env vars required (in `.env` locally and in Render dashboard for deploys):
- `TINA_CLIENT_ID` — public, baked into `/admin` bundle
- `TINA_TOKEN` — read-only token from app.tina.io → Tokens

`tina/tina-lock.json` and the three `tina/__generated__/` files exempted in `.gitignore` MUST stay committed — Tina Cloud uses them to index the branch.
