import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.string().optional(),
    updatedDate: z.string().optional(),
    draft: z.boolean().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    // legacy / unused fields — kept for backwards compat with existing articles
    slug: z.string().optional(),
    series: z.string().optional(),
    type: z.string().optional(),
    readingTime: z.number().optional(),
    seo: z.object({
      canonical: z.string().optional(),
      ogTitle: z.string().optional(),
      ogDescription: z.string().optional(),
      ogType: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { articles };
