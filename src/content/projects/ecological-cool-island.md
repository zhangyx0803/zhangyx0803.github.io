---
title: 生态冷岛网络
titleEn: Ecological Cool-Island Network
subtitle: 在冷岛网络基础上延伸 · 湿地与鸟类
subtitleEn: Extending the cool-island work to wetlands and birds
period: 2026.11 — 至今
periodEn: 2026.11 — present
status: 进行中
statusEn: In progress
summary: 把湿地、鸟类分布、夜间灯光与道路并入同一套 30 m 网格，构建冷岛—生态复合网络，找同时承担降温与踏脚石功能的节点，以及廊道与建设用地的冲突区。
summaryEn: Wetlands, bird records, night-time lights and roads are merged onto one 30 m grid to build a combined cool-island and ecological network, identifying nodes that both cool and serve as stepping stones, plus corridors that collide with built-up land.
methods: [MaxEnt, 电路理论, 最小生成树, 湿地踏脚石, 夜间灯光, Pareto 多目标]
methodsEn: [MaxEnt, circuit theory, minimum spanning tree, wetland stepping stones, night-time lights, Pareto]
repo: https://github.com/zhangyx0803/ecological-cool-island-network
order: 2
---

## 在做什么

冷岛网络回答的是「冷源在哪、廊道怎么走」，但一条降温廊道未必是生物能走的通道。
本项目在冷岛网络的基础上，把湿地、鸟类分布、夜间灯光与道路并入同一套网格，问三个问题：

1. 哪些冷源同时承担鸟类踏脚石功能；
2. 复合阻力面下，廊道网络如何变化；
3. 廊道与建设用地、道路的冲突区在哪，优先修复哪一段。

## 数据

| 数据 | 用途 |
| --- | --- |
| Landsat 8/9 三期（LST / NDVI / NDWI） | 冷源与热环境，同冷岛网络 |
| CLCD 30 m 土地覆被 | 阻力面与建成区 |
| 多期湿地分布 | 斑块识别、持久性与踏脚石 |
| eBird 观鸟记录 | 鸟类分布，含努力量校正 |
| 夜间灯光（VNL，500 m 聚合） | 人类活动强度 |
| 道路与保护区边界 | 阻力与冲突判定 |

统一到 EPSG:4549、30 m 的 `RefGrid_30m.tif`；500 m 数据先聚合再重采样，不做双线性拉伸。

> **原始数据不随仓库分发。** 需要复现请将用途说明发至 <zhangyx0803@petalmail.com>。

## 方法

- **湿地**：斑块识别、跨期持久性、踏脚石筛选；
- **鸟类分布**：eBird 努力量校正后用 MaxEnt 建模，输出适宜性面；
- **阻力面**：冷岛阻力与生态阻力合成，分「降温优先」「连通优先」两套；
- **网络**：最小生成树廊道、节点组成、瓶颈段；
- **冲突**：廊道与建设用地、道路的叠加区；
- **多目标**：降温收益与连通性收益的 Pareto 前沿。

## 脚本

`scripts/` 下 44 个 ArcPy / Python 脚本，按前缀分组：

| 前缀 | 内容 |
| --- | --- |
| `stage_` | 基础网格、因子图层、阶段产物 |
| `wetland_` | 湿地斑块、持久性、踏脚石 |
| `ebird_` | 观鸟记录清洗、努力量校正、热点与季节格局 |
| `maxent_` | 分布模型预处理、训练、贡献度 |
| `suit_` / `integrate_` | 适宜性合成与集成 |
| `mst_` / `corridor_` | 最小生成树网络、廊道评价、瓶颈 |
| `conflict_` / `district_` | 冲突点、冲突适宜性、分区 |
| `pareto_` | 多目标前沿 |
| `vnl_` | 夜间灯光聚合与分期 |

脚本头部改了相对路径占位（`data/`、`outputs/`），运行时指回自己的数据根目录即可。

## 进度

- 已完成：工程与数据约定、统一网格与因子图层（`stage_ab`、`stage_cd`）。
- 进行中：湿地斑块与鸟类分布、网络构建。
