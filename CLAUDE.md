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

`npm run build` runs only `astro build` — light, no Tina dependencies. Render runs this on deploy. `npm run check` runs `astro check`.

`npm run build:admin` runs `tinacms build --skip-cloud-checks && rm -f public/admin/.gitignore` — regenerates the Tina admin shell at `public/admin/` (which is committed to git, see CMS section). **Run this after any change to `tina/config.ts`**, then commit the regenerated `public/admin/` files alongside the schema change. Otherwise the deployed editor's form fields will drift from the actual content schema.

Why the pre-built admin lives in git: Render's free tier (512 MB RAM) OOM-kills `tinacms build` during deploys. Committing the pre-built admin lets Render run just `astro build`, which fits in 512 MB. If you upgrade to a paid Render plan (≥2 GB) or switch to Netlify (8 GB free build env), revert this by restoring `build` to `tinacms build && astro build`, re-gitignoring `public/admin/`, and deleting the committed copy. See `docs/superpowers/specs/2026-05-20-tina-cloud-config-design.md` for the original (no-checked-in-admin) architecture intent.

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

`public/admin/` is the pre-built Tina admin shell (~10 MB across ~92 files, content-hashed filenames). It IS committed to git. `astro build` copies it into `dist/admin/`. Regenerate with `npm run build:admin` when `tina/config.ts` changes — see the Build section above. Inside `npm run dev`, the `/admin/` route only works after `tinacms dev` has populated `public/admin/`; if you see a 404 at `/admin/`, navigate to `/admin/index.html` instead (Astro dev doesn't always pick up post-startup public/ files at directory-index paths).

`tinacms` writes a `public/admin/.gitignore` after every build that would block re-staging the regenerated files. `npm run build:admin` deletes it as part of the script. If you ever run `npx tinacms build` directly (skipping the npm script), `rm -f public/admin/.gitignore` afterward, or `git add public/admin/.gitignore` won't catch the change you actually want.

Heads-up on `tina/__generated__/types.ts`: it embeds a `localhost:<port>/graphql` URL that flips between 4321 (after `tinacms dev`) and 4001 (after `tinacms build --local`). The committed value is the dev URL. If `git status` shows it modified after a local run, it's harmless — `git checkout -- tina/__generated__/types.ts`. Cloud builds on Render rewrite this file with the production Tina Cloud URL.
