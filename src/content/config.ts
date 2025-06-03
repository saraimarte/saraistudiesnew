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

const compsciCollection = defineCollection({
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

const latinoWorkersCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string()
  }),
});


const fmanageCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string()
  }),
});


const misCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string()
  }),
});

const dataStructuresCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string()
  }),
});

const linearAlgCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string()
  }),
});


const discreteStructures1Collection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string()
  }),
});


const corporateFinanceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string()
  }),
});


const operationsManagementCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string()
  }),
});

const investmentAnalysisCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string()
  }),
});

const computerArchitectureCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string()
  }),
});

const introToMarketingCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string()
  }),
});

const aiCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string()
  }),
});

const discreteStructures2Collection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    updatedDate:z.date(),
    draft: z.boolean(),
    author: z.string()
  }),
});

export const collections = {
  calc1: calc1Collection,
  calc2: calc2Collection,
  macc: maccCollection,
  statMethods: statMethodsCollection,
  supplyChain:supplyChainCollection,
  writingForMedia: writingForMediaCollection,
  compsci:compsciCollection,
  latinoWorkers: latinoWorkersCollection,
  fmanage:fmanageCollection,
  mis:misCollection,
  dataStructures: dataStructuresCollection,
  linearAlg: linearAlgCollection,
  discreteStructures1: discreteStructures1Collection,
  corporateFinance: corporateFinanceCollection,
  operationsManagement: operationsManagementCollection,
  investmentAnalysis:investmentAnalysisCollection,
  computerArchitecture: computerArchitectureCollection,
  introToMarketing:introToMarketingCollection,
  ai: aiCollection,
  discreteStructures2:discreteStructures2Collection
};