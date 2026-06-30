import Link from "next/link";
import type { ToolItem } from "@/data/tools";
import { Badge } from "./Badge";

export function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <article className="group heyao-surface flex h-full flex-col rounded-2xl p-5 transition duration-200 hover:-translate-y-1 hover:border-[#9CCBC2] hover:shadow-[0_22px_48px_rgba(6,63,58,0.12)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E6F6F0] text-base font-bold text-[#063F3A] ring-1 ring-[#D8E7E1] transition group-hover:bg-[#063F3A] group-hover:text-white">
          {tool.icon}
        </span>
        <Badge>{tool.category}</Badge>
      </div>
      <h3 className="text-lg font-bold text-[#07151F]">{tool.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{tool.description}</p>
      <Link
        href={tool.href}
        className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl border border-[#BFDCD4] bg-white/80 px-4 py-2 text-sm font-semibold text-[#063F3A] transition hover:border-[#063F3A] hover:bg-[#063F3A] hover:text-white"
      >
        {tool.buttonText}
      </Link>
    </article>
  );
}
