# zhangyx0803.github.io

个人站：**https://zhangyx0803.github.io/**

Astro + Markdown 内容集合。写完 `.md` 丢进 `src/content/` 就是页面，不需要再碰 HTML。

## 目录

```
src/
  content/
    notes/       笔记，一篇一个 .md
    projects/    研究项目，一项一个 .md
  layouts/Base.astro      页面骨架（SEO、导航、动效脚本）
  pages/                  路由：/ /notes /notes/[slug] /projects /projects/[slug] /about /rss.xml
  styles/global.css       设计系统
public/                   静态文件（og.png、favicon、world.svg、robots.txt）
_astro/、index.html …     构建产物（已提交，GitHub Pages 直接从这个分支的根目录发布）
```

> GitHub Pages 现在配置为「从 main 分支根目录发布」，所以构建产物也提交在根目录。
> 源文件（`src/`、`public/`）与产物共存，改动后重新构建并覆盖即可。

## 加一篇笔记

1. 在 `src/content/notes/` 新建 `my-note.md`：

```md
---
title: 标题
date: 2026-11-12
summary: 一句话摘要，会显示在列表和搜索结果里
tags: [制图, 投影]
---

正文……
```

2. 构建：

```bash
pnpm install      # 第一次
pnpm build
node scripts/publish.mjs   # 把 dist/ 覆盖到仓库根目录
```

3. 提交推送，约 1 分钟自动发布。

## 加一个研究项目

同样的方式，字段换成：

```md
---
title: 项目名
subtitle: 副标题
period: 2026.10 — 至今
status: 进行中
summary: 一句话说明
methods: [MSPA, MCR]
repo: https://github.com/...
order: 3
---
```

正文里建议写三节：**在回答什么 / 数据 / 复现步骤**——这也是现在的两个项目页的写法。
数据一律写「不随仓库分发，需要请邮件索取」，并在 `about` 页说明索取方式。

## SEO

- 每页有独立的 `title` / `description` / `canonical` / OG / Twitter 卡片
- 结构化数据：首页 `Person`、笔记 `BlogPosting`、项目 `CreativeWork`、列表页 `CollectionPage`
- `sitemap-index.xml` 由 `@astrojs/sitemap` 生成；`robots.txt` 指向它
- `rss.xml` 提供订阅

### 让 Google 收录（一次性，约 10 分钟）

1. 打开 [Google Search Console](https://search.google.com/search-console)，添加「网址前缀」资源 `https://zhangyx0803.github.io/`。
2. 验证方式选「HTML 标记」，把 `<meta name="google-site-verification" ...>` 粘到 `src/layouts/Base.astro` 的 `<head>` 里，重新构建发布，然后回 Search Console 点验证。
3. 左侧「站点地图」提交 `sitemap-index.xml`。
4. 用「网址检查」把首页和两篇笔记手动请求收录一次（加快首次抓取）。

之后每次发文章，Search Console 会自己来抓；也可以在 Bing Webmaster Tools 用同一份 sitemap 再提交一次。

## 页面结构

- / 名片：身份块（姓名、单位、方向、邮箱、CV）→ 研究列表 → 成果 → 联系
- /projects/ 研究列表；/projects/<id>/ 项目页，底部是该项目的逐日进度
- /cv/ 简历：教育、方向、技能、项目、成果、待补

缺的东西用 〔待补〕 标注：学院全称、照片、毕业年份、课程与获奖。

## 逐日进度

`src/data/log.ts` 按项目分轨（`tracks` 数组），一个项目一条横向时间轴：

```ts
{
  id: 'cool-island',
  title: '上海市冷岛网络',
  status: '进行中',
  entries: [
    { date: '2026-10-20', title: '开题',
      done: ['研究问题定型', '数据清单', '方法链与参数'],
      status: '完成' },
    { date: '2026-11-11', title: '遥感反演',
      done: ['影像入库', 'LST/NDVI/NDWI 三期反演'],
      status: '进行中', next: '反演结果核验' },
  ],
  plan: [{ when: '2026.12', what: 'MSPA 核心区与源地' }],
}
```

- 每条日期必须有出处：文件修改时间或提交时间，**不得写入未来日期**（构建会校验并报错）；
- 每条轨按日期升序，从左往右排；
- 超过 4 条的轨显示「横向滚动 →」，触屏可直接拖；
- `plan` 渲染在轨下方，作为后续安排；
- 加一个新项目，只要在 `tracks` 里加一项。

## 加成果（软著 / 论文 / 竞赛）

src/content/achievements/ 放一个 .md，字段见 docs/achievements-template.md：

`md
---
kind: 软著
title: 软件全称
number: 2026SR0123456
issued: 2026-09-18
holder: 张永轩
summary: 一句话说明
order: 1
---
`

有内容时首页才会出现「成果」一节，没有就整节隐藏。
**不要放证书原图**（上面有身份证号），登记号 + 查询链接足够。

## 设计说明

- 黑白段落交替，系统字体，字号用 `clamp()` 自适应。
- 首屏手写「你好」用 `clip-path` 从左写到右。
- 地图是**一张**矢量图（`world.svg`，三个面板同一投影），滚动时只改 `transform` 做连续缩放。
- 滚动显现用 `IntersectionObserver`，`prefers-reduced-motion` 下全部关闭。
