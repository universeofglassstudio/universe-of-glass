import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://universe-of-glass.onrender.com';

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
