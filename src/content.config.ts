import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectSchema = z.object({
  title: z.string(),
  titleEn: z.string().optional(),
  subtitle: z.string().optional(),
  subtitleEn: z.string().optional(),
  period: z.string(),
  periodEn: z.string().optional(),
  status: z.string(),
  statusEn: z.string().optional(),
  summary: z.string(),
  summaryEn: z.string().optional(),
  methods: z.array(z.string()).default([]),
  methodsEn: z.array(z.string()).default([]),
  repo: z.string().url().optional(),
  order: z.number().default(99),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: projectSchema,
});

const projectsEn = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects-en' }),
  schema: projectSchema,
});

/**
 * 成果。软著：title、number（登记号）、certificate（证书号）、
 * issued（登记日期）、holder（著作权人）、version（版本）。
 */
const achievements = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/achievements' }),
  schema: z.object({
    kind: z.enum(['软著', '论文', '竞赛', '专利']),
    kindEn: z.string().optional(),
    title: z.string(),
    titleEn: z.string().optional(),
    number: z.string().optional(),
    certificate: z.string().optional(),
    certificateEn: z.string().optional(),
    issued: z.coerce.date().optional(),
    holder: z.string().optional(),
    version: z.string().optional(),
    related: z.string().optional(),
    link: z.string().url().optional(),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

export const collections = { projects, projectsEn, achievements };
