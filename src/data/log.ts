interface LogEntry {
  date: string;
  title: string;
  titleEn: string;
  done: string[];
  doneEn: string[];
  status: '完成' | '进行中';
  statusEn: 'done' | 'ongoing';
  next?: string;
  nextEn?: string;
}

interface Track {
  id: string;
  title: string;
  titleEn: string;
  status: string;
  statusEn: string;
  entries: LogEntry[];
  plan: { when: string; whenEn: string; what: string; whatEn: string }[];
}

/**
 * 逐日记录。每条日期都必须有出处：本地文件的修改时间，或仓库提交时间。
 * 禁止写入未来日期；构建时会在 index.astro 里校验。
 */
export const tracks: Track[] = [
  {
    id: 'cool-island-network',
    title: '上海市冷岛网络',
    titleEn: 'Shanghai cool-island network',
    status: '已结束',
    statusEn: 'completed',
    entries: [
      {
        date: '2026-10-04',
        title: '操作手册',
        titleEn: 'Field handbook',
        done: ['12 步流程与参数写成手册', '记录实测报错与修正方式'],
        doneEn: ['12-step workflow and parameters written down', 'Errors and fixes logged'],
        status: '完成',
        statusEn: 'done',
      },
      {
        date: '2026-10-20',
        title: '研究框架',
        titleEn: 'Research framework',
        done: ['研究问题定型', '数据清单（Landsat 三期 / CLCD / 边界）', '11 步方法链与参数'],
        doneEn: ['Research questions fixed', 'Data inventory: three Landsat scenes, CLCD, boundaries', '11-step method chain'],
        status: '完成',
        statusEn: 'done',
      },
    ],
    plan: [
      { when: '影像', whenEn: 'Imagery', what: '三期影像与土地覆被入库、地表温度与指数反演', whatEn: 'Imagery and land cover ingested; LST and indices retrieved' },
      { when: '源地', whenEn: 'Sources', what: 'MSPA 核心区与源地识别，构建三套阻力面', whatEn: 'MSPA cores and sources, three resistance surfaces' },
      { when: '网络', whenEn: 'Network', what: 'MCR 廊道、高阻力段与电路夹点', whatEn: 'MCR corridors, high-resistance segments, pinch points' },
      { when: '归因', whenEn: 'Attribution', what: '2×2 析因分解与熵权排序，出图件', whatEn: '2×2 decomposition, ranking, figures' },
    ],
  },
  {
    id: 'wuzhen-twin-gate',
    title: '乌镇双栅情感',
    titleEn: 'Wuzhen twin gates',
    status: '已结题',
    statusEn: 'completed',
    entries: [
      {
        date: '2026-09-30',
        title: '脚本骨架',
        titleEn: 'Script skeleton',
        done: ['点评采集、清洗、主题分类三个脚本跑通'],
        doneEn: ['Collection, cleaning and topic classification scripts running'],
        status: '完成',
        statusEn: 'done',
      },
      {
        date: '2026-10-15',
        title: '经营数据与方法学',
        titleEn: 'Operating data and methods',
        done: ['景区经营数据 2016–2024 汇总', '两栅对比的方法学检索报告'],
        doneEn: ['Annual operating figures 2016–2024 compiled', 'Method review for comparing the two gates'],
        status: '完成',
        statusEn: 'done',
      },
    ],
    plan: [],
  },
  {
    id: 'ecological-cool-island',
    title: '生态冷岛网络',
    titleEn: 'Ecological cool-island network',
    status: '进行中',
    statusEn: 'in progress',
    entries: [
      {
        date: '2026-11-03',
        title: '工作空间与数据约定',
        titleEn: 'Workspace and data conventions',
        done: [
          '工程、中间产物、成果分目录存放',
          '统一 30 m / EPSG:4549 基准网格，500 m 数据先聚合再重采样',
        ],
        doneEn: [
          'Project, intermediates and outputs kept in separate folders',
          'Common 30 m / EPSG:4549 reference grid; 500 m data aggregated before resampling',
        ],
        status: '完成',
        statusEn: 'done',
      },
    ],
    plan: [
      { when: '湿地', whenEn: 'Wetlands', what: '斑块识别、跨期持久性、踏脚石筛选', whatEn: 'Patch delineation, persistence, stepping-stone screening' },
      { when: '鸟类', whenEn: 'Birds', what: 'eBird 努力量校正与 MaxEnt 分布建模', whatEn: 'eBird effort correction and MaxEnt distribution models' },
      { when: '网络', whenEn: 'Network', what: '复合阻力面、MST 廊道与瓶颈', whatEn: 'Combined resistance surface, MST corridors and bottlenecks' },
      { when: '冲突', whenEn: 'Conflict', what: '廊道与建设用地、道路的冲突区与 Pareto 前沿', whatEn: 'Corridor conflicts with built-up land and roads, Pareto front' },
    ],
  },
];

