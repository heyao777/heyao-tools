import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

const problems = ["Prompt 经常重复写", "文本复制后格式混乱", "简历经历表达不够清楚", "面试回答缺少结构", "常用模板散落在不同地方"];
const features = [
  ["Prompt 语义诊断器", "检查 Prompt 是否缺少关键信息"],
  ["Prompt 优化改写器", "把简单 Prompt 改成结构化 Prompt"],
  ["角色提示词生成器", "快速生成可复用 System Prompt"],
  ["文本清洗工具", "清理复制文本中的格式问题"],
  ["求职表达优化器", "把普通经历整理成更清楚的表达"],
];

export default function CaseStudyPage() {
  return (
    <main className="bg-[#F8FAF7]">
      <section className="mx-auto max-w-[1200px] px-5 py-12">
        <SectionTitle
          eyebrow="工具箱设计说明"
          title="我为什么做河妖 HeYao Tools"
          description="这个页面记录 V1 的设计思路：把高频、重复、规则相对稳定的任务工具化。"
        />
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <h2 className="text-lg font-bold text-slate-950">项目背景</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              我在学习、写作、求职准备和使用 AI 工具的过程中，发现很多任务会不断重复出现。比如，每次让 AI 修改文本时，都要重新说明角色、任务、语气和输出格式；每次准备简历和面试回答时，都要重新整理经历；每次从网页复制资料时，又要手动清理格式。
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              这些事情本身并不难，但很消耗注意力。于是我开始把这些重复流程整理成一个个人工具箱，希望以后可以更快完成输入、整理、生成和复制。
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-slate-950">我的高频问题</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {problems.map((problem) => (
                <div key={problem} className="rounded-md bg-[#E0F2F1] px-3 py-2 text-sm font-medium text-[#0F3D3E]">
                  {problem}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-lg font-bold text-slate-950">解决思路</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              河妖 HeYao Tools 的核心思路是：把高频、重复、规则相对稳定的任务工具化。我不希望每次都从零开始写 Prompt 或整理内容，而是希望通过固定工具，把任务拆成输入项、处理逻辑和输出结果。这样既能节省时间，也能让表达更稳定。
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-slate-950">技术实现</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              V1 使用 Sites vinext starter、React、TypeScript 和 Tailwind CSS 实现。当前版本优先完成页面结构、交互流程和工具逻辑，暂时不接入真实 AI API。Prompt 分析和文本处理使用前端规则模拟，方便快速验证工具箱是否真的能改善个人效率。
            </p>
          </Card>
        </div>

        <Card className="mt-6">
          <h2 className="text-lg font-bold text-slate-950">当前功能</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-3 pr-4 font-semibold">工具</th>
                  <th className="py-3 font-semibold">解决的问题</th>
                </tr>
              </thead>
              <tbody>
                {features.map(([tool, problem]) => (
                  <tr key={tool} className="border-b border-slate-100">
                    <td className="py-3 pr-4 font-semibold text-slate-900">{tool}</td>
                    <td className="py-3 text-slate-600">{problem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </main>
  );
}
