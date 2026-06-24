"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ResultCard } from "@/components/ResultCard";
import { ScoreBar } from "@/components/ScoreBar";
import { Textarea } from "@/components/Textarea";
import { ToolShell } from "@/components/ToolShell";
import { analyzePrompt, type PromptAnalysisResult } from "@/lib/prompt-analysis";

const example = "帮我写一篇小红书文案";

export default function PromptDiagnosisPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<PromptAnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function runAnalysis(value = input) {
    if (!value.trim()) {
      setError("请先输入内容");
      return;
    }
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setResult(analyzePrompt(value));
      setLoading(false);
    }, 400);
  }

  function clearAll() {
    setInput("");
    setResult(null);
    setError("");
  }

  const copyText = result
    ? `综合评分：${result.totalScore} / 100
评级：${result.level}
问题说明：${result.summary}
补充建议：
${result.suggestions.map((item, index) => `${index + 1}. ${item}`).join("\n")}

优化后 Prompt：
${result.optimizedPrompt}`
    : "";

  return (
    <ToolShell
      title="Prompt 语义诊断器"
      badge="Prompt 工具"
      description="输入一段常用 Prompt，检查它是否缺少任务目标、背景变量、输出格式或约束条件。"
      input={
        <Card>
          <label className="text-sm font-semibold text-slate-900" htmlFor="prompt-input">
            原始 Prompt
          </label>
          <Textarea id="prompt-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="例如：帮我写一篇小红书文案" />
          {error ? <p className="mt-3 text-sm font-medium text-rose-600">{error}</p> : null}
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Button type="button" onClick={() => runAnalysis()} disabled={loading}>
              {loading ? "生成中..." : "开始诊断"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setInput(example);
                runAnalysis(example);
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
            <ResultCard title={`综合评分：${result.totalScore} / 100 · ${result.level}`} copyText={copyText}>
              <p>{result.summary}</p>
            </ResultCard>
            <div className="grid gap-3 sm:grid-cols-2">
              {result.dimensions.map((item) => (
                <ScoreBar key={item.label} item={item} />
              ))}
            </div>
            <ResultCard title="补充建议">
              <ol className="list-decimal space-y-2 pl-5">
                {result.suggestions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </ResultCard>
            <ResultCard title="优化后 Prompt" copyText={result.optimizedPrompt}>
              <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm leading-7 text-slate-800">{result.optimizedPrompt}</pre>
            </ResultCard>
          </div>
        ) : (
          <EmptyState title="等待诊断" description="输入一段 Prompt 后，系统会给出五维评分、问题说明和优化版本。" />
        )
      }
    />
  );
}
