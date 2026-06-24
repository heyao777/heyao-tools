import Link from "next/link";
import type { ToolItem } from "@/data/tools";
import { Badge } from "./Badge";

export function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#9CCBC2] hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#E0F2F1] text-base font-bold text-[#0F3D3E]">{tool.icon}</span>
        <Badge>{tool.category}</Badge>
      </div>
      <h3 className="text-lg font-bold text-slate-950">{tool.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{tool.description}</p>
      <Link href={tool.href} className="mt-5 inline-flex min-h-10 items-center justify-center rounded-md border border-[#0F3D3E] bg-[#0F3D3E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1E6F5C]">
        {tool.buttonText}
      </Link>
    </article>
  );
}
