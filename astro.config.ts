import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { companyInfo } from './src/data/company';

export default defineConfig({
  site: companyInfo.website,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/home-'),
    }),
  ],
});
