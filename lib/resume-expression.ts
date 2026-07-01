export type ResumeExpressionInput = {
  targetRole: string;
  experience: string;
  ability: string;
  scenario: string;
};

export type ResumeExpressionResult = {
  diagnosis: string;
  keywords: string[];
  template: string;
  resumeVersion: string;
  interviewVersion: string;
  selfIntroVersion: string;
  diagnostics: Array<{
    label: string;
    score: number;
    suggestion: string;
  }>;
  safetyNotice: string;
  targetRoleSuggestion?: string;
};

function splitAbilities(value: string) {
  const items = value
    .split(/[，,、\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length ? items : ["内容整理", "沟通协作", "结构化表达", "执行推进"];
}

function hasNumbers(value: string) {
  return /\d|一|二|三|四|五|六|七|八|九|十|百|千|万|两/.test(value);
}

function extractResultText(experience: string) {
  if (hasNumbers(experience)) return experience.match(/[^。；;]*?(?:提升|增长|完成|达到|获得|从|至|到)[^。；;]*/)?.[0] ?? "取得了用户已提供的阶段性结果";
  return "推动相关结果达到【可补充数据】";
}

export function optimizeResumeExpression(input: ResumeExpressionInput): ResumeExpressionResult {
  const targetRole = input.targetRole.trim() || "目标岗位";
  const experience = input.experience.trim();
  const keywords = Array.from(new Set([...splitAbilities(input.ability), "岗位匹配", "结果意识"])).slice(0, 6);
  const action = experience.length > 50 ? "围绕任务目标拆解流程、整理信息并推进落地" : "参与相关任务执行与内容整理";
  const resultText = extractResultText(experience);
  const hasTargetRole = Boolean(input.targetRole.trim());
  const quantScore = hasNumbers(experience) ? 85 : 45;

  return {
    diagnosis: hasTargetRole
      ? "原表达需要进一步补齐任务背景、具体动作、能力指向和结果描述。建议按照“做了什么、怎么做、体现什么能力、带来什么价值”的结构重写。"
      : "建议补充目标岗位，这样可以让表达更匹配招聘要求。当前先按通用求职表达处理。",
    keywords,
    template: `适合${input.scenario || "求职场景"}的表达模板：
负责【任务/项目】中的【具体工作】，围绕【目标/对象】完成【动作 1】、【动作 2】和【动作 3】，体现【能力关键词】，并帮助【团队/项目/用户】获得【结果或价值】。`,
    resumeVersion: `面向${targetRole}，${action}，结合${keywords.slice(0, 3).join("、")}等能力，完成相关内容梳理、表达优化与信息传达，${resultText}。`,
    interviewVersion: `Situation：我参与了${experience || "一段需要进一步补充背景的项目经历"}。
Task：我的目标是围绕${targetRole}要求，把任务拆清楚并产出可使用的结果。
Action：我主要通过${keywords.slice(0, 3).join("、")}推进工作，先理解目标，再整理信息、优化表达并跟进落地。
Result：${resultText}。如果需要投递简历，建议补充真实数据后再使用。`,
    selfIntroVersion: `我有一段与${targetRole}相关的经历：${experience || "【请补充具体经历】"}。这段经历中，我主要体现了${keywords.slice(0, 3).join("、")}，能够把零散任务整理成清晰步骤，并关注最终结果。若用于正式求职，我会进一步补充真实数据，例如规模、周期、增长或产出结果。`,
    diagnostics: [
      { label: "亮点提炼", score: experience.length > 20 ? 78 : 55, suggestion: "建议突出你本人负责的动作和独立贡献。" },
      { label: "量化程度", score: quantScore, suggestion: hasNumbers(experience) ? "已有一定数据基础，可继续补充周期和规模。" : "原文缺少具体数据，已使用【可补充数据】占位。" },
      { label: "岗位匹配", score: hasTargetRole ? 80 : 50, suggestion: hasTargetRole ? "已根据目标岗位调整表达。" : "建议补充目标岗位，这样可以让表达更匹配招聘要求。" },
      { label: "表达专业度", score: 82, suggestion: "建议使用动作动词开头，并保留真实结果。" },
    ],
    safetyNotice: "未在原文中出现的数据，请勿直接使用。建议补充真实数据后再投递简历。",
    targetRoleSuggestion: hasTargetRole ? undefined : "建议补充目标岗位，这样可以让表达更匹配招聘要求。",
  };
}
