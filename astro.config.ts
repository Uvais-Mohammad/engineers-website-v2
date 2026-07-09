import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { companyInfo } from './src/data/company';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: companyInfo.website,
  trailingSlash: 'always',

  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/home-'),
    }),
  ],

  adapter: cloudflare(),
});