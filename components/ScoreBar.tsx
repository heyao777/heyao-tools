import type { DimensionScore } from "@/lib/prompt-analysis";

function colorFor(score: number) {
  if (score >= 80) return "bg-[#1E6F5C]";
  if (score >= 60) return "bg-[#D6B56D]";
  return "bg-rose-500";
}

export function ScoreBar({ item }: { item: DimensionScore }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-slate-900">{item.label}</h4>
        <span className="text-sm font-bold text-[#0F3D3E]">{item.score}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${colorFor(item.score)}`} style={{ width: `${item.score}%` }} />
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-500">{item.description}</p>
    </div>
  );
}
