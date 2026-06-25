export type RewriteMode =
  | "通用增强"
  | "内容创作"
  | "学习写作"
  | "求职准备"
  | "商务表达"
  | "结构化输出";

export type SceneId =
  | "skillDesign"
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

export type RewriterResultKey = keyof RewriterResult;

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
  example: string;
  weight: number;
};

export type PromptRewriteWorkflow = {
  analysis: PromptAnalysis;
  health: PromptHealthItem[];
  score: number;
  result: RewriterResult;
  recommendedKey: RewriterResultKey;
  summary: string;
  recommendationReason: string;
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
    label: "小红书账号运营",
    value:
      "我想在小红书上开一个 AI 科普账号，主要讲 Codex、AI 编程和普通人如何使用 AI 提高效率。请帮我设计一个快速起号方案，包括账号定位、目标用户、内容栏目、前 30 天选题、封面风格、发布节奏和涨粉方法，输出为 Markdown 清单。",
  },
  {
    label: "简历优化",
    value:
      "帮我优化一段简历项目经历，目标岗位是 AI 产品经理。经历内容是：我负责整理用户需求、设计一个 AI 工具页面、跟进开发上线。请把它改成更专业的简历表达，突出需求分析、产品设计、协作推进和结果价值，并给出面试时可以展开讲的版本。",
  },
  {
    label: "论文分析",
    value:
      "帮我分析一篇关于生成式 AI 在教育场景应用的论文。我希望你提取研究问题、核心观点、研究方法、创新点、不足之处和可继续追问的问题，输出为结构化阅读笔记，适合我做课堂汇报。",
  },
  {
    label: "一周学习计划",
    value:
      "帮我制定一个 7 天学习计划，目标是在一周内入门 Python 数据分析。每天我有 2 小时学习时间，希望计划里包含学习主题、练习任务、检查方式和复盘问题，输出为表格和每日清单。",
  },
  {
    label: "公众号选题",
    value:
      "我想做一个面向职场人的公众号，主题是 AI 工具如何提升日常工作效率。请帮我设计 20 个选题，分成认知类、工具类、案例类和方法论类，每个选题给出标题、读者痛点和文章角度。",
  },
  {
    label: "产品需求拆解",
    value:
      "我想做一个中文 AI 工具箱网站，里面包含 Prompt 改写、文本清洗、简历表达优化等小工具。请帮我拆成产品需求文档，包括目标用户、核心页面、功能模块、交互流程、开发任务清单和验收标准。",
  },
  {
    label: "面试回答优化",
    value:
      "帮我优化一个面试回答，问题是：你为什么想转向 AI 产品运营？我的背景是做过内容运营，也自己做过几个 AI 小工具。请帮我组织成 1 分钟口语化回答，突出动机、能力迁移、项目经验和未来规划。",
  },
  {
    label: "文本结构整理",
    value:
      "帮我整理一段比较混乱的会议记录。我希望你先提取核心结论，再整理待办事项、负责人、截止时间和风险提醒。请用 Markdown 输出，结构清楚，不要改变原意，缺失信息请标注为待补充。",
  },
];

const sceneConfigs: Record<SceneId, SceneConfig> = {
  skillDesign: {
    label: "AI Skill / AI 工具方案设计",
    role: "资深 AI 应用开发专家与提示词工程师",
    keywords: [
      "skill",
      "技能",
      "AI 工具",
      "工具",
      "助手",
      "智能体",
      "agent",
      "工作流",
      "方案",
      "可行方案",
      "目标用户",
      "商用",
      "功能模块",
      "提高效率",
      "自动化",
      "提示词工程",
    ],
    defaultTaskType: "AI Skill 方案设计",
    defaultTopic: "AI Skill / AI 工具方案",
    defaultAudience: "希望用 AI 提高效率的目标用户",
    defaultPlatform: "AI Skill / AI 工具",
    defaultTone: "清晰、可落地、可复用",
    steps: [
      "Skill 核心定位",
      "目标用户与使用场景",
      "核心功能模块",
      "动态风格 / 参数控制机制",
      "用户使用流程",
      "可复用 Prompt 模板",
      "商业化方案",
      "MVP 开发建议",
      "验收标准",
    ],
  },
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

const platformWords = ["AI Skill", "AI 工具", "智能体", "小红书", "公众号", "知乎", "B站", "抖音", "视频号", "微博", "简历", "面试", "邮件", "网站"];
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
  "Skill",
  "智能体",
  "商业化",
  "工作流",
  "小说",
  "写作效率",
  "商用",
];

function includesAny(input: string, words: string[]) {
  const lower = input.toLowerCase();
  return words.some((word) => lower.includes(word.toLowerCase()));
}

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

export function detectScene(input: string): SceneId {
  if (isSkillDesignIntent(input)) return "skillDesign";

  const scored = Object.entries(sceneConfigs)
    .filter(([scene]) => scene !== "general" && scene !== "skillDesign")
    .map(([scene, config]) => ({
      scene: scene as SceneId,
      score: config.keywords.reduce((sum, keyword) => sum + (includesAny(input, [keyword]) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score);

  return scored[0]?.score ? scored[0].scene : "general";
}

function isSkillDesignIntent(input: string) {
  const hasSkill = includesAny(input, ["skill", "技能"]);
  const hasTool = includesAny(input, ["AI 工具", "工具", "助手", "智能体", "agent", "工作流", "自动化"]);
  const hasPlan = includesAny(input, ["方案", "可行方案", "设计", "开发", "功能", "功能模块", "产品"]);
  const hasAiAssistant = includesAny(input, ["AI", "Ai", "ai"]) && includesAny(input, ["助手", "工具", "skill", "技能", "智能体", "agent"]);
  const hasBusinessUsers = includesAny(input, ["目标用户", "用户", "商用", "商业化", "提高效率", "效率"]);

  return (
    (hasSkill && hasPlan) ||
    (hasTool && hasPlan) ||
    hasAiAssistant ||
    (includesAny(input, ["智能体"]) && includesAny(input, ["功能", "方案"])) ||
    (includesAny(input, ["目标用户"]) && includesAny(input, ["商用", "商业化", "提高效率"]))
  );
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
  if (includesAny(input, ["提高效率", "写作效率", "效率"])) constraints.push("需要提高用户完成任务的效率");
  if (includesAny(input, ["商用", "商业化", "商业"])) constraints.push("需要具备商业化或商用潜力");
  if (includesAny(input, ["风格", "语气", "变化", "动态", "不同小说内容"])) constraints.push("需要支持语气和风格动态变化");
  if (includesAny(input, ["不要", "避免", "不能", "不虚构"])) constraints.push("需要遵守用户提出的限制条件");

  return unique(constraints);
}

function extractTopic(input: string, scene: SceneId) {
  const quoted = input.match(/[“"「『](.+?)[”"」』]/)?.[1];
  if (quoted) return quoted;

  if (scene === "skillDesign") {
    if (includesAny(input, ["小说", "写小说", "小说写作"])) return "AI 小说写作 Skill";
    if (includesAny(input, ["skill", "技能"])) return "AI Skill 方案";
    if (includesAny(input, ["智能体", "agent"])) return "AI 智能体方案";
    return "AI 工具方案";
  }

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
  if (scene === "skillDesign" && includesAny(input, ["小说", "写小说", "小说写作"])) {
    return "想用 AI 写小说、提升写作效率、进行商业内容创作的人群";
  }
  if (includesAny(input, ["编程爱好者", "开发者", "AI 辅助编程"])) return "对 AI、编程、效率工具感兴趣的小红书用户";
  if (includesAny(input, ["小红书用户"])) return "小红书用户";
  if (includesAny(input, ["HR", "面试官"])) return "HR 和面试官";
  if (includesAny(input, ["客户"])) return "客户或合作方";
  if (includesAny(input, ["学生", "学习者"])) return "学生或学习者";
  return sceneConfigs[scene].defaultAudience;
}

function extractTone(input: string, scene: SceneId) {
  if (scene === "skillDesign" && includesAny(input, ["不同的小说内容", "小说内容变化", "不同小说", "风格变化"])) {
    return "根据不同小说类型、题材和叙事需求动态变化";
  }

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
  if (scene === "skillDesign") {
    if (includesAny(input, ["skill", "技能"])) return "AI Skill 方案设计";
    if (includesAny(input, ["工具", "助手", "智能体", "agent"])) return "AI 工具方案设计";
    return "AI 应用方案设计";
  }

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

function hasBackgroundInfo(input: string) {
  return (
    input.length >= 40 ||
    includesAny(input, ["背景", "目前", "已经", "负责", "目标是", "我想", "我的背景", "经历内容", "主要讲", "用户"])
  );
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
  const modeLine =
    analysis.scene === "skillDesign"
      ? "- 任务类型：AI Skill / AI 工具方案设计"
      : `- 优化方向：${mode ?? "通用增强"}`;

  return `**目标与约束**
- 场景：${analysis.sceneLabel}
${modeLine}
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

function buildSkillDesignPrompt(analysis: PromptAnalysis, mode?: RewriteMode) {
  const isNovelSkill = includesAny(analysis.rawInput, ["小说", "写小说", "小说写作"]);
  const projectBackground = isNovelSkill
    ? "我想做一个能辅助用户写小说的 AI Skill，目标用户是希望使用 AI 提高小说写作效率的人群。这个 Skill 既要适合个人创作，也要具备商业化潜力。它需要能够根据不同小说类型、题材、风格和叙事需求，自动调整输出语气和写作风格。"
    : `我想设计一个「${analysis.topic}」，目标用户是「${analysis.audience}」。这个 AI 应用需要能解决明确痛点、提高效率，并具备可复用和可落地的方案结构。`;
  const styleRequirement = isNovelSkill
    ? "能根据玄幻、科幻、言情、悬疑、现实等不同小说类型动态切换语气"
    : analysis.tone;
  const coreGoal = isNovelSkill
    ? "提高小说构思、设定、剧情推进、人物塑造和文本润色效率"
    : `围绕「${analysis.topic}」提升用户完成任务的效率、稳定性和复用性`;
  const commercialDirection = isNovelSkill
    ? "可作为写作工具、内容生产工具或创作辅助 Skill"
    : "可作为效率工具、工作流助手或垂直场景 AI 应用";
  const featureExamples = isNovelSkill
    ? `请至少设计 5 个核心功能，例如：
- 小说题材与风格识别
- 世界观设定生成
- 人物设定生成
- 剧情大纲生成
- 章节续写
- 文风转换
- 爽点 / 冲突 / 悬念增强
- 商业化网文节奏优化`
    : "请至少设计 5 到 8 个核心功能，并说明每个功能的用途、输入信息和输出结果。";
  const promptVariables = isNovelSkill
    ? "【小说类型】【主角设定】【世界观】【章节目标】【语气风格】【输出长度】【限制条件】"
    : "【用户目标】【内容类型】【风格要求】【输出长度】【限制条件】";

  return `**优化后提示词**

你现在是一位资深 AI 应用开发专家与提示词工程师，擅长为特定用户群体设计结构化、可复用、可商业化的 AI Skill 方案。

请为「${analysis.topic}」设计一套可直接用于开发和落地的完整方案。

**项目背景**
${projectBackground}

**原始需求**
${analysis.rawInput}

**目标与约束**
- 任务场景：${analysis.sceneLabel}
- 目标用户：${analysis.audience}
- 核心目标：${coreGoal}
- 商业化方向：${commercialDirection}
- 风格要求：${styleRequirement}
- 输出格式：${analysis.outputFormat}
- 结果要求：清晰、结构化、可执行、适合交给开发者继续实现
${analysis.constraints.map((item) => `- ${item}`).join("\n")}

**请按以下结构输出方案**

## 1. Skill 核心定位
- 用一句话说明这个 Skill 的核心价值
- 说明它解决了用户的哪些痛点
- 说明它与普通 AI 工具的差异

## 2. 目标用户与使用场景
- 列出 3 类核心用户画像
- 分析每类用户的需求、痛点和使用场景

## 3. 核心功能模块
${featureExamples}

## 4. 动态风格 / 参数控制机制
- 如果用户提到语气、风格、类型变化，要设计动态调整机制
- 说明如何根据不同内容类型切换语言风格
- 设计风格参数或变量

## 5. 用户使用流程
- 设计从输入需求到生成结果的完整流程
- 说明每一步用户输入什么，Skill 返回什么

## 6. 可复用 Prompt 模板
- 给出一套适合这个 Skill 内部使用的 Prompt 模板
- 模板中要包含变量，例如：${promptVariables}

## 7. 商业化方案
- 提出至少 3 种商业化路径
- 说明适合个人用户、工作室或内容团队的使用方式

## 8. MVP 开发建议
- 说明第一版应该先做哪些功能
- 给出开发优先级
- 给出后续可扩展功能

## 9. 验收标准
- 给出判断这个 Skill 是否好用的标准
- 包括输出质量、可控性、复用性、稳定性和商业价值

**输出要求**
- 使用 ${analysis.outputFormat}
- 标题用 ##
- 列表用 -
- 内容要具体、可执行
- 不要泛泛而谈
- 不要把它写成普通内容写作方案`;
}

export function buildOptimizedPrompt(
  analysis: PromptAnalysis,
  version: "basic" | "advanced" = "advanced",
  mode?: RewriteMode,
) {
  if (analysis.scene === "skillDesign" && version === "advanced") {
    return buildSkillDesignPrompt(analysis, mode);
  }

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
  if (analysis.scene === "skillDesign") {
    return `你现在是一位资深 AI 应用开发专家与提示词工程师，请帮我设计一个【AI Skill / AI 工具】方案。

**项目背景**
- Skill / 工具名称：【填写名称】
- 应用领域：【例如小说写作、学习规划、内容运营、求职表达】
- 目标用户：【填写核心用户群体】
- 核心目标：【填写要提升的效率、质量或自动化能力】
- 商业化方向：【个人用户 / 工作室 / 团队 / SaaS / 咨询交付】
- 风格或参数要求：【填写是否需要根据内容类型动态变化】
- 输出格式：【Markdown】

**请按以下结构输出**

## 1. Skill 核心定位
- 用一句话说明核心价值
- 说明解决的用户痛点
- 说明与普通 AI 工具的差异

## 2. 目标用户与使用场景
- 列出 3 类核心用户画像
- 分析需求、痛点和使用场景

## 3. 核心功能模块
- 列出 5 到 8 个核心功能
- 每个功能说明用途、输入和输出结果

## 4. 动态风格 / 参数控制机制
- 设计可调参数
- 说明不同内容类型或风格下如何变化

## 5. 用户使用流程
- 从输入需求到生成结果，设计完整流程

## 6. 可复用 Prompt 模板
- 模板必须包含变量：【用户目标】【内容类型】【风格要求】【输出长度】【限制条件】

## 7. 商业化方案
- 至少 3 种商业化路径

## 8. MVP 开发建议
- 第一版功能
- 优先级
- 后续扩展

## 9. 验收标准
- 输出质量
- 可控性
- 复用性
- 稳定性
- 商业价值`;
  }

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
      example: "例如：请帮我生成一份小红书账号冷启动运营方案。",
      weight: 15,
    },
    {
      key: "scene",
      label: "具体场景",
      included: analysis.scene !== "general",
      suggestion: "建议补充使用场景，例如小红书、简历、论文、学习计划或产品需求。",
      example: "例如：用于小红书内容运营，目标是快速起号。",
      weight: 15,
    },
    {
      key: "audience",
      label: "目标对象",
      included: analysis.audience !== sceneConfigs[analysis.scene].defaultAudience || includesAny(analysis.rawInput, ["用户", "受众", "读者", "HR", "面试官", "客户", "开发者"]),
      suggestion: "建议说明内容给谁看，或结果要服务哪类用户。",
      example: "例如：面向对 AI、编程和效率工具感兴趣的新手用户。",
      weight: 10,
    },
    {
      key: "background",
      label: "背景信息",
      included: hasBackgroundInfo(analysis.rawInput),
      suggestion: "建议补充你的背景、已有素材、当前状态或具体使用目的。",
      example: "例如：我已经有账号定位，但缺少选题规划和发布节奏。",
      weight: 10,
    },
    {
      key: "tone",
      label: "语气风格",
      included: toneWords.some((word) => includesAny(analysis.rawInput, [word])),
      suggestion: "建议补充语气风格，例如轻松亲切、专业严肃、自然口语化。",
      example: "例如：A 组轻松亲切，B 组专业严肃。",
      weight: 10,
    },
    {
      key: "format",
      label: "输出格式",
      included: formatWords.some((word) => includesAny(analysis.rawInput, [word])) || includesAny(analysis.rawInput, ["方案", "大纲", "计划"]),
      suggestion: "建议指定输出格式，例如 Markdown、表格、清单、步骤或对比。",
      example: "例如：用 Markdown 输出，包含标题、步骤、示例和执行清单。",
      weight: 10,
    },
    {
      key: "quantity",
      label: "数量或结构要求",
      included: analysis.constraints.some((item) => /\d|A\/B|对照|阶段|分组/.test(item)),
      suggestion: "建议补充数量或结构要求，例如 5 个标题、3 类用户、3-4 个小节。",
      example: "例如：生成 10 个选题，并分成 A/B 两组对照。",
      weight: 15,
    },
    {
      key: "constraints",
      label: "约束条件",
      included: analysis.constraints.length > 0 || includesAny(analysis.rawInput, ["不要", "避免", "必须", "不虚构"]),
      suggestion: "建议补充限制条件，例如不要虚构、保留原意、字数范围或禁用表达。",
      example: "例如：不要虚构数据，不要使用夸张承诺，保留原始意图。",
      weight: 15,
    },
  ];
}

export function analyzePromptHealth(input: string): PromptHealthItem[] {
  return buildPromptChecklist(analyzePromptInput(input));
}

export function calculatePromptScore(health: PromptHealthItem[]) {
  return health.reduce((total, item) => total + (item.included ? item.weight : 0), 0);
}

export function getRecommendedResultKey(analysis: PromptAnalysis, health: PromptHealthItem[]): RewriterResultKey {
  const missingCount = health.filter((item) => !item.included).length;
  const reusableIntent = includesAny(analysis.rawInput, ["模板", "复用", "长期", "标准化", "每次", "以后", "批量"]);
  const complexIntent =
    analysis.constraints.length >= 2 ||
    includesAny(analysis.rawInput, ["方案", "计划", "PRD", "A/B", "对照", "阶段", "完整", "系统", "拆解"]);

  if (reusableIntent) return "template";
  if (missingCount >= 4 && !complexIntent) return "basic";
  return "advanced";
}

export function getRecommendationReason(key: RewriterResultKey, analysis: PromptAnalysis, health: PromptHealthItem[]) {
  const missingCount = health.filter((item) => !item.included).length;

  if (key === "template") {
    return "你的输入里有复用或标准化倾向，模板版更适合保存下来反复改字段使用。";
  }

  if (key === "basic") {
    return `当前还缺少 ${missingCount} 项关键信息，基础版会先补齐任务目标和输出结构，复制后更稳。`;
  }

  return `河妖已识别到「${analysis.sceneLabel}」场景和主要任务，专业增强版会把角色、步骤、约束和格式一次补齐。`;
}

export function buildWorkflowSummary(analysis: PromptAnalysis, health: PromptHealthItem[], recommendedKey: RewriterResultKey) {
  const missingCount = health.filter((item) => !item.included).length;
  const score = calculatePromptScore(health);
  const versionName: Record<RewriterResultKey, string> = {
    basic: "基础优化版",
    advanced: "专业增强版",
    template: "可复用模板版",
  };

  return `已识别为：${analysis.sceneLabel} · 完整度 ${score}/100 · 推荐复制：${versionName[recommendedKey]} · 还可补充 ${missingCount} 项信息`;
}

export function rewritePrompt(input: string, mode: RewriteMode): RewriterResult {
  const analysis = analyzePromptInput(input);

  return {
    basic: buildOptimizedPrompt(analysis, "basic", mode),
    advanced: buildOptimizedPrompt(analysis, "advanced", mode),
    template: buildReusableTemplate(analysis, mode),
  };
}

export function rewritePromptWorkflow(input: string, mode: RewriteMode): PromptRewriteWorkflow {
  const analysis = analyzePromptInput(input);
  const health = buildPromptChecklist(analysis);
  const score = calculatePromptScore(health);
  const result = rewritePrompt(input, mode);
  const recommendedKey = getRecommendedResultKey(analysis, health);

  return {
    analysis,
    health,
    score,
    result,
    recommendedKey,
    summary: buildWorkflowSummary(analysis, health, recommendedKey),
    recommendationReason: getRecommendationReason(recommendedKey, analysis, health),
  };
}
