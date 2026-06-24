"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ResultCard } from "@/components/ResultCard";
import { Textarea } from "@/components/Textarea";
import { ToolShell } from "@/components/ToolShell";
import { rewriteModes, rewritePrompt, type RewriteMode, type RewriterResult } from "@/lib/prompt-rewriter";

const example = "帮我修改简历";

export default function PromptRewriterPage() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<RewriteMode>("求职准备");
  const [result, setResult] = useState<RewriterResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function generate(value = input, selectedMode = mode) {
    if (!value.trim()) {
      setError("请先输入内容");
      return;
    }
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setResult(rewritePrompt(value, selectedMode));
      setLoading(false);
    }, 400);
  }

  function clearAll() {
    setInput("");
    setResult(null);
    setError("");
  }

  return (
    <ToolShell
      title="Prompt 优化改写器"
      badge="Prompt 工具"
      description="输入一句简单 Prompt，选择优化方向，生成基础优化版、专业增强版和可复用模板版。"
      input={
        <Card>
          <label className="text-sm font-semibold text-slate-900" htmlFor="rewrite-input">
            原始 Prompt
          </label>
          <Textarea id="rewrite-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="例如：帮我修改简历" />
          <label className="mt-4 block text-sm font-semibold text-slate-900" htmlFor="rewrite-mode">
            优化方向
          </label>
          <select
            id="rewrite-mode"
            value={mode}
            onChange={(event) => setMode(event.target.value as RewriteMode)}
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-[#1E6F5C] focus:ring-4 focus:ring-[#E0F2F1]"
          >
            {rewriteModes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          {error ? <p className="mt-3 text-sm font-medium text-rose-600">{error}</p> : null}
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Button type="button" onClick={() => generate()} disabled={loading}>
              {loading ? "生成中..." : "生成改写"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setInput(example);
                setMode("求职准备");
                generate(example, "求职准备");
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
            <ResultCard title="基础优化版" copyText={result.basic}>
              <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4">{result.basic}</pre>
            </ResultCard>
            <ResultCard title="专业增强版" copyText={result.advanced}>
              <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4">{result.advanced}</pre>
            </ResultCard>
            <ResultCard title="可复用模板版" copyText={result.template}>
              <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4">{result.template}</pre>
            </ResultCard>
          </div>
        ) : (
          <EmptyState title="等待改写" description="输入普通 Prompt 并选择方向后，会生成三个可复制版本。" />
        )
      }
    />
  );
}
