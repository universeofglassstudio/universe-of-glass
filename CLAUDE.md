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

`tinacms build` calls Tina Cloud to verify the current branch is indexed there. If you're on a branch that hasn't been pushed yet (or your repo's Tina Cloud project doesn't know about it), the build fails with "Branch '<name>' is not on TinaCloud." Local-mode escape hatch: `npx tinacms build --local --skip-cloud-checks -c "astro build"` — uses a local GraphQL server and produces the same `dist/admin/` + `dist/` artifacts. Production builds on Render use cloud mode normally.

## Content  

- Artworks: `src/content/artworks/*.md`, frontmatter validated by `src/content/config.ts`.
- Images: `public/images/`. Frontmatter references them as `/images/<file>`.
- Tina schema mirror: `tina/config.ts`. When fields change, update BOTH the Zod schema and the Tina schema.

## CMS

TinaCMS via Tina Cloud. `/admin` is built by `tinacms build` into `dist/admin/` and gated by Tina Cloud auth. Project is owned by the artist on app.tina.io; collaborators are invited there.

Env vars required (in `.env` locally and in Render dashboard for deploys):
- `TINA_CLIENT_ID` — public, baked into `/admin` bundle
- `TINA_TOKEN` — read-only token from app.tina.io → Tokens

`tina/tina-lock.json` and the three `tina/__generated__/` files exempted in `.gitignore` MUST stay committed — Tina Cloud uses them to index the branch. The fourth generated file, `tina/__generated__/client.ts`, is regenerated on every build and stays ignored.

`public/admin/` is a build artifact written by `tinacms build` (and by `tinacms dev`) before Astro copies it into `dist/admin/`. It's gitignored — don't commit anything there; it gets clobbered on every build. Inside the dev server, the `/admin/` route only works after `tinacms dev` has populated `public/admin/`; if you see a 404 at `/admin/`, navigate to `/admin/index.html` instead (Astro dev doesn't always pick up post-startup public/ files at directory-index paths).

Heads-up on `tina/__generated__/types.ts`: it embeds a `localhost:<port>/graphql` URL that flips between 4321 (after `tinacms dev`) and 4001 (after `tinacms build --local`). The committed value is the dev URL. If `git status` shows it modified after a local run, it's harmless — `git checkout -- tina/__generated__/types.ts`. Cloud builds on Render rewrite this file with the production Tina Cloud URL.
