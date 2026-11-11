---
title: Ecological Cool-Island Network
titleEn: Ecological Cool-Island Network
period: 2026.11 — present
periodEn: 2026.11 — present
status: In progress
statusEn: In progress
summary: Wetlands, bird records, night-time lights and roads are merged onto one 30 m grid to build a combined cool-island and ecological network, identifying nodes that both cool and serve as stepping stones, plus corridors that collide with built-up land.
summaryEn: Wetlands, bird records, night-time lights and roads are merged onto one 30 m grid to build a combined cool-island and ecological network, identifying nodes that both cool and serve as stepping stones, plus corridors that collide with built-up land.
methods: [MaxEnt, circuit theory, minimum spanning tree, wetland stepping stones, night-time lights, Pareto]
methodsEn: [MaxEnt, circuit theory, minimum spanning tree, wetland stepping stones, night-time lights, Pareto]
repo: https://github.com/zhangyx0803/ecological-cool-island-network
order: 2
---

## Question

The cool-island work answers where cold sources are and how corridors run, but a cooling corridor is not
necessarily a corridor animals can use. Building on that work, this project merges wetlands, bird records,
night-time lights and roads onto one grid and asks:

1. which cold sources also serve as stepping stones for birds;
2. how the corridor network changes under a combined resistance surface;
3. where corridors collide with built-up land and roads, and which segment to restore first.

## Data

| Dataset | Use |
| --- | --- |
| Landsat 8/9, three periods (LST / NDVI / NDWI) | cold sources and thermal context |
| CLCD 30 m land cover | resistance and built-up extent |
| Multi-period wetland maps | patch delineation, persistence, stepping stones |
| eBird records | bird distribution, effort-corrected |
| Night-time lights (VNL, aggregated from 500 m) | human activity |
| Roads and protected-area boundaries | resistance and conflict |

All layers are aligned to `RefGrid_30m.tif` at EPSG:4549, 30 m. 500 m data are aggregated before resampling;
no bilinear stretching.

> **Raw data are not distributed.** For reproduction, write to <zhangyx0803@petalmail.com>.

## Method

- **Wetlands** — patch delineation, cross-period persistence, stepping-stone screening.
- **Bird distribution** — eBird effort correction, then MaxEnt for a suitability surface.
- **Resistance** — cooling resistance combined with ecological resistance, in two variants: cooling-first and connectivity-first.
- **Network** — minimum spanning tree corridors, node composition, bottleneck segments.
- **Conflict** — corridor overlay on built-up land and roads.
- **Multi-objective** — Pareto front of cooling gain against connectivity gain.

## Scripts

44 ArcPy / Python scripts under `scripts/`, grouped by prefix:

| Prefix | Content |
| --- | --- |
| `stage_` | base grid, factor layers, staged products |
| `wetland_` | wetland patches, persistence, stepping stones |
| `ebird_` | record cleaning, effort correction, hotspots and seasonality |
| `maxent_` | distribution model preparation, training, variable contribution |
| `suit_` / `integrate_` | suitability composition |
| `mst_` / `corridor_` | minimum spanning tree, corridor evaluation, bottlenecks |
| `conflict_` / `district_` | conflict points, conflict suitability, zoning |
| `pareto_` | multi-objective front |
| `vnl_` | night-time light aggregation and staging |

Paths at the top of each script were rewritten to `data/` and `outputs/` placeholders before publication.

## Status

Completed: workspace and data conventions, common grid and factor layers (`stage_ab`, `stage_cd`).
Ongoing: wetland patches, bird distribution, network construction.
