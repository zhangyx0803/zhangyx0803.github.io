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
  plan: { when: string; what: string; whatEn: string }[];
}

/** 逐日记录：按项目分轨，日期取自本地文件与提交记录。 */
export const tracks: Track[] = [
  {
    id: 'cool-island',
    title: '上海市冷岛网络',
    titleEn: 'Shanghai cool-island network',
    status: '进行中',
    statusEn: 'in progress',
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
        title: '开题',
        titleEn: 'Proposal',
        done: ['研究问题定型', '数据清单（Landsat 三期 / CLCD / 边界）', '11 步方法链与参数'],
        doneEn: ['Research questions fixed', 'Data inventory: three Landsat scenes, CLCD, boundaries', '11-step method chain'],
        status: '完成',
        statusEn: 'done',
      },
      {
        date: '2026-11-11',
        title: '遥感反演',
        titleEn: 'Retrieval',
        done: ['影像与土地覆被入库', '地表温度、NDVI、NDWI 三期反演'],
        doneEn: ['Imagery and land cover ingested', 'LST, NDVI, NDWI retrieved for three periods'],
        status: '进行中',
        statusEn: 'ongoing',
        next: '反演结果核验：有效像元比例、LST 量级、指数越界',
        nextEn: 'Verification: valid-pixel share, LST range, index overflow',
      },
    ],
    plan: [
      { when: '2026.11', what: '影像入库与三期反演，产出可靠的冷源栅格', whatEn: 'Ingestion and retrieval, a usable cold-source raster' },
      { when: '2026.12', what: 'MSPA 核心区与源地，构建三套阻力面', whatEn: 'MSPA cores and sources, three resistance surfaces' },
      { when: '2027.01', what: 'MCR 廊道网络，识别高阻力段与电路夹点', whatEn: 'MCR corridors, high-resistance segments and pinch points' },
      { when: '2027.02', what: '2×2 析因分解与熵权排序，出 8 幅图件', whatEn: '2×2 decomposition and ranking, eight figures' },
      { when: '2027.03', what: '论文定稿与投稿', whatEn: 'Manuscript and submission' },
    ],
  },
  {
    id: 'wuzhen',
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
      {
        date: '2026-11-10',
        title: '结题与软著登记',
        titleEn: 'Concluded, software registered',
        done: ['大创项目结题', 'DEA 分析工作台登记为软件著作权（2026SR1091537）'],
        doneEn: ['Programme concluded', 'DEA Analysis Workbench registered (2026SR1091537)'],
        status: '完成',
        statusEn: 'done',
      },
    ],
    plan: [],
  },
];
