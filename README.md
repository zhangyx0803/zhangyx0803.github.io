# zhangyx0803.github.io

个人主页源码 —— 手写 HTML / CSS / JS，无框架、无构建、无追踪。

**在线地址**：https://zhangyx0803.github.io/

## 结构

单页五段，滚动顺序：

| 段落 | 内容 | 实现要点 |
| --- | --- | --- |
| 首屏（黑） | 手写问候 → 姓名 → 一句话 → 坐标与实时天气 | 手写字用 clip-path 从左向右"写"出来；导航在深色区自动转深色 |
| 地图（白） | 三个尺度 | **一张矢量图**，滚动时用 `transform` 连续缩放，像镜头推进 |
| 研究（黑） | 两个项目 | 大标题 + 双栏说明 + 细分隔线 |
| 时间线（白） | 每条记录带完成项清单 | 天粒度日期 + ✓ / ○ 标记 |
| 联系（白） | 邮箱与坐标 | 大字链接 |

## 地图为什么"像放大"

不是三张图切换，是**同一张图** `assets/world.svg`（980×456，三个面板拼在一起，同一套 Albers 投影）。
滚动到第 i 步时，脚本按该面板的矩形算出一个目标缩放与位移：

```
scale = max(stageW / panelW, stageH / panelH)
tx = stageW/2 - (panelX + panelW/2) * scale
```

一次 `transform` 过渡（1.5s，`cubic-bezier(.22,1,.36,1)`）就完成了"推近"，中间没有淡入淡出，
所以看起来是镜头在动，而不是换图。窗口变化时用同一公式重算，手机上也是同一套逻辑。

## 双语

每个可翻译元素带 `data-zh` / `data-en`，右上角按钮切换，选择记在 `localStorage`；
首次访问按浏览器语言决定。切换时手写问候会重新"写"一遍。

## 响应式

- 桌面：左侧画面 sticky 吸附，右侧文字随滚动经过。
- ≤900px：单列，画面粘在顶部（46vh），文字从下方滚过。
- 断点外还有 720 / 860 两级，控制导航项与双栏折叠。

## 文件

```
index.html          整站（样式与脚本内联）
assets/world.svg    三尺度矢量底图（138 KB）
assets/favicon.svg  图标
```

## 部署

推 `main` 即自动构建。仓库设置：**Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**。

## 改哪里

| 想改 | 位置 |
| --- | --- |
| 手写问候 | `#hand` 的 `data-zh` / `data-en` |
| 姓名与一句话 | `.hero h1` 与 `.lede` |
| 坐标、天气 | `.hero .meta` 与末尾 `fetch(...latitude=31.165...)` |
| 三个尺度的文案 | `#steps` 里的三个 `.step` |
| 面板位置（缩放目标） | 脚本里的 `PANELS` 数组，与 `world.svg` 的 viewBox 坐标一致 |
| 两个项目 | `.research` 里两个 `<article class="feature">` |
| 时间线 | `.log` 里的 `.entry`，条目用 `<li class="done">` / `class="todo"` |
| 配色与字号 | `:root` 变量与各段 `clamp()` |
