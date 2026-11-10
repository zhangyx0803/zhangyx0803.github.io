export interface LogEntry {
  date: string;      // YYYY-MM-DD
  title: string;
  done: string[];    // 当天完成的事
  status: '完成' | '进行中' | '暂停';
  next?: string;     // 下一步
}

export interface Track {
  id: string;
  title: string;
  status: '进行中' | '已完成' | '暂停';
  entries: LogEntry[];   // 按日期升序，横向从左到右
  plan: { when: string; what: string }[];
}

/** 逐日记录，按项目分轨。日期取自本地文件与提交时间。 */
export const tracks: Track[] = [
  {
    id: 'cool-island',
    title: '上海市冷岛网络',
    status: '进行中',
    entries: [
      {
        date: '2026-10-04',
        title: '操作手册',
        done: ['12 步流程与参数写成手册', '记录实测报错与修正方式'],
        status: '完成',
      },
      {
        date: '2026-10-20',
        title: '开题',
        done: ['研究问题定型', '数据清单（Landsat 三期 / CLCD / 边界）', '11 步方法链与参数'],
        status: '完成',
      },
      {
        date: '2026-11-11',
        title: '遥感反演',
        done: ['影像与土地覆被入库', '地表温度、NDVI、NDWI 三期反演'],
        status: '进行中',
        next: '反演结果核验：有效像元比例、LST 量级、指数越界',
      },
    ],
    plan: [
      { when: '2026.11', what: '影像入库与三期反演，产出可靠的冷源栅格' },
      { when: '2026.12', what: 'MSPA 核心区与源地，构建三套阻力面' },
      { when: '2027.01', what: 'MCR 廊道网络，识别高阻力段与电路夹点' },
      { when: '2027.02', what: '2×2 析因分解与熵权排序，出 8 幅图件' },
      { when: '2027.03', what: '论文定稿与投稿' },
    ],
  },
  {
    id: 'wuzhen',
    title: '乌镇双栅情感',
    status: '进行中',
    entries: [
      {
        date: '2026-09-30',
        title: '脚本骨架',
        done: ['点评采集、清洗、主题分类三个脚本跑通'],
        status: '完成',
      },
      {
        date: '2026-10-15',
        title: '经营数据与方法学',
        done: ['景区经营数据 2016–2024 汇总', '两栅对比的方法学检索报告'],
        status: '完成',
      },
    ],
    plan: [
      { when: '2026.11', what: '点评采集与清洗，人工标注表生成' },
      { when: '2026.12', what: '主题分类、情感分析与组间检验' },
      { when: '2027.01', what: '随机森林与 SHAP，出图' },
      { when: '2027.02', what: '论文初稿' },
    ],
  },
  {
    id: 'other',
    title: '其他',
    status: '已完成',
    entries: [
      {
        date: '2026-10-01',
        title: '世界气候类型分布图集',
        done: ['13 张气候类型图', '总览拼版', 'Word 图集（每类一页）'],
        status: '完成',
      },
      {
        date: '2026-10-06',
        title: '论文修改清单与方案',
        done: ['拆出内容层面的问题，列成可逐条勾掉的清单'],
        status: '完成',
      },
      {
        date: '2026-10-07',
        title: '参考文献优化方案',
        done: ['核对引文与年份，补缺口'],
        status: '完成',
      },
      {
        date: '2026-10-10',
        title: 'SuperMap 土地利用实验指导书',
        done: ['分类与转移矩阵的完整操作流程'],
        status: '完成',
      },
      {
        date: '2026-10-16',
        title: '龙王山氮素 GIS 预孵化建议书',
        done: ['研究区、数据与预研路线'],
        status: '完成',
      },
      {
        date: '2026-10-17',
        title: '多类群保护地网络：方法解析',
        done: ['拆解分析框架与指标口径（方法学习）'],
        status: '完成',
      },
      {
        date: '2026-10-18',
        title: '图件复现操作手册',
        done: ['3.1 图件的复现步骤与制图参数'],
        status: '完成',
      },
      {
        date: '2026-10-19',
        title: '遥感概论思维导图',
        done: ['作业定稿（含源文件与导出图）'],
        status: '完成',
      },
      {
        date: '2026-10-28',
        title: '游戏地图坐标解析',
        done: ['从地图文件里提取世界坐标，探测与校平脚本跑通'],
        status: '完成',
      },
      {
        date: '2026-10-29',
        title: '坐标总表与分级图',
        done: ['阿尔卑斯 / 阿拉斯加 / 日本三块地形坐标总表', '核对清单与分级图'],
        status: '完成',
      },
      {
        date: '2026-11-10',
        title: '开源与主页',
        done: ['三个研究仓库上线', '个人站上线并迁到 Astro'],
        status: '完成',
      },
    ],
    plan: [],
  },
];
