import { defineCollection, z } from 'astro:content';

const artworks = defineCollection({
  type: 'content',
  schema: z.object({
    title_en: z.string(),
    title_ro: z.string(),
    price_en: z.string(),
    price_ro: z.string(),
    status: z.enum(['available', 'sold', 'made_to_order']),
    images: z.array(z.string()).min(1),
    dimensions: z.string().optional(),
    technique: z.string().optional(),
    tags: z.array(z.string()).default([]),
    desc_en: z.string(),
    desc_ro: z.string(),
    show: z.boolean().default(true),
  }),
});

export const collections = { artworks };
