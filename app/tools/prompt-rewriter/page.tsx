"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/Textarea";
import {
  analyzePromptHealth,
  promptExamples,
  rewriteModeDetails,
  rewritePrompt,
  type PromptHealthItem,
  type RewriteMode,
  type RewriterResult,
} from "@/lib/prompt-rewriter";

type HistoryRecord = {
  id: string;
  input: string;
  mode: RewriteMode;
  createdAt: string;
  result: RewriterResult;
  health: PromptHealthItem[];
};

type LegacyRewriterResult = Partial<RewriterResult> & {
  ready?: string;
  deep?: string;
};

const historyKey = "heyao_prompt_rewriter_history";

const resultCards: Array<{
  key: keyof RewriterResult;
  title: string;
  description: string;
  copyLabel: string;
}> = [
  {
    key: "basic",
    title: "基础优化版",
    description: "保留原始需求，补全任务目标、背景和输出格式，适合直接复制使用。",
    copyLabel: "复制基础版",
  },
  {
    key: "advanced",
    title: "专业增强版",
    description: "加入动态角色、步骤化要求、约束条件和输出格式，更适合复杂任务。",
    copyLabel: "复制专业版",
  },
  {
    key: "template",
    title: "可复用模板版",
    description: "把具体内容抽成变量，方便下次重复使用。",
    copyLabel: "复制模板",
  },
];

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function normalizeRewriterResult(result: LegacyRewriterResult): RewriterResult {
  return {
    basic: result.basic ?? result.ready ?? "",
    advanced: result.advanced ?? result.deep ?? "",
    template: result.template ?? "",
  };
}

function normalizeHistoryRecord(record: HistoryRecord & { result: LegacyRewriterResult }): HistoryRecord {
  return {
    ...record,
    result: normalizeRewriterResult(record.result),
  };
}

function PromptHealthCard({ items }: { items: PromptHealthItem[] }) {
  return (
    <Card>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-950">Prompt 体检</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          先看这句 Prompt 是否包含关键要素，再决定如何补全。
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.key} className="rounded-lg border border-slate-200 bg-[#F8FAF7] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">{item.label}</p>
              <span
                className={`rounded-md px-2 py-1 text-xs font-semibold ${
                  item.included ? "bg-[#E0F2F1] text-[#0F3D3E]" : "bg-amber-100 text-amber-800"
                }`}
              >
                {item.included ? "已包含" : "建议补充"}
              </span>
            </div>
            {!item.included ? <p className="mt-3 text-xs leading-5 text-slate-500">{item.suggestion}</p> : null}
          </div>
        ))}
      </div>
    </Card>
  );
}

function RewriterResultCard({
  title,
  description,
  text,
  copyLabel,
}: {
  title: string;
  description: string;
  text: string;
  copyLabel: string;
}) {
  return (
    <Card>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-950">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
        </div>
        <CopyButton text={text} idleLabel={copyLabel} className="w-full sm:w-auto" />
      </div>
      <pre className="max-h-[620px] overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm leading-7 text-slate-800">
        {text}
      </pre>
    </Card>
  );
}

function WaitingState() {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#E0F2F1] text-sm font-bold text-[#0F3D3E]">
          河
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-950">等待诊断改写</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            输入一个普通 Prompt，选择优化方向后，河妖会生成三个可复制版本，并提示这个 Prompt 还缺少哪些关键信息。
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-3">
        {resultCards.map((card) => (
          <div key={card.key} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="h-4 w-28 rounded bg-slate-200" />
            <div className="mt-3 h-3 w-full rounded bg-slate-100" />
            <div className="mt-2 h-3 w-2/3 rounded bg-slate-100" />
            <p className="mt-4 text-sm font-semibold text-slate-400">{card.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PromptRewriterPage() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<RewriteMode>("通用增强");
  const [result, setResult] = useState<RewriterResult | null>(null);
  const [health, setHealth] = useState<PromptHealthItem[]>([]);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(historyKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Array<HistoryRecord & { result: LegacyRewriterResult }>;
        setHistory(parsed.map(normalizeHistoryRecord));
      }
    } catch {
      setHistory([]);
    }
  }, []);

  const selectedMode = useMemo(() => rewriteModeDetails.find((item) => item.name === mode), [mode]);

  function saveHistory(record: HistoryRecord) {
    const nextHistory = [record, ...history.filter((item) => item.id !== record.id)].slice(0, 5);
    setHistory(nextHistory);
    window.localStorage.setItem(historyKey, JSON.stringify(nextHistory));
  }

  function generate(value = input, selected = mode) {
    const trimmed = value.trim();
    if (!trimmed) {
      setError("请先输入内容");
      return;
    }

    setError("");
    setLoading(true);
    window.setTimeout(() => {
      const nextHealth = analyzePromptHealth(trimmed);
      const nextResult = rewritePrompt(trimmed, selected);
      const record: HistoryRecord = {
        id: createId(),
        input: trimmed,
        mode: selected,
        createdAt: new Date().toISOString(),
        result: nextResult,
        health: nextHealth,
      };

      setInput(trimmed);
      setMode(selected);
      setHealth(nextHealth);
      setResult(nextResult);
      saveHistory(record);
      setLoading(false);
    }, 400);
  }

  function restoreHistory(record: HistoryRecord) {
    const normalized = normalizeHistoryRecord(record);
    setInput(normalized.input);
    setMode(normalized.mode);
    setResult(normalized.result);
    setHealth(normalized.health);
    setError("");
  }

  function clearAll() {
    setInput("");
    setResult(null);
    setHealth([]);
    setError("");
  }

  function clearHistory() {
    setHistory([]);
    window.localStorage.removeItem(historyKey);
  }

  return (
    <main className="bg-[#F8FAF7]">
      <section className="mx-auto max-w-[1200px] px-5 py-10">
        <div className="mb-8 max-w-4xl">
          <span className="inline-flex rounded-md border border-[#B6D8D2] bg-[#E0F2F1] px-3 py-1 text-sm font-semibold text-[#0F3D3E]">
            Prompt 工具
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Prompt 诊断改写器</h1>
          <p className="mt-4 text-lg font-semibold leading-8 text-[#0F3D3E]">
            把一句模糊 Prompt 改成可直接复制给 ChatGPT、Kimi、豆包、Claude 的结构化提示词。
          </p>
          <p className="mt-3 text-base leading-7 text-slate-600">
            适合论文分析、简历优化、内容创作、学习计划、面试准备和结构化输出。
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <div className="space-y-5">
            <Card>
              <label className="text-sm font-semibold text-slate-900" htmlFor="rewrite-input">
                输入你的原始 Prompt
              </label>
              <Textarea
                id="rewrite-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="例如：帮我分析这篇论文，告诉我核心观点和创新点。"
              />

              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold text-slate-500">快速示例</p>
                <div className="flex flex-wrap gap-2">
                  {promptExamples.map((example) => (
                    <button
                      key={example.label}
                      type="button"
                      onClick={() => {
                        setInput(example.value);
                        setError("");
                      }}
                      className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-[#1E6F5C] hover:bg-[#E0F2F1] hover:text-[#0F3D3E]"
                    >
                      {example.label}
                    </button>
                  ))}
                </div>
              </div>

              {error ? <p className="mt-3 text-sm font-medium text-rose-600">{error}</p> : null}

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Button type="button" onClick={() => generate()} disabled={loading}>
                  {loading ? "生成中..." : "开始诊断并改写"}
                </Button>
                <Button type="button" variant="ghost" onClick={clearAll}>
                  清空
                </Button>
              </div>
            </Card>

            <Card>
              <div className="mb-4">
                <h2 className="text-lg font-bold text-slate-950">选择优化方向</h2>
                <p className="mt-1 text-sm text-slate-500">{selectedMode?.description}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {rewriteModeDetails.map((item) => {
                  const selected = item.name === mode;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setMode(item.name)}
                      className={`rounded-lg border p-4 text-left transition ${
                        selected
                          ? "border-[#0F3D3E] bg-[#0F3D3E] text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-700 hover:border-[#1E6F5C] hover:bg-[#E0F2F1]"
                      }`}
                    >
                      <span className="block text-sm font-bold">{item.name}</span>
                      <span className={`mt-2 block text-xs leading-5 ${selected ? "text-[#E0F2F1]" : "text-slate-500"}`}>
                        {item.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">最近生成</h2>
                  <p className="mt-1 text-sm text-slate-500">本地保存最近 5 次，不登录、不上传。</p>
                </div>
                <Button type="button" variant="ghost" onClick={clearHistory} disabled={!history.length}>
                  清空历史
                </Button>
              </div>
              {history.length ? (
                <div className="space-y-3">
                  {history.map((record) => (
                    <button
                      key={record.id}
                      type="button"
                      onClick={() => restoreHistory(record)}
                      className="w-full rounded-lg border border-slate-200 bg-[#F8FAF7] p-4 text-left transition hover:border-[#1E6F5C] hover:bg-[#E0F2F1]"
                    >
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="rounded-md bg-white px-2 py-1 font-semibold text-[#0F3D3E]">{record.mode}</span>
                        <span>{formatTime(record.createdAt)}</span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-slate-800">{record.input}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="rounded-lg border border-dashed border-slate-300 bg-[#F8FAF7] p-4 text-sm text-slate-500">
                  暂无历史记录。生成一次后会自动保存在这里。
                </p>
              )}
            </Card>
          </div>

          <div className="space-y-5">
            {result ? (
              <>
                <PromptHealthCard items={health} />
                {resultCards.map((card) => (
                  <RewriterResultCard
                    key={card.key}
                    title={card.title}
                    description={card.description}
                    text={result[card.key]}
                    copyLabel={card.copyLabel}
                  />
                ))}
              </>
            ) : (
              <WaitingState />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
