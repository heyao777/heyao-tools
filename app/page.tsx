import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { ToolCard } from "@/components/ToolCard";
import { tools } from "@/data/tools";

const scenes = ["写 Prompt", "优化 Prompt", "清洗复制文本", "整理简历经历", "准备面试回答", "生成结构化内容"];
const workflow = ["输入零散内容", "选择处理工具", "系统结构化分析", "生成可复制结果", "继续用于 AI / 文档 / 简历"];

export default function Home() {
  return (
    <main className="bg-[#F8FAF7]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-center">
          <div>
            <Badge>个人中文 AI 效率工具箱</Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">河妖 HeYao Tools</h1>
            <p className="mt-4 text-xl font-semibold text-[#0F3D3E]">一个为自己打造的中文 AI 效率工具箱。</p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              把日常学习、写作、求职和 AI 提问中反复出现的任务，整理成一个可以随时打开、快速输入、直接复制结果的个人工作台。
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#tools" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#0F3D3E] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1E6F5C]">
                开始使用
              </Link>
              <Link href="/case-study" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#B6D8D2] bg-white px-5 py-2 text-sm font-semibold text-[#0F3D3E] hover:bg-[#E0F2F1]">
                查看设计说明
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-[#B6D8D2] bg-[#E0F2F1] p-5">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <p className="text-xs font-semibold text-[#1E6F5C]">今日常用流程</p>
                  <p className="mt-1 text-lg font-bold text-slate-950">Prompt 诊断与改写</p>
                </div>
                <span className="rounded-md bg-[#D6B56D]/20 px-2.5 py-1 text-xs font-semibold text-[#7A5A11]">MVP</span>
              </div>
              <div className="mt-4 space-y-3">
                {workflow.map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0F3D3E] text-xs font-bold text-white">{index + 1}</span>
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-[1200px] px-5 py-12">
        <SectionTitle
          eyebrow="高频工具入口"
          title="把重复任务固定成可以点击的工具"
          description="第一版先覆盖 Prompt、文本清洗和求职表达三类高频场景，所有结果都可以复制到 ChatGPT、Kimi、豆包、文档或简历里继续使用。"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.href} tool={tool} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12">
          <SectionTitle eyebrow="使用场景" title="围绕学习、写作、求职和 AI 提问" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {scenes.map((scene) => (
              <div key={scene} className="rounded-lg border border-slate-200 bg-[#F8FAF7] px-4 py-3 text-sm font-semibold text-slate-700">
                {scene}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <SectionTitle eyebrow="方法说明" title="Prompt = 角色 + 任务 + 背景 + 变量 + 格式 + 约束" />
            <p className="text-sm leading-7 text-slate-600">
              河妖会把模糊输入拆成可检查的结构，让你知道缺少什么，也能快速拿到一个更完整的版本。
            </p>
          </Card>
          <Card>
            <SectionTitle eyebrow="后续规划" title="从 MVP 继续长成个人工作流" />
            <p className="text-sm leading-7 text-slate-600">
              后续可以增加本地模板库、历史记录、Prompt 收藏、Markdown 导出和真实 AI API，把常用流程继续沉淀下来。
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
}
