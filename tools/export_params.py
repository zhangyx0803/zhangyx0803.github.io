# -*- coding: utf-8 -*-
"""Export the panel projection parameters so the website can do real coordinate math."""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ATLAS_TOOLS = r"D:\上海师大\Github\tools"
sys.path.insert(0, ATLAS_TOOLS)

import build_atlas as ba  # noqa: E402

rows = {}
for key, x, w, _en, _cn, bbox, _step, _lstep, eps in ba.PANELS:
    p = ba.Panel(x, ba.PANEL_Y, w, ba.PANEL_H, bbox, eps)
    rows[key] = {
        "x": p.x, "y": p.y, "w": p.w, "h": p.h,
        "ox": round(p.ox, 4), "oy": round(p.oy, 4), "scale": round(p.scale, 6),
        "mnx": p.mnx, "mxy": p.mxy,
        "lon0": bbox[0], "lat0": bbox[1], "lon1": bbox[2], "lat1": bbox[3],
    }

payload = {
    "viewBox": [ba.W, ba.H],
    "albers": {"phi1": ba.PHI1, "phi2": ba.PHI2, "phi0": ba.PHI0, "lam0": ba.LAM0},
    "panels": rows,
}
print(json.dumps(payload, ensure_ascii=False, indent=2))
