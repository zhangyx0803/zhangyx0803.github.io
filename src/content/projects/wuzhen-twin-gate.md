---
title: 乌镇东栅 / 西栅 游客情感对比
titleEn: "Dongzha vs. Xizha - Sentiment on Both Sides of Wuzhen"
subtitle: 大学生创新创业训练计划
subtitleEn: Undergraduate Innovation and Entrepreneurship Program
period: 2026.09 — 2026.11
periodEn: 2026.09 — 2026.11
status: 已结题
statusEn: Completed
summary: 从公开点评出发，经主题分类与情感分析，看同一座古镇两道门的游客体验差异到底集中在哪些维度。
summaryEn: Classifying and scoring public reviews to see where the visitor experience of Wuzhen's two gates actually differs.
methods: [中文 NLP, 主题分类, 情感分析, 随机森林, SHAP, Mann-Whitney U, FDR]
methodsEn: [Chinese NLP, topic classification, sentiment analysis, random forest, SHAP, Mann-Whitney U, FDR]
repo: https://github.com/zhangyx0803/wuzhen-twin-gate-sentiment
order: 2
---

## 项目性质

大学生创新创业训练计划项目，已结题。代码与复现步骤公开，数据按需提供。

## 在回答什么

东栅偏原住民生活与观光，西栅偏度假与夜游；门票、业态、空间组织都不同。想用数据回答三件事：

1. 两栅游客的情感倾向是否有显著差异；
2. 差异集中在哪些体验维度（餐饮、住宿、拥挤、夜景、服务、价格……）；
3. 差异是否随季节与年份变化。

## 数据

| 数据 | 内容 | 用途 |
| --- | --- | --- |
| 景区游客点评 | 文本、评分、时间、地点归属 | 情感与主题分析的主数据 |
| 高德 POI | 周边业态与设施点 | 业态结构对照 |
| 人工标注样本 | 分层抽样后人工标主题 | 训练与校验分类器 |
| 景区经营数据 | 2016—2024 年度经营口径 | 背景对照 |

> **原始点评与 POI 不随仓库分发**，受平台条款约束；仓库里只有采集与分析代码。
> 如需样例数据或标注表，请发邮件至 <zhangyx0803@petalmail.com> 说明用途。

## 复现步骤

代码在 `code/` 下，按序号依次运行；所有路径、词典与 Key 集中在 `code/config.py`。

1. 环境自检：`python code/00_check_env.py`（Python 3.9+）。
2. 采集点评：浏览器里复制 cURL 存成本地文件，运行 `python code/01_collect_ctrip.py`，脚本按此翻页，支持断点续采。
3. 采集 POI：`python code/02_collect_amap_poi.py`。
4. 清洗：`python code/03_clean.py`，去重、去广告、剔除重复景区简介。
5. 地点归属与分句：`python code/04_segment.py`，输出东栅／西栅／双栅标记。
6. 规则分类：`python code/05_rule_classify.py`，21 类主题词作为可解释基线。
7. 生成标注表：`python code/06_make_label_sheet.py`，分层抽样。
8. 训练分类器：`python code/07_train_classifier.py`，训练后全量预测。
9. 情感分析：`python code/08_sentiment.py`，无 Key 时自动走本地词典后端。
10. 构建特征：`python code/09_build_features.py`，输出随机森林特征矩阵。
11. 组间检验：`python code/10_compare_stats.py`，卡方 / Mann-Whitney U / FDR 校正。
12. 建模与解释：`python code/11_rf_shap.py`，置换重要性、SHAP 与偏依赖。
13. 出图：`python code/12_timeseries_plots.py`，时间序列与 300 dpi 图件。

## 方法上的取舍

- 规则分类与模型分类并行：前者可解释、可复查，后者接住长尾表达。
- 组间检验一律做多重比较校正，避免「21 个主题里挑三个显著」。
- 重要性同时给置换重要性与 SHAP，避免单指标误判。

## 相关成果

本项目产出一个软件著作权：**DEA 分析工作台系统**（登记号 2026SR1091537）。
