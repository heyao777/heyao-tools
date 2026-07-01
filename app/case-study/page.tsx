import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { tools } from "@/data/tools";

const principles = [
  ["中文场景优先", "优先解决中文学习、写作、求职和 AI 提问中的高频问题。"],
  ["可复制结果", "工具输出尽量能直接复制到 AI 平台、文档、简历或工作流中继续使用。"],
  ["本地优先", "当前工具优先在浏览器本地处理，不主动保存用户输入内容。"],
  ["规则透明", "MVP 阶段使用本地规则和模板，让用户能理解结果从哪里来。"],
];

const architecture = [
  "首页：说明河妖工具箱定位，并提供核心工具入口。",
  "工具箱总览：支持搜索、分类筛选、最近使用和收藏空状态。",
  "Prompt 诊断改写：识别任务、诊断缺失信息、生成可编辑 Prompt。",
  "角色生成器：生成角色卡、系统提示词、示例开场白和使用边界。",
  "文本清洗：按轻度、标准、深度模式整理文本并显示处理记录。",
  "求职表达：把经历整理成简历、面试和自我介绍版本。",
];

export default function CaseStudyPage() {
  return (
    <main className="heyao-page">
      <section className="mx-auto max-w-[1280px] px-5 py-12">
        <SectionTitle
          eyebrow="设计说明"
          title="河妖 HeYao Tools 的产品设计"
          description="这个页面记录 V1 的目标、信息架构、设计原则和隐私边界，方便后续继续迭代。"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-lg font-bold text-slate-950">产品目标</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              河妖 HeYao Tools 希望把重复的文字处理、Prompt 编写、文本清洗和求职表达流程沉淀成可点击的小工具，减少每次从零组织语言的成本。
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-slate-950">适用用户</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              适合经常使用 AI 工具的学生、内容创作者、求职者、产品学习者和需要整理中文文本的人。它不是通用办公套件，而是一个中文 AI 效率工具箱。
            </p>
          </Card>
        </div>

        <Card className="mt-6">
          <h2 className="text-lg font-bold text-slate-950">设计原则</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {principles.map(([title, content]) => (
              <div key={title} className="rounded-2xl border border-[#D8E7E1] bg-[#FBFDFB] p-4">
                <h3 className="text-sm font-bold text-[#063F3A]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{content}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <h2 className="text-lg font-bold text-slate-950">信息架构</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              {architecture.map((item) => (
                <p key={item}>- {item}</p>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-slate-950">每个工具解决的问题</h2>
            <div className="mt-4 space-y-3">
              {tools.map((tool) => (
                <div key={tool.href} className="rounded-2xl border border-[#D8E7E1] bg-[#FBFDFB] p-4">
                  <h3 className="text-sm font-bold text-slate-900">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-lg font-bold text-slate-950">隐私说明</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              当前工具优先在本地处理用户输入，不主动保存用户内容。最近使用记录仅保存在当前浏览器的 localStorage 中。若未来加入登录、云端历史或付费功能，将明确提示数据用途。
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-bold text-slate-950">后续迭代计划</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <p>- 增加更稳定的本地模板库和收藏工具。</p>
              <p>- 为更多中文场景补充专用生成逻辑。</p>
              <p>- 支持导出 Markdown、TXT 或复制为不同平台格式。</p>
              <p>- 在明确隐私边界后，再考虑云端历史和账号能力。</p>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
