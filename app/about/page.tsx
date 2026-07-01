import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

const people = ["经常使用 AI 提问的人", "需要整理中文文本的学生和创作者", "正在准备简历和面试的求职者", "想把重复工作工具化的个人用户"];
const notFor = ["替代专业法律、医疗、金融判断", "编造简历数据或虚假经历", "保存敏感隐私材料的云端系统", "一次性解决所有办公场景的综合平台"];

export default function AboutPage() {
  return (
    <main className="heyao-page">
      <section className="mx-auto max-w-[960px] px-5 py-12">
        <SectionTitle
          eyebrow="关于"
          title="关于河妖 HeYao Tools"
          description="一个面向中文学习、写作、求职和 AI 提问场景的个人效率工具箱。"
        />

        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-bold text-slate-950">河妖是什么</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              河妖 HeYao Tools 是一个个人中文 AI 效率工具箱。它把 Prompt 诊断改写、角色提示词生成、文本清洗和求职表达这些高频任务做成独立工具，让用户能更快输入、检查、修改和复制结果。
            </p>
          </Card>

          <Card>
            <h2 className="text-lg font-bold text-slate-950">为什么做这个工具</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              我在使用 AI 学习、写作和准备求职材料时，发现很多流程会反复出现：写 Prompt、补充角色、整理文本、改写经历、复制到不同平台。河妖的目标是把这些重复流程变成稳定、清爽、可复用的小工具。
            </p>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h2 className="text-lg font-bold text-slate-950">适合哪些人</h2>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
                {people.map((item) => (
                  <p key={item}>- {item}</p>
                ))}
              </div>
            </Card>
            <Card>
              <h2 className="text-lg font-bold text-slate-950">不适合哪些场景</h2>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
                {notFor.map((item) => (
                  <p key={item}>- {item}</p>
                ))}
              </div>
            </Card>
          </div>

          <Card>
            <h2 className="text-lg font-bold text-slate-950">如何反馈问题</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              如果你发现某个工具生成结果不准、文案不自然、页面不好用，最有帮助的反馈是：输入内容、选择的工具或模式、期望结果、实际结果。这样后续可以更快修复规则和模板。
            </p>
          </Card>

          <Card>
            <h2 className="text-lg font-bold text-slate-950">更新计划</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
              <p>- 继续优化 Prompt 生成质量，让结果更像可直接使用的工作流。</p>
              <p>- 增加更真实的本地历史、收藏和模板沉淀能力。</p>
              <p>- 持续检查工具输出是否存在虚构、空泛或不适合中文场景的问题。</p>
              <p>- 若未来加入账号、云端历史或付费功能，会先明确隐私和数据用途。</p>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
