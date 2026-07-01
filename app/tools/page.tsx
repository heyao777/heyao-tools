"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { SectionTitle } from "@/components/SectionTitle";
import { ToolCard } from "@/components/ToolCard";
import { tools, type ToolCategory } from "@/data/tools";
import { clearRecentToolUsage, getRecentToolUsage, type ToolUsageRecord } from "@/lib/tool-usage";

const categories: Array<"全部工具" | ToolCategory> = ["全部工具", "学习", "写作", "求职", "内容处理", "AI 提问"];

function formatTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function ToolsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("全部工具");
  const [recent, setRecent] = useState<ToolUsageRecord[]>([]);

  useEffect(() => {
    setRecent(getRecentToolUsage());
  }, []);

  const filteredTools = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = category === "全部工具" || tool.category === category || tool.keywords.includes(category);
      const searchTarget = [tool.title, tool.description, tool.category, ...tool.keywords].join(" ").toLowerCase();
      return matchesCategory && (!keyword || searchTarget.includes(keyword));
    });
  }, [category, query]);

  function clearRecent() {
    clearRecentToolUsage();
    setRecent([]);
  }

  return (
    <main className="heyao-page">
      <section className="mx-auto max-w-[1280px] px-5 py-12">
        <SectionTitle
          eyebrow="工具箱总览"
          title="河妖工具箱"
          description="搜索、筛选并进入常用工具。最近使用记录只保存在当前浏览器本地。"
        />

        <Card>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <label className="block text-sm font-semibold text-slate-900">
              搜索工具
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索 Prompt、简历、清洗、角色、求职、写作、AI 提问"
                className="heyao-focus mt-2 w-full rounded-2xl border border-[#D8E7E1] bg-white/90 px-4 py-3 text-sm outline-none focus:border-[#0B6B5E]"
              />
            </label>
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-900">分类筛选</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                      category === item
                        ? "border-[#063F3A] bg-[#063F3A] text-white"
                        : "border-[#BFDCD4] bg-white/80 text-[#063F3A] hover:bg-[#E6F6F0]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            {filteredTools.length ? (
              <div className="grid gap-5 md:grid-cols-2">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.href} tool={tool} />
                ))}
              </div>
            ) : (
              <EmptyState title="没有找到匹配工具" description="换一个关键词，或切回全部工具再试。" />
            )}
          </div>

          <div className="space-y-5">
            <Card>
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">最近使用</h2>
                  <p className="mt-1 text-sm text-slate-500">真实记录，只保存在本地浏览器。</p>
                </div>
                <button type="button" onClick={clearRecent} disabled={!recent.length} className="text-sm font-semibold text-[#063F3A] disabled:opacity-40">
                  清空
                </button>
              </div>
              {recent.length ? (
                <div className="space-y-3">
                  {recent.map((item) => (
                    <Link key={`${item.href}-${item.usedAt}`} href={item.href} className="block rounded-2xl border border-[#D8E7E1] bg-[#FBFDFB] p-4 transition hover:border-[#0B6B5E] hover:bg-[#E6F6F0]">
                      <p className="text-sm font-bold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{formatTime(item.usedAt)}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptyState title="暂无最近使用" description="开始使用工具后，这里会显示你的记录。" />
              )}
            </Card>

            <Card>
              <h2 className="text-lg font-bold text-slate-950">收藏工具</h2>
              <div className="mt-4">
                <EmptyState title="暂无收藏工具" description="你可以在工具卡片中点击收藏，方便下次快速进入。" />
              </div>
            </Card>
          </div>
        </section>
      </section>
    </main>
  );
}
