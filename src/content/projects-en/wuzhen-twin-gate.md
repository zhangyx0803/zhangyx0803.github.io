---
title: "Dongzha vs. Xizha - Sentiment on Both Sides of Wuzhen"
titleEn: "Dongzha vs. Xizha - Sentiment on Both Sides of Wuzhen"
period: 2026.09 — 2026.11
status: Completed
statusEn: Completed
summary: Classifying and scoring public reviews to see where the visitor experience of Wuzhen's two gates actually differs.
methods: [Chinese NLP, topic classification, sentiment analysis, random forest, SHAP, Mann-Whitney U, FDR]
repo: https://github.com/zhangyx0803/wuzhen-twin-gate-sentiment
order: 2
---

## About the project

An undergraduate innovation and entrepreneurship programme, now concluded. There is no plan to publish;
code and reproduction steps are public, data are available on request.

## Question

Dongzha is closer to everyday life and sightseeing, Xizha to resort and night tourism; tickets, businesses
and spatial layout differ. Three questions:

1. Is the sentiment of visitors significantly different between the two gates?
2. If so, along which dimensions — food, lodging, crowding, night scenes, service, price?
3. Does the gap vary by season and year?

## Data

| Dataset | Content | Use |
| --- | --- | --- |
| Visitor reviews | text, rating, date, gate | primary data |
| Amap POI | nearby businesses and facilities | business structure |
| Human-labelled sample | stratified sample, manually tagged topics | training and validation |
| Operating data | annual figures 2016–2024 | context |

> **Reviews and POI are not distributed with the repository.** Sample sheets are available by email.

## Steps

Thirteen runnable scripts, in order: environment check, review collection (cURL-based, resumable),
POI collection, cleaning, gate attribution and sentence splitting, rule-based 21-topic labelling,
label sheet generation, classifier training, sentiment analysis with a local fallback backend,
feature building, group tests (chi-square / Mann-Whitney U / FDR), random forest with permutation
importance and SHAP, then time-series plots at 300 dpi.

## Related output

One registered software copyright: **DEA Analysis Workbench** (registration 2026SR1091537).
