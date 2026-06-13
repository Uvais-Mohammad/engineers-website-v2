import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image(),
      coverAlt: z.string(),
      publishDate: z.coerce.date(),
      author: z.string(),
      tags: z.array(z.string()),
      slug: z.string(),
    }),
});

export const collections = { blog };
