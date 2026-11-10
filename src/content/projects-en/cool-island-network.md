---
title: Evolution of Shanghai's Cool-Island Network
titleEn: Evolution of Shanghai's Cool-Island Network
period: 2026.10 — present
status: In progress
statusEn: In progress
summary: Three periods of satellite imagery locate cold sources; the resulting corridor network is then decomposed to tell whether change came from the source pattern or from the resistance surface.
methods: [MSPA, MCR, circuit theory, 2×2 decomposition, entropy weighting, ArcGIS Pro]
repo: https://github.com/zhangyx0803/shanghai-cool-island-network
order: 1
---

## Question

Urban cold sources — woodland, grassland, water — deliver cooling through landscape connectivity.
Shanghai's built-up area kept expanding over the decade, so sources and thermal environment changed together.
Neither has been quantified in terms of how the network changed, or why.

## Data

| Dataset | Source | Resolution | Time |
| --- | --- | --- | --- |
| Landsat 8/9 Collection 2 Level-2 (SR + ST) | USGS EarthExplorer, WRS-2 118/038 and 118/039 | 30 m (thermal native 100 m) | Summer 2015 / 2020 / 2025, low cloud, same-day overpass |
| CLCD annual land cover v1.0.5 | Wuhan University, Zenodo `18180184` | 30 m annual | 2015 / 2020 / 2025 |
| County boundaries | public administrative data | vector | 2024 |

The study area is the whole municipality (including Chongming, Changxing and Hengsha),
about 8,205 km², projected to CGCS2000 / 3-degree Gauss-Krüger, central meridian 120°E (EPSG:4549).

> **Data are not distributed with the repository.** The imagery is bound by USGS terms and the
> intermediates are large. For reproduction, write to <zhangyx0803@petalmail.com> with your purpose.

## Steps

1. Build a common 30 m all-zero grid; align every output to it.
2. Clip to the city boundary, project to EPSG:4549.
3. Retrieve land surface temperature: MTL calibration, QA cloud mask, LST, NDVI, NDWI; guard against division by zero and clamp out-of-range indices.
4. Identify cold sources: `LST ≤ P30` and (`NDVI ≥ 0.4` or `NDWI > 0`).
5. Extract patches with GuidosToolbox MSPA (edge width 1, eight-neighbour), then filter: cores ≥ 0.1 km², sources ≥ 1 km².
6. Build the resistance surface: land use 0.40, impervious 0.25, NDVI 0.20, distance to water 0.15; derive a routing surface and a land-only surface from it.
7. Extract corridors: integer cost raster plus source patches, minimum spanning tree paths.
8. Locate bottlenecks: high-resistance corridor segments, Circuitscape pinch points in pairwise mode, barrier segments on the land surface.
9. Attribution: two source periods × two resistance surfaces, split into source effect, resistance effect and interaction.
10. Rank priorities: improvement potential × thermal urgency, entropy weights, identical weights across periods.

## Status

Completed: problem definition, data inventory, method chain and parameters, a 12-step handbook.
Ongoing: imagery ingestion and LST retrieval.
Not started: patches, resistance surfaces, corridors, bottlenecks, attribution.
