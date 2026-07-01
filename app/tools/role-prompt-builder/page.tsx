"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ResultCard } from "@/components/ResultCard";
import { ToolShell } from "@/components/ToolShell";
import { buildRolePrompt, outputFormats, roleTypes, taskTypes, toneTypes, type RolePromptInput, type RolePromptResult } from "@/lib/role-prompt-builder";
import { recordToolUsage } from "@/lib/tool-usage";

export default function RolePromptBuilderPage() {
  const [form, setForm] = useState<RolePromptInput>({
    role: "中文编辑",
    task: "修改文章",
    tone: "简洁",
    format: "Markdown",
  });
  const [result, setResult] = useState<RolePromptResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    recordToolUsage({ title: "角色提示词生成器", href: "/tools/role-prompt-builder" });
  }, []);

  function update<K extends keyof RolePromptInput>(key: K, value: RolePromptInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function generate() {
    setLoading(true);
    window.setTimeout(() => {
      setResult(buildRolePrompt(form));
      recordToolUsage({ title: "角色提示词生成器", href: "/tools/role-prompt-builder" });
      setLoading(false);
    }, 350);
  }

  function clearAll() {
    setForm({ role: "中文编辑", task: "修改文章", tone: "简洁", format: "Markdown" });
    setResult(null);
  }

  const fields = [
    { label: "角色类型", key: "role", options: roleTypes },
    { label: "任务类型", key: "task", options: taskTypes },
    { label: "语气风格", key: "tone", options: toneTypes },
    { label: "输出格式", key: "format", options: outputFormats },
  ] as const;

  return (
    <ToolShell
      title="角色提示词生成器"
      badge="Prompt 工具"
      description="通过选择角色、任务、语气和输出格式，生成一个可复制的 System Prompt。"
      input={
        <Card>
          <div className="grid gap-4">
            {fields.map((field) => (
              <label key={field.key} className="block text-sm font-semibold text-slate-900">
                {field.label}
                <select
                  value={form[field.key]}
                  onChange={(event) => update(field.key, event.target.value as never)}
                  className="heyao-focus mt-2 w-full rounded-2xl border border-[#D8E7E1] bg-white/90 px-3 py-3 text-sm text-slate-900 outline-none focus:border-[#0B6B5E]"
                >
                  {field.options.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button type="button" onClick={generate} disabled={loading}>
              {loading ? "生成中..." : "生成 System Prompt"}
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
            <ResultCard title="角色卡片" copyText={result.roleCard}>
              <pre className="whitespace-pre-wrap rounded-2xl border border-[#D8E7E1] bg-[#FBFDFB] p-4">{result.roleCard}</pre>
            </ResultCard>
            <ResultCard title="系统提示词" copyText={result.systemPrompt}>
              <pre className="whitespace-pre-wrap rounded-2xl border border-[#D8E7E1] bg-[#FBFDFB] p-4">{result.systemPrompt}</pre>
            </ResultCard>
            <ResultCard title="示例开场白" copyText={result.opener}>
              <pre className="whitespace-pre-wrap rounded-2xl border border-[#D8E7E1] bg-[#FBFDFB] p-4">{result.opener}</pre>
            </ResultCard>
            <ResultCard title="使用边界" copyText={result.boundaries}>
              <pre className="whitespace-pre-wrap rounded-2xl border border-[#D8E7E1] bg-[#FBFDFB] p-4">{result.boundaries}</pre>
            </ResultCard>
            <ResultCard title="复制全部" copyText={result.all}>
              <p>包含角色卡片、系统提示词、示例开场白和使用边界，适合一次性保存到自己的 Prompt 模板库。</p>
            </ResultCard>
          </div>
        ) : (
          <EmptyState title="等待生成角色提示词" description="选择角色、任务、语气和输出格式后，生成可复用的 System Prompt。" />
        )
      }
    />
  );
}
