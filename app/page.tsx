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
    <main className="heyao-page">
      <section className="border-b border-[#D8E7E1]/70">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(340px,0.88fr)] lg:items-center">
          <div>
            <Badge>个人中文 AI 效率工具箱</Badge>
            <h1 className="mt-5 text-5xl font-bold tracking-tight text-[#07151F] sm:text-6xl">河妖 HeYao Tools</h1>
            <p className="mt-4 text-2xl font-bold text-[#063F3A]">一个为自己打造的中文 AI 效率工具箱。</p>
            <p className="mt-5 max-w-2xl text-lg leading-9 text-slate-600">
              把日常学习、写作、求职和 AI 提问中反复出现的任务，整理成一个可以随时打开、快速输入、直接复制结果的个人工作台。
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#tools" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#063F3A] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(6,63,58,0.2)] transition hover:bg-[#0B6B5E]">
                开始使用工具箱
              </Link>
              <Link href="/case-study" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#BFDCD4] bg-white/80 px-6 py-3 text-sm font-semibold text-[#063F3A] shadow-sm transition hover:bg-[#E6F6F0]">
                查看设计说明
              </Link>
            </div>
            <div className="mt-7 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
              {["中文场景优先", "隐私友好设计", "开箱即用", "持续更新迭代"].map((item) => (
                <span key={item} className="rounded-full border border-[#D8E7E1] bg-white/70 px-3 py-2 font-medium text-[#063F3A]">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-4 -top-6 h-40 w-40 rounded-full bg-[#DFF4ED] blur-3xl" />
            <div className="heyao-surface relative rounded-3xl p-6">
              <div className="flex items-center justify-between gap-3 border-b border-[#D8E7E1] pb-4">
                <div>
                  <p className="text-sm font-semibold text-[#0B6B5E]">今日推荐工具</p>
                  <p className="mt-1 text-2xl font-bold text-[#07151F]">Prompt 诊断与改写</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">帮你发现 Prompt 问题，优化表达，获得更好的 AI 回答。</p>
                </div>
                <span className="rounded-xl bg-[#F3E5C0] px-3 py-1 text-xs font-bold text-[#7A5A11]">MVP</span>
              </div>
              <div className="mt-5 grid gap-3 rounded-2xl border border-[#D8E7E1] bg-white/70 p-4">
                {workflow.map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E6F6F0] text-xs font-bold text-[#063F3A]">{index + 1}</span>
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link href="/tools/prompt-rewriter" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#063F3A] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0B6B5E]">
                  立即体验
                </Link>
                <Link href="/case-study" className="inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2 text-sm font-semibold text-[#063F3A] transition hover:bg-[#E6F6F0]">
                  了解更多
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-[1280px] px-5 py-14">
        <SectionTitle
          eyebrow="核心工具一览"
          title="把重复任务固定成可以点击的工具"
          description="第一版先覆盖 Prompt、文本清洗和求职表达三类高频场景，所有结果都可以复制到 ChatGPT、Kimi、豆包、文档或简历里继续使用。"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.href} tool={tool} />
          ))}
        </div>
      </section>

      <section className="border-y border-[#D8E7E1] bg-white/62 backdrop-blur">
        <div className="mx-auto max-w-[1280px] px-5 py-12">
          <SectionTitle eyebrow="使用场景" title="围绕学习、写作、求职和 AI 提问" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {scenes.map((scene) => (
              <div key={scene} className="heyao-soft-panel rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700">
                {scene}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-12">
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
