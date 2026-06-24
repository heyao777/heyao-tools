export type PromptLevel = "较弱" | "一般" | "良好" | "优秀";

export type DimensionScore = {
  label: string;
  score: number;
  description: string;
};

export type PromptAnalysisResult = {
  totalScore: number;
  level: PromptLevel;
  summary: string;
  dimensions: DimensionScore[];
  suggestions: string[];
  optimizedPrompt: string;
};

const taskWords = ["写", "生成", "优化", "修改", "分析", "总结", "提炼", "整理", "翻译", "改写", "检查", "设计", "制定"];
const audienceWords = ["用户", "受众", "读者", "面试官", "学生", "客户", "招聘", "HR", "老师", "新手", "目标人群"];
const sceneWords = ["小红书", "公众号", "简历", "面试", "课堂", "论文", "汇报", "邮件", "申请", "工作", "求职", "学习"];
const variableWords = ["主题", "背景", "素材", "目标", "岗位", "产品", "原文", "经历", "要求", "用途", "对象", "行业", "风格"];
const formatWords = ["表格", "分点", "Markdown", "JSON", "标题", "大纲", "列表", "步骤", "对比", "结构", "格式"];
const constraintWords = ["不要", "避免", "不能", "语气", "字数", "风格", "限制", "必须", "不虚构", "简洁", "自然"];

function hasAny(input: string, words: string[]) {
  return words.some((word) => input.toLowerCase().includes(word.toLowerCase()));
}

function clamp(score: number) {
  return Math.max(0, Math.min(100, score));
}

function getLevel(score: number): PromptLevel {
  if (score < 40) return "较弱";
  if (score < 60) return "一般";
  if (score < 80) return "良好";
  return "优秀";
}

function getSummary(level: PromptLevel) {
  const summaries: Record<PromptLevel, string> = {
    较弱: "信息不足，AI 很难稳定输出可用结果。",
    一般: "有基本任务，但缺少关键条件，建议补充背景、格式和约束。",
    良好: "基本可用，但仍有优化空间，可以继续补充场景和评价标准。",
    优秀: "结构完整，适合直接使用，也便于长期复用。",
  };
  return summaries[level];
}

export function analyzePrompt(input: string): PromptAnalysisResult {
  const text = input.trim();
  const lengthBonus = text.length > 20 ? 10 : 0;

  const intentScore = clamp(
    40 +
      (hasAny(text, taskWords) ? 30 : 0) +
      (hasAny(text, variableWords) || text.length > 12 ? 20 : 0) +
      lengthBonus,
  );
  const audienceScore = clamp(
    20 +
      (hasAny(text, audienceWords) ? 50 : 0) +
      (hasAny(text, sceneWords) ? 20 : 0) +
      (text.includes("用于") || text.includes("给") ? 10 : 0),
  );
  const variableScore = clamp(
    20 +
      variableWords.reduce((score, word) => score + (text.includes(word) ? 12 : 0), 0) +
      (text.length > 40 ? 16 : 0),
  );
  const formatScore = clamp(
    10 +
      (hasAny(text, formatWords) ? 50 : 0) +
      (/[123一二三][\.、]/.test(text) ? 20 : 0) +
      (text.includes("输出") ? 15 : 0),
  );
  const constraintScore = clamp(
    10 +
      (hasAny(text, constraintWords) ? 40 : 0) +
      (/(\d+\s*字|以内|不少于|不超过)/.test(text) ? 20 : 0) +
      (text.includes("不虚构") || text.includes("不要夸张") ? 20 : 0),
  );

  const dimensions: DimensionScore[] = [
    { label: "意图清晰度", score: intentScore, description: "是否明确说明想让 AI 做什么。" },
    { label: "受众明确度", score: audienceScore, description: "是否说明输出内容给谁看或用于什么场景。" },
    { label: "变量完整度", score: variableScore, description: "是否提供主题、背景、对象、素材等信息。" },
    { label: "输出格式明确度", score: formatScore, description: "是否规定表格、分点、标题、JSON、Markdown 等格式。" },
    { label: "约束条件充分度", score: constraintScore, description: "是否说明语气、字数、禁忌或边界。" },
  ];

  const totalScore = Math.round(dimensions.reduce((sum, item) => sum + item.score, 0) / dimensions.length);
  const level = getLevel(totalScore);
  const suggestions = [
    intentScore < 70 ? "补充明确任务，例如分析、改写、总结、生成或检查。" : "",
    audienceScore < 70 ? "说明目标受众、使用平台或具体场景。" : "",
    variableScore < 70 ? "补充主题、背景、原文、岗位、素材或用途等变量。" : "",
    formatScore < 70 ? "指定输出格式，例如分点、表格、Markdown 或修改前后对比。" : "",
    constraintScore < 70 ? "加入语气、字数、风格、禁止虚构等限制条件。" : "",
  ].filter(Boolean);

  return {
    totalScore,
    level,
    summary: getSummary(level),
    dimensions,
    suggestions,
    optimizedPrompt: `请你作为一名中文效率助手，帮我处理以下任务：${text || "【填写你的任务】"}。

任务背景：
- 使用场景：【填写使用平台或具体场景】
- 目标受众：【填写读者、用户或面试官】
- 输入素材：【粘贴原文、经历、主题或背景信息】

请按照以下结构输出：
1. 问题诊断：说明当前内容的问题
2. 修改建议：给出具体可执行的建议
3. 优化版本：输出可以直接使用的最终结果

要求：
- 不要虚构信息
- 表达清楚、自然、具体
- 适合中文场景
- 如信息不足，请先列出需要我补充的内容`,
  };
}
