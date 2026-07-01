"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ResultCard } from "@/components/ResultCard";
import { Textarea } from "@/components/Textarea";
import { ToolShell } from "@/components/ToolShell";
import { optimizeResumeExpression, type ResumeExpressionResult } from "@/lib/resume-expression";
import { recordToolUsage } from "@/lib/tool-usage";

const example = {
  targetRole: "AI 内容运营",
  experience: "我在学校社团负责公众号推文选题、撰写和排版，也参与活动宣传。曾把一次活动推文阅读量从几百提升到两千左右。",
  ability: "内容策划、中文写作、活动传播、用户理解",
  scenario: "简历 bullet",
};

export default function ResumeExpressionPage() {
  const [targetRole, setTargetRole] = useState("");
  const [experience, setExperience] = useState("");
  const [ability, setAbility] = useState("");
  const [scenario, setScenario] = useState("简历 bullet");
  const [result, setResult] = useState<ResumeExpressionResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    recordToolUsage({ title: "求职表达优化器", href: "/tools/resume-expression" });
  }, []);

  function generate(payload = { targetRole, experience, ability, scenario }) {
    if (!payload.experience.trim()) {
      setError("请先输入内容");
      return;
    }
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setResult(optimizeResumeExpression(payload));
      recordToolUsage({ title: "求职表达优化器", href: "/tools/resume-expression" });
      setLoading(false);
    }, 450);
  }

  function clearAll() {
    setTargetRole("");
    setExperience("");
    setAbility("");
    setScenario("简历 bullet");
    setResult(null);
    setError("");
  }

  const copyText = result
    ? `经历问题诊断：
${result.diagnosis}

可突出的能力关键词：
${result.keywords.map((item) => `- ${item}`).join("\n")}

优化表达模板：
${result.template}

简历版表达：
${result.resumeVersion}

面试版表达：
${result.interviewVersion}

自我介绍版：
${result.selfIntroVersion}

安全提示：
${result.safetyNotice}`
    : "";

  return (
    <ToolShell
      title="简历 / 求职表达优化器"
      badge="求职工具"
      description="输入一段普通经历，系统帮助整理成更适合简历或面试使用的表达。"
      input={
        <Card>
          <div className="grid gap-4">
            <label className="block text-sm font-semibold text-slate-900">
              目标岗位
              <input
                value={targetRole}
                onChange={(event) => setTargetRole(event.target.value)}
                placeholder="例如：AI 内容运营"
                className="heyao-focus mt-2 w-full rounded-2xl border border-[#D8E7E1] bg-white/90 px-3 py-3 text-sm outline-none focus:border-[#0B6B5E]"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-900">
              原始经历
              <Textarea value={experience} onChange={(event) => setExperience(event.target.value)} placeholder="例如：我在学校社团负责写推文，也会做活动宣传。" />
            </label>
            <label className="block text-sm font-semibold text-slate-900">
              想突出能力
              <input
                value={ability}
                onChange={(event) => setAbility(event.target.value)}
                placeholder="例如：内容策划、中文写作、活动传播"
                className="heyao-focus mt-2 w-full rounded-2xl border border-[#D8E7E1] bg-white/90 px-3 py-3 text-sm outline-none focus:border-[#0B6B5E]"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-900">
              输出场景
              <select
                value={scenario}
                onChange={(event) => setScenario(event.target.value)}
                className="heyao-focus mt-2 w-full rounded-2xl border border-[#D8E7E1] bg-white/90 px-3 py-3 text-sm outline-none focus:border-[#0B6B5E]"
              >
                <option>简历 bullet</option>
                <option>面试回答</option>
                <option>自我介绍</option>
                <option>作品集说明</option>
              </select>
            </label>
          </div>
          {error ? <p className="mt-3 text-sm font-medium text-rose-600">{error}</p> : null}
          {!targetRole.trim() ? (
            <p className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              建议补充目标岗位，这样可以让表达更匹配招聘要求。
            </p>
          ) : null}
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Button type="button" onClick={() => generate()} disabled={loading}>
              {loading ? "生成中..." : "优化表达"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setTargetRole(example.targetRole);
                setExperience(example.experience);
                setAbility(example.ability);
                setScenario(example.scenario);
                generate(example);
              }}
            >
              填入示例
            </Button>
            <Button type="button" variant="ghost" onClick={clearAll}>
              清空
            </Button>
          </div>
        </Card>
      }
      result={
        result ? (
          <div className="space-y-5">
            <ResultCard title="完整结果" copyText={copyText}>
              <p>{result.diagnosis}</p>
            </ResultCard>
            <ResultCard title="表达诊断">
              <div className="grid gap-3 sm:grid-cols-2">
                {result.diagnostics.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-[#D8E7E1] bg-[#FBFDFB] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-bold text-slate-900">{item.label}</h3>
                      <span className="text-sm font-bold text-[#063F3A]">{item.score}/100</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.suggestion}</p>
                  </div>
                ))}
              </div>
            </ResultCard>
            <ResultCard title="可突出的能力关键词">
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((item) => (
                  <span key={item} className="rounded-xl border border-[#BFDCD4] bg-[#E6F6F0] px-3 py-1 text-sm font-medium text-[#063F3A]">
                    {item}
                  </span>
                ))}
              </div>
            </ResultCard>
            <ResultCard title="优化表达模板" copyText={result.template}>
              <pre className="whitespace-pre-wrap rounded-2xl border border-[#D8E7E1] bg-[#FBFDFB] p-4">{result.template}</pre>
            </ResultCard>
            <ResultCard title="简历版表达" copyText={result.resumeVersion}>
              <p>{result.resumeVersion}</p>
            </ResultCard>
            <ResultCard title="面试版表达" copyText={result.interviewVersion}>
              <pre className="whitespace-pre-wrap rounded-2xl border border-[#D8E7E1] bg-[#FBFDFB] p-4">{result.interviewVersion}</pre>
            </ResultCard>
            <ResultCard title="自我介绍版" copyText={result.selfIntroVersion}>
              <p>{result.selfIntroVersion}</p>
            </ResultCard>
            <ResultCard title="安全提示">
              <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{result.safetyNotice}</p>
            </ResultCard>
          </div>
        ) : (
          <EmptyState title="等待优化经历" description="输入目标岗位和普通经历后，生成诊断、能力关键词、简历版和面试版表达。" />
        )
      }
    />
  );
}
