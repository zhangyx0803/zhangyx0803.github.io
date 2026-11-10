import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    period: z.string(),
    status: z.string(),
    summary: z.string(),
    methods: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    order: z.number().default(99),
  }),
});

/**
 * 成果（知识产权、论文、竞赛）。
 * 软著：title（软件名称）、number（登记号）、certificate（证书号）、
 *       issued（登记日期，证书上没有可不填）、holder（著作权人）、version（版本）。
 */
const achievements = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/achievements' }),
  schema: z.object({
    kind: z.enum(['软著', '论文', '竞赛', '专利']),
    title: z.string(),
    number: z.string().optional(),
    certificate: z.string().optional(),
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

export const collections = { notes, projects, achievements };
