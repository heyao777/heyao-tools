"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CopyButton } from "@/components/CopyButton";
import { Textarea } from "@/components/Textarea";
import {
  analyzePromptHealth,
  analyzePromptInput,
  buildWorkflowSummary,
  calculatePromptScore,
  getRecommendationReason,
  getRecommendedResultKey,
  promptExamples,
  rewriteModeDetails,
  rewritePromptWorkflow,
  type PromptAnalysis,
  type PromptHealthItem,
  type RewriterResultKey,
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
  analysis: PromptAnalysis;
  recommendedKey: RewriterResultKey;
  score: number;
};

type LegacyRewriterResult = Partial<RewriterResult> & {
  ready?: string;
  deep?: string;
};

const historyKey = "heyao_prompt_rewriter_history";

const resultTabs: Array<{
  key: RewriterResultKey;
  title: string;
  description: string;
  copyLabel: string;
  usageHint: string;
}> = [
  {
    key: "basic",
    title: "基础优化版",
    description: "保留原始需求，补全任务目标、背景和输出格式，适合快速复制。",
    copyLabel: "复制基础版",
    usageHint: "适合在信息还不完整时先交给 AI，让它帮你补齐问题和输出结构。",
  },
  {
    key: "advanced",
    title: "专业增强版",
    description: "加入动态角色、步骤化要求、约束条件和输出格式，适合复杂任务。",
    copyLabel: "复制专业版",
    usageHint: "适合直接粘贴到 ChatGPT、Kimi、豆包、Claude 的新对话里使用。",
  },
  {
    key: "template",
    title: "可复用模板版",
    description: "把具体内容抽成变量，方便下次重复使用和沉淀为提示词库。",
    copyLabel: "复制模板",
    usageHint: "适合保存下来，下次只替换【变量】继续使用。",
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

function normalizeHealthItems(input: string, items?: PromptHealthItem[]) {
  const fallbackItems = analyzePromptHealth(input);
  if (!items?.length) return fallbackItems;

  return items.map((item) => {
    const fallback = fallbackItems.find((fallbackItem) => fallbackItem.key === item.key);
    return {
      ...item,
      example: item.example ?? fallback?.example ?? "",
      suggestion: item.suggestion || fallback?.suggestion || "",
      weight: item.weight ?? fallback?.weight ?? 0,
    };
  });
}

function normalizeHistoryRecord(
  record: Omit<HistoryRecord, "analysis" | "recommendedKey" | "score"> &
    Partial<Pick<HistoryRecord, "analysis" | "recommendedKey" | "score">> & { result: LegacyRewriterResult },
): HistoryRecord {
  const result = normalizeRewriterResult(record.result);
  const analysis = record.analysis ?? analyzePromptInput(record.input);
  const health = normalizeHealthItems(record.input, record.health);
  const recommendedKey = record.recommendedKey ?? getRecommendedResultKey(analysis, health);

  return {
    ...record,
    result,
    analysis,
    health,
    recommendedKey,
    score: record.score ?? calculatePromptScore(health),
  };
}

function fieldValue(value: string | string[]) {
  if (Array.isArray(value)) return value.length ? value.join("、") : "建议补充";
  return value?.trim() ? value : "建议补充";
}

function UnderstandingCard({ analysis }: { analysis: PromptAnalysis }) {
  const fields = [
    ["场景", analysis.sceneLabel],
    ["动态角色", analysis.role],
    ["主题", analysis.topic],
    ["平台", analysis.platform],
    ["目标对象", analysis.audience],
    ["语气风格", analysis.tone],
    ["输出格式", analysis.outputFormat],
    ["关键词", analysis.keywords],
    ["约束条件", analysis.constraints],
  ] as const;

  return (
    <Card>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-950">河妖识别到的任务</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">这些理解会影响后续的诊断和三个版本的生成结果。</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-[#F8FAF7] p-3">
            <p className="text-xs font-semibold text-slate-500">{label}</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-slate-900">{fieldValue(value)}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function PromptHealthCard({ items, score }: { items: PromptHealthItem[]; score: number }) {
  return (
    <Card>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Prompt 体检报告</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">完整度评分会根据任务、场景、对象、格式和约束实时变化。</p>
        </div>
        <div className="rounded-lg border border-[#B6D8D2] bg-[#E0F2F1] px-4 py-3 text-center text-[#0F3D3E]">
          <p className="text-xs font-semibold">完整度评分</p>
          <p className="mt-1 text-2xl font-bold">{score} / 100</p>
        </div>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.key} className="rounded-lg border border-slate-200 bg-[#F8FAF7] p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">{item.label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{item.included ? "这一项已经能被识别。" : item.suggestion}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-slate-500">{item.weight} 分</span>
                <span
                  className={`rounded-md px-2 py-1 text-xs font-semibold ${
                    item.included ? "bg-[#E0F2F1] text-[#0F3D3E]" : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {item.included ? "已包含" : "建议补充"}
                </span>
              </div>
            </div>
            {!item.included ? <p className="mt-3 rounded-md bg-white px-3 py-2 text-xs leading-5 text-slate-600">可以这样补：{item.example}</p> : null}
          </div>
        ))}
      </div>
    </Card>
  );
}

function ResultTabs({
  activeTab,
  onChange,
  recommendedKey,
  result,
}: {
  activeTab: RewriterResultKey;
  onChange: (key: RewriterResultKey) => void;
  recommendedKey: RewriterResultKey;
  result: RewriterResult;
}) {
  const active = resultTabs.find((tab) => tab.key === activeTab) ?? resultTabs[1];
  const text = result[active.key];

  return (
    <Card>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-950">结果版本</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">默认看专业增强版，也可以切换到基础版或可复用模板版。</p>
      </div>
      <div className="grid gap-2 rounded-lg bg-slate-100 p-1 sm:grid-cols-3">
        {resultTabs.map((tab) => {
          const selected = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                selected ? "bg-[#0F3D3E] text-white shadow-sm" : "bg-transparent text-slate-600 hover:bg-white"
              }`}
            >
              <span>{tab.title}</span>
              {tab.key === recommendedKey ? <span className="ml-2 rounded bg-[#E0F2F1] px-1.5 py-0.5 text-[11px] text-[#0F3D3E]">推荐</span> : null}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-950">{active.title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-500">{active.description}</p>
        </div>
        <CopyButton text={text} idleLabel={active.copyLabel} className="w-full sm:w-auto" />
      </div>
      <pre className="mt-4 max-h-[640px] overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm leading-7 text-slate-800">
        {text}
      </pre>
      <div className="mt-3 space-y-2 rounded-lg bg-[#F8FAF7] px-4 py-3 text-xs leading-5 text-slate-600">
        <p>复制后怎么用：{active.usageHint}</p>
        <p>复制后可直接粘贴到 ChatGPT、Kimi、豆包、Claude 等 AI 工具中使用，并补充你的具体材料。</p>
      </div>
    </Card>
  );
}

function WaitingState() {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#E0F2F1] text-sm font-bold text-[#0F3D3E]">河</span>
        <div>
          <h2 className="text-lg font-bold text-slate-950">等待改写</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            输入一个普通 Prompt，选择优化方向后，河妖会识别任务场景、诊断缺失信息，并生成三个可复制版本。
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-3">
        {resultTabs.map((tab) => (
          <div key={tab.key} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="h-4 w-28 rounded bg-slate-200" />
            <div className="mt-3 h-3 w-full rounded bg-slate-100" />
            <div className="mt-2 h-3 w-2/3 rounded bg-slate-100" />
            <p className="mt-4 text-sm font-semibold text-slate-400">{tab.title}</p>
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
  const [analysis, setAnalysis] = useState<PromptAnalysis | null>(null);
  const [recommendedKey, setRecommendedKey] = useState<RewriterResultKey>("advanced");
  const [activeTab, setActiveTab] = useState<RewriterResultKey>("advanced");
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);
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
  const trimmedInput = input.trim();
  const inputCount = input.trim().length;
  const canGenerate = Boolean(trimmedInput) && !loading;

  function saveHistory(record: HistoryRecord) {
    const nextHistory = [record, ...history.filter((item) => item.id !== record.id)].slice(0, 5);
    setHistory(nextHistory);
    window.localStorage.setItem(historyKey, JSON.stringify(nextHistory));
  }

  function generate(value = input, selected = mode) {
    const trimmed = value.trim();
    if (!trimmed) {
      setError("请先输入一段原始 Prompt");
      return;
    }

    setError("");
    setLoading(true);
    window.setTimeout(() => {
      const workflow = rewritePromptWorkflow(trimmed, selected);
      const record: HistoryRecord = {
        id: createId(),
        input: trimmed,
        mode: selected,
        createdAt: new Date().toISOString(),
        result: workflow.result,
        health: workflow.health,
        analysis: workflow.analysis,
        recommendedKey: workflow.recommendedKey,
        score: workflow.score,
      };

      setInput(trimmed);
      setMode(selected);
      setAnalysis(workflow.analysis);
      setHealth(workflow.health);
      setRecommendedKey(workflow.recommendedKey);
      setScore(workflow.score);
      setResult(workflow.result);
      setActiveTab("advanced");
      saveHistory(record);
      setLoading(false);
    }, 400);
  }

  function restoreHistory(record: HistoryRecord) {
    const normalized = normalizeHistoryRecord(record);
    setInput(normalized.input);
    setMode(normalized.mode);
    setAnalysis(normalized.analysis);
    setResult(normalized.result);
    setHealth(normalized.health);
    setRecommendedKey(normalized.recommendedKey);
    setScore(normalized.score);
    setActiveTab("advanced");
    setError("");
  }

  function clearAll() {
    setInput("");
    setResult(null);
    setHealth([]);
    setAnalysis(null);
    setRecommendedKey("advanced");
    setActiveTab("advanced");
    setScore(0);
    setError("");
  }

  function clearHistory() {
    setHistory([]);
    window.localStorage.removeItem(historyKey);
  }

  return (
    <main className="bg-[#F8FAF7] pt-24 sm:pt-28">
      <section className="mx-auto max-w-[1200px] px-5 pb-12">
        <div className="mb-8 max-w-4xl">
          <span className="inline-flex rounded-md border border-[#B6D8D2] bg-[#E0F2F1] px-3 py-1 text-sm font-semibold text-[#0F3D3E]">
            Prompt 工作流
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Prompt 诊断改写器</h1>
          <p className="mt-4 text-lg font-semibold leading-8 text-[#0F3D3E]">
            先理解你的任务，再诊断缺失信息，最后生成可直接复制到 AI 平台的结构化 Prompt。
          </p>
          <p className="mt-3 text-base leading-7 text-slate-600">
            适合学习、写作、求职、文本整理、产品拆解和中文 AI 提问。
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
                onChange={(event) => {
                  setInput(event.target.value);
                  if (event.target.value.trim()) setError("");
                }}
                placeholder="例如：我想在目标内容平台上开一个 AI 科普账号，主要讲 Codex 和 AI 编程，帮我设计一个快速起号方案。"
              />
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>当前输入：{inputCount} 字</span>
                {!trimmedInput ? <span className="font-medium text-amber-700">请先输入一段原始 Prompt</span> : null}
              </div>

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

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Button type="button" onClick={() => generate()} disabled={!canGenerate}>
                  {loading ? "生成中..." : "开始诊断并改写"}
                </Button>
                <Button type="button" variant="ghost" onClick={clearAll}>
                  清空
                </Button>
              </div>
            </Card>

            <Card>
              <button
                type="button"
                onClick={() => setHistoryOpen((open) => !open)}
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <div>
                  <h2 className="text-lg font-bold text-slate-950">最近生成 5 条</h2>
                  <p className="mt-1 text-sm text-slate-500">本地保存，不登录、不上传。</p>
                </div>
                <span className="rounded-md bg-[#E0F2F1] px-3 py-1 text-sm font-semibold text-[#0F3D3E]">
                  {historyOpen ? "收起" : "展开"}
                </span>
              </button>

              {historyOpen ? (
                <div className="mt-4">
                  <div className="mb-3 flex justify-end">
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
                            <span>{record.score}/100</span>
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
                </div>
              ) : null}
            </Card>
          </div>

          <div className="space-y-5">
            {result && analysis ? (
              <>
                <Card>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#1E6F5C]">生成摘要</p>
                  <h2 className="mt-2 text-lg font-bold text-slate-950">
                    {buildWorkflowSummary(analysis, health, recommendedKey)}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{getRecommendationReason(recommendedKey, analysis, health)}</p>
                </Card>
                <UnderstandingCard analysis={analysis} />
                <PromptHealthCard items={health} score={score} />
                <ResultTabs activeTab={activeTab} onChange={setActiveTab} recommendedKey={recommendedKey} result={result} />
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
