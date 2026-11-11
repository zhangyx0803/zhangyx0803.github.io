---
title: 上海市冷岛网络演变
titleEn: Evolution of Shanghai's Cool-Island Network
subtitle: 2015 — 2025 · 跨期归因
subtitleEn: 2015 — 2025 · Attribution across periods
period: 2026.10 — 至今
periodEn: 2026.10 — present
status: 进行中
statusEn: In progress
summary: 三期遥感影像识别冷源与源地，构建冷岛廊道网络；再用 2×2 析因分解判断变化来自源地格局还是阻力面。
summaryEn: Three periods of satellite imagery locate cold sources and patches; the resulting corridor network is then decomposed to tell whether change came from source pattern or resistance surface.
methods: [MSPA, MCR, 电路理论, 2×2 析因分解, 熵权法, ArcGIS Pro]
methodsEn: [MSPA, MCR, circuit theory, 2×2 decomposition, entropy weighting, ArcGIS Pro]
repo: https://github.com/zhangyx0803/shanghai-cool-island-network
order: 1
---

## 在回答什么

城市冷源（林地、草地、水体）靠景观连通性把降温服务送到周边建成区。上海十年间建设用地持续扩张，
冷源与热环境同步变化，但「网络怎么变、变化由什么驱动」还缺定量回答。

两个问题：

1. 十年间冷岛网络的空间格局如何变化——源地、廊道数量与总长、连通性、重心。
2. 变化主要由**源地格局**变动引起，还是由**阻力面**变动引起。

## 数据

| 数据 | 来源 | 分辨率 | 时相 |
| --- | --- | --- | --- |
| Landsat 8/9 Collection 2 Level-2（SR + ST） | USGS EarthExplorer，WRS-2 118/038、118/039 | 30 m（热红外原始 100 m） | 2015 / 2020 / 2025 年夏季，云量低、同日过境 |
| 中国 30 m 年度土地覆被（CLCD v1.0.5） | 武汉大学，Zenodo `18180184` | 30 m，年度产品 | 2015 / 2020 / 2025 |
| 县级行政边界 | 公开行政区划数据 | 矢量面 | 2024 |

研究区为上海市全域（含崇明、长兴、横沙三岛），按市界裁剪约 8205 km²，
统一投影 CGCS2000 三度带高斯-克吕格（中央经线 120°E，EPSG:4549）。

> **数据不随仓库分发。** 原始影像受 USGS 条款约束，处理中间件体积也很大。
> 如需复现，请将用途说明发至 <zhangyx0803@petalmail.com>。

## 复现步骤

每一步都写明用哪个程序、产出什么。工具链是 ArcGIS Pro（arcpy）、Python（rasterio / numpy）、
GuidosToolbox 与 Circuitscape；仓库里带的是参数与脚本骨架。

1. **建公共网格** — ArcGIS Pro，`arcpy.management.CreateFishnet` 生成覆盖全市的 30 m 全 0 栅格，之后所有输出都对它对齐。
2. **裁剪与投影** — ArcGIS Pro，`arcpy.management.Project` 到 EPSG:4549；16 个区用 `Dissolve` 融合为市域。
3. **反演地表温度** — Python 脚本（`rasterio` + `numpy`）：读 MTL 定标系数，QA 波段做云掩膜，输出 LST、NDVI、NDWI。
4. **识别冷源** — ArcGIS Pro，`Con` / `Raster Calculator`：`LST ≤ P30` 且（`NDVI ≥ 0.4` 或 `NDWI > 0`）。
5. **提取源地** — GuidosToolbox 2.8，MSPA（边缘 1 像元、八邻域），再按核心区 ≥ 0.1 km²、源地 ≥ 1 km² 过滤。
6. **构建阻力面** — ArcGIS Pro，`Weighted Sum`：土地利用 0.40、不透水面 0.25、NDVI 0.20、距水体 0.15。
7. **提取廊道** — ArcGIS Pro，`Cost Connectivity`：整数化路由面作成本栅格，源地作输入，输出最小生成树路径。
8. **找瓶颈** — Circuitscape 5：成对模式算电流密度取夹点；高阻力段由廊道邻域阻力均值识别。
9. **做归因** — Python 脚本：两期源地 × 两期阻力面四种组合，拆成源地效应、阻力效应与交互项。
10. **排优先级** — Python 脚本：改善潜力 × 热环境紧迫性，熵权法定权，跨期用同一套权重比较。

## 目前进度

- 已完成：问题定义、数据清单、方法链与参数、12 步操作手册。
- 进行中：影像入库与地表温度反演。
- 未开始：源地、阻力面、廊道、瓶颈、归因。
