export type RewriteMode =
  | "通用增强"
  | "内容创作"
  | "学习写作"
  | "求职准备"
  | "商务表达"
  | "结构化输出";

export type SceneId =
  | "xiaohongshu"
  | "resume"
  | "academic"
  | "study"
  | "writing"
  | "product"
  | "business"
  | "general";

export type RewriterResult = {
  basic: string;
  advanced: string;
  template: string;
};

export type RewriteModeDetail = {
  name: RewriteMode;
  description: string;
};

export type PromptAnalysis = {
  scene: SceneId;
  sceneLabel: string;
  role: string;
  taskType: string;
  topic: string;
  audience: string;
  platform: string;
  tone: string;
  outputFormat: string;
  constraints: string[];
  keywords: string[];
  rawInput: string;
};

export type PromptHealthItem = {
  key: string;
  label: string;
  included: boolean;
  suggestion: string;
};

type SceneConfig = {
  label: string;
  role: string;
  keywords: string[];
  defaultTaskType: string;
  defaultTopic: string;
  defaultAudience: string;
  defaultPlatform: string;
  defaultTone: string;
  steps: string[];
};

export const rewriteModeDetails: RewriteModeDetail[] = [
  { name: "通用增强", description: "适合大多数 AI 提问场景" },
  { name: "内容创作", description: "适合文章、标题、脚本、小红书和公众号" },
  { name: "学习写作", description: "适合论文、读书笔记、课程作业和知识总结" },
  { name: "求职准备", description: "适合简历、面试、自我介绍和经历表达" },
  { name: "商务表达", description: "适合邮件、汇报、方案和沟通表达" },
  { name: "结构化输出", description: "适合表格、清单、步骤和可执行计划" },
];

export const rewriteModes = rewriteModeDetails.map((mode) => mode.name);

export const promptExamples = [
  {
    label: "论文分析",
    value: "帮我分析这篇论文，告诉我核心观点、研究方法、创新点和可以继续追问的问题。",
  },
  {
    label: "简历优化",
    value: "帮我优化这段简历经历，让它更适合投递 AI 内容运营岗位。",
  },
  {
    label: "小红书选题",
    value: "帮我围绕普通人使用 AI 提高学习效率，生成 10 个小红书选题。",
  },
  {
    label: "面试回答",
    value: "帮我准备一个面试回答，问题是：你为什么想做内容运营？",
  },
  {
    label: "学习计划",
    value: "帮我制定一个 30 天学习 Python 数据分析的计划，每天都有具体任务。",
  },
  {
    label: "公众号文章",
    value: "帮我写一篇公众号文章大纲，主题是如何把 AI 工具变成个人工作流。",
  },
];

const sceneConfigs: Record<SceneId, SceneConfig> = {
  xiaohongshu: {
    label: "小红书 / 内容运营",
    role: "资深小红书内容运营专家",
    keywords: ["小红书", "账号", "爆款", "笔记", "选题", "涨粉", "运营", "内容策划", "A/B", "封面"],
    defaultTaskType: "设计内容运营方案",
    defaultTopic: "小红书账号内容策划",
    defaultAudience: "小红书目标用户",
    defaultPlatform: "小红书",
    defaultTone: "自然、清楚、有内容感",
    steps: [
      "账号基础定位与差异化",
      "目标受众与用户痛点",
      "内容规划",
      "视觉风格与封面模板",
      "运营策略",
      "变现路径",
      "输出格式要求",
    ],
  },
  resume: {
    label: "简历 / 求职",
    role: "求职表达与简历优化顾问",
    keywords: ["简历", "求职", "面试", "HR", "岗位", "经历", "项目经历", "自我介绍", "实习"],
    defaultTaskType: "优化求职表达",
    defaultTopic: "个人经历与岗位匹配表达",
    defaultAudience: "HR、面试官或招聘负责人",
    defaultPlatform: "简历 / 面试",
    defaultTone: "专业、具体、可信",
    steps: [
      "明确目标岗位",
      "提炼经历亮点",
      "改写为动作 + 结果 + 能力",
      "输出简历版表达",
      "输出面试版表达",
      "给出可继续追问的问题",
    ],
  },
  academic: {
    label: "论文 / 学术",
    role: "学术论文分析助手",
    keywords: ["论文", "文献", "研究", "观点", "创新点", "综述", "摘要", "论证"],
    defaultTaskType: "分析学术材料",
    defaultTopic: "论文或文献内容",
    defaultAudience: "需要理解论文的学习者或研究者",
    defaultPlatform: "学术阅读 / 课程作业",
    defaultTone: "准确、理性、结构化",
    steps: [
      "提取研究主题",
      "梳理核心观点",
      "分析论证结构",
      "提炼创新点",
      "总结不足与可追问问题",
      "输出结构化阅读笔记",
    ],
  },
  study: {
    label: "学习计划",
    role: "学习规划教练",
    keywords: ["学习", "复习", "课程", "考试", "计划", "知识点", "备考"],
    defaultTaskType: "制定学习计划",
    defaultTopic: "学习目标",
    defaultAudience: "需要执行学习计划的个人",
    defaultPlatform: "个人学习",
    defaultTone: "清晰、鼓励、可执行",
    steps: ["明确学习目标", "拆分知识模块", "制定阶段计划", "每日任务安排", "检查方式", "复盘建议"],
  },
  writing: {
    label: "写作 / 公众号",
    role: "中文写作策划顾问",
    keywords: ["文章", "公众号", "标题", "结构", "选题", "写作", "脚本", "文案"],
    defaultTaskType: "策划中文内容",
    defaultTopic: "文章或内容主题",
    defaultAudience: "目标读者",
    defaultPlatform: "公众号 / 内容平台",
    defaultTone: "自然、有逻辑、有传播感",
    steps: ["明确主题与受众", "生成标题方向", "设计文章结构", "补充论点和案例", "设计开头与结尾", "输出可执行写作大纲"],
  },
  product: {
    label: "代码 / 产品 / Codex",
    role: "产品与技术需求分析师",
    keywords: ["代码", "网站", "功能", "PRD", "Codex", "开发", "产品", "页面", "工具"],
    defaultTaskType: "拆解产品与开发任务",
    defaultTopic: "产品功能或开发需求",
    defaultAudience: "产品负责人、设计者或开发者",
    defaultPlatform: "产品 / 开发工作流",
    defaultTone: "清楚、工程化、可验收",
    steps: ["明确产品目标", "拆解核心功能", "梳理页面结构", "设计交互流程", "输出开发任务清单", "给出验收标准"],
  },
  business: {
    label: "商务表达",
    role: "商务表达优化顾问",
    keywords: ["邮件", "汇报", "方案", "会议", "沟通", "客户", "合作", "商务"],
    defaultTaskType: "优化商务表达",
    defaultTopic: "商务沟通内容",
    defaultAudience: "客户、同事或合作方",
    defaultPlatform: "邮件 / 汇报 / 会议",
    defaultTone: "专业、简洁、礼貌",
    steps: ["明确沟通对象", "提炼核心目的", "调整语气", "优化表达结构", "输出正式版本", "输出简洁版本"],
  },
  general: {
    label: "通用任务",
    role: "中文 AI 任务拆解助手",
    keywords: [],
    defaultTaskType: "拆解并完成任务",
    defaultTopic: "用户提供的任务",
    defaultAudience: "内容使用者",
    defaultPlatform: "AI 对话工具",
    defaultTone: "清楚、具体、自然",
    steps: ["明确任务目标", "补充背景信息", "拆解执行步骤", "指定输出格式", "加入限制条件", "给出可继续追问的问题"],
  },
};

const platformWords = ["小红书", "公众号", "知乎", "B站", "抖音", "视频号", "微博", "简历", "面试", "邮件", "网站"];
const toneWords = ["轻松", "亲切", "专业", "严肃", "口语化", "自然", "正式", "简洁", "温和", "犀利", "活泼"];
const formatWords = ["Markdown", "表格", "清单", "步骤", "大纲", "JSON", "分点", "列表", "对比", "标题"];
const genericKeywords = [
  "AI",
  "Codex",
  "科普",
  "编程",
  "效率",
  "运营",
  "内容策划",
  "论文",
  "简历",
  "面试",
  "产品",
  "PRD",
  "学习",
  "公众号",
  "小红书",
];

function includesAny(input: string, words: string[]) {
  const lower = input.toLowerCase();
  return words.some((word) => lower.includes(word.toLowerCase()));
}

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

export function detectScene(input: string): SceneId {
  const scored = Object.entries(sceneConfigs)
    .filter(([scene]) => scene !== "general")
    .map(([scene, config]) => ({
      scene: scene as SceneId,
      score: config.keywords.reduce((sum, keyword) => sum + (includesAny(input, [keyword]) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score);

  return scored[0]?.score ? scored[0].scene : "general";
}

function extractFirst(input: string, words: string[], fallback: string) {
  return words.find((word) => includesAny(input, [word])) ?? fallback;
}

function extractQuantityConstraints(input: string) {
  const matches = input.match(/(?:\d+\s*-\s*\d+|\d+)\s*(?:个|类|组|篇|条|步|阶段|小节|天|周|分钟|字)/g) ?? [];
  return matches.map((match) => match.replace(/\s+/g, ""));
}

export function extractConstraints(input: string) {
  const constraints = extractQuantityConstraints(input);

  if (/[aA]\s*\/\s*[bB]|A\/B|a\/b|对照组|A组|B组|a组|b组/.test(input)) {
    constraints.push("A/B 两个对照组");
  }

  if (includesAny(input, ["分组", "阶段", "计划"])) constraints.push("需要分组或阶段安排");
  if (includesAny(input, ["快速起号", "涨粉", "冷启动"])) constraints.push("需要考虑冷启动和增长效率");
  if (includesAny(input, ["不要", "避免", "不能", "不虚构"])) constraints.push("需要遵守用户提出的限制条件");

  return unique(constraints);
}

function extractTopic(input: string, scene: SceneId) {
  const quoted = input.match(/[“"「『](.+?)[”"」』]/)?.[1];
  if (quoted) return quoted;

  if (scene === "xiaohongshu") {
    if (includesAny(input, ["AI 科普", "ai 科普", "人工智能科普"])) return "AI 科普类小红书账号";
    if (includesAny(input, ["Codex", "代码", "编程"])) return "代码与 AI 结合的内容账号";
  }

  if (scene === "resume") {
    const role = input.match(/(?:投递|目标岗位|岗位|适合)([^，。,.]{2,18}?)(?:岗位|方向|。|，|,|$)/)?.[1];
    if (role) return `${role.replace(/的$/, "")}岗位求职表达`;
  }

  if (scene === "academic" && includesAny(input, ["论文", "文献"])) return "论文核心观点与创新点分析";
  if (scene === "study") return input.match(/学习([^，。,.]{2,18})/)?.[0] ?? sceneConfigs[scene].defaultTopic;
  if (scene === "product" && includesAny(input, ["网站", "工具", "页面"])) return "网站工具产品需求拆解";

  const keyword = genericKeywords.find((item) => includesAny(input, [item]));
  return keyword ? `${keyword}相关任务` : sceneConfigs[scene].defaultTopic;
}

function extractAudience(input: string, scene: SceneId) {
  if (includesAny(input, ["编程爱好者", "开发者", "AI 辅助编程"])) return "对 AI、编程、效率工具感兴趣的小红书用户";
  if (includesAny(input, ["小红书用户"])) return "小红书用户";
  if (includesAny(input, ["HR", "面试官"])) return "HR 和面试官";
  if (includesAny(input, ["客户"])) return "客户或合作方";
  if (includesAny(input, ["学生", "学习者"])) return "学生或学习者";
  return sceneConfigs[scene].defaultAudience;
}

function extractTone(input: string, scene: SceneId) {
  const tones = toneWords.filter((word) => includesAny(input, [word]));

  if (/[aA]组/.test(input) && /[bB]组/.test(input)) {
    const aTone = input.match(/[aA]组[^，。,.；;]*(轻松|亲切|自然|口语化|活泼)/)?.[1];
    const bTone = input.match(/[bB]组[^，。,.；;]*(专业|严肃|正式|简洁)/)?.[1];
    if (aTone || bTone) {
      return `A 组${aTone ?? "自然"}，B 组${bTone ?? "专业"}`;
    }
  }

  return tones.length ? tones.join(" / ") : sceneConfigs[scene].defaultTone;
}

function extractOutputFormat(input: string) {
  const matched = formatWords.filter((word) => includesAny(input, [word]));
  if (matched.length) return unique(matched).join(" / ");
  if (includesAny(input, ["方案", "大纲", "计划", "步骤"])) return "Markdown";
  return "Markdown";
}

function extractTaskType(input: string, scene: SceneId) {
  if (includesAny(input, ["方案", "运营", "起号"])) return "设计运营方案";
  if (includesAny(input, ["分析"])) return "分析与总结";
  if (includesAny(input, ["优化", "修改", "改写"])) return "优化表达";
  if (includesAny(input, ["计划", "备考"])) return "制定计划";
  if (includesAny(input, ["拆解", "PRD", "功能"])) return "拆解需求";
  return sceneConfigs[scene].defaultTaskType;
}

function extractKeywords(input: string, scene: SceneId) {
  const sceneKeywords = sceneConfigs[scene].keywords.filter((word) => includesAny(input, [word]));
  const generic = genericKeywords.filter((word) => includesAny(input, [word]));
  return unique([...sceneKeywords, ...generic]).slice(0, 8);
}

export function analyzePromptInput(input: string): PromptAnalysis {
  const rawInput = input.trim();
  const scene = detectScene(rawInput);
  const config = sceneConfigs[scene];

  return {
    scene,
    sceneLabel: config.label,
    role: config.role,
    taskType: extractTaskType(rawInput, scene),
    topic: extractTopic(rawInput, scene),
    audience: extractAudience(rawInput, scene),
    platform: extractFirst(rawInput, platformWords, config.defaultPlatform),
    tone: extractTone(rawInput, scene),
    outputFormat: extractOutputFormat(rawInput),
    constraints: extractConstraints(rawInput),
    keywords: extractKeywords(rawInput, scene),
    rawInput,
  };
}

function targetAndConstraintBlock(analysis: PromptAnalysis, mode?: RewriteMode) {
  const constraints = analysis.constraints.length ? analysis.constraints : ["如信息不足，请先提出不超过 3 个澄清问题"];
  const keywords = analysis.keywords.length ? analysis.keywords.join("、") : analysis.topic;

  return `**目标与约束**
- 场景：${analysis.sceneLabel}
- 优化方向：${mode ?? "通用增强"}
- 平台：${analysis.platform}
- 主题：${analysis.topic}
- 受众：${analysis.audience}
- 语气：${analysis.tone}
- 关键词：${keywords}
- 输出格式：${analysis.outputFormat}
${constraints.map((item) => `- ${item}`).join("\n")}`;
}

function stepBlock(analysis: PromptAnalysis) {
  return sceneConfigs[analysis.scene].steps
    .map((step, index) => `### 第${index + 1}步：${step}\n- 请结合原始需求展开\n- 输出具体、可执行的内容`)
    .join("\n\n");
}

export function buildOptimizedPrompt(
  analysis: PromptAnalysis,
  version: "basic" | "advanced" = "advanced",
  mode?: RewriteMode,
) {
  if (version === "basic") {
    return `你是一名${analysis.role}。

请根据我的原始需求，生成一份可以直接使用的结果。

**原始需求**
${analysis.rawInput}

${targetAndConstraintBlock(analysis, mode)}

**请完成**
- 先理解我的真实任务目标
- 保留原始需求中的关键信息
- 按「${analysis.sceneLabel}」场景组织输出
- 结果要清楚、具体、可直接复制使用
- 如果缺少必要信息，请先列出需要补充的问题`;
  }

  return `**优化后提示词**

你现在是一位${analysis.role}，专注于「${analysis.topic}」相关任务。请围绕我的原始需求，生成一份完整、清晰、可执行的结果。

**原始需求**
${analysis.rawInput}

${targetAndConstraintBlock(analysis, mode)}

**请按以下步骤生成方案**

${stepBlock(analysis)}

**输出格式要求**
- 全部内容使用 ${analysis.outputFormat}
- 标题层级清楚，建议使用 ## 和 ###
- 列表用 -
- 直接输出结果正文，不要额外解释
- 不要虚构事实；如果信息不足，请先提出最多 3 个澄清问题`;
}

export function buildReusableTemplate(analysis: PromptAnalysis, mode?: RewriteMode) {
  return `你现在是一位${analysis.role}，请帮我处理【任务类型】。

**任务背景**
- 场景：【${analysis.sceneLabel}】
- 优化方向：【${mode ?? "通用增强"}】
- 平台：【${analysis.platform}】
- 主题：【${analysis.topic}】
- 目标受众：【${analysis.audience}】
- 语气风格：【${analysis.tone}】
- 输出格式：【${analysis.outputFormat}】

**输入内容**
【粘贴原始材料、经历、论文、产品需求或内容主题】

**关键要求**
- 【数量或结构要求，例如 5 个标题、3-4 个小节、A/B 两组方案】
- 【限制条件，例如不要虚构、保留原意、适合中文场景】
- 【质量标准，例如清楚、具体、可执行】

**请按以下步骤输出**
${sceneConfigs[analysis.scene].steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

**最终要求**
- 结果要可直接复制使用
- 如果信息不足，请先列出需要补充的问题`;
}

export function buildPromptChecklist(analysis: PromptAnalysis): PromptHealthItem[] {
  return [
    {
      key: "task",
      label: "明确任务",
      included: Boolean(analysis.taskType && analysis.rawInput.length >= 8),
      suggestion: "建议明确你希望 AI 完成什么任务，例如分析、改写、策划或拆解。",
    },
    {
      key: "scene",
      label: "具体场景",
      included: analysis.scene !== "general",
      suggestion: "建议补充使用场景，例如小红书、简历、论文、学习计划或产品需求。",
    },
    {
      key: "audience",
      label: "目标对象",
      included: analysis.audience !== sceneConfigs[analysis.scene].defaultAudience || includesAny(analysis.rawInput, ["用户", "受众", "读者", "HR", "面试官", "客户", "开发者"]),
      suggestion: "建议说明内容给谁看，或结果要服务哪类用户。",
    },
    {
      key: "tone",
      label: "语气风格",
      included: toneWords.some((word) => includesAny(analysis.rawInput, [word])),
      suggestion: "建议补充语气风格，例如轻松亲切、专业严肃、自然口语化。",
    },
    {
      key: "format",
      label: "输出格式",
      included: formatWords.some((word) => includesAny(analysis.rawInput, [word])) || includesAny(analysis.rawInput, ["方案", "大纲", "计划"]),
      suggestion: "建议指定输出格式，例如 Markdown、表格、清单、步骤或对比。",
    },
    {
      key: "quantity",
      label: "数量或结构要求",
      included: analysis.constraints.some((item) => /\d|A\/B|对照|阶段|分组/.test(item)),
      suggestion: "建议补充数量或结构要求，例如 5 个标题、3 类用户、3-4 个小节。",
    },
    {
      key: "constraints",
      label: "约束条件",
      included: analysis.constraints.length > 0 || includesAny(analysis.rawInput, ["不要", "避免", "必须", "不虚构"]),
      suggestion: "建议补充限制条件，例如不要虚构、保留原意、字数范围或禁用表达。",
    },
  ];
}

export function analyzePromptHealth(input: string): PromptHealthItem[] {
  return buildPromptChecklist(analyzePromptInput(input));
}

export function rewritePrompt(input: string, mode: RewriteMode): RewriterResult {
  const analysis = analyzePromptInput(input);

  return {
    basic: buildOptimizedPrompt(analysis, "basic", mode),
    advanced: buildOptimizedPrompt(analysis, "advanced", mode),
    template: buildReusableTemplate(analysis, mode),
  };
}
