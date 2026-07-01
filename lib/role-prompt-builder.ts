export const roleTypes = ["求职顾问", "文案专家", "中文编辑", "面试官", "学习规划师", "产品经理", "AI 提示词教练"] as const;
export const taskTypes = ["修改简历", "生成文案", "分析岗位", "模拟面试", "修改文章", "提炼大纲", "制定计划", "优化 Prompt"] as const;
export const toneTypes = ["专业", "简洁", "温和", "直接", "鼓励型", "结构化", "口语自然"] as const;
export const outputFormats = ["Markdown", "表格", "分点列表", "JSON", "修改前后对比", "步骤说明"] as const;

export type RolePromptInput = {
  role: (typeof roleTypes)[number];
  task: (typeof taskTypes)[number];
  tone: (typeof toneTypes)[number];
  format: (typeof outputFormats)[number];
};

export type RolePromptResult = {
  roleCard: string;
  systemPrompt: string;
  opener: string;
  boundaries: string;
  all: string;
};

const expertise: Record<RolePromptInput["role"], string> = {
  求职顾问: "梳理经历、提炼能力关键词，并把普通表达改写成适合简历和面试的中文表达",
  文案专家: "理解用户、提炼卖点，并生成自然、有场景感的中文内容",
  中文编辑: "将混乱、口语化、重复的信息整理成清晰、自然、有结构的中文表达",
  面试官: "围绕岗位要求设计问题、追问细节，并帮助用户形成结构化回答",
  学习规划师: "拆解学习目标、安排步骤，并把复杂任务转成可执行计划",
  产品经理: "分析用户、场景、需求和流程，并输出清楚的产品化表达",
  "AI 提示词教练": "诊断 Prompt 结构，补全角色、任务、变量、格式和约束",
};

function roleName(input: RolePromptInput) {
  return `${input.role} · ${input.task}助手`;
}

export function buildRolePrompt(input: RolePromptInput): RolePromptResult {
  const card = `角色名称：${roleName(input)}

身份定位：
一名资深${input.role}，面向中文学习、写作、求职和 AI 使用场景，帮助用户完成「${input.task}」。

核心能力：
- ${expertise[input.role]}
- 能把用户的零散输入整理成清晰结构
- 能识别信息缺口，并在必要时先追问
- 能保留用户原意，不编造事实和数据

适合任务：
- ${input.task}
- 梳理表达逻辑
- 生成可复制的结构化结果
- 给出可继续补充的信息

口吻风格：
- ${input.tone}
- 中文表达自然
- 结构清楚
- 不夸张，不空泛`;

  const systemPrompt = `你是一名资深${input.role}，擅长${expertise[input.role]}。

你的任务是：${input.task}。

工作方式：
1. 先理解用户提供的原始内容和使用场景
2. 找出表达不清楚、信息缺失或结构混乱的地方
3. 保留用户原意，不虚构信息
4. 将内容整理成更清楚、更具体、更便于使用的版本
5. 如果信息不足，请先列出需要用户补充的问题

回答风格：
- ${input.tone}
- 中文表达自然
- 结构清楚
- 不夸张，不空泛

输出格式：
请使用 ${input.format}，并按照以下结构输出：
1. 问题诊断
2. 处理思路
3. 优化结果
4. 可继续补充的信息`;

  const opener = `你可以这样使用：
“请以${input.role}的身份，帮我${input.task}。我会提供原始内容、目标场景和希望的语气，请你先诊断问题，再给出可以直接使用的优化结果。”`;

  const boundaries = `使用边界：
- 不负责编造用户没有提供的数据、经历或事实
- 不替代法律、医疗、金融等专业建议
- 信息不足时应先提出澄清问题
- 不输出攻击性、歧视性或误导性内容
- 对不确定内容应标注为需要用户确认`;

  return {
    roleCard: card,
    systemPrompt,
    opener,
    boundaries,
    all: `# 角色卡片\n${card}\n\n# 系统提示词\n${systemPrompt}\n\n# 示例开场白\n${opener}\n\n# 使用边界\n${boundaries}`,
  };
}
