# 成果条目模板（软著 / 论文 / 竞赛）

把文件放进 `src/content/achievements/`，文件名随意（英文短横线最好），然后 `pnpm build`。

## 软著

```md
---
kind: 软著
title: 软件全称（与证书一致）
number: 2026SR0123456          # 登记号
issued: 2026-09-18             # 登记日期
holder: 张永轩                  # 著作权人（证书上的名字）
version: V1.0                  # 版本号，可省
related: wuzhen-twin-gate      # 可选：关联的项目 id（对应 src/content/projects 下的文件名）
link: https://...              # 可选：证书或软著查询页
summary: 一句话说明这个软件解决什么问题。
order: 1
---

（正文可省。如果要写，就写软件做了什么、技术栈、与哪个研究对应。）
```

## 论文

```md
---
kind: 论文
title: 标题
issued: 2026-12-01
summary: 期刊/会议 + 一句话结论。
link: https://doi.org/...
order: 2
---
```

## 竞赛

```md
---
kind: 竞赛
title: 竞赛名称 · 奖项
issued: 2026-08-20
holder: 团队 / 个人
summary: 作品与名次。
order: 3
---
```

## 摆在哪里

- 首页会出现「成果」一节（有内容才显示，没有就整节隐藏）；
- `related` 指向项目时，会渲染成「关联项目 →」链接；
- 首页之外，`/projects/<id>/` 的项目页不会自动带入软著，需要的话我可以在项目页加一行。

## 注意

- 软著证书上有身份证号等个人信息，**不要直接放证书原图**；放登记号 + 查询链接就够。
- 登记号与登记日期务必与证书一致，SEO 抓取的是这些字段。
