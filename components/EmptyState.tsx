export function EmptyState({ title = "等待生成结果", description = "输入内容后点击生成，结果会显示在这里。" }) {
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-[#F8FAF7] p-8 text-center">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-[#E0F2F1] text-sm font-bold text-[#0F3D3E]">河</div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}
