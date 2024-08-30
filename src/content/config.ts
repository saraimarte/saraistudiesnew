import { defineCollection, z } from 'astro:content';
const calc1Collection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string(),
  }),
});

const calc2Collection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string(),
  }),
});

const maccCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string(),
    chapter: z.string(),
  }),
});

const statMethodsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string(),
  }),
});


const supplyChainCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string(),
  }),
});

const writingForMediaCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string(),
  }),
});

export const collections = {
  calc1: calc1Collection,
  calc2: calc2Collection,
  macc: maccCollection,
  statMethods: statMethodsCollection,
  supplyChain:supplyChainCollection,
  writingForMedia: writingForMediaCollection
};