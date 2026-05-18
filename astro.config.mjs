import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// TODO: update with real production domain before deploy
const SITE = 'https://universeofglass.netlify.app';

export default defineConfig({
  site: SITE,
  integrations: [tailwind(), sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ro'],
    routing: { prefixDefaultLocale: false }
  },
  output: 'static'
});
