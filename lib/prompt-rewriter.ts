export type RewriteMode = "通用增强" | "内容创作" | "学习写作" | "求职准备" | "商务表达" | "结构化输出";

export type RewriterResult = {
  basic: string;
  advanced: string;
  template: string;
};

const roleByMode: Record<RewriteMode, string> = {
  通用增强: "中文效率助手",
  内容创作: "中文内容策划和写作顾问",
  学习写作: "学习规划与中文写作教练",
  求职准备: "资深中文求职顾问",
  商务表达: "商务沟通与表达顾问",
  结构化输出: "信息架构与结构化表达专家",
};

export const rewriteModes: RewriteMode[] = ["通用增强", "内容创作", "学习写作", "求职准备", "商务表达", "结构化输出"];

export function rewritePrompt(input: string, mode: RewriteMode): RewriterResult {
  const task = input.trim();
  const role = roleByMode[mode];

  return {
    basic: `请你作为一名${role}，帮我完成以下任务：

${task}

请重点检查：
1. 任务目标是否清楚
2. 表达是否具体
3. 输出是否便于直接使用

请输出修改建议和优化后的版本。`,
    advanced: `请你作为一名${role}，基于以下任务帮我生成高质量结果。

原始任务：
${task}

我的背景：
- 使用场景：【填写使用场景】
- 目标对象：【填写读者或用户】
- 现有素材：【粘贴相关资料】

请你完成：
1. 分析这个任务的关键信息
2. 判断还缺少哪些必要条件
3. 按照更清楚的结构完成结果
4. 给出可以继续优化的建议

要求：
- 不要虚构事实
- 不要使用夸张表达
- 中文表达自然、具体、可复用
- 输出要有清楚的小标题和层次`,
    template: `请你作为一名${role}，帮我处理【任务类型】。

任务目标：
【填写你希望 AI 完成什么】

背景信息：
【填写场景、对象、平台、用途】

输入内容：
【粘贴原文、资料、经历或主题】

输出格式：
【例如 Markdown / 表格 / 分点列表 / 修改前后对比】

限制条件：
- 【填写语气、字数、风格】
- 不要虚构信息
- 不要空泛堆词

评价标准：
- 清楚
- 具体
- 可直接复制使用`,
  };
}
