"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ResultCard } from "@/components/ResultCard";
import { Textarea } from "@/components/Textarea";
import { ToolShell } from "@/components/ToolShell";
import { optimizeResumeExpression, type ResumeExpressionResult } from "@/lib/resume-expression";

const example = {
  targetRole: "AI 内容运营",
  experience: "我在学校社团负责写推文，也会做活动宣传。",
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

  function generate(payload = { targetRole, experience, ability, scenario }) {
    if (!payload.experience.trim()) {
      setError("请先输入内容");
      return;
    }
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setResult(optimizeResumeExpression(payload));
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
${result.interviewVersion}`
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
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-[#1E6F5C] focus:ring-4 focus:ring-[#E0F2F1]"
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
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-[#1E6F5C] focus:ring-4 focus:ring-[#E0F2F1]"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-900">
              输出场景
              <select
                value={scenario}
                onChange={(event) => setScenario(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-[#1E6F5C] focus:ring-4 focus:ring-[#E0F2F1]"
              >
                <option>简历 bullet</option>
                <option>面试回答</option>
                <option>自我介绍</option>
                <option>作品集说明</option>
              </select>
            </label>
          </div>
          {error ? <p className="mt-3 text-sm font-medium text-rose-600">{error}</p> : null}
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
            <ResultCard title="可突出的能力关键词">
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((item) => (
                  <span key={item} className="rounded-md bg-[#E0F2F1] px-3 py-1 text-sm font-medium text-[#0F3D3E]">
                    {item}
                  </span>
                ))}
              </div>
            </ResultCard>
            <ResultCard title="优化表达模板" copyText={result.template}>
              <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4">{result.template}</pre>
            </ResultCard>
            <ResultCard title="简历版表达" copyText={result.resumeVersion}>
              <p>{result.resumeVersion}</p>
            </ResultCard>
            <ResultCard title="面试版表达" copyText={result.interviewVersion}>
              <p>{result.interviewVersion}</p>
            </ResultCard>
          </div>
        ) : (
          <EmptyState title="等待优化经历" description="输入目标岗位和普通经历后，生成诊断、能力关键词、简历版和面试版表达。" />
        )
      }
    />
  );
}
