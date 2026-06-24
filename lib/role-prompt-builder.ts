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

const expertise: Record<RolePromptInput["role"], string> = {
  求职顾问: "梳理经历、提炼能力关键词，并把普通表达改写成适合简历和面试的中文表达",
  文案专家: "理解用户、提炼卖点，并生成自然、有场景感的中文内容",
  中文编辑: "将混乱、口语化、重复的信息整理成清晰、自然、有结构的中文表达",
  面试官: "围绕岗位要求设计问题、追问细节，并帮助用户形成结构化回答",
  学习规划师: "拆解学习目标、安排步骤，并把复杂任务转成可执行计划",
  产品经理: "分析用户、场景、需求和流程，并输出清楚的产品化表达",
  "AI 提示词教练": "诊断 Prompt 结构，补全角色、任务、变量、格式和约束",
};

export function buildRolePrompt(input: RolePromptInput) {
  return `你是一名资深${input.role}，擅长${expertise[input.role]}。

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
}
