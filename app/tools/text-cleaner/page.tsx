"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Textarea } from "@/components/Textarea";
import {
  cleanTextByMode,
  cleanTextWithRules,
  type CleanMode,
  type CleanRule,
  type CleanTextResult,
  type TextCleanOptions,
} from "@/lib/text-cleaner";
import { recordToolUsage } from "@/lib/tool-usage";

type SceneMode = {
  id: CleanMode;
  label: string;
  description: string;
  rules: CleanRule[];
  options?: TextCleanOptions;
};

const allRules: CleanRule[] = ["spaces", "blankLines", "markdown", "emoji", "aiPhrases", "symbols"];

const sceneModes: SceneMode[] = [
  {
    id: "light",
    label: "轻度清洗",
    description: "只修正格式，不改内容。",
    rules: ["spaces", "blankLines", "symbols"],
  },
  {
    id: "standard",
    label: "标准清洗",
    description: "整理结构，保留原意。",
    rules: ["spaces", "blankLines", "markdown", "emoji", "symbols"],
  },
  {
    id: "deep",
    label: "深度清洗",
    description: "提取重点并重新组织。",
    options: { removeChineseInnerSpaces: true, conservativeSymbols: true },
    rules: allRules,
  },
];

const ruleButtons: Array<{ label: string; rule: CleanRule; description: string }> = [
  { label: "清理空格", rule: "spaces", description: "处理行首行尾空格、Tab 和连续空格。" },
  { label: "清理空行", rule: "blankLines", description: "压缩过多换行，保留自然段落。" },
  { label: "清理 Markdown", rule: "markdown", description: "移除标题、引用、链接、代码和表格标记。" },
  { label: "清理 Emoji", rule: "emoji", description: "删除 Emoji、不可见字符和残留空格。" },
  { label: "清理 AI 套话", rule: "aiPhrases", description: "删除常见 AI 开场白和结尾套话。" },
  { label: "清理杂乱符号", rule: "symbols", description: "保守处理重复标点和空括号。" },
];

const example = `当然可以，以下是为你整理如下的内容：

##  文本清洗工具  ✨✨✨

> 我来帮你把这段  AI 回复   清理成更适合复制的中文文本。

- [x] 删除 **Markdown**
- [ ] 清理   多余空格

[查看原文](https://example.com)



希望对你有帮助，如果你需要，我还可以继续优化。`;

function createEmptyStats(input: string, output: string) {
  return {
    originalCount: input.length,
    cleanedCount: output.length,
    reducedCount: Math.max(0, input.length - output.length),
    removedSpaces: 0,
    removedBlankLines: 0,
    removedSymbols: 0,
  };
}

export default function TextCleanerPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [result, setResult] = useState<CleanTextResult | null>(null);
  const [error, setError] = useState("");
  const [activeSceneId, setActiveSceneId] = useState<CleanMode>(sceneModes[0].id);
  const [removeChineseInnerSpaces, setRemoveChineseInnerSpaces] = useState(false);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const activeScene = sceneModes.find((scene) => scene.id === activeSceneId) ?? sceneModes[0];
  const stats = result?.stats ?? createEmptyStats(input, output);
  const basisText = output || input;

  const liveInputCount = useMemo(() => input.length, [input]);

  useEffect(() => {
    recordToolUsage({ title: "文本清洗工具", href: "/tools/text-cleaner" });
  }, []);

  function buildOptions(extra?: TextCleanOptions): TextCleanOptions {
    return {
      conservativeSymbols: true,
      ...activeScene.options,
      ...extra,
      removeChineseInnerSpaces:
        extra?.removeChineseInnerSpaces ?? activeScene.options?.removeChineseInnerSpaces ?? removeChineseInnerSpaces,
    };
  }

  function applyRules(rules: CleanRule[], extraOptions?: TextCleanOptions) {
    const source = basisText;
    if (!source.trim()) {
      setError("请先输入内容");
      return;
    }

    setError("");
    setUndoStack((items) => [source, ...items].slice(0, 10));

    const nextResult = cleanTextWithRules(source, rules, buildOptions(extraOptions));
    setResult(nextResult);
    setOutput(nextResult.cleanedText);
    recordToolUsage({ title: "文本清洗工具", href: "/tools/text-cleaner" });
  }

  function applyScene(scene: SceneMode) {
    setActiveSceneId(scene.id);
    if (basisText.trim()) {
      setError("");
      setUndoStack((items) => [basisText, ...items].slice(0, 10));
      const nextResult = cleanTextByMode(basisText, scene.id, {
        conservativeSymbols: true,
        ...scene.options,
        removeChineseInnerSpaces: scene.options?.removeChineseInnerSpaces ?? removeChineseInnerSpaces,
      });
      setResult(nextResult);
      setOutput(nextResult.cleanedText);
      recordToolUsage({ title: "文本清洗工具", href: "/tools/text-cleaner" });
    }
  }

  function undo() {
    const [previous, ...rest] = undoStack;
    if (!previous) return;
    setOutput(previous);
    setResult(null);
    setUndoStack(rest);
    setError("");
  }

  async function copyOutput() {
    if (!output) {
      setError("请先生成清洗结果");
      return;
    }
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  function replaceInput() {
    if (!output) {
      setError("请先生成清洗结果");
      return;
    }
    setInput(output);
    setError("");
  }

  function downloadOutput() {
    if (!output) {
      setError("请先生成清洗结果");
      return;
    }
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "heyao-cleaned-text.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setResult(null);
    setUndoStack([]);
    setCopied(false);
    setError("");
  }

  return (
    <main className="heyao-page">
      <section className="mx-auto max-w-[1280px] px-5 py-10 sm:py-12">
        <div className="mb-8 max-w-3xl">
          <span className="inline-flex rounded-full border border-[#BFDCD4] bg-[#E6F6F0] px-3 py-1 text-xs font-semibold text-[#063F3A]">
            文本工具
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#07151F] sm:text-5xl">文本清洗工具</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            面向中文 AI 使用场景，清理空格、空行、Markdown、Emoji、AI 套话和杂乱符号。所有处理都在浏览器本地完成。
          </p>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {sceneModes.map((scene) => (
            <button
              key={scene.id}
              type="button"
              onClick={() => applyScene(scene)}
              className={`min-h-10 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                activeSceneId === scene.id
                  ? "border-[#063F3A] bg-[#063F3A] text-white shadow-[0_10px_22px_rgba(6,63,58,0.16)]"
                  : "border-[#BFDCD4] bg-white/80 text-[#063F3A] hover:bg-[#E6F6F0]"
              }`}
            >
              {scene.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <Card>
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <label className="text-sm font-semibold text-slate-900" htmlFor="cleaner-input">
                  原始文本
                </label>
                <p className="mt-1 text-xs text-slate-500">当前模式：{activeScene.label}。{activeScene.description}</p>
              </div>
              <span className="text-xs font-medium text-slate-500">原文字数：{liveInputCount}</span>
            </div>
            <Textarea
              id="cleaner-input"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setError("");
              }}
              placeholder="粘贴 AI 回复、公众号文案、小红书文案、简历文本或 PDF 复制文本"
              className="min-h-[420px]"
            />
            <label className="mt-4 flex items-start gap-2 text-sm leading-6 text-slate-600">
              <input
                type="checkbox"
                checked={removeChineseInnerSpaces}
                onChange={(event) => setRemoveChineseInnerSpaces(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 accent-[#063F3A]"
              />
              删除中文字符之间的空格，适合 PDF 复制后出现“中 文 间 隔”的情况。
            </label>
            {error ? <p className="mt-3 text-sm font-medium text-rose-600">{error}</p> : null}
            <div className="mt-4 flex flex-wrap gap-2">
              {ruleButtons.map((item) => (
                <Button key={item.rule} type="button" variant="secondary" onClick={() => applyRules([item.rule])}>
                  {item.label}
                </Button>
              ))}
              <Button type="button" onClick={() => applyRules(allRules, { conservativeSymbols: true })}>
                全部清理
              </Button>
              <Button type="button" variant="ghost" onClick={undo} disabled={!undoStack.length}>
                撤销
              </Button>
              <Button type="button" variant="secondary" onClick={copyOutput} disabled={!output}>
                {copied ? "复制成功" : "复制"}
              </Button>
              <Button type="button" variant="ghost" onClick={clearAll}>
                清空
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setInput(example);
                  setOutput("");
                  setResult(null);
                  setUndoStack([]);
                  setError("");
                }}
              >
                填入示例
              </Button>
            </div>
          </Card>

          <Card>
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <label className="text-sm font-semibold text-slate-900" htmlFor="cleaner-output">
                  清洗后文本
                </label>
                <p className="mt-1 text-xs text-slate-500">点击任意清洗按钮后，结果会显示在这里。</p>
              </div>
              <span className="text-xs font-medium text-slate-500">清洗后字数：{stats.cleanedCount}</span>
            </div>
            <textarea
              id="cleaner-output"
              value={output}
              readOnly
              placeholder="清洗结果会显示在这里"
              className="heyao-focus min-h-[420px] w-full resize-y rounded-2xl border border-[#D8E7E1] bg-[#FBFDFB] px-4 py-3 text-sm leading-7 text-slate-900 outline-none"
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button type="button" variant="secondary" onClick={replaceInput} disabled={!output}>
                替换原文
              </Button>
            <Button type="button" variant="secondary" onClick={copyOutput} disabled={!output}>
              {copied ? "复制成功" : "复制"}
            </Button>
            <Button type="button" variant="secondary" onClick={downloadOutput} disabled={!output}>
              下载 .txt
            </Button>
          </div>
        </Card>
        </div>

        <section className="heyao-surface mt-6 rounded-2xl p-5">
          <h2 className="mb-4 text-base font-bold text-slate-950">处理记录</h2>
          {result?.records.length ? (
            <div className="mb-5 flex flex-wrap gap-2">
              {result.records.map((record) => (
                <span key={record} className="rounded-full border border-[#BFDCD4] bg-[#E6F6F0] px-3 py-1 text-sm font-medium text-[#063F3A]">
                  {record}
                </span>
              ))}
            </div>
          ) : (
            <p className="mb-5 rounded-2xl border border-dashed border-[#D8E7E1] bg-[#F8FBF8] p-4 text-sm text-slate-500">
              暂无处理记录。选择清洗模式并生成结果后，这里会显示具体处理内容。
            </p>
          )}
          {activeSceneId === "deep" ? (
            <p className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              深度清洗会重新组织内容，但应尽量保留原意。请在重要场景中对照原文检查。
            </p>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            <Stat label="原文字数" value={stats.originalCount} />
            <Stat label="清洗后字数" value={stats.cleanedCount} />
            <Stat label="减少字符数" value={stats.reducedCount} />
            <Stat label="删除空格数" value={stats.removedSpaces} />
            <Stat label="删除空行数" value={stats.removedBlankLines} />
            <Stat label="删除符号数" value={stats.removedSymbols} />
          </div>
        </section>

        <section className="heyao-surface mt-6 rounded-2xl p-5">
          <h2 className="mb-4 text-base font-bold text-slate-950">清洗规则说明</h2>
          <div className="grid gap-3 text-sm leading-6 text-slate-600 md:grid-cols-2 lg:grid-cols-3">
            {ruleButtons.map((item) => (
              <p key={item.rule} className="heyao-soft-panel rounded-2xl p-3">
                <span className="font-semibold text-slate-900">{item.label}：</span>
                {item.description}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-4">
          <InfoCard
            title="会清理什么"
            content="空格、空行、Markdown 标记、Emoji、不可见字符、常见 AI 套话、重复标点和空括号。"
          />
          <InfoCard
            title="适合什么场景"
            content="适合清理 AI 回复、公众号草稿、小红书文案、简历文本、PDF 或网页复制文本。"
          />
          <InfoCard
            title="不推荐用于什么"
            content="不推荐直接处理代码、公式、法律条款、保留 Markdown 语法的文档或需要精确格式的表格。"
          />
          <InfoCard
            title="隐私说明"
            content="清洗逻辑全部在浏览器本地执行，不上传服务器，也不会保存到远端数据库。"
          />
        </section>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="heyao-soft-panel rounded-2xl p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-[#063F3A]">{value}</p>
    </div>
  );
}

function InfoCard({ title, content }: { title: string; content: string }) {
  return (
    <article className="heyao-surface rounded-2xl p-5">
      <h2 className="text-base font-bold text-slate-950">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{content}</p>
    </article>
  );
}
