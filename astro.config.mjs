import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import pagefind from 'astro-pagefind';
import path from 'path';

export default defineConfig({
  integrations: [mdx(), pagefind()],
  markdown: {
    syntaxHighlight: "prism",
  },
  vite: {
    resolve: {
      alias: {
        '@assets': path.resolve('./src/assets'),
      },
    },
  },
});