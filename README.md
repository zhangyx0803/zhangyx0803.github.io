# zhangyx0803.github.io

个人主页源码 —— 手写 HTML / CSS / JS，没有框架、没有构建步骤、没有追踪。

**在线地址**：https://zhangyx0803.github.io/

## 结构

整站是一个单页，按滚动顺序分成五段：

| 段落 | 作用 | 实现要点 |
| --- | --- | --- |
| Hero（黑） | 名字、一句话定位、实时天气 | 大字排版，导航在深色区自动转为深色半透明 |
| 地图（白） | 「先确认它在哪」——三个尺度 | 左侧画面 sticky 吸附，右侧三步随滚动切换；三张图交叉淡入 |
| 研究（黑） | 两条研究线 | 大标题 + 双栏说明 + 细分隔线 |
| 年表（白） | 时间线 | 年份列 + 内容列，最后一行标「现在」 |
| 联系（白） | 邮箱与坐标 | 大字邮箱链接 |

## 文件

```
index.html                整站（样式与脚本都内联）
assets/stage-cn.svg       中国尺度
assets/stage-yrd.svg      长江三角洲尺度
assets/stage-sh.svg       上海市域尺度（含徐汇点位）
assets/favicon.svg        图标
```

三张图不是截图，是按 **Albers 等积圆锥投影**（25°N / 47°N，中央经线 105°E）从行政区划 GeoJSON 生成的 SVG，
投影参数在生成脚本里，改城市只改一处。

## 交互

- **镜头推进**：滚过「地图」区时，右侧文字走到第几步，左侧画面就换成对应尺度，交叉淡入 + 轻微缩放。
- **导航跟随**：导航条根据下方背景自动切换浅色/深色。
- **实时天气**：向 Open-Meteo 取徐汇当前气温与天气现象，无需 Key。
- **滚动显现**：标题与条目进入视口时上浮淡入，`prefers-reduced-motion` 下全部关掉。

## 部署

推送 `main` 分支即自动构建，无需 Actions。

仓库设置：**Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**。

## 改哪里

| 想改 | 位置 |
| --- | --- |
| 名字 / 一句话定位 | `<section class="hero">` 里的 `<h1>` 与 `.lede` |
| 坐标与天气位置 | `.hero .meta` 与脚本里的 `fetch(...latitude=31.165...)` |
| 三个尺度的文案 | `#steps` 里的三个 `.step` |
| 研究两条线 | `<section class="research">` 里的两个 `<article class="feature">` |
| 时间线 | `<section class="log">` 里的 `.log .row`，一行一条 |
| 联系方式 | `<section class="contact">` |
| 配色与字号 | `:root` 变量与各段标题的 `clamp()` |
