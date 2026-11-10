import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const notes = (await getCollection('notes'))
    .filter((n) => !n.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Zane Zhang · 笔记',
    description: '地理信息科学的方法笔记：投影与制图、遥感反演、复现细节。',
    site: context.site ?? 'https://zhangyx0803.github.io',
    items: notes.map((n) => ({
      title: n.data.title,
      pubDate: n.data.date,
      description: n.data.summary,
      link: `/notes/${n.id}/`,
      categories: n.data.tags,
    })),
    customData: '<language>zh-cn</language>',
  });
}
