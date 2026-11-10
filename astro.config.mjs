// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://zhangyx0803.github.io',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  build: { inlineStylesheets: 'auto' },
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: true },
  },
  vite: {
    build: { assetsInlineLimit: 2048 },
  },
});
