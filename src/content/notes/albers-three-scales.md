---
title: 用一张 Albers 投影做三尺度定位图
date: 2026-11-09
summary: 同一套投影、三个视口，比三张各自投影的图更诚实——比例尺之间可以直接比较。
tags: [制图, Albers, SVG]
---

论文里的「研究区位置图」常见做法是拼三张图：全国一张、城市群一张、市域一张。
问题在于三张图往往各用各的投影和缩放，读者没法在图上比较距离。

更省事的做法是：**只算一次投影，三幅图只改视口**。

## 投影

Albers 等积圆锥，标准纬线 25°N / 47°N，中央经线 105°E——中国常用的一套。

```python
def albers(lon, lat):
    p1, p2, p0, l0 = map(math.radians, (25, 47, 35, 105))
    lam, phi = math.radians(lon), math.radians(lat)
    n = (math.sin(p1) + math.sin(p2)) / 2
    C = math.cos(p1) ** 2 + 2 * n * math.sin(p1)
    rho0 = math.sqrt(C - 2 * n * math.sin(p0)) / n
    rho = math.sqrt(max(C - 2 * n * math.sin(phi), 0)) / n
    theta = n * (lam - l0)
    return rho * math.sin(theta), rho0 - rho * math.cos(theta)
```

单位球上的坐标，没有量纲问题：比例尺由视口决定，而不是由投影决定。

## 三个视口

```python
PANELS = [
    ("cn",  (73.0, 17.5, 135.5, 53.8)),
    ("yrd", (117.6, 29.4, 122.4, 33.0)),
    ("sh",  (120.83, 30.67, 122.02, 31.88)),
]
```

每个视口做一次「投影 → 求包围盒 → 按画框等比缩放 → 居中」，三幅图的像素比例互不相同，
但**地理比例是连续的**：从 A 到 B 放大约 10 倍，从 B 到 C 再放大约 4.5 倍。

## 比例尺分母怎么算

不要凭感觉写「1:100,000」。取视口中线纬度，量一度经度在屏幕上的像素数：

```python
def rf(panel):                      # 1 像素 ≈ 0.2646 mm
    a = panel.px(120, lat_mid); b = panel.px(121, lat_mid)
    ground = 111320 * math.cos(math.radians(lat_mid))
    mpp = ground / math.hypot(b[0] - a[0], b[1] - a[1])
    return mpp / 0.0002646
```

这样得到的三幅图大约是 1:38,600,000 / 1:8,500,000 / 1:1,900,000，可以直接印在图注里。

## 同一张图做连续缩放

如果这张图要放在网页上，把三幅画面放进同一个 SVG（`viewBox` 覆盖全部），
滚动时只改一个 `transform`：

```
scale = max(画布宽 / 面板宽, 画布高 / 面板高)
tx    = 画布宽/2 − 面板中心x × scale
```

一次 1.5 秒的过渡就完成了「推近」。因为是矢量，放大三倍仍然清晰；
换成三张位图就会在切换的瞬间露出来。

> 一句话：**比例尺是图的属性，不是图片的属性。** 投影只算一次，镜头可以随便动。
