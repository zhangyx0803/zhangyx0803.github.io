# zhangyx0803.github.io

个人主页源码 —— 手写 HTML / CSS / JS，没有框架、没有构建步骤、没有追踪脚本。

**在线地址**：https://zhangyx0803.github.io/

## 文件

```
index.html              整站（样式与脚本都内联在这一个文件里）
assets/geo-atlas-*.svg  三尺度定位图（由 scripts/build_atlas.py 生成）
assets/favicon.svg      图标
```

## 交互说明

- **经纬度读数**：鼠标移到三幅定位图上，右下角实时显示该像素对应的经纬度。
  实现方式是 Albers 等积圆锥投影的**逆变换**（不是查表），三幅图共用一套投影参数、只改视口。
- **实时天气**：页面加载时向 Open-Meteo 取徐汇当前气温与天气现象，无需 Key。
- **本地时间**：按 `Asia/Shanghai` 时区每秒更新。
- **深浅色**：跟随系统 `prefers-color-scheme`。

## 部署

GitHub Pages 自动构建：推送到 `main` 分支即可，无需 Actions。

仓库设置：**Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**。

## 改哪里

| 想改 | 位置 |
| --- | --- |
| 名字、标语、简介 | `index.html` 顶部 `<h1>` 与 `.lede` |
| 坐标、天气位置 | `.chip` 与脚本里的 `fetch(...latitude=31.165&longitude=121.405...)` |
| **研究线（时间线）** | `<section id="log">` 里的 `<ol class="tl">`，一条 `<li>` 就是一条记录 |
| **未来计划（事件链）** | 同段落里的 `<div class="chain">`，一个 `.step` 是一个节点 |
| 研究项目卡片 | `<section id="research">` 里的三个 `<article class="card">` |
| 联系方式 | `<section id="contact">` |
| 配色 | `:root` 里的 CSS 变量 |

时间线状态只有两种写法：普通 `<li>` = 已完成（实心点），`<li class="now">` = 进行中（呼吸点）。
未来节点用 `<div class="step">`，`<span class="num">` 是序号，`<b>` 是标题，`<span class="d">` 是说明。

