"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ResultCard } from "@/components/ResultCard";
import { Textarea } from "@/components/Textarea";
import { ToolShell } from "@/components/ToolShell";
import { cleanText, type CleanTextResult } from "@/lib/text-cleaner";

const example = `  这是一段   从网页复制来的文字。


    它可能有多余空格、重复换行，
  还有每一行开头的空格。`;

export default function TextCleanerPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<CleanTextResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function generate(value = input) {
    if (!value.trim()) {
      setError("请先输入内容");
      return;
    }
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setResult(cleanText(value));
      setLoading(false);
    }, 300);
  }

  function clearAll() {
    setInput("");
    setResult(null);
    setError("");
  }

  return (
    <ToolShell
      title="文本清洗工具"
      badge="文本工具"
      description="粘贴一段混乱文本，快速清理多余空格、重复换行和杂乱格式。"
      input={
        <Card>
          <label className="text-sm font-semibold text-slate-900" htmlFor="cleaner-input">
            原始文本
          </label>
          <Textarea id="cleaner-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="粘贴需要清洗的文本" />
          {error ? <p className="mt-3 text-sm font-medium text-rose-600">{error}</p> : null}
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Button type="button" onClick={() => generate()} disabled={loading}>
              {loading ? "生成中..." : "清洗文本"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setInput(example);
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
            <Card>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-[#E0F2F1] p-4">
                  <p className="text-xs text-[#1E6F5C]">原文字数</p>
                  <p className="mt-1 text-2xl font-bold text-[#0F3D3E]">{result.originalCount}</p>
                </div>
                <div className="rounded-lg bg-[#F1F5F9] p-4">
                  <p className="text-xs text-slate-500">清洗后字数</p>
                  <p className="mt-1 text-2xl font-bold text-slate-950">{result.cleanedCount}</p>
                </div>
              </div>
            </Card>
            <ResultCard title="清洗后文本" copyText={result.cleanedText}>
              <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4">{result.cleanedText}</pre>
            </ResultCard>
          </div>
        ) : (
          <EmptyState title="等待清洗" description="粘贴文本后，系统会保留原意并清理空格、换行和行首格式。" />
        )
      }
    />
  );
}
