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
};

function splitAbilities(value: string) {
  const items = value
    .split(/[，,、\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length ? items : ["内容整理", "沟通协作", "结构化表达", "执行推进"];
}

export function optimizeResumeExpression(input: ResumeExpressionInput): ResumeExpressionResult {
  const targetRole = input.targetRole.trim() || "目标岗位";
  const experience = input.experience.trim();
  const keywords = Array.from(new Set([...splitAbilities(input.ability), "岗位匹配", "结果意识"])).slice(0, 6);
  const action = experience.length > 50 ? "围绕任务目标拆解流程、整理信息并推进落地" : "参与相关任务执行与内容整理";

  return {
    diagnosis: "原表达偏口语化，缺少任务背景、具体动作、能力指向和结果描述。建议按照“做了什么、怎么做、体现什么能力、带来什么价值”的结构重写。",
    keywords,
    template: `适合${input.scenario || "求职场景"}的表达模板：
负责【任务/项目】中的【具体工作】，围绕【目标/对象】完成【动作 1】、【动作 2】和【动作 3】，体现【能力关键词】，并帮助【团队/项目/用户】获得【结果或价值】。`,
    resumeVersion: `面向${targetRole}，${action}，结合${keywords.slice(0, 3).join("、")}等能力，完成相关内容梳理、表达优化与信息传达，提升任务执行和沟通效率。`,
    interviewVersion: `这段经历中，我主要负责${experience || "相关任务的执行与整理"}。为了让结果更适合${targetRole}的要求，我会先理解任务目标，再把信息拆成可执行步骤，并在过程中体现${keywords.slice(0, 3).join("、")}。这让我更熟悉从零散信息到清晰表达的完整过程，也训练了我在求职场景中说明经历价值的能力。`,
  };
}
