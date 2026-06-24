import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";

export default function AboutPage() {
  return (
    <main className="bg-[#F8FAF7]">
      <section className="mx-auto max-w-[900px] px-5 py-12">
        <SectionTitle
          eyebrow="关于"
          title="关于河妖 HeYao Tools"
          description="一个为个人学习、写作、求职和 AI 使用场景搭建的中文效率工具箱。"
        />
        <Card>
          <div className="space-y-4 text-sm leading-7 text-slate-600">
            <p>
              河妖 HeYao Tools 是我为自己搭建的一个中文 AI 效率工具箱。它的出发点很简单：把我在学习、写作、求职和使用 AI 时经常重复做的事情，整理成一个可以随时打开使用的网站。
            </p>
            <p>
              我希望它能帮我更快完成 Prompt 设计、文本清洗、内容整理、简历表达和面试准备，也希望通过持续迭代，让它慢慢变成一个真正适合自己工作流的个人工具台。
            </p>
            <p>
              我关注中文表达、文本结构、AI 工具使用和个人效率提升。这个网站也是我把语言能力、工具思维和前端实现结合起来的一次实践。
            </p>
          </div>
        </Card>
      </section>
    </main>
  );
}
