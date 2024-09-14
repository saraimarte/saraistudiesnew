import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import PagefindHighlight from 'public/pagefind/pagefind-highlight';
import pagefind from 'astro-pagefind';

export default defineConfig({
  integrations: [mdx(),pagefind()],
  markdown: {
   syntaxHighlight: "prism",
  },
});